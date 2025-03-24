import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './routes/productsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js';
import shippingAddressRoutes from './routes/shippingAddressRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import orderItemsRoutes from './routes/orderItemsRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/shipping-address", shippingAddressRoutes);
app.use("/api/order-items", orderItemsRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
