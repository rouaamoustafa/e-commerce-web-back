import db from '../database.js';
import axios from "axios";
import FormData from "form-data";

const products = {

     //add product with the image 
    addProduct: async (productData, imageBuffer) => {
        const { name, category_id, price, stock_quantity, description } = productData;
        const safeStockQuantity = stock_quantity || 0;
        const safeprice = price || 0;
        const safeCategoryId = category_id || 1;
        const connection = await db.getConnection(); // Get DB connection
    
        try {
          await connection.beginTransaction(); // Start transaction
    
          // Insert product into the database
          const [productResult] = await connection.execute(
            `INSERT INTO products (name, category_id, price, stock_quantity, description) VALUES (?, ?, ?, ?, ?)`,
            [name, safeCategoryId, safeprice, safeStockQuantity, description]
          );
          const productId = productResult.insertId;
    
          // Upload image to ImgBB
          const formData = new FormData();
          formData.append("key", "3c3096ff3705f7eab780c46e5f4f437c"); // Replace with your API key
          formData.append("image", imageBuffer.toString("base64"));
    
          const response = await axios.post("https://api.imgbb.com/1/upload", formData);
          const imageURL = response?.data?.data?.url;
    
          if (!imageURL) throw new Error("Image upload failed");
    
          // Insert image into images table
          await connection.execute(
            `INSERT INTO images (url, created_at, product_id) VALUES (?, NOW(), ?)`,
            [imageURL, productId]
          );
    
          await connection.commit(); // Commit transaction
          connection.release();
    
          return { productId, name, quantity: safeStockQuantity, price: safeprice, stock_quantity, description, image: imageURL };
        } catch (error) {
          await connection.rollback(); // Rollback transaction on error
          connection.release();
          throw error;
        }
      },
    
     // get all products with image 
    getAllProducts : async () => {
        const connection = await db.getConnection(); // Get DB connection
      
        try {
          // Query to get all products along with the image URL
          const [products] = await connection.execute(`
            SELECT p.id, p.name, p.category_id, p.price, p.stock_quantity, p.description, i.url as image_url
            FROM products p
            LEFT JOIN images i ON p.id = i.product_id
          `);
      
          connection.release();
      
          // Return the list of products with image URL
          return products;
        } catch (error) {
          connection.release();
          throw error; // Propagate error
        }
      },
      
    findById: async (id) => {
        const sql = `SELECT * FROM products WHERE id = ?`;
        const [rows] = await db.execute(sql, [id]);
        return rows[0]; 
    },

    findByCategory: async (categoryId) => {
        const sql = `SELECT * FROM products WHERE category_id = ?`;
        const [rows] = await db.execute(sql, [categoryId]);
        return rows;
    },

    update: async (id, data) => {
        const sql = `UPDATE products SET name = ?, description = ?, image = ?, price = ?, stock_quantity = ?, category_id = ? WHERE id = ?`;
        const [result] = await db.execute(sql, [data.name, data.description, data.image, data.price, data.stock_quantity, data.category_id, id]);
        return result;
    },

    delete: async (id) => {
        const sql = `DELETE FROM products WHERE id = ?`;
        const [result] = await db.execute(sql, [id]);
        return result;
    }
};

export default products;