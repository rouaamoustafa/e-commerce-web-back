import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Import Routes
import productsRoutes from './routes/productsRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js';
import shippingAddressRoutes from './routes/shippingAddressRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import orderItemsRoutes from './routes/orderItemsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import imagesRoutes from './routes/imagesRoutes.js'; 

// Initialize App
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/shipping-address", shippingAddressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order-items", orderItemsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/images", imagesRoutes);

// Database Sync and Server Start
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
