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
     // get product by id 
    findProductById : async (productId) => {
     const connection = await db.getConnection(); // Get DB connection
      
        try {
          // Query to find the product by ID and join with the images table to get the image URL
          const [product] = await connection.execute(`
            SELECT p.id, p.name, p.category_id, p.price, p.stock_quantity, p.description, i.url as image_url
            FROM products p
            LEFT JOIN images i ON p.id = i.product_id
            WHERE p.id = ?
          `, [productId]);
      
          connection.release();
      
          // If no product is found, throw an error
          if (product.length === 0) {
            throw new Error('Product not found');
          }
      
          return product[0]; // Return the first product (only one product will be found by ID)
        } catch (error) {
          connection.release();
          throw error; // Propagate error
        }
      },
      // get products by category
      getProductsByCategory: async (categoryId) => {
        const connection = await db.getConnection(); // Get DB connection
      
        try {
          // Query to get products by category along with the image URL
          const [products] = await connection.execute(`
            SELECT p.id, p.name, p.category_id, p.price, p.stock_quantity, p.description, i.url as image_url
            FROM products p
            LEFT JOIN images i ON p.id = i.product_id
            WHERE p.category_id = ?
          `, [categoryId]);
      
          connection.release();
      
          // Return the list of products for the given category
          return products;
        } catch (error) {
          connection.release();
          throw error; // Propagate error
        }
      },

     
       // update product by id 
       updateProductById : async (productId, productData, imageBuffer) => {
        const { name, category_id, price, stock_quantity, description } = productData;
        const connection = await db.getConnection(); // Get DB connection
      
        try {
          await connection.beginTransaction(); // Start transaction
      
          // Check if product exists
          const [existingProduct] = await connection.execute(
            `SELECT * FROM products WHERE id = ?`,
            [productId]
          );
      
          if (existingProduct.length === 0) {
            throw new Error("Product not found");
          }
      
          // Update product details
          await connection.execute(
            `UPDATE products SET name = ?, category_id = ?, price = ?, stock_quantity = ?, description = ? WHERE id = ?`,
            [name, category_id, price, stock_quantity, description, productId]
          );
      
          let imageURL = null;
          if (imageBuffer) {
            // Upload new image to ImgBB
            const formData = new FormData();
            formData.append("key", "3c3096ff3705f7eab780c46e5f4f437c"); // Replace with your API key
            formData.append("image", imageBuffer.toString("base64"));
      
            const response = await axios.post("https://api.imgbb.com/1/upload", formData);
            imageURL = response?.data?.data?.url;
      
            if (!imageURL) throw new Error("Image upload failed");
      
            // Update image in database
            await connection.execute(
              `UPDATE images SET url = ? WHERE product_id = ?`,
              [imageURL, productId]
            );
          }
      
          await connection.commit(); // Commit transaction
          connection.release();
      
          return { productId, name, category_id, price, stock_quantity, description, image: imageURL };
        } catch (error) {
          await connection.rollback(); // Rollback transaction on error
          connection.release();
          throw error;
        }
      },

     // delete product by id 
     deleteProductById : async (productId) => {
        const connection = await db.getConnection(); // Get DB connection
      
        try {
          await connection.beginTransaction(); // Start transaction
      
          // First, delete the product image from the images table (optional, depending on whether you want to delete the image as well)
          await connection.execute(
            `DELETE FROM images WHERE product_id = ?`,
            [productId]
          );
      
          // Then, delete the product from the products table
          const [deleteResult] = await connection.execute(
            `DELETE FROM products WHERE id = ?`,
            [productId]
          );
      
          if (deleteResult.affectedRows === 0) {
            throw new Error("Product not found");
          }
      
          await connection.commit(); // Commit the transaction
          connection.release(); // Release the connection
      
          return deleteResult; // Return the result of the delete operation
        } catch (error) {
          await connection.rollback(); // Rollback transaction on error
          connection.release();
      
          console.error("Error during product deletion:", error); // Log the error for debugging
      
          throw error; // Throw the error to be handled in the controller
        }
      }
};

export default products;