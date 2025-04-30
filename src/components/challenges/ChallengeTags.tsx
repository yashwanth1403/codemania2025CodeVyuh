
import React from 'react';
import { motion } from 'framer-motion';

interface ChallengeTagsProps {
  category: string;
  tags: string[];
  isHovered?: boolean;
  className?: string;
}

const ChallengeTags: React.FC<ChallengeTagsProps> = ({ category, tags, isHovered, className }) => {
  return (
    <motion.div 
      className={`flex flex-wrap gap-1 mb-3 ${className}`}
      animate={isHovered ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
    >
      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-cosmic-primary/20 text-cosmic-light">
        {category}
      </span>
      {tags.map((tag, index) => (
        <span 
          key={index}
          className="inline-block text-xs px-2 py-0.5 rounded-full bg-cosmic-primary/20 text-cosmic-light"
        >
          {tag}
        </span>
      ))}
    </motion.div>
  );
};

export default ChallengeTags;
