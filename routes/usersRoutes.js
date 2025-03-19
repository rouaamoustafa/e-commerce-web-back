import express from 'express';
import { getAllUsers, getUserById, deleteUserById, createUser } from '../controllers/usersController.js'; 

const router = express.Router();

router.get('/allusers', getAllUsers);//done
router.get('/user/:id', getUserById);//done
router.post('/adduser', createUser);//done
router.delete('/deleteuser/:id', deleteUserById);//done

export default router;
