import db from '../database.js';

const Category = {
    async createCategory(name) {
        const sql = `INSERT INTO categories (name) VALUES (?)`;
        const [result] = await db.execute(sql, [name]);
        return { id: result.insertId };
    },

    async getAllCategories() {
        const sql = `SELECT * FROM categories`;
        const [rows] = await db.execute(sql);
        return rows;
    },

    async getCategoryById(id) {
        const sql = `SELECT * FROM categories WHERE id = ?`;
        const [rows] = await db.execute(sql, [id]);
        return rows.length ? rows[0] : null;
    },

    async updateCategory(id, name) {
        const sql = `UPDATE categories SET name = ? WHERE id = ?`;
        const [result] = await db.execute(sql, [name, id]);
        return result.affectedRows;
    },

    async deleteCategory(id) {
        const sql = `DELETE FROM categories WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows;
    }
};

export default Category;
