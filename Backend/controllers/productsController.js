import products from '../models/products.js';

const ProductController = {
    createProduct: async (req, res) => {
        try {
            const result = await products.create(req.body);
            res.status(201).json({ message: 'Product created successfully', result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await products.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const allProducts = await products.findAll();
            res.json(allProducts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const result = await products.update(req.params.id, req.body);
            res.json({ message: 'Product updated successfully', result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await products.delete(req.params.id);
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default ProductController;
