
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SparklesIcon, CirclePlusIcon, PuzzleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionItem {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const ActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const actionItems: ActionItem[] = [
    {
      icon: PuzzleIcon,
      label: "Find Project",
      onClick: () => console.log("Find Project clicked")
    },
    {
      icon: SparklesIcon,
      label: "Create Challenge",
      onClick: () => console.log("Create Challenge clicked")
    }
  ];
  
  return (
    <div className="fixed bottom-8 right-8 z-40">
      <Button
        onClick={toggleMenu}
        className={cn(
          "w-14 h-14 rounded-full bg-gradient-to-r from-cosmic-primary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-primary transition-all duration-300 p-0 shadow-lg",
          isOpen && "rotate-45"
        )}
      >
        <CirclePlusIcon size={24} className="text-white" />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col items-end gap-3">
          {actionItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm">
                {item.label}
              </span>
              <Button
                onClick={item.onClick}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary transition-all duration-300 p-0"
              >
                <item.icon size={20} className="text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionButton;
