import express from 'express';
import { getAllUsers, getUserById, deleteUserById, createUser } from '../controllers/usersController.js'; 

const router = express.Router();

router.get('/allusers', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/adduser', createUser);
router.delete('/deleteuser/:id', deleteUserById);

export default router;
