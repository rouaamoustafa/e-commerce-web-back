import { loginUser, signupUser } from "../controllers/authController";
const router = express.Router();

router.post('/signup', signupUser);//done
router.post("/login", loginUser);//done

export default router;
