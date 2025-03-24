import express from "express";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

// Image upload endpoint
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const apiKey = process.env.IMAGEBB_API_KEY;
        const imagePath = req.file.path;
        const imageData = fs.readFileSync(imagePath, { encoding: "base64" });

        // Upload to ImageBB
        const response = await axios.post(
            "https://api.imgbb.com/1/upload",
            new URLSearchParams({
                key: apiKey,
                image: imageData,
            })
        );

        // Remove file from server after upload
        fs.unlinkSync(imagePath);

        return res.json({
            success: true,
            imageUrl: response.data.data.url,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Image upload failed" });
    }
});

export default router;
