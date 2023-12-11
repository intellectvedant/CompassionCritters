import express from 'express';
import { isAdmin, tokenVerification } from '../middleware/authMiddleware.js';
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();


// define routes

// create
router.post('/create-category', tokenVerification, isAdmin, createCategory);

// update
router.put('/update-category/:id', tokenVerification, isAdmin, updateCategory);

// read all
router.get('/get-all-category', getAllCategory);

// read all
router.get('/get-category/:slug', getCategory);

// delete
router.delete('/delete-category/:id', tokenVerification, isAdmin, deleteCategory);




export default router;