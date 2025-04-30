
import React from 'react';
import { cn } from '@/lib/utils';
import ChallengeTile from './ChallengeTile';

interface CategoryHoneycombProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const CategoryHoneycomb: React.FC<CategoryHoneycombProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className
}) => {
  return (
    <div className={cn("flex flex-wrap gap-3 justify-center", className)}>
      {categories.map((category) => (
        <ChallengeTile
          key={category}
          category={category}
          isSelected={activeCategory === category}
          onSelect={onCategoryChange}
        />
      ))}
    </div>
  );
};

export default CategoryHoneycomb;
