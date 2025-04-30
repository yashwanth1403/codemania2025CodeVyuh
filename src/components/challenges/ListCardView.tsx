
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star as StarIcon } from 'lucide-react';
import DifficultyIndicator from './DifficultyIndicator';
import DurationCapsule from './DurationCapsule';
import ChallengeParticipants from './ChallengeParticipants';

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

interface ListCardViewProps {
  challenge: Challenge;
  delay: number;
  onViewDetails: (challengeId: number) => void;
}

const ListCardView: React.FC<ListCardViewProps> = ({ challenge, delay, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
          
          <ChallengeParticipants 
            participantsCount={challenge.participantsCount}
            maxParticipants={challenge.maxParticipants}
            delay={delay}
          />
          
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

export default ListCardView;
