import Category from '../models/Categories.js';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                data: null,
                message: "Category name is required",
                error: null
            });
        }

        const result = await Category.createCategory(name);

        res.status(201).json({
            data: { id: result.insertId },
            message: "Category created successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error creating category",
            error: error.message
        });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAllCategories();

        res.status(200).json({
            data: categories,
            message: "Categories retrieved successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error fetching categories",
            error: error.message
        });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.getCategoryById(id);

        if (!category.length) {
            return res.status(404).json({
                data: null,
                message: "Category not found",
                error: null
            });
        }

        res.status(200).json({
            data: category[0], // MySQL2 returns an array, so return the first element
            message: "Category retrieved successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error fetching category",
            error: error.message
        });
    }
};

// Update an existing category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                data: null,
                message: "Category name is required for update",
                error: null
            });
        }

        const result = await Category.updateCategory(id, name);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "Category not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Category updated successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error updating category",
            error: error.message
        });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Category.deleteCategory(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "Category not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Category deleted successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error deleting category",
            error: error.message
        });
    }
};
