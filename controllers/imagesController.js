import Image from "../models/Images.js";

// Get all images
export const getAllImages = async (req, res) => {
    try {
        const images = await Image.getAll();
        res.status(200).json({
            data: images,
            message: "Images retrieved successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error fetching images",
            error: error.message
        });
    }
};

// Get a single image by ID
export const getImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.getById(id);

        if (!image) {
            return res.status(404).json({
                data: null,
                message: "Image not found",
                error: null
            });
        }

        res.status(200).json({
            data: image,
            message: "Image retrieved successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error fetching image",
            error: error.message
        });
    }
};

// Upload (Add) a new image
export const addImage = async (req, res) => {
    try {
        const { url, product_id } = req.body;

        if (!url || !product_id) {
            return res.status(400).json({
                data: null,
                message: "Image URL and product ID are required",
                error: null
            });
        }

        const newImage = await Image.create(url, product_id);

        res.status(201).json({
            data: { id: newImage.insertId },
            message: "Image added successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error adding image",
            error: error.message
        });
    }
};

// Delete an image
export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Image.delete(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "Image not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Image deleted successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error deleting image",
            error: error.message
        });
    }
};
