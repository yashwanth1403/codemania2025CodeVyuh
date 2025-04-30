
import React from 'react';
import { motion } from 'framer-motion';

interface ChallengeParticipantsProps {
  participantsCount: number;
  maxParticipants: number;
  delay?: number;
  className?: string;
}

const ChallengeParticipants: React.FC<ChallengeParticipantsProps> = ({ 
  participantsCount, 
  maxParticipants, 
  delay = 0,
  className
}) => {
  // Get progress percentage
  const progressPercentage = (participantsCount / maxParticipants) * 100;
  
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex justify-between items-center text-xs mb-1">
        <span className="text-cosmic-light">Participants</span>
        <span className="text-cosmic-light">
          {participantsCount}/{maxParticipants}
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
  );
};

export default ChallengeParticipants;
