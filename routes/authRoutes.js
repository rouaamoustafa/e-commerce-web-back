import express from 'express';
import { loginUser, signupUser } from "../controllers/authController.js";
import { loginUser, signupUser} from "../controllers/authController.js";

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

export default router;
