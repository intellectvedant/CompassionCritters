import express from 'express';
import { userRegister, userLogin, test, userOrders, adminOrders, orderStatus, quantityUpdate, orderSuccessfull, } from '../controllers/authController.js';
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

// order
router.get('/orders', tokenVerification, userOrders)

// Allorders
router.get('/get-all-orders', tokenVerification, isAdmin, adminOrders)

// order status
router.put('/order-status/:order_id', tokenVerification, isAdmin, orderStatus)

// order
router.get('/order-payment-status/:order_id', tokenVerification, orderSuccessfull)

// ordered product deletion
router.put('/update-product-quantity', tokenVerification, quantityUpdate)

export default router;