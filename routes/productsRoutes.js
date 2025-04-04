import express from 'express';
import { 
  getAllProducts,
  getproductByID,
  getProductsByCategory,
  deleteproduct,
  updateproductByID
} from '../controllers/productsController.js';
import {addProduct } from "../controllers/productsController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
// add product with image 
router.post("/add", upload.single("image"), addProduct);

// Get all products
router.get('/products', getAllProducts);

// Get a single product by ID
router.get('/products/:id', getproductByID);

//get products by catgory 
router.get('/category/:categoryId',getProductsByCategory);

// Update a product by ID
router.put('/product/:id',upload.single("image"),updateproductByID);

// Delete a product by ID
router.delete('/product/:id', deleteproduct);

export default router;
