import express from "express";
import * as profileController from "../controllers/profileController";

const router = express.Router();

// Get user skills
router.get("/:userId/skills", profileController.getUserSkills);

// Add skills to user
router.post("/:userId/skills", profileController.addUserSkills);

// Remove skills from user
router.delete("/:userId/skills", profileController.removeUserSkills);

// Get user interests
router.get("/:userId/interests", profileController.getUserInterests);

// Add interests to user
router.post("/:userId/interests", profileController.addUserInterests);

// Remove interests from user
router.delete("/:userId/interests", profileController.removeUserInterests);

// Get user social links
router.get("/:userId/social-links", profileController.getUserSocialLinks);

// Add social link to user
router.post("/:userId/social-links", profileController.addUserSocialLink);

// Update social link
router.patch(
  "/:userId/social-links/:linkId",
  profileController.updateUserSocialLink
);

// Delete social link
router.delete(
  "/:userId/social-links/:linkId",
  profileController.deleteUserSocialLink
);

// Get user badges
router.get("/:userId/badges", profileController.getUserBadges);

export default router;
