import db from '../database.js';

export const insertOrder = async (user_id, total_amount, status) => {
  return await db.execute(
    "INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (?, NOW(), ?, ?)",
    [user_id, total_amount, status || 'PENDING']
  );
};

export const fetchAllOrders = async () => {
  return await db.execute(
    `SELECT o.*, u.name AS user_name 
     FROM orders o 
     JOIN users u ON o.user_id = u.id`
  );
};

export const fetchOrderById = async (id) => {
  return await db.execute("SELECT * FROM orders WHERE id = ?", [id]);
};

export const updateOrderStatusById = async (status, id) => {
  return await db.execute("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
};

export const updateOrderById = async (user_id, order_date, total_amount, status, id) => {
  return await db.execute(
    "UPDATE orders SET user_id = ?, order_date = ?, total_amount = ?, status = ? WHERE id = ?",
    [user_id, order_date, total_amount, status, id]
  );
};

export const deleteOrderById = async (id) => {
  return await db.execute("DELETE FROM orders WHERE id = ?", [id]);
};
