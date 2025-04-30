import { Request, Response } from "express";
import { prisma } from "../index";

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        requiredSkills: true,
      },
    });

    return res.status(200).json({
      status: "success",
      results: projects.length,
      data: { projects },
    });
  } catch (error) {
    console.error("Error getting projects:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get projects",
    });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
        requiredSkills: true,
        milestones: {
          include: {
            tasks: true,
          },
        },
        tasks: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { project },
    });
  } catch (error) {
    console.error("Error getting project:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get project",
    });
  }
};

// Get projects by owner
export const getProjectsByOwner = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        requiredSkills: true,
      },
    });

    return res.status(200).json({
      status: "success",
      results: projects.length,
      data: { projects },
    });
  } catch (error) {
    console.error("Error getting user projects:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get user projects",
    });
  }
};

// Create new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      ownerId,
      thumbnailUrl,
      deadline,
      requiredSkills,
      challengeId,
    } = req.body;

    // Create the project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        thumbnailUrl,
        deadline: deadline ? new Date(deadline) : undefined,
        owner: {
          connect: { id: ownerId },
        },
        challenge: challengeId
          ? {
              connect: { id: challengeId },
            }
          : undefined,
      },
    });

    // Add required skills if provided
    if (requiredSkills && requiredSkills.length > 0) {
      // Process each skill
      for (const skillData of requiredSkills) {
        // Check if skill already exists
        let skill = await prisma.skill.findUnique({
          where: { name: skillData.name },
        });

        // If skill doesn't exist, create it
        if (!skill) {
          skill = await prisma.skill.create({
            data: {
              name: skillData.name,
              category: skillData.category,
            },
          });
        }

        // Connect skill to project
        await prisma.project.update({
          where: { id: project.id },
          data: {
            requiredSkills: {
              connect: { id: skill.id },
            },
          },
        });
      }
    }

    // Get the complete project with relationships
    const completeProject = await prisma.project.findUnique({
      where: { id: project.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        requiredSkills: true,
      },
    });

    return res.status(201).json({
      status: "success",
      data: { project: completeProject },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create project",
    });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert deadline to Date object if provided
    if (updateData.deadline) {
      updateData.deadline = new Date(updateData.deadline);
    }

    // Remove fields that should be handled separately
    const { requiredSkills, ...dataToUpdate } = updateData;

    // Ensure the project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id },
      data: dataToUpdate,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        requiredSkills: true,
      },
    });

    // Update required skills if provided
    if (requiredSkills && requiredSkills.length > 0) {
      // First disconnect all existing skills
      await prisma.project.update({
        where: { id },
        data: {
          requiredSkills: {
            set: [],
          },
        },
      });

      // Process each skill
      for (const skillData of requiredSkills) {
        // Check if skill already exists
        let skill = await prisma.skill.findUnique({
          where: { name: skillData.name },
        });

        // If skill doesn't exist, create it
        if (!skill) {
          skill = await prisma.skill.create({
            data: {
              name: skillData.name,
              category: skillData.category,
            },
          });
        }

        // Connect skill to project
        await prisma.project.update({
          where: { id },
          data: {
            requiredSkills: {
              connect: { id: skill.id },
            },
          },
        });
      }
    }

    // Get the updated project with the new skills
    const completeProject = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        requiredSkills: true,
      },
    });

    return res.status(200).json({
      status: "success",
      data: { project: completeProject },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update project",
    });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Ensure the project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Delete the project
    await prisma.project.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete project",
    });
  }
};

// Project members
export const getProjectMembers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
                skills: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { members: project.members },
    });
  } catch (error) {
    console.error("Error getting project members:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get project members",
    });
  }
};

export const addProjectMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        status: "error",
        message: "User ID and role are required",
      });
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if member already exists
    const existingMember = await prisma.projectMember.findFirst({
      where: {
        projectId: id,
        userId,
      },
    });

    if (existingMember) {
      return res.status(400).json({
        status: "error",
        message: "User is already a member of this project",
      });
    }

    // Add member to project
    const projectMember = await prisma.projectMember.create({
      data: {
        role,
        project: {
          connect: { id },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return res.status(201).json({
      status: "success",
      data: { member: projectMember },
    });
  } catch (error) {
    console.error("Error adding project member:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to add project member",
    });
  }
};

export const removeProjectMember = async (req: Request, res: Response) => {
  try {
    const { id, memberId } = req.params;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Check if member exists
    const member = await prisma.projectMember.findFirst({
      where: {
        id: memberId,
        projectId: id,
      },
    });

    if (!member) {
      return res.status(404).json({
        status: "error",
        message: "Project member not found",
      });
    }

    // Remove member from project
    await prisma.projectMember.delete({
      where: { id: memberId },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error removing project member:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to remove project member",
    });
  }
};

// Project tasks
export const getProjectTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { tasks: project.tasks },
    });
  } catch (error) {
    console.error("Error getting project tasks:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get project tasks",
    });
  }
};

export const createProjectTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate, milestoneId } = req.body;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // If milestone is provided, check if it exists
    if (milestoneId) {
      const milestone = await prisma.milestone.findFirst({
        where: {
          id: milestoneId,
          projectId: id,
        },
      });

      if (!milestone) {
        return res.status(404).json({
          status: "error",
          message: "Milestone not found",
        });
      }
    }

    // Create task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        dueDate: dueDate ? new Date(dueDate) : undefined,
        project: {
          connect: { id },
        },
        milestone: milestoneId
          ? {
              connect: { id: milestoneId },
            }
          : undefined,
      },
    });

    return res.status(201).json({
      status: "success",
      data: { task },
    });
  } catch (error) {
    console.error("Error creating project task:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create project task",
    });
  }
};

export const updateProjectTask = async (req: Request, res: Response) => {
  try {
    const { id, taskId } = req.params;
    const updateData = req.body;

    // If dueDate is provided, convert to Date object
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Check if task exists
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        projectId: id,
      },
    });

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    // Update task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return res.status(200).json({
      status: "success",
      data: { task: updatedTask },
    });
  } catch (error) {
    console.error("Error updating project task:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update project task",
    });
  }
};

export const deleteProjectTask = async (req: Request, res: Response) => {
  try {
    const { id, taskId } = req.params;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Check if task exists
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        projectId: id,
      },
    });

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    // Delete task
    await prisma.task.delete({
      where: { id: taskId },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting project task:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete project task",
    });
  }
};

// Project milestones
export const getProjectMilestones = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        milestones: {
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { milestones: project.milestones },
    });
  } catch (error) {
    console.error("Error getting project milestones:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get project milestones",
    });
  }
};

export const createProjectMilestone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Create milestone
    const milestone = await prisma.milestone.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        project: {
          connect: { id },
        },
      },
    });

    return res.status(201).json({
      status: "success",
      data: { milestone },
    });
  } catch (error) {
    console.error("Error creating project milestone:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create project milestone",
    });
  }
};

export const updateProjectMilestone = async (req: Request, res: Response) => {
  try {
    const { id, milestoneId } = req.params;
    const updateData = req.body;

    // If dueDate is provided, convert to Date object
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Check if milestone exists
    const milestone = await prisma.milestone.findFirst({
      where: {
        id: milestoneId,
        projectId: id,
      },
    });

    if (!milestone) {
      return res.status(404).json({
        status: "error",
        message: "Milestone not found",
      });
    }

    // Update milestone
    const updatedMilestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: updateData,
    });

    return res.status(200).json({
      status: "success",
      data: { milestone: updatedMilestone },
    });
  } catch (error) {
    console.error("Error updating project milestone:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update project milestone",
    });
  }
};

export const deleteProjectMilestone = async (req: Request, res: Response) => {
  try {
    const { id, milestoneId } = req.params;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Check if milestone exists
    const milestone = await prisma.milestone.findFirst({
      where: {
        id: milestoneId,
        projectId: id,
      },
    });

    if (!milestone) {
      return res.status(404).json({
        status: "error",
        message: "Milestone not found",
      });
    }

    // Delete milestone
    await prisma.milestone.delete({
      where: { id: milestoneId },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting project milestone:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete project milestone",
    });
  }
};
