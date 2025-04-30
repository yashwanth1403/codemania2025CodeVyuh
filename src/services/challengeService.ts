import axios from "axios";
import { demoChallenges } from "@/lib/demoData";

// Base API URL - replace with actual API URL in production
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  startDate: Date | string;
  endDate: Date | string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  xpReward: number;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  createdAt?: Date | string;
  updatedAt?: Date | string;
  participants?: string[];
  tags?: string[];
  maxParticipants?: number;
  category?: string;
  requirements?: string;
}

export interface CreateChallengeDTO {
  title: string;
  description: string;
  thumbnailUrl?: string;
  startDate: Date | string;
  endDate: Date | string;
  difficulty: string;
  xpReward?: number;
  tags?: string;
  maxParticipants?: number;
  category?: string;
  requirements?: string;
}

// For MVP, we'll use the demo data directly instead of making actual API calls
// In a production app, these functions would make actual API calls

// Get all challenges
export const getAllChallenges = async (): Promise<Challenge[]> => {
  // For MVP/demo, return demo data with proper typing
  return demoChallenges as unknown as Challenge[];

  // In a real app, this would make an API call:
  // try {
  //   const response = await axios.get(`${API_URL}/challenges`);
  //   return response.data.data.challenges;
  // } catch (error) {
  //   console.error('Error fetching challenges:', error);
  //   throw error;
  // }
};

// Get challenge by ID
export const getChallengeById = async (id: string): Promise<Challenge> => {
  // For MVP/demo, return demo data
  const challenge = demoChallenges.find((c) => c.id === id);
  if (!challenge) {
    throw new Error("Challenge not found");
  }
  return challenge as unknown as Challenge;

  // In a real app, this would make an API call:
  // try {
  //   const response = await axios.get(`${API_URL}/challenges/${id}`);
  //   return response.data.data.challenge;
  // } catch (error) {
  //   console.error(`Error fetching challenge with id ${id}:`, error);
  //   throw error;
  // }
};

// Create a new challenge
export const createChallenge = async (
  challengeData: CreateChallengeDTO
): Promise<Challenge> => {
  // For MVP/demo, return a mock response
  const newId = `challenge${demoChallenges.length + 1}`;
  const now = new Date();

  // Process tags
  let tags: string[] = [];
  if (challengeData.tags) {
    tags = challengeData.tags.split(",").map((tag) => tag.trim());
  }

  // Map difficulty string to enum type
  const difficultyMap: { [key: string]: "EASY" | "MEDIUM" | "HARD" } = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
    Beginner: "EASY",
    Intermediate: "MEDIUM",
    Advanced: "HARD",
  };

  const difficulty = difficultyMap[challengeData.difficulty] || "MEDIUM";

  const newChallenge: Challenge = {
    id: newId,
    title: challengeData.title,
    description: challengeData.description,
    thumbnailUrl: challengeData.thumbnailUrl,
    startDate: challengeData.startDate,
    endDate: challengeData.endDate,
    difficulty,
    xpReward: challengeData.xpReward || 100,
    status: "UPCOMING",
    createdAt: now,
    updatedAt: now,
    participants: [],
    tags,
    maxParticipants: challengeData.maxParticipants || 5,
    category: challengeData.category,
    requirements: challengeData.requirements,
  };

  // In a real app, this would make an API call:
  // try {
  //   const response = await axios.post(`${API_URL}/challenges`, challengeData);
  //   return response.data.data.challenge;
  // } catch (error) {
  //   console.error('Error creating challenge:', error);
  //   throw error;
  // }

  return newChallenge;
};

// Update an existing challenge
export const updateChallenge = async (
  id: string,
  challengeData: Partial<CreateChallengeDTO>
): Promise<Challenge> => {
  // For MVP/demo, return a mock response
  const challengeIndex = demoChallenges.findIndex((c) => c.id === id);
  if (challengeIndex === -1) {
    throw new Error("Challenge not found");
  }

  // In a real app, this would make an API call:
  // try {
  //   const response = await axios.patch(`${API_URL}/challenges/${id}`, challengeData);
  //   return response.data.data.challenge;
  // } catch (error) {
  //   console.error(`Error updating challenge with id ${id}:`, error);
  //   throw error;
  // }

  // Map difficulty string to enum type if provided
  let difficulty: "EASY" | "MEDIUM" | "HARD" | undefined;
  if (challengeData.difficulty) {
    const difficultyMap: { [key: string]: "EASY" | "MEDIUM" | "HARD" } = {
      EASY: "EASY",
      MEDIUM: "MEDIUM",
      HARD: "HARD",
      Beginner: "EASY",
      Intermediate: "MEDIUM",
      Advanced: "HARD",
    };
    difficulty = difficultyMap[challengeData.difficulty];
  }

  // Process tags if provided
  let tags: string[] | undefined;
  if (challengeData.tags) {
    tags = challengeData.tags.split(",").map((tag) => tag.trim());
  }

  // Return a mock updated challenge for MVP
  return {
    ...(demoChallenges[challengeIndex] as unknown as Challenge),
    ...challengeData,
    difficulty:
      difficulty ||
      (demoChallenges[challengeIndex] as unknown as Challenge).difficulty,
    tags: tags || (demoChallenges[challengeIndex] as unknown as Challenge).tags,
    updatedAt: new Date(),
  };
};

// Delete a challenge
export const deleteChallenge = async (id: string): Promise<void> => {
  // For MVP/demo, just log
  console.log(`Delete challenge with id ${id} (mock implementation)`);

  // In a real app, this would make an API call:
  // try {
  //   await axios.delete(`${API_URL}/challenges/${id}`);
  // } catch (error) {
  //   console.error(`Error deleting challenge with id ${id}:`, error);
  //   throw error;
  // }
};

// Join a challenge
export const joinChallenge = async (
  challengeId: string,
  userId: string
): Promise<void> => {
  // For MVP/demo, just log
  console.log(
    `User ${userId} joined challenge ${challengeId} (mock implementation)`
  );

  // In a real app, this would make an API call:
  // try {
  //   await axios.post(`${API_URL}/challenges/${challengeId}/participants`, { userId });
  // } catch (error) {
  //   console.error(`Error joining challenge ${challengeId}:`, error);
  //   throw error;
  // }
};

// Leave a challenge
export const leaveChallenge = async (
  challengeId: string,
  userId: string
): Promise<void> => {
  // For MVP/demo, just log
  console.log(
    `User ${userId} left challenge ${challengeId} (mock implementation)`
  );

  // In a real app, this would make an API call:
  // try {
  //   await axios.delete(`${API_URL}/challenges/${challengeId}/participants/${userId}`);
  // } catch (error) {
  //   console.error(`Error leaving challenge ${challengeId}:`, error);
  //   throw error;
  // }
};
