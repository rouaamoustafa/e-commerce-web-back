import db from '../database.js';

export const insertOrderItem = async (order_id, product_id, quantity) => {
  return await db.execute(
    "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
    [order_id, product_id, quantity]
  );
};

export const fetchAllOrderItems = async () => {
  return await db.execute("SELECT * FROM order_items");
};

export const fetchOrderItemById = async (id) => {
  return await db.execute("SELECT * FROM order_items WHERE id = ?", [id]);
};

export const fetchOrderItemsByOrderId = async (orderId) => {
  return await db.execute(
    `SELECT oi.*, p.name AS product_name
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderId]
  );
};

export const updateOrderItemById = async (order_id, product_id, quantity, id) => {
  return await db.execute(
    "UPDATE order_items SET order_id = ?, product_id = ?, quantity = ? WHERE id = ?",
    [order_id, product_id, quantity, id]
  );
};

export const deleteOrderItemById = async (id) => {
  return await db.execute("DELETE FROM order_items WHERE id = ?", [id]);
};
