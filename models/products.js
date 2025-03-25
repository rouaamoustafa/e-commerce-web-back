import db from '../database.js';
import axios from "axios";
import FormData from "form-data";

const products = {
    
     //add product with the image 
    addProduct: async (productData, imageBuffer) => {
        const { name, category_id, price, stock_quantity, description } = productData;
    
        const connection = await db.getConnection(); // Get DB connection
    
        try {
          await connection.beginTransaction(); // Start transaction
    
          // Insert product into the database
          const [productResult] = await connection.execute(
            `INSERT INTO products (name, category_id, price, stock_quantity, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
            [name, category_id, price, stock_quantity, description]
          );
          const productId = productResult.insertId;
    
          // Upload image to ImgBB
          const formData = new FormData();
          formData.append("key", "fc45b9bc491df49d8c66b1f010c647ae"); // Replace with your API key
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
    
          return { productId, name, category_id, price, stock_quantity, description, image: imageURL };
        } catch (error) {
          await connection.rollback(); // Rollback transaction on error
          connection.release();
          throw error;
        }
      },
    

    create: async (data) => {
        const sql = `INSERT INTO products (name, description, image, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await db.execute(sql, [data.name, data.description, data.image, data.price, data.stock_quantity, data.category_id]);
        return result;
    },

    findById: async (id) => {
        const sql = `SELECT * FROM products WHERE id = ?`;
        const [rows] = await db.execute(sql, [id]);
        return rows[0]; 
    },

    findAll: async () => {
        const sql = `SELECT * FROM products`;
        const [rows] = await db.execute(sql);
        return rows;
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