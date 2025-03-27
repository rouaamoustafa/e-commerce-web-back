import express from 'express';
import ProductController from '../controllers/productsController.js';

const router = express.Router();

// Create a new product
router.post('/products', ProductController.createProduct);

// Get all products
router.get('/products', ProductController.getAllProducts);

// Get products by category
router.get('/products/category/:category', ProductController.getProductsByCategory);

// Get a single product by ID
router.get('/products/:id', ProductController.getProductById);

// Update a product by ID
router.put('/products/:id', ProductController.updateProduct);

// Delete a product by ID
router.delete('/products/:id', ProductController.deleteProduct);

export default router;