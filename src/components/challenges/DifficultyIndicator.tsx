
import React from 'react';
import { Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DifficultyIndicatorProps {
  difficulty: string;
  className?: string;
}

const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ difficulty, className }) => {
  const getMountainProps = () => {
    switch(difficulty.toLowerCase()) {
      case 'beginner':
        return { 
          className: 'text-green-400',
          size: 18,
          peakHeight: 1
        };
      case 'intermediate':
        return { 
          className: 'text-yellow-400',
          size: 20,
          peakHeight: 2
        };
      case 'advanced':
        return { 
          className: 'text-red-400',
          size: 22,
          peakHeight: 3
        };
      default:
        return { 
          className: 'text-gray-400',
          size: 16,
          peakHeight: 1
        };
    }
  };

  const { className: colorClass, size, peakHeight } = getMountainProps();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Mountain className={cn(colorClass)} size={size} />
      {peakHeight > 1 && (
        <Mountain className={cn(colorClass)} size={size} />
      )}
      {peakHeight > 2 && (
        <Mountain className={cn(colorClass)} size={size} />
      )}
      <span className={cn("ml-1 font-medium", colorClass)}>
        {difficulty}
      </span>
    </div>
  );
};

export default DifficultyIndicator;
