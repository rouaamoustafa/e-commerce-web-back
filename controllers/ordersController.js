import db from '../database.js';

//  Create a New Order
export const createOrder = async (req, res) => {
    try {
        const { user_id, total_amount, status } = req.body;
        if (!user_id || !total_amount) {
            return res.status(400).json({ error: "User ID and Total Amount are required" });
        }

        const [result] = await db.query(
            "INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (?, NOW(), ?, ?)",
            [user_id, total_amount, status || 'PENDING']
        );

        res.status(201).json({ message: "Order created successfully", orderId: result.insertId });
    } catch (error) {
        console.error(" Error creating order:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//  Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const [orders] = await db.query("SELECT * FROM orders");
        res.status(200).json(orders);
    } catch (error) {
        console.error(" Error fetching orders:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//  Get Order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const [order] = await db.query("SELECT * FROM orders WHERE id = ?", [id]);

        if (order.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order[0]);
    } catch (error) {
        console.error(" Error fetching order:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//  Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        console.error(" Error updating order status:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update Order (all fields)
export const updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id, order_date, total_amount, status } = req.body;
  
      // Validate required fields
      if (!user_id || !order_date || !total_amount || !status) {
        return res.status(400).json({ error: "All fields (user_id, order_date, total_amount, status) are required" });
      }
  
      await db.query(
        "UPDATE orders SET user_id = ?, order_date = ?, total_amount = ?, status = ? WHERE id = ?",
        [user_id, order_date, total_amount, status, id]
      );
  
      res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      console.error("Error updating order:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  
//  Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query("DELETE FROM orders WHERE id = ?", [id]);

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(" Error deleting order:", error.message);
        res.status(500).json({ error: error.message });
    }
};
