import express from 'express';
import { isAdmin, tokenVerification } from '../middleware/authMiddleware.js';
import { createProduct, deleteProduct, getAllProduct, getPhoto, getProduct, updateProduct } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// define routes

// create
router.post('/create-product', tokenVerification, isAdmin, formidable(), createProduct);

// update
router.put('/update-product/:product_id', tokenVerification, isAdmin, formidable(), updateProduct);

// read all
router.get('/get-all-product', getAllProduct);

// read all
router.get('/get-product/:slug', getProduct);

// read photo
router.get('/get-photo/:product_id', getPhoto);

// delete
router.delete('/delete-product/:product_id', tokenVerification, isAdmin, deleteProduct);

export default router;