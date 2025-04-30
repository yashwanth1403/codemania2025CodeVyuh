
import React from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FeaturedRibbonProps {
  className?: string;
}

const FeaturedRibbon: React.FC<FeaturedRibbonProps> = ({ className }) => {
  return (
    <div className={cn("absolute top-0 right-0", className)}>
      <div className="relative">
        <motion.div 
          className="absolute -top-1 -right-1 w-20 h-20 overflow-hidden rotate-45"
          style={{ transformOrigin: 'bottom left' }}
          animate={{
            boxShadow: [
              '0 0 5px rgba(123,58,237,0.3)',
              '0 0 15px rgba(123,58,237,0.5)',
              '0 0 5px rgba(123,58,237,0.3)'
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <div 
            className="absolute top-0 right-0 w-full h-8 bg-gradient-to-r from-cosmic-secondary to-cosmic-accent flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1]
              }}
            >
              <StarIcon className="h-3 w-3 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedRibbon;
