import express from 'express';
import { userRegister, userLogin, test, } from '../controllers/authController.js';
import { isAdmin, tokenVerification } from '../middleware/authMiddleware.js';

const router = express.Router();

// define routes

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/test', tokenVerification, isAdmin, test);

export default router;