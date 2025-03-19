import express from "express";
import { addToWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", addToWishlist);

export default router;
