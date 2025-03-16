import db from '../database.js'; // Ensure this is your MySQL2 database connection

const Image = {
    create: async (url, product_id) => {
        const query = `
            INSERT INTO images (url, product_id, created_at) 
            VALUES (?, ?, NOW())
        `;
        const [result] = await db.execute(query, [url, product_id]);
        return { id: result.insertId, url, product_id };
    },

    getAll: async () => {
        const query = `SELECT * FROM images`;
        const [rows] = await db.execute(query);
        return rows;
    },

    getById: async (id) => {
        const query = `SELECT * FROM images WHERE id = ?`;
        const [rows] = await db.execute(query, [id]);
        return rows[0] || null;
    },

    update: async (id, url) => {
        const query = `
            UPDATE images 
            SET url = ? 
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [url, id]);
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const query = `DELETE FROM images WHERE id = ?`;
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }
};

export default Image;
