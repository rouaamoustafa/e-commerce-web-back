import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import db from './database.js';

// Import Routes
import productsRoutes from './routes/productsRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js';
import shippingAdressRoutes from './routes/shippingAdressRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import orderItemsRoutes from './routes/orderItemsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
// Use Routes
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/shipping-adress", shippingAdressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order-items", orderItemsRoutes);
app.use("/api/users", usersRoutes);

// Database Sync and Server Start
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Server is running');
});
db.getConnection()
  .then(() => {
      console.log(" Database connected!");
  })
  .catch((error) => {
      console.error(" Database connection failed:", error.message);
  });
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});