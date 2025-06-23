import express from "express";
import { editProfile, getOtherUsers, getProfile, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register route
router.post("/register", register);
// login route
router.post("/login", login);
// logout route
router.post('/logout', isAuthenticated, logout);
// get user profile
router.get("/profile", isAuthenticated, getProfile);
// update user profile
router.put("/profile/edit-profile", isAuthenticated, editProfile);
// get other users
router.get("/other-users", isAuthenticated, getOtherUsers)

export default router;
