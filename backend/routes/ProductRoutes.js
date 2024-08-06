import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { multipleUpload, singleUpload } from "../middlewares/multer.js";
import { addToCart, createProduct, deleteALLCartItems, deleteCartItem, getAllCartItem, getAllProducts, updateCartItem } from "../controllers/ProductController.js";

const router = express.Router();

// To create a product new user
router.route("/create-product").post(isAuthenticated, authorizeAdmin, multipleUpload, createProduct);
router.route("/all-products").get(getAllProducts);
router.route("/add-to-cart").post(isAuthenticated, addToCart);
router.route("/update-cart-item").put(isAuthenticated, updateCartItem);
router.route("/delete-cart-item/:id").delete(isAuthenticated, deleteCartItem);
router.route("/delete-allcart-item").delete(isAuthenticated, deleteALLCartItems);
router.route("/get-cart-item").get(isAuthenticated, getAllCartItem);

export default router;
