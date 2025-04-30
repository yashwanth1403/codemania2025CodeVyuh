
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface ChallengeCardProps {
  challenge: Challenge;
  viewMode: 'grid' | 'list';
  delay?: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, viewMode, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get difficulty color
  const getDifficultyColor = () => {
    switch(challenge.difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  // Get progress percentage
  const progressPercentage = (challenge.participantsCount / challenge.maxParticipants) * 100;

  // Grid card view
  if (viewMode === 'grid') {
    return (
      <div 
        className={cn(
          "holographic-card rounded-xl transition-all duration-500 animate-fade-in overflow-hidden",
          isHovered ? "transform scale-105 shadow-[0_0_20px_rgba(123,58,237,0.6)]" : ""
        )}
        style={{ animationDelay: `${delay}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Featured badge */}
        {challenge.featured && (
          <div className="absolute top-0 right-0">
            <div className="relative">
              <div 
                className="absolute -top-1 -right-1 w-20 h-20 overflow-hidden rotate-45"
                style={{ transformOrigin: 'bottom left' }}
              >
                <div className="absolute top-0 right-0 w-full h-8 bg-cosmic-accent flex items-center justify-center animate-pulse-slow">
                  <StarIcon className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
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
          
          {/* Title and description */}
          <h3 className="text-lg font-medium text-white mb-2">{challenge.title}</h3>
          <p className="text-sm text-gray-300 mb-4 line-clamp-3">{challenge.description}</p>
          
          {/* Challenge stats */}
          <div className="flex justify-between items-center text-xs mb-2">
            <span className={cn("font-medium", getDifficultyColor())}>
              {challenge.difficulty}
            </span>
            <span className="text-cosmic-light">
              {challenge.duration}
            </span>
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
              <div 
                className="h-full rounded-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Action button */}
          <Button 
            className="w-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
          >
            View Challenge
          </Button>
        </div>
      </div>
    );
  }
  
  // List card view
  return (
    <div 
      className={cn(
        "holographic-card rounded-xl transition-all duration-300 animate-fade-in",
        isHovered ? "shadow-[0_0_15px_rgba(123,58,237,0.5)]" : ""
      )}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex p-4">
        {/* Left section - title and description */}
        <div className="flex-1 pr-4">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium text-white mr-2">{challenge.title}</h3>
            {challenge.featured && (
              <div className="bg-cosmic-accent text-xs text-white px-2 py-0.5 rounded-full flex items-center">
                <StarIcon className="h-3 w-3 mr-1" />
                Featured
              </div>
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
            <span className={cn("font-medium", getDifficultyColor())}>
              {challenge.difficulty}
            </span>
            <span className="text-cosmic-light">
              {challenge.duration}
            </span>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-cosmic-light">Participants</span>
              <span className="text-cosmic-light">
                {challenge.participantsCount}/{challenge.maxParticipants}
              </span>
            </div>
            <div className="w-full bg-cosmic-dark/60 h-1.5 rounded-full">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <Button 
            size="sm"
            className="w-full mt-auto bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary text-sm"
          >
            View Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
