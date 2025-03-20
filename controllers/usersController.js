import db from "../database.js";  

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT * FROM users WHERE role='user'");
        res.status(200).json({
            data: users,
            message: "Users retrieved successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error retrieving users",
            error: error.message
        });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [users] = await db.query("SELECT * FROM users WHERE id = ? AND role='user'", [id]);

        if (users.length === 0) {
            return res.status(404).json({
                data: null,
                message: "User not found",
                error: null
            });
        }

        res.status(200).json({
            data: users[0],
            message: "User retrieved successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error retrieving user",
            error: error.message
        });
    }
};

// Delete a user
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "User not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "User deleted successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error deleting user",
            error: error.message
        });
    }
};

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
// export { getAllUsers, getUserById, deleteUserById, createUser, loginUser, addToWishlist };
