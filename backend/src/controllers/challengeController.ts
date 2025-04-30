import { Request, Response } from "express";
import { prisma } from "../index";

// Get all challenges
export const getAllChallenges = async (req: Request, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany({
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            projects: true,
            participants: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      results: challenges.length,
      data: { challenges },
    });
  } catch (error) {
    console.error("Error getting challenges:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get challenges",
    });
  }
};

// Get active challenges
export const getActiveChallenges = async (req: Request, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            projects: true,
            participants: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      results: challenges.length,
      data: { challenges },
    });
  } catch (error) {
    console.error("Error getting active challenges:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get active challenges",
    });
  }
};

// Get upcoming challenges
export const getUpcomingChallenges = async (req: Request, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        status: "UPCOMING",
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            projects: true,
            participants: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      results: challenges.length,
      data: { challenges },
    });
  } catch (error) {
    console.error("Error getting upcoming challenges:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get upcoming challenges",
    });
  }
};

// Get completed challenges
export const getCompletedChallenges = async (req: Request, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        status: "COMPLETED",
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            projects: true,
            participants: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      results: challenges.length,
      data: { challenges },
    });
  } catch (error) {
    console.error("Error getting completed challenges:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get completed challenges",
    });
  }
};

// Get challenge by ID
export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        projects: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!challenge) {
      return res.status(404).json({
        status: "error",
        message: "Challenge not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { challenge },
    });
  } catch (error) {
    console.error("Error getting challenge:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get challenge",
    });
  }
};

// Create new challenge
export const createChallenge = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      startDate,
      endDate,
      difficulty,
      xpReward,
    } = req.body;

    // Create the challenge
    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        thumbnailUrl,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        difficulty,
        xpReward: xpReward || 0,
        status: "UPCOMING", // Default to upcoming
      },
    });

    return res.status(201).json({
      status: "success",
      data: { challenge },
    });
  } catch (error) {
    console.error("Error creating challenge:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create challenge",
    });
  }
};

// Update challenge
export const updateChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert dates to Date objects if provided
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    // Ensure the challenge exists
    const existingChallenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!existingChallenge) {
      return res.status(404).json({
        status: "error",
        message: "Challenge not found",
      });
    }

    // Update the challenge
    const updatedChallenge = await prisma.challenge.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      status: "success",
      data: { challenge: updatedChallenge },
    });
  } catch (error) {
    console.error("Error updating challenge:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update challenge",
    });
  }
};

// Delete challenge
export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Ensure the challenge exists
    const existingChallenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!existingChallenge) {
      return res.status(404).json({
        status: "error",
        message: "Challenge not found",
      });
    }

    // Delete the challenge
    await prisma.challenge.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting challenge:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete challenge",
    });
  }
};

// Challenge participants
export const getChallengeParticipants = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
            skills: true,
          },
        },
      },
    });

    if (!challenge) {
      return res.status(404).json({
        status: "error",
        message: "Challenge not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { participants: challenge.participants },
    });
  } catch (error) {
    console.error("Error getting challenge participants:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get challenge participants",
    });
  }
};

export const addChallengeParticipant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "User ID is required",
      });
    }

    // Check if challenge exists
    const challenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!challenge) {
      return res.status(404).json({
        status: "error",
        message: "Challenge not found",
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

    // Check if user is already a participant
    const isParticipant = await prisma.challenge.findFirst({
      where: {
        id,
        participants: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (isParticipant) {
      return res.status(400).json({
        status: "error",
        message: "User is already a participant",
      });
    }

    // Add participant to challenge
    await prisma.challenge.update({
      where: { id },
      data: {
        participants: {
          connect: { id: userId },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Participant added successfully",
    });
  } catch (error) {
    console.error("Error adding challenge participant:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to add challenge participant",
    });
  }
};

export const removeChallengeParticipant = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, userId } = req.params;

    // Check if challenge exists
    const challenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!challenge) {
      return res.status(404).json({
        status: "error",
        message: "Challenge not found",
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

    // Check if user is a participant
    const isParticipant = await prisma.challenge.findFirst({
      where: {
        id,
        participants: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!isParticipant) {
      return res.status(400).json({
        status: "error",
        message: "User is not a participant",
      });
    }

    // Remove participant from challenge
    await prisma.challenge.update({
      where: { id },
      data: {
        participants: {
          disconnect: { id: userId },
        },
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error removing challenge participant:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to remove challenge participant",
    });
  }
};

// Challenge projects
export const getChallengeProjects = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        projects: {
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
        },
      },
    });

    if (!challenge) {
      return res.status(404).json({
        status: "error",
        message: "Challenge not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { projects: challenge.projects },
    });
  } catch (error) {
    console.error("Error getting challenge projects:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get challenge projects",
    });
  }
};
