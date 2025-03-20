import ShippingAddress from '../models/ShippingAddress.js';

// Create a new shipping address
export const createShippingAddress = async (req, res) => {
    try {
        const { city, building, floor, street, user_id } = req.body;

        if (!city || !building || !floor || !street || !user_id) {
            return res.status(400).json({
                data: null,
                message: "All fields are required",
                error: null
            });
        }

        const result = await ShippingAddress.createShippingAddress(city, building, floor, street, user_id);
        res.status(201).json({
            data: { id: result.insertId },
            message: "Shipping address created successfully",
            error: null
        });

    } catch (error) {
        console.error(error); // Log full error on the server
        res.status(500).json({
            data: null,
            message: "Error creating shipping address",
            error: error.message
        });
    }
};

// Get all shipping addresses
export const getAllShippingAddresses = async (req, res) => {
    try {
        const addresses = await ShippingAddress.getAllShippingAddresses();
        res.status(200).json({
            data: addresses,
            message: "Shipping addresses retrieved successfully",
            error: null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Error fetching shipping addresses",
            error: error.message
        });
    }
};

// Get a single shipping address by ID
export const getShippingAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await ShippingAddress.getShippingAddressById(id);

        if (!address) {
            return res.status(404).json({
                data: null,
                message: "Shipping address not found",
                error: null
            });
        }

        res.status(200).json({
            data: address,
            message: "Shipping address retrieved successfully",
            error: null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Error fetching shipping address",
            error: error.message
        });
    }
};

// Update an existing shipping address
export const updateShippingAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { city, building, floor, street, user_id } = req.body;

        if (!city || !building || !floor || !street || !user_id) {
            return res.status(400).json({
                data: null,
                message: "All fields are required for update",
                error: null
            });
        }

        const result = await ShippingAddress.updateShippingAddress(id, city, building, floor, street, user_id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "Shipping address not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Shipping address updated successfully",
            error: null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Error updating shipping address",
            error: error.message
        });
    }
};

// Delete a shipping address
export const deleteShippingAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ShippingAddress.deleteShippingAddress(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "Shipping address not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Shipping address deleted successfully",
            error: null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: null,
            message: "Error deleting shipping address",
            error: error.message
        });
    }
};
