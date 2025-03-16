import express from "express";
import { getAllShipping, getShippingById, addShipping, updateShipping, deleteShipping } from "../controllers/shippingController.js";

const router = express.Router();

router.get("/", getAllShipping);         // Get all shipping records
router.get("/:id", getShippingById);     // Get a specific shipping record by ID
router.post("/", addShipping);           // Add a new shipping record
router.put("/:id", updateShipping);      // Update shipping amount by ID
router.delete("/:id", deleteShipping);   // Delete a shipping record by ID

export default router;

