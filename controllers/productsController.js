import products from '../models/products.js';

const ProductController = {
    createProduct: async (req, res) => {
        try {
            const { name, price, description, category } = req.body;

            if (!name || !price || !category) {
                return res.status(400).json({
                    data: null,
                    message: "Product name, price, and category are required",
                    error: null
                });
            }

            const result = await products.create({ name, price, description, category });

            res.status(201).json({
                data: { id: result.insertId },
                message: "Product created successfully",
                error: null
            });

        } catch (error) {
            res.status(500).json({
                data: null,
                message: "Error creating product",
                error: error.message
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await products.findById(id);

            if (!product) {
                return res.status(404).json({
                    data: null,
                    message: "Product not found",
                    error: null
                });
            }

            res.status(200).json({
                data: product,
                message: "Product retrieved successfully",
                error: null
            });

        } catch (error) {
            res.status(500).json({
                data: null,
                message: "Error fetching product",
                error: error.message
            });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const allProducts = await products.findAll();

            res.status(200).json({
                data: allProducts,
                message: "Products retrieved successfully",
                error: null
            });

        } catch (error) {
            res.status(500).json({
                data: null,
                message: "Error fetching products",
                error: error.message
            });
        }
    },

    getProductsByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const productsByCategory = await products.findByCategory(category);

            if (!productsByCategory.length) {
                return res.status(404).json({
                    data: null,
                    message: "No products found in this category",
                    error: null
                });
            }

            res.status(200).json({
                data: productsByCategory,
                message: "Products retrieved successfully",
                error: null
            });

        } catch (error) {
            res.status(500).json({
                data: null,
                message: "Error fetching products by category",
                error: error.message
            });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price, description, category } = req.body;

            if (!name || !price || !category) {
                return res.status(400).json({
                    data: null,
                    message: "Product name, price, and category are required for update",
                    error: null
                });
            }

            const result = await products.update(id, { name, price, description, category });

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    data: null,
                    message: "Product not found",
                    error: null
                });
            }

            res.status(200).json({
                data: null,
                message: "Product updated successfully",
                error: null
            });

        } catch (error) {
            res.status(500).json({
                data: null,
                message: "Error updating product",
                error: error.message
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await products.delete(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    data: null,
                    message: "Product not found",
                    error: null
                });
            }

            res.status(200).json({
                data: null,
                message: "Product deleted successfully",
                error: null
            });

        } catch (error) {
            res.status(500).json({
                data: null,
                message: "Error deleting product",
                error: error.message
            });
        }
    }
};

export default ProductController;
