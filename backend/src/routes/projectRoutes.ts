import express from "express";
import * as projectController from "../controllers/projectController";

const router = express.Router();

// Get all projects
router.get("/", projectController.getAllProjects);

// Get project by ID
router.get("/:id", projectController.getProjectById);

// Get projects by owner
router.get("/user/:userId", projectController.getProjectsByOwner);

// Create new project
router.post("/", projectController.createProject);

// Update project
router.patch("/:id", projectController.updateProject);

// Delete project
router.delete("/:id", projectController.deleteProject);

// Project members
router.get("/:id/members", projectController.getProjectMembers);
router.post("/:id/members", projectController.addProjectMember);
router.delete("/:id/members/:memberId", projectController.removeProjectMember);

// Project tasks
router.get("/:id/tasks", projectController.getProjectTasks);
router.post("/:id/tasks", projectController.createProjectTask);
router.patch("/:id/tasks/:taskId", projectController.updateProjectTask);
router.delete("/:id/tasks/:taskId", projectController.deleteProjectTask);

// Project milestones
router.get("/:id/milestones", projectController.getProjectMilestones);
router.post("/:id/milestones", projectController.createProjectMilestone);
router.patch(
  "/:id/milestones/:milestoneId",
  projectController.updateProjectMilestone
);
router.delete(
  "/:id/milestones/:milestoneId",
  projectController.deleteProjectMilestone
);

export default router;
