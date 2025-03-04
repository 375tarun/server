import express from "express";
import { signup, login, logout,getUserDetail } from "../controllers/adminAuthController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes (No authentication required)
router.post("/signup", signup);
router.post("/login", login);

// Protected Route (Only logged-in users can log out)
router.post("/logout", requireAuth, logout);

// user profile route
router.get('/profile', requireAuth, getUserDetail);

export default router;
