
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { HexagonIcon, Clock, Mountain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeTileProps {
  category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
}

const ChallengeTile: React.FC<ChallengeTileProps> = ({ category, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={cn(
        "relative cursor-pointer",
        "transition-all duration-300"
      )}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(category)}
    >
      <div 
        className={cn(
          "flex items-center justify-center w-24 h-24 relative",
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-cosmic-dark/30 before:backdrop-blur-sm before:z-[-1]",
          "before:rounded-xl before:transform before:rotate-45",
          isSelected ? "text-white" : "text-cosmic-light/70",
          isSelected && "before:border-2 before:border-cosmic-accent"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <HexagonIcon 
            size={48}
            className={cn(
              "opacity-30 transition-all duration-300",
              isHovered || isSelected ? "text-cosmic-accent" : "text-cosmic-primary"
            )}
          />
        </div>
        
        <div className="z-10 text-center">
          <span className="text-sm font-medium block">
            {category}
          </span>
        </div>
      </div>
      
      {isSelected && (
        <motion.div 
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-cosmic-accent"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChallengeTile;
