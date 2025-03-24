import express from "express";
import { getAllImages, getImageById, addImage, deleteImage } from "../controllers/imagesController.js";

const router = express.Router();

// Define routes
router.get("/", getAllImages);       // Get all images
router.get("/:id", getImageById);    // Get image by ID
router.post("/", addImage);          // Add a new image
router.delete("/:id", deleteImage);  // Delete an image

export default router; // ✅ Use `export default` for ES module compatibility