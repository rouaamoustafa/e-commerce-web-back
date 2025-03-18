import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Import Routes
import wishlistRoutes from './routes/wishlistRoutes.js';

import usersRoutes from './routes/usersRoutes.js';


// Initialize App
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use Routes

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/users", usersRoutes);


// Database Sync and Server Start
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});