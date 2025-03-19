import express from 'express';
import { getAllUsers, getUserById, deleteUserById, createUser,loginUser } from '../controllers/usersController.js'; 

const router = express.Router();

router.get('/allusers', getAllUsers);//done
router.get('/user/:id', getUserById);//done
router.post('/adduser', createUser);//done
router.delete('/deleteuser/:id', deleteUserById);//done
router.post("/login", loginUser);//done

export default router;
