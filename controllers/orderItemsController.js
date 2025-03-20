import db from '../database.js';

//  Create a New Order Item
export const createOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity } = req.body;
        if (!order_id || !product_id || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const [result] = await db.query(
            "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
            [order_id, product_id, quantity]
        );

        res.status(201).json({ message: "Order item created successfully", itemId: result.insertId });
    } catch (error) {
        console.error(" Error creating order item:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//  Get All Order Items
export const getAllOrderItems = async (req, res) => {
    try {
        const [items] = await db.query("SELECT * FROM order_items");
        res.status(200).json(items);
    } catch (error) {
        console.error(" Error fetching order items:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//  Get a Single Order Item by ID
export const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const [item] = await db.query("SELECT * FROM order_items WHERE id = ?", [id]);

        if (item.length === 0) {
            return res.status(404).json({ message: "Order item not found" });
        }

        res.status(200).json(item[0]);
    } catch (error) {
        console.error(" Error fetching order item:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//  Update an Order Item
export const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { order_id, product_id, quantity } = req.body;

        const [result] = await db.query(
            "UPDATE order_items SET order_id = ?, product_id = ?, quantity = ? WHERE id = ?",
            [order_id, product_id, quantity, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order item not found" });
        }

        res.status(200).json({ message: "Order item updated successfully" });
    } catch (error) {
        console.error(" Error updating order item:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//  Delete an Order Item
export const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query("DELETE FROM order_items WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order item not found" });
        }

        res.status(200).json({ message: "Order item deleted successfully" });
    } catch (error) {
        console.error(" Error deleting order item:", error.message);
        res.status(500).json({ error: error.message });
    }
};
