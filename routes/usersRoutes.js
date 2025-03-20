import express from 'express';
import { getAllUsers, getUserById, deleteUserById, createUser,loginUser } from '../controllers/usersController.js'; 
import { isAdmin,verifyToken } from '../controllers/authController.js';
const router = express.Router();

router.get('/allusers',  isAdmin,verifyToken,getAllUsers);//done1done
router.get('/user/:id', isAdmin,verifyToken,getUserById);//donedone
router.post('/adduser', createUser);//done
router.delete('/deleteuser/:id', isAdmin,verifyToken, deleteUserById);//donedone
router.post("/login", loginUser);//done

export default router;
