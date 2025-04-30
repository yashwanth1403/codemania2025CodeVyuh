import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";
import projectRoutes from "./routes/projectRoutes";
import challengeRoutes from "./routes/challengeRoutes";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Initialize Prisma client
export const prisma = new PrismaClient();

// Middleware
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN || "http://localhost:5173",
      "http://localhost:8080",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/challenges", challengeRoutes);

// Base route for API health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "CollabSpark API is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});
