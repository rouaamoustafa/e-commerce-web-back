import {
    fetchAllUsers,
    fetchUserById,
    removeUserById,
    checkWishlistExists,
    insertWishlistItem,
    fetchAllWishlistItems
  } from "../models/User.js";
  
  // Get all users
  export const getAllUsers = async (req, res) => {
    try {
      const [users] = await fetchAllUsers();
      res.status(200).json({
        data: users,
        message: "Users retrieved successfully",
        error: null
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error retrieving users",
        error: error.message
      });
    }
  };
  
  // Get user by ID
  export const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const [users] = await fetchUserById(id);
  
      if (users.length === 0) {
        return res.status(404).json({
          data: null,
          message: "User not found",
          error: null
        });
      }
  
      res.status(200).json({
        data: users[0],
        message: "User retrieved successfully",
        error: null
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error retrieving user",
        error: error.message
      });
    }
  };
  
  // Delete user
  export const deleteUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await removeUserById(id);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          data: null,
          message: "User not found",
          error: null
        });
      }
  
      res.status(200).json({
        data: null,
        message: "User deleted successfully",
        error: null
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error deleting user",
        error: error.message
      });
    }
  };
  
  // Add to wishlist
  export const addToWishlist = async (req, res) => {
    const { user_id, product_id } = req.body;
  
    if (!user_id || !product_id) {
      return res.status(400).json({
        data: null,
        message: "User ID and Product ID are required",
        error: null
      });
    }
  
    try {
      const [existing] = await checkWishlistExists(user_id, product_id);
  
      if (existing.length > 0) {
        return res.status(400).json({
          data: null,
          message: "Product is already in the wishlist",
          error: null
        });
      }
  
      const [result] = await insertWishlistItem(user_id, product_id);
      res.status(201).json({
        data: { wishlist_id: result.insertId },
        message: "Product added to wishlist successfully",
        error: null
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error adding product to wishlist",
        error: error.message
      });
    }
  };
  
  // Get all wishlist items
  export const getAllWishlist = async (req, res) => {
    try {
      const [rows] = await fetchAllWishlistItems();
      res.status(200).json({
        data: rows,
        message: "Wishlist items retrieved successfully",
        error: null
      });
    } catch (error) {
      console.error("Error in getAllWishlist:", error);
      res.status(500).json({
        data: null,
        message: "Error fetching wishlist data",
        error: error.message
      });
    }

