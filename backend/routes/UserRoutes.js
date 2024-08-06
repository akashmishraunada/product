import express from "express";
import {
  adminRegister,
  changePassword,
  deleteMyProfile,
  getMyProfile,
  login,
  logout,
  register,
  updateProfile,
  updateprofilepicture,
} from "../controllers/UserController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// To register a new user
router.route("/user-register").post(register);

// Login
router.route("/user-login").post(login);

// logout
router.route("/user-logout").get(logout);

// Get my profile
router.route("/user-me").get(isAuthenticated, getMyProfile);

// Delete my profile
router.route("/user-me").delete(isAuthenticated, deleteMyProfile);

// ChangePassword
router.route("/user-changepassword").put(isAuthenticated, changePassword);

// UpdateProfile
router.route("/user-updateprofile").put(isAuthenticated, updateProfile);

// UpdateProfilePicture
router
  .route("/user-updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateprofilepicture);


// admin routes
// To add a new admin
router.route("/admin-register").post(singleUpload, adminRegister);


export default router;
