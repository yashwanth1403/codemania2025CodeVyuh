
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Star as StarIcon } from 'lucide-react';
import FeaturedRibbon from './FeaturedRibbon';
import DifficultyIndicator from './DifficultyIndicator';
import DurationCapsule from './DurationCapsule';
import ChallengeTags from './ChallengeTags';
import ChallengeParticipants from './ChallengeParticipants';
import GridCardView from './GridCardView';
import ListCardView from './ListCardView';

interface Challenge {
  id: number;
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

interface EnhancedChallengeCardProps {
  challenge: Challenge;
  viewMode: 'grid' | 'list';
  delay?: number;
  onViewDetails: (challengeId: number) => void;
}

const EnhancedChallengeCard: React.FC<EnhancedChallengeCardProps> = ({ 
  challenge, 
  viewMode, 
  delay = 0,
  onViewDetails
}) => {
  // Render the appropriate view based on viewMode
  return viewMode === 'grid' ? (
    <GridCardView 
      challenge={challenge} 
      delay={delay} 
      onViewDetails={onViewDetails}
    />
  ) : (
    <ListCardView
      challenge={challenge}
      delay={delay}
      onViewDetails={onViewDetails}
    />
  );
};

export default EnhancedChallengeCard;
