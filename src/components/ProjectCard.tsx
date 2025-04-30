
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  participants: number;
  maxParticipants: number;
  duration: string;
  tags: string[];
  className?: string;
  style?: React.CSSProperties; // Add this line to accept style prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  participants,
  maxParticipants,
  duration,
  tags,
  className,
  style // Add this parameter
}) => {
  return (
    <div 
      className={cn(
        "holographic-card rounded-xl p-5 w-full max-w-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(123,58,237,0.5)] group",
        className
      )}
      style={style} // Apply the style prop
    >
      <div className="mb-2">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="inline-block text-xs px-2 py-1 rounded-full mr-2 mb-2 bg-cosmic-primary/20 text-cosmic-light"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent group-hover:from-white group-hover:to-cosmic-light transition-all duration-500">
        {title}
      </h3>
      
      <p className="text-sm text-gray-300 mb-4">{description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs text-cosmic-light">
          <span className="font-semibold">{duration}</span>
        </div>
        <div className="text-xs text-cosmic-light">
          <span className="font-semibold">{participants}</span>
          <span className="opacity-70">/{maxParticipants} joined</span>
        </div>
      </div>

      <div className="w-full bg-cosmic-dark/40 h-1.5 rounded-full mb-4">
        <div 
          className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent h-full rounded-full animate-pulse-soft"
          style={{ width: `${(participants / maxParticipants) * 100}%` }}
        ></div>
      </div>
      
      <Button className="w-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary font-medium">
        Join Challenge
      </Button>
    </div>
  );
};

export default ProjectCard;
