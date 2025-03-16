import Image from "../models/Images.js";

// Get all images
export const getAllImages = async (req, res) => {
    try {
        const images = await Image.getAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
};

// Get a single image by ID
export const getImageById = async (req, res) => {
    try {
        const image = await Image.getById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: "Error fetching image", error: error.message });
    }
};

// Upload (Add) a new image
export const addImage = async (req, res) => {
    try {
        const { url, product_id } = req.body;
        if (!url || !product_id) {
            return res.status(400).json({ message: "Image URL and product ID are required" });
        }

        const newImage = await Image.create(url, product_id);
        res.status(201).json({ message: "Image added successfully", image: newImage });
    } catch (error) {
        res.status(500).json({ message: "Error adding image", error: error.message });
    }
};

// Delete an image
export const deleteImage = async (req, res) => {
    try {
        const success = await Image.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting image", error: error.message });
    }
};
