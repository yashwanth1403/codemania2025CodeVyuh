import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Users,
  Calendar,
  Trophy,
  Clock,
  BarChart3,
  Sparkles,
  UserPlus,
  UserMinus,
  Rocket,
  FileText,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  formatDate,
  formatDifficulty,
  calculateDuration,
} from "../../lib/utils";
import { Challenge } from "../../services/challengeService";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "../../components/ui/use-toast";

interface ChallengeDetailsProps {
  challenge: Challenge;
  onClose: () => void;
  onJoin: (challengeId: string) => Promise<void>;
  onLeave: (challengeId: string) => Promise<void>;
}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = ({
  challenge,
  onClose,
  onJoin,
  onLeave,
}) => {
  const { user } = useAuth();
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // Check if the current user is a participant
  const isParticipant = user && challenge.participants?.includes(user.id || "");

  // Calculate filled spots percentage
  const filledPercentage = challenge.participants
    ? (challenge.participants.length / (challenge.maxParticipants || 5)) * 100
    : 0;

  // Format dates
  const startDateFormatted = formatDate(challenge.startDate);
  const endDateFormatted = formatDate(challenge.endDate);
  const durationFormatted = calculateDuration(
    challenge.startDate,
    challenge.endDate
  );

  // Handle join challenge
  const handleJoin = async () => {
    try {
      setIsJoining(true);
      // If a user is logged in, use their ID, otherwise generate a temporary ID
      const participantId = user
        ? user.id
        : `guest_${Math.random().toString(36).substring(2, 9)}`;
      await onJoin(challenge.id);
      toast({
        title: "Challenge Joined!",
        description: `You've successfully joined ${challenge.title}`,
      });
    } catch (error) {
      console.error("Error joining challenge:", error);
      toast({
        title: "Error",
        description: "Failed to join challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  // Handle leave challenge
  const handleLeave = async () => {
    try {
      setIsLeaving(true);
      await onLeave(challenge.id);
      toast({
        title: "Challenge Left",
        description: `You've left ${challenge.title}`,
      });
    } catch (error) {
      console.error("Error leaving challenge:", error);
      toast({
        title: "Error",
        description: "Failed to leave challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLeaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto holographic-card cosmic-border rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Challenge Header */}
        <div className="relative">
          {/* Challenge Image */}
          <div className="h-60 overflow-hidden relative">
            {challenge.thumbnailUrl ? (
              <img
                src={challenge.thumbnailUrl}
                alt={challenge.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <Badge
              className={`px-3 py-1 text-sm font-medium ${
                challenge.status === "ACTIVE"
                  ? "bg-green-500/80"
                  : challenge.status === "UPCOMING"
                  ? "bg-blue-500/80"
                  : "bg-purple-500/80"
              }`}
            >
              {challenge.status}
            </Badge>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-4 left-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-4">
            <h2 className="text-3xl font-bold text-white mb-2">
              {challenge.title}
            </h2>
            <div className="flex items-center space-x-3 text-white/80">
              <Badge
                variant="outline"
                className="border-cosmic-accent/50 text-cosmic-light"
              >
                {challenge.category}
              </Badge>

              <span className="flex items-center gap-1">
                <Trophy size={14} className="text-amber-400" />
                <span>{challenge.xpReward} XP</span>
              </span>

              <span className="flex items-center gap-1">
                <Clock size={14} className="text-blue-400" />
                <span>{durationFormatted}</span>
              </span>

              <span className="flex items-center gap-1">
                <BarChart3 size={14} className="text-purple-400" />
                <span>{formatDifficulty(challenge.difficulty)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Challenge Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Challenge Description
              </h3>
              <p className="text-gray-300">{challenge.description}</p>

              {challenge.requirements && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <FileText size={18} className="mr-2 text-cosmic-light" />
                    Requirements
                  </h4>
                  <p className="text-gray-300">{challenge.requirements}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Timeline
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Start Date:</span>
                  <span className="text-white">{startDateFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">End Date:</span>
                  <span className="text-white">{endDateFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Duration:</span>
                  <span className="text-white">{durationFormatted}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Skills & Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {challenge.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-cosmic-primary/20 hover:bg-cosmic-primary/30 text-cosmic-light"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Participation */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Participation
              </h3>
              <div className="holographic-card border-cosmic-primary/20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">
                    <Users size={16} className="inline mr-2" />
                    Participants
                  </span>
                  <span className="text-white font-medium">
                    {challenge.participants?.length || 0}/
                    {challenge.maxParticipants || 5}
                  </span>
                </div>
                <Progress
                  value={filledPercentage}
                  className="h-2 bg-cosmic-dark"
                />

                <div className="mt-6">
                  {isParticipant ? (
                    <Button
                      variant="outline"
                      className="w-full border-red-500/50 text-red-400 hover:border-red-500 hover:bg-red-500/10"
                      onClick={handleLeave}
                      disabled={isLeaving}
                    >
                      {isLeaving ? (
                        <span className="flex items-center">
                          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                          Leaving...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <UserMinus className="mr-2 h-4 w-4" />
                          Leave Challenge
                        </span>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
                      onClick={handleJoin}
                      disabled={isJoining || filledPercentage >= 100}
                    >
                      {isJoining ? (
                        <span className="flex items-center">
                          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                          Joining...
                        </span>
                      ) : filledPercentage >= 100 ? (
                        <span className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          Challenge Full
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Join Challenge
                        </span>
                      )}
                    </Button>
                  )}
                </div>

                {isParticipant && (
                  <div className="mt-4 p-3 bg-cosmic-primary/10 rounded-lg border border-cosmic-primary/20">
                    <p className="text-center text-sm text-cosmic-light">
                      <Rocket className="inline mr-1 h-4 w-4" />
                      You're part of this challenge!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Reward</h3>
              <div className="holographic-card border-cosmic-primary/20 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Trophy size={20} className="text-amber-400 mr-2" />
                  <span className="text-white font-medium">
                    {challenge.xpReward} XP Points
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  Complete this challenge to earn XP and unlock special badges.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Difficulty
              </h3>
              <div className="holographic-card border-cosmic-primary/20 p-4 rounded-lg">
                <div className="flex items-center">
                  <BarChart3 size={20} className="text-purple-400 mr-2" />
                  <span className="text-white font-medium">
                    {formatDifficulty(challenge.difficulty)}
                  </span>
                </div>
                <div className="mt-2 flex">
                  {["EASY", "MEDIUM", "HARD"].map((level, index) => {
                    const difficultyMap = {
                      EASY: 0,
                      MEDIUM: 1,
                      HARD: 2,
                    };
                    const currentLevel =
                      difficultyMap[
                        challenge.difficulty as "EASY" | "MEDIUM" | "HARD"
                      ];
                    return (
                      <div
                        key={level}
                        className={`h-2 flex-1 ${
                          index <= currentLevel
                            ? index === 0
                              ? "bg-green-500"
                              : index === 1
                              ? "bg-yellow-500"
                              : "bg-red-500"
                            : "bg-cosmic-dark"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChallengeDetails;
