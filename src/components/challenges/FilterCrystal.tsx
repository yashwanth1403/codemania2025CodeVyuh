
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FilterCrystalProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const FilterCrystal: React.FC<FilterCrystalProps> = ({ 
  label, 
  isActive, 
  onClick, 
  className 
}) => {
  return (
    <motion.div
      className={cn(
        "relative cursor-pointer",
        "perspective-1000",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className={cn(
        "relative py-1.5 px-3 text-sm font-medium",
        "transform-style-preserve-3d transition-all duration-300",
        "before:content-[''] before:absolute before:inset-0 before:z-[-1]",
        "before:transform before:skew-x-[20deg] before:skew-y-[-5deg]",
        "before:bg-gradient-to-br before:opacity-70 before:backdrop-blur-sm",
        isActive 
          ? "before:from-cosmic-accent/30 before:to-cosmic-primary/60 before:border before:border-cosmic-accent/60 text-white"
          : "before:from-cosmic-primary/10 before:to-cosmic-dark/40 before:border before:border-cosmic-primary/20 text-cosmic-light/70"
      )}>
        {isActive && (
          <motion.div 
            className="absolute -inset-0.5 bg-cosmic-accent opacity-10 z-[-2] blur-sm"
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        )}
        
        {label}
      </div>
    </motion.div>
  );
};

export default FilterCrystal;
