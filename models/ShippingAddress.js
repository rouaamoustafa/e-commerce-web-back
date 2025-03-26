import db from '../database.js';

const ShippingAddress = {
  async createShippingAddress(city, building, floor, street, user_id) {
    const sql = `INSERT INTO shipping_address (city, building, floor, street, user_id) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [city, building, floor, street, user_id]);
    return result;
  },

  async getAllShippingAddresses() {
    const sql = `SELECT * FROM shipping_address`;
    const [rows] = await db.execute(sql);
    return rows;
  },

  async getShippingAddressById(id) {
    const sql = `SELECT * FROM shipping_address WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  },

  async updateShippingAddress(id, city, building, floor, street, user_id) {
    const sql = `UPDATE shipping_address SET city = ?, building = ?, floor = ?, street = ?, user_id = ? WHERE id = ?`;
    const [result] = await db.execute(sql, [city, building, floor, street, user_id, id]);
    return result;
  },

  async deleteShippingAddress(id) {
    const sql = `DELETE FROM shipping_address WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result;
  }
};

export default ShippingAddress;
