import express from 'express';
/*import { 
  //getAllProducts, 
  getProductByID,
  updateProductByID, 
  deleteproduct
} from '../controllers/productsController.js';*/
import {addProduct } from "../controllers/productsController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
// add product with image 
router.post("/add", upload.single("image"), addProduct);

// Create a new product
//router.post('/products', addProduct);

// Get all products
//router.get('/products', getAllProducts);

// Get a single product by ID
/*router.get('/products/:id', getProductByID);

// Update a product by ID
router.put('/products/:id', updateProductByID);

// Delete a product by ID
router.delete('/products/:id', deleteproduct);*/

export default router;
