import Shipping from '../models/Shipping.js';

// Get all shipping records
export const getAllShipping = async (req, res) => {
    try {
        const shipping = await Shipping.getAll();
        res.status(200).json(shipping);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching shipping data' });
    }
};

// Get a single shipping record by ID
export const getShippingById = async (req, res) => {
    try {
        const { id } = req.params;
        const shipping = await Shipping.getById(id);
        if (!shipping) return res.status(404).json({ message: 'Shipping record not found' });
        res.status(200).json(shipping);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching shipping record' });
    }
};

// Create a new shipping record
export const addShipping = async (req, res) => {
    try {
        const { order_id, shipping_address_id, shipping_amount } = req.body;
        if (!order_id || !shipping_address_id || !shipping_amount) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const result = await Shipping.create(order_id, shipping_address_id, shipping_amount);
        res.status(201).json({ message: 'Shipping record added', result });
    } catch (error) {
        res.status(500).json({ error: 'Error adding shipping record' });
    }
};

// Update an existing shipping record
export const updateShipping = async (req, res) => {
    try {
        const { id } = req.params;
        const { shipping_amount } = req.body;
        if (!shipping_amount) return res.status(400).json({ message: 'Shipping amount is required' });

        const result = await Shipping.update(id, shipping_amount);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Shipping record not found' });

        res.status(200).json({ message: 'Shipping record updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating shipping record' });
    }
};

// Delete a shipping record
export const deleteShipping = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Shipping.delete(id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Shipping record not found' });

        res.status(200).json({ message: 'Shipping record deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting shipping record' });
    }
};