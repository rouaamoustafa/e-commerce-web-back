import db from '../database.js'; // Ensure this is a MySQL2 connection instance

const Shipping = {
    create: async (order_id, shipping_address_id, shipping_amount) => {
        const query = `
            INSERT INTO shipping (order_id, shipping_address_id, shipping_amount) 
            VALUES (?, ?, ?)
        `;
        const [result] = await db.execute(query, [order_id, shipping_address_id, shipping_amount]);
        return result;
    },

    getAll: async () => {
        const query = `SELECT * FROM shipping`;
        const [rows] = await db.execute(query);
        return rows;
    },

    getById: async (id) => {
        const query = `SELECT * FROM shipping WHERE id = ?`;
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },

    update: async (id, shipping_amount) => {
        const query = `
            UPDATE shipping 
            SET shipping_amount = ? 
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [shipping_amount, id]);
        return result;
    },

    delete: async (id) => {
        const query = `DELETE FROM shipping WHERE id = ?`;
        const [result] = await db.execute(query, [id]);
        return result;
    }
};

export default Shipping;
