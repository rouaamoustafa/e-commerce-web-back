import express from 'express';
const router = express.Router();
const {getAllUsers,getUserById,deleteUserById,createUser}=require('../controllers/usersController'); 

router.get('/allusers', getAllUsers);
router.get('/user/:id',getUserById);
router.post('/adduser',createUser);
router.delete('/deleteuser/:id',deleteUserById);

export default router;