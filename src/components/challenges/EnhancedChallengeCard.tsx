
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import FeaturedRibbon from './FeaturedRibbon';
import DifficultyIndicator from './DifficultyIndicator';
import DurationCapsule from './DurationCapsule';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get progress percentage
  const progressPercentage = (challenge.participantsCount / challenge.maxParticipants) * 100;

  // Grid card view
  if (viewMode === 'grid') {
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
          <motion.div 
            className="flex flex-wrap gap-1 mb-3"
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
          >
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-cosmic-primary/20 text-cosmic-light">
              {challenge.category}
            </span>
            {challenge.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block text-xs px-2 py-0.5 rounded-full bg-cosmic-primary/20 text-cosmic-light"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          
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
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-cosmic-light">Participants</span>
              <span className="text-cosmic-light">
                {challenge.participantsCount}/{challenge.maxParticipants}
              </span>
            </div>
            <div className="w-full bg-cosmic-dark/60 h-1.5 rounded-full">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: delay + 0.5 }}
              >
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50">
                    <div className="absolute inset-0 xp-particles"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // List card view
  return (
    <motion.div 
      className={cn(
        "holographic-card rounded-xl transition-all duration-300",
        isHovered ? "shadow-[0_0_15px_rgba(123,58,237,0.5)]" : ""
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex p-4">
        {/* Left section - title and description */}
        <div className="flex-1 pr-4">
          <div className="flex items-center mb-2">
            <motion.h3 
              className="text-lg font-medium text-white mr-2"
              animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {challenge.title}
            </motion.h3>
            {challenge.featured && (
              <motion.div
                className="bg-cosmic-accent text-xs text-white px-2 py-0.5 rounded-full flex items-center"
                animate={isHovered ? 
                  { y: [0, -2, 0], boxShadow: '0 0 5px rgba(123,58,237,0.5)' } : 
                  { y: 0, boxShadow: 'none' }
                }
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
              >
                <StarIcon className="h-3 w-3 mr-1" />
                Featured
              </motion.div>
            )}
          </div>
          
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{challenge.description}</p>
          
          <div className="flex flex-wrap gap-1">
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-cosmic-primary/20 text-cosmic-light">
              {challenge.category}
            </span>
            {challenge.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block text-xs px-2 py-0.5 rounded-full bg-cosmic-primary/20 text-cosmic-light"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Right section - stats and action */}
        <div className="flex flex-col w-64 border-l border-white/10 pl-4">
          <div className="flex justify-between mb-2 text-xs">
            <DifficultyIndicator difficulty={challenge.difficulty} />
            <DurationCapsule duration={challenge.duration} />
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-cosmic-light">Participants</span>
              <span className="text-cosmic-light">
                {challenge.participantsCount}/{challenge.maxParticipants}
              </span>
            </div>
            <div className="w-full bg-cosmic-dark/60 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: delay + 0.3 }}
              >
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50">
                    <div className="absolute inset-0 xp-particles"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-auto bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary text-sm"
            onClick={() => onViewDetails(challenge.id)}
          >
            View Challenge
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedChallengeCard;
