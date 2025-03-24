import db from '../database.js';

const products = {
    create: async (data) => {
        const sql = `INSERT INTO products (name, description, image, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await db.execute(sql, [data.name, data.description, data.image, data.price, data.stock_quantity, data.category_id]);
        return result;
    },

    findById: async (id) => {
        const sql = `SELECT * FROM products WHERE id = ?`;
        const [rows] = await db.execute(sql, [id]);
        return rows[0]; 
    },

    findAll: async () => {
        const sql = `SELECT * FROM products`;
        const [rows] = await db.execute(sql);
        return rows;
    },

    findByCategory: async (categoryId) => {
        const sql = `SELECT * FROM products WHERE category_id = ?`;
        const [rows] = await db.execute(sql, [categoryId]);
        return rows;
    },

    update: async (id, data) => {
        const sql = `UPDATE products SET name = ?, description = ?, image = ?, price = ?, stock_quantity = ?, category_id = ? WHERE id = ?`;
        const [result] = await db.execute(sql, [data.name, data.description, data.image, data.price, data.stock_quantity, data.category_id, id]);
        return result;
    },

    delete: async (id) => {
        const sql = `DELETE FROM products WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);
        return result;
    }
};

export default products;