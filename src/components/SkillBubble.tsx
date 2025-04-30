
import React, { useState } from 'react';
import { HexagonIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
}

interface SkillBubbleProps {
  skill: Skill;
  index: number;
  totalItems: number;
}

const SkillBubble: React.FC<SkillBubbleProps> = ({ skill, index, totalItems }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Position the bubble in a circular arrangement
  const angle = (index / totalItems) * 2 * Math.PI;
  const radius = 150; // Radius of the circle
  const x = radius * Math.cos(angle) + radius;
  const y = radius * Math.sin(angle) + radius;
  
  // Determine the size based on skill level (1-5)
  const size = 35 + skill.level * 5;
  
  // Get category color
  const getCategoryColor = () => {
    switch(skill.category.toLowerCase()) {
      case 'design': return 'from-purple-400 to-pink-400';
      case 'frontend': return 'from-blue-400 to-cyan-400';
      case 'backend': return 'from-green-400 to-emerald-400';
      case 'data': return 'from-orange-400 to-amber-400';
      case 'analytics': return 'from-yellow-400 to-amber-300';
      case 'hardware': return 'from-red-400 to-rose-400';
      default: return 'from-gray-400 to-slate-400';
    }
  };

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div 
        className={cn(
          "relative cursor-pointer transition-all duration-300",
          isHovered ? "scale-125" : "scale-100"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glowing background */}
        <div 
          className={cn(
            "absolute rounded-full bg-gradient-to-r blur-lg animate-pulse-slow opacity-70",
            getCategoryColor()
          )}
          style={{
            width: `${size * 1.5}px`,
            height: `${size * 1.5}px`,
            top: `${-size * 0.25}px`,
            left: `${-size * 0.25}px`,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          }}
        />
        
        {/* Skill bubble */}
        <div 
          className="rounded-full flex items-center justify-center bg-cosmic-dark/60 backdrop-blur-sm border border-white/10"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transition: 'all 0.3s ease',
          }}
        >
          <HexagonIcon className="w-6 h-6 text-white/70" />
        </div>
        
        {/* Skill name tooltip */}
        <div 
          className={cn(
            "absolute left-1/2 transform -translate-x-1/2 bg-cosmic-dark/80 backdrop-blur-sm px-2 py-1 rounded text-xs whitespace-nowrap text-white border border-white/10 transition-all duration-300",
            isHovered ? "opacity-100 top-full mt-2" : "opacity-0 top-full mt-0 pointer-events-none"
          )}
        >
          {skill.name}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-cosmic-dark/80" style={{ width: 0, height: 0 }}></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBubble;
