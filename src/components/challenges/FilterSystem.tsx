
import React from 'react';
import { cn } from '@/lib/utils';
import FilterCrystal from './FilterCrystal';

interface FilterSystemProps {
  title: string;
  options: string[];
  activeOption: string;
  onOptionChange: (option: string) => void;
  className?: string;
}

const FilterSystem: React.FC<FilterSystemProps> = ({
  title,
  options,
  activeOption,
  onOptionChange,
  className
}) => {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-cosmic-light mb-2 block">
        {title}
      </label>
      <div className="holographic-card border-0 rounded-lg p-2">
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <FilterCrystal
              key={option}
              label={option}
              isActive={activeOption === option}
              onClick={() => onOptionChange(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSystem;
