import express from 'express';
import { userRegister, userLogin } from '../controllers/authController.js';

const router = express.Router();

// define routes

router.post('/register', userRegister);
router.post('/login', userLogin);

export default router;