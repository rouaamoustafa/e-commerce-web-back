import {
    insertOrderItem,
    fetchAllOrderItems,
    fetchOrderItemById,
    fetchOrderItemsByOrderId,
    updateOrderItemById,
    deleteOrderItemById
  } from '../models/OrderItems.js';
  
  export const createOrderItem = async (req, res) => {
    try {
      const { order_id, product_id, quantity } = req.body;
      if (!order_id || !product_id || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const [result] = await insertOrderItem(order_id, product_id, quantity);
      res.status(201).json({ message: "Order item created successfully", itemId: result.insertId });
    } catch (error) {
      console.error("Error creating order item:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getAllOrderItems = async (req, res) => {
    try {
      const [items] = await fetchAllOrderItems();
      res.status(200).json(items);
    } catch (error) {
      console.error("Error fetching order items:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getOrderItemById = async (req, res) => {
    try {
      const { id } = req.params;
      const [item] = await fetchOrderItemById(id);
  
      if (item.length === 0) {
        return res.status(404).json({ message: "Order item not found" });
      }
  
      res.status(200).json(item[0]);
    } catch (error) {
      console.error("Error fetching order item:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getOrderItemsByOrderId = async (req, res) => {
    try {
      const { orderId } = req.params;
      const [items] = await fetchOrderItemsByOrderId(orderId);
      res.status(200).json(items);
    } catch (error) {
      console.error("Error fetching order items by order ID:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const updateOrderItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { order_id, product_id, quantity } = req.body;
  
      const [result] = await updateOrderItemById(order_id, product_id, quantity, id);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order item not found" });
      }
  
      res.status(200).json({ message: "Order item updated successfully" });
    } catch (error) {
      console.error("Error updating order item:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deleteOrderItem = async (req, res) => {
    try {
      const { id } = req.params;
  
      const [result] = await deleteOrderItemById(id);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order item not found" });
      }
  
      res.status(200).json({ message: "Order item deleted successfully" });
    } catch (error) {
      console.error("Error deleting order item:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  