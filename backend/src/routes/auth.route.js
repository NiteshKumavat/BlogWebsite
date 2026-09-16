import express from "express";

import {register, login, logout, checkAuth, deleteAccount} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


// Public routes
router.post("/register", register);
router.post("/login", login);


// Protected routes
router.post("/logout", protectRoute, logout);
router.get("/check-auth", protectRoute, checkAuth);
router.delete("/delete", protectRoute, deleteAccount);


export default router;

