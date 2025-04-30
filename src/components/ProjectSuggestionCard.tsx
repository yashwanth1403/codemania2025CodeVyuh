
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LightbulbIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  skills: string[];
}

interface ProjectSuggestionCardProps {
  project: Project;
  delay?: number;
}

const ProjectSuggestionCard: React.FC<ProjectSuggestionCardProps> = ({ project, delay = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get difficulty color
  const getDifficultyColor = () => {
    switch(project.difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div 
      className="holographic-card rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(123,58,237,0.5)] animate-fade-in overflow-hidden"
      style={{ animationDelay: `${delay}s` }}
    >
      <div 
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start">
          <div className="mr-4 mt-1">
            <div className="h-10 w-10 rounded-full bg-cosmic-primary/20 flex items-center justify-center">
              <LightbulbIcon className="h-5 w-5 text-cosmic-accent" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white mb-1">{project.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
            
            <div className="flex flex-wrap items-center mt-2 text-xs">
              <span className={cn("font-medium mr-3", getDifficultyColor())}>
                {project.difficulty}
              </span>
              <span className="text-cosmic-light mr-3">
                {project.duration}
              </span>
            </div>
          </div>
          
          <div className="ml-2">
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
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
                className="text-cosmic-light"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded content */}
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5">
          <div className="h-px bg-white/10 mb-4"></div>
          
          <h4 className="text-sm font-medium text-cosmic-light mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-1 mb-4">
            {project.skills.map((skill, index) => (
              <span 
                key={index}
                className="inline-block text-xs px-2 py-0.5 rounded-full bg-cosmic-primary/20 text-cosmic-light"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs border-cosmic-light/30 text-cosmic-light hover:bg-cosmic-light/10"
            >
              Save for Later
            </Button>
            <Button 
              size="sm"
              className="text-xs bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
            >
              Start Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSuggestionCard;
