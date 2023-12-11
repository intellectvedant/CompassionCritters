import express from 'express';
import { userRegister, userLogin, test, } from '../controllers/authController.js';
import { isAdmin, tokenVerification } from '../middleware/authMiddleware.js';

const router = express.Router();

// define routes

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/test', tokenVerification, isAdmin, test);


// protected routes
router.get('/user-auth', tokenVerification, (req,res)=>{
    res.status(200).json({ok: true})
})

// ADMIN SPECIAL protected routes
router.get('/admin-auth', tokenVerification,isAdmin,(req,res)=>{
    res.status(200).json({ok: true})
})

export default router;