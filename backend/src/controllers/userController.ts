import { Request, Response } from "express";
import { prisma } from "../index";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatarUrl: true,
        experienceLevel: true,
        xpPoints: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (error) {
    console.error("Error getting users:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get users",
    });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        skills: true,
        interests: true,
        socialLinks: true,
        badges: {
          include: {
            badge: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.error("Error getting user:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get user",
    });
  }
};

// Get user by Clerk ID
export const getUserByClerkId = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        skills: true,
        interests: true,
        socialLinks: true,
        badges: {
          include: {
            badge: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.error("Error getting user by Clerk ID:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get user",
    });
  }
};

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { clerkId, email, username, name, bio, avatarUrl, experienceLevel } =
      req.body;

    // Check if user already exists with the same clerk ID
    const existingUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists with this Clerk ID",
      });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email,
        username,
        name,
        bio,
        avatarUrl,
        experienceLevel,
      },
    });

    return res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create user",
    });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Ensure the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete user",
    });
  }
};
