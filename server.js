import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './routes/productsRoutes.js';
import authRoute from './routes/authRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js';
import shippingAddressRoutes from './routes/shippingAddressRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
=======
// Use Routes
app.use("/api/auth", authRoute)
app.use("/api/user", usersRoutes)
>>>>>>> 69b934f022f35c4412f14219f5a7e857eb137ecf
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/shipping-address", shippingAddressRoutes);
<<<<<<< HEAD
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order-items", orderItemsRoutes);
app.use("/api/users", usersRoutes);

=======

// Database Sync and Server Start
>>>>>>> 69b934f022f35c4412f14219f5a7e857eb137ecf
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
