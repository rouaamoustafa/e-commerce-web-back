import ShippingAddress from '../models/ShippingAddress.js';

export const createShippingAddress = async (req, res) => {
    try {
        const { city, building, floor, street, user_id } = req.body;
        const result = await ShippingAddress.createShippingAddress(city, building, floor, street, user_id);
        res.status(201).json({ message: 'Shipping address created', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating shipping address', error });
    }
};

export const getAllShippingAddresses = async (req, res) => {
    try {
        const addresses = await ShippingAddress.getAllShippingAddresses();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shipping addresses', error });
    }
};

export const getShippingAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await ShippingAddress.getShippingAddressById(id);
        if (!address) return res.status(404).json({ message: 'Shipping address not found' });
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shipping address', error });
    }
};

export const updateShippingAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { city, building, floor, street, user_id } = req.body;
        await ShippingAddress.updateShippingAddress(id, city, building, floor, street, user_id);
        res.status(200).json({ message: 'Shipping address updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating shipping address', error });
    }
};

export const deleteShippingAddress = async (req, res) => {
    try {
        const { id } = req.params;
        await ShippingAddress.deleteShippingAddress(id);
        res.status(200).json({ message: 'Shipping address deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shipping address', error });
    }
};