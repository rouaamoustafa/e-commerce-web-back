import Shipping from '../models/Shipping.js';

// Get all shipping records
export const getAllShipping = async (req, res) => {
    try {
        const shipping = await Shipping.getAll();
        res.status(200).json({
            data: shipping,
            message: "Shipping records retrieved successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error fetching shipping data",
            error: error.message
        });
    }
};

// Get a single shipping record by ID
export const getShippingById = async (req, res) => {
    try {
        const { id } = req.params;
        const shipping = await Shipping.getById(id);
        if (!shipping) {
            return res.status(404).json({
                data: null,
                message: "Shipping record not found",
                error: null
            });
        }
        res.status(200).json({
            data: shipping,
            message: "Shipping record retrieved successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error fetching shipping record",
            error: error.message
        });
    }
};

// Create a new shipping record
export const addShipping = async (req, res) => {
    try {
        const { order_id, shipping_address_id, shipping_amount } = req.body;
        if (!order_id || !shipping_address_id || !shipping_amount) {
            return res.status(400).json({
                data: null,
                message: "All fields are required",
                error: null
            });
        }
        const result = await Shipping.create(order_id, shipping_address_id, shipping_amount);
        res.status(201).json({
            data: result,
            message: "Shipping record added successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error adding shipping record",
            error: error.message
        });
    }
};

// Update an existing shipping record
export const updateShipping = async (req, res) => {
    try {
        const { id } = req.params;
        const { shipping_amount } = req.body;
        if (!shipping_amount) {
            return res.status(400).json({
                data: null,
                message: "Shipping amount is required",
                error: null
            });
        }

        const result = await Shipping.update(id, shipping_amount);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "Shipping record not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Shipping record updated successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error updating shipping record",
            error: error.message
        });
    }
};

// Delete a shipping record
export const deleteShipping = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Shipping.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "Shipping record not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Shipping record deleted successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error deleting shipping record",
            error: error.message
        });
    }
};
