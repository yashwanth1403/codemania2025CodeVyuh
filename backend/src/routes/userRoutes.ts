import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Get user by Clerk ID
router.get("/clerk/:clerkId", userController.getUserByClerkId);

// Create new user
router.post("/", userController.createUser);

// Update user
router.patch("/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

export default router;
