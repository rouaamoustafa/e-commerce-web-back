import db from "../database.js";

// Get all users with role 'user'
export const fetchAllUsers = async () => {
  return await db.execute("SELECT * FROM users WHERE role='user'");
};

// Get user by ID and role 'user'
export const fetchUserById = async (id) => {
  return await db.execute("SELECT * FROM users WHERE id = ? AND role='user'", [id]);
};

// Delete a user by ID
export const removeUserById = async (id) => {
  return await db.execute("DELETE FROM users WHERE id = ?", [id]);
};

// Check if wishlist item exists
export const checkWishlistExists = async (user_id, product_id) => {
  return await db.execute(
    "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?",
    [user_id, product_id]
  );
};

// Add item to wishlist
export const insertWishlistItem = async (user_id, product_id) => {
  return await db.execute(
    "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
    [user_id, product_id]
  );
};

// Get all wishlist items with user and product info
export const fetchAllWishlistItems = async () => {
  return await db.execute(`
    SELECT 
      w.id AS wishlist_id,
      w.user_id,
      u.name AS user_name,
      u.email AS user_email,
      p.id AS product_id,
      p.name AS product_name,
      w.created_at
    FROM wishlist w
    JOIN users u ON w.user_id = u.id
    JOIN products p ON w.product_id = p.id
  `);
};
