import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import FeaturedRibbon from "./FeaturedRibbon";
import DifficultyIndicator from "./DifficultyIndicator";
import DurationCapsule from "./DurationCapsule";
import ChallengeTags from "./ChallengeTags";
import ChallengeParticipants from "./ChallengeParticipants";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  participantsCount: number;
  maxParticipants: number;
  tags: string[];
  featured: boolean;
}

interface GridCardViewProps {
  challenge: Challenge;
  delay: number;
  onViewDetails: (challengeId: string) => void;
}

const GridCardView: React.FC<GridCardViewProps> = ({
  challenge,
  delay,
  onViewDetails,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={cn(
        "holographic-card rounded-xl overflow-hidden",
        isHovered ? "shadow-[0_0_20px_rgba(123,58,237,0.6)]" : "",
        isExpanded ? "h-auto" : "h-[370px]"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured badge */}
      {challenge.featured && <FeaturedRibbon />}

      <div className="p-5">
        {/* Tags */}
        <ChallengeTags
          category={challenge.category}
          tags={challenge.tags}
          isHovered={isHovered}
        />

        {/* Title and description */}
        <motion.h3
          className="text-lg font-medium text-white mb-2"
          animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {challenge.title}
        </motion.h3>

        <motion.p
          className={cn(
            "text-sm text-gray-300 mb-4",
            isExpanded ? "" : "line-clamp-3"
          )}
        >
          {challenge.description}
        </motion.p>

        {/* Challenge stats */}
        <div className="flex justify-between items-center text-xs mb-2">
          <DifficultyIndicator difficulty={challenge.difficulty} />
          <DurationCapsule duration={challenge.duration} />
        </div>

        {/* Participants progress */}
        <ChallengeParticipants
          participantsCount={challenge.participantsCount}
          maxParticipants={challenge.maxParticipants}
          delay={delay}
        />

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
            onClick={() => onViewDetails(challenge.id)}
          >
            View Challenge
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="border-cosmic-primary/30 hover:bg-cosmic-primary/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default GridCardView;
