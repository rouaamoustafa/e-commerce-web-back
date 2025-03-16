import Category from '../models/Categories.js';

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await Category.createCategory(name);
        res.status(201).json({ message: 'Category created', id: result.id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.getCategoryById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const affectedRows = await Category.updateCategory(id, name);
        if (affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Category.deleteCategory(id);
        if (affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};
