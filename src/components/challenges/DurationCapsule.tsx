
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DurationCapsuleProps {
  duration: string;
  className?: string;
}

const DurationCapsule: React.FC<DurationCapsuleProps> = ({ duration, className }) => {
  const getHours = () => {
    if (duration.includes('24 hours')) return 24;
    if (duration.includes('48 hours')) return 48;
    if (duration.includes('72 hours')) return 72;
    if (duration.includes('week')) return 168;
    return 0;
  };
  
  const hours = getHours();
  const fillPercentage = Math.min(100, (hours / 168) * 100); // 1 week = 168 hours
  
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="relative w-5 h-5">
        <motion.div 
          className="absolute inset-0 rounded-full border border-cosmic-light/30"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-1 h-1 bg-cosmic-accent absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </motion.div>
        
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-cosmic-primary/10 to-cosmic-accent/10">
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cosmic-accent to-cosmic-primary rounded-full"
            style={{ height: `${fillPercentage}%` }}
          />
        </div>
        
        <Clock className="absolute inset-0 h-4 w-4 m-auto text-cosmic-light/70" size={12} />
      </div>
      <span className="text-xs text-cosmic-light">{duration}</span>
    </div>
  );
};

export default DurationCapsule;
