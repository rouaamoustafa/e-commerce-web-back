import express from 'express';
import { getAllUsers, getUserById, deleteUserById, addToWishlist } from '../controllers/usersController.js'; 
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/allusers',  isAdmin, verifyToken,getAllUsers);//done1done
router.get('/user/:id', isAdmin, verifyToken,getUserById);//donedone
router.delete('/deleteuser/:id', isAdmin, verifyToken, deleteUserById);//donedone
router.post("/addProductToWhishlist", verifyToken, addToWishlist);

export default router;
