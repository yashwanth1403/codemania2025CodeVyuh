import express from "express";
import * as challengeController from "../controllers/challengeController";

const router = express.Router();

// Get all challenges
router.get("/", challengeController.getAllChallenges);

// Get active challenges
router.get("/active", challengeController.getActiveChallenges);

// Get upcoming challenges
router.get("/upcoming", challengeController.getUpcomingChallenges);

// Get completed challenges
router.get("/completed", challengeController.getCompletedChallenges);

// Get challenge by ID
router.get("/:id", challengeController.getChallengeById);

// Create new challenge
router.post("/", challengeController.createChallenge);

// Update challenge
router.patch("/:id", challengeController.updateChallenge);

// Delete challenge
router.delete("/:id", challengeController.deleteChallenge);

// Challenge participants
router.get("/:id/participants", challengeController.getChallengeParticipants);
router.post("/:id/participants", challengeController.addChallengeParticipant);
router.delete(
  "/:id/participants/:userId",
  challengeController.removeChallengeParticipant
);

// Challenge projects
router.get("/:id/projects", challengeController.getChallengeProjects);

export default router;
