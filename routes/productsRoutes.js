import express from 'express';
import { 
  getAllProducts, 
  getProductByID, 
  addProduct, 
  updateProductByID, 
  deleteProduct 
} from '../controllers/productsController.js';

const router = express.Router();

// Create a new product
router.post('/products', addProduct);

// Get all products
router.get('/products', getAllProducts);

// Get a single product by ID
router.get('/products/:id', getProductByID);

// Update a product by ID
router.put('/products/:id', updateProductByID);

// Delete a product by ID
router.delete('/products/:id', deleteProduct);

export default router;
