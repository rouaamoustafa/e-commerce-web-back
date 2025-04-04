import express from 'express';
import { getAllUsers, getUserById, deleteUserById, addToWishlist ,getAllWishlist } from '../controllers/usersController.js'; 
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/allusers', verifyToken, isAdmin, getAllUsers);
router.get('/user/:id', verifyToken, isAdmin, getUserById);
router.delete('/deleteuser/:id', verifyToken, isAdmin, deleteUserById);
router.post("/addProductToWhishlist", verifyToken, addToWishlist);
router.get("/getAllWishlist", verifyToken, getAllWishlist);

export default router;
