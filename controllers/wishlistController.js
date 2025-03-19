import db from "../database.js"; // Ensure the database connection uses mysql2/promise

// Add a product to the wishlist
export const addToWishlist = async (req, res) => {
    const { user_id, product_id } = req.body;

    // Validate input
    if (!user_id || !product_id) {
        return res.status(400).json({
            data: null,
            message: "User ID and Product ID are required",
            error: null
        });
    }

    try {
        // Check if the product is already in the wishlist
        const [existing] = await db.execute(
            "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                data: null,
                message: "Product is already in the wishlist",
                error: null
            });
        }

        // Insert into the wishlist
        const [result] = await db.execute(
            "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
            [user_id, product_id]
        );

        res.status(201).json({
            data: { wishlist_id: result.insertId },
            message: "Product added to wishlist successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error adding product to wishlist",
            error: error.message
        });
    }
};
