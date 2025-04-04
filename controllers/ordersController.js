import {
  insertOrder,
  fetchAllOrders,
  fetchOrderById,
  updateOrderStatusById,
  updateOrderById,
  deleteOrderById
} from '../models/Orders.js';

export const createOrder = async (req, res) => {
    try {
        const { user_id, total_amount, status } = req.body;
        if (!user_id || !total_amount) {
            return res.status(400).json({ error: "User ID and Total Amount are required" });
        }

        const [result] = await db.query(
            "INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (?, NOW(), ?, ?)",
            [user_id, total_amount, status || 'IN_PROGRESS']
        );

        res.status(201).json({ message: "Order created successfully", orderId: result.insertId });
    } catch (error) {
        console.error(" Error creating order:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
  try {
    const [orders] = await fetchAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const [order] = await fetchOrderById(id);

    if (order.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order[0]);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await updateOrderStatusById(status, id);
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, order_date, total_amount, status } = req.body;

    if (!user_id || !order_date || !total_amount || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await updateOrderById(user_id, order_date, total_amount, status, id);
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteOrderById(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error.message);
    res.status(500).json({ error: error.message });
  }
};
