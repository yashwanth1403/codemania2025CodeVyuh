import { Request, Response } from "express";
import { prisma } from "../index";

// Get user skills
export const getUserSkills = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        skills: true,
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
      data: { skills: user.skills },
    });
  } catch (error) {
    console.error("Error getting user skills:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get user skills",
    });
  }
};

// Add skills to user
export const addUserSkills = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Skills must be provided as a non-empty array",
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

    // Process each skill
    const updatedSkills = [];

    for (const skillData of skills) {
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

      // Connect skill to user
      await prisma.user.update({
        where: { id: userId },
        data: {
          skills: {
            connect: { id: skill.id },
          },
        },
      });

      updatedSkills.push(skill);
    }

    return res.status(200).json({
      status: "success",
      data: { skills: updatedSkills },
    });
  } catch (error) {
    console.error("Error adding user skills:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to add user skills",
    });
  }
};

// Remove skills from user
export const removeUserSkills = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { skillIds } = req.body;

    if (!Array.isArray(skillIds) || skillIds.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Skill IDs must be provided as a non-empty array",
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

    // Disconnect skills from user
    await prisma.user.update({
      where: { id: userId },
      data: {
        skills: {
          disconnect: skillIds.map((id) => ({ id })),
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Skills removed successfully",
    });
  } catch (error) {
    console.error("Error removing user skills:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to remove user skills",
    });
  }
};

// Get user interests
export const getUserInterests = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        interests: true,
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
      data: { interests: user.interests },
    });
  } catch (error) {
    console.error("Error getting user interests:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get user interests",
    });
  }
};

// Add interests to user
export const addUserInterests = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { interests } = req.body;

    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Interests must be provided as a non-empty array",
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

    // Process each interest
    const updatedInterests = [];

    for (const interestData of interests) {
      // Check if interest already exists
      let interest = await prisma.interest.findUnique({
        where: { name: interestData.name },
      });

      // If interest doesn't exist, create it
      if (!interest) {
        interest = await prisma.interest.create({
          data: {
            name: interestData.name,
            category: interestData.category,
          },
        });
      }

      // Connect interest to user
      await prisma.user.update({
        where: { id: userId },
        data: {
          interests: {
            connect: { id: interest.id },
          },
        },
      });

      updatedInterests.push(interest);
    }

    return res.status(200).json({
      status: "success",
      data: { interests: updatedInterests },
    });
  } catch (error) {
    console.error("Error adding user interests:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to add user interests",
    });
  }
};

// Remove interests from user
export const removeUserInterests = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { interestIds } = req.body;

    if (!Array.isArray(interestIds) || interestIds.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Interest IDs must be provided as a non-empty array",
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

    // Disconnect interests from user
    await prisma.user.update({
      where: { id: userId },
      data: {
        interests: {
          disconnect: interestIds.map((id) => ({ id })),
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Interests removed successfully",
    });
  } catch (error) {
    console.error("Error removing user interests:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to remove user interests",
    });
  }
};

// Get user social links
export const getUserSocialLinks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        socialLinks: true,
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
      data: { socialLinks: user.socialLinks },
    });
  } catch (error) {
    console.error("Error getting user social links:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get user social links",
    });
  }
};

// Add social link to user
export const addUserSocialLink = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { platform, url } = req.body;

    if (!platform || !url) {
      return res.status(400).json({
        status: "error",
        message: "Platform and URL are required",
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

    // Check if social link already exists for this platform
    const existingLink = await prisma.socialLink.findFirst({
      where: {
        userId,
        platform,
      },
    });

    if (existingLink) {
      return res.status(400).json({
        status: "error",
        message: `A social link for ${platform} already exists for this user`,
      });
    }

    // Create social link
    const socialLink = await prisma.socialLink.create({
      data: {
        platform,
        url,
        user: {
          connect: { id: userId },
        },
      },
    });

    return res.status(201).json({
      status: "success",
      data: { socialLink },
    });
  } catch (error) {
    console.error("Error adding user social link:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to add user social link",
    });
  }
};

// Update social link
export const updateUserSocialLink = async (req: Request, res: Response) => {
  try {
    const { userId, linkId } = req.params;
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        status: "error",
        message: "URL is required",
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

    // Check if social link exists
    const socialLink = await prisma.socialLink.findFirst({
      where: {
        id: linkId,
        userId,
      },
    });

    if (!socialLink) {
      return res.status(404).json({
        status: "error",
        message: "Social link not found",
      });
    }

    // Update social link
    const updatedLink = await prisma.socialLink.update({
      where: { id: linkId },
      data: { url },
    });

    return res.status(200).json({
      status: "success",
      data: { socialLink: updatedLink },
    });
  } catch (error) {
    console.error("Error updating user social link:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update user social link",
    });
  }
};

// Delete social link
export const deleteUserSocialLink = async (req: Request, res: Response) => {
  try {
    const { userId, linkId } = req.params;

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

    // Check if social link exists
    const socialLink = await prisma.socialLink.findFirst({
      where: {
        id: linkId,
        userId,
      },
    });

    if (!socialLink) {
      return res.status(404).json({
        status: "error",
        message: "Social link not found",
      });
    }

    // Delete social link
    await prisma.socialLink.delete({
      where: { id: linkId },
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting user social link:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete user social link",
    });
  }
};

// Get user badges
export const getUserBadges = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
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
      data: { badges: user.badges },
    });
  } catch (error) {
    console.error("Error getting user badges:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to get user badges",
    });
  }
};
