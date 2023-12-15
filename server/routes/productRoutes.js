import express from "express";
import { isAdmin, tokenVerification } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getPhoto,
  getProduct,
  updateProduct,
  filterProduct,
  countProduct,
  listProduct,
  searchProduct,
  relatedProduct,
  categoryProduct,
  orderPayment,
  orderToken,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// define routes

// create
router.post(
  "/create-product",
  tokenVerification,
  isAdmin,
  formidable(),
  createProduct
);

// update
router.put(
  "/update-product/:product_id",
  tokenVerification,
  isAdmin,
  formidable(),
  updateProduct
);

// read all
router.get("/get-all-product", getAllProduct);

// read all
router.get("/get-product/:slug", getProduct);

// read photo
router.get("/get-photo/:product_id", getPhoto);

// delete
router.delete(
  "/delete-product/:product_id",
  tokenVerification,
  isAdmin,
  deleteProduct
);

// filter
router.post("/filter-product", filterProduct);

// count
router.get("/count-product", countProduct);

// page
router.get("/list-product/:page", listProduct);

// search
router.get("/search-product/:keyword", searchProduct);

// similar
router.get("/related-product/:product_id/:category_id", relatedProduct);

// category wise
router.get("/category-product/:slug", categoryProduct);

// Payment Routes

// token
router.get("/order/token", orderToken);

// payment
router.post("/order/payment", tokenVerification, orderPayment);

export default router;
