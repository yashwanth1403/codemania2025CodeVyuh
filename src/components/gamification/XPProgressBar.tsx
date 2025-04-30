
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface XPProgressBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  className?: string;
  showToast?: boolean;
}

const XPProgressBar = ({ 
  currentXP, 
  maxXP, 
  level, 
  className,
  showToast = false 
}: XPProgressBarProps) => {
  const { toast } = useToast();
  const progress = Math.round((currentXP / maxXP) * 100);
  
  React.useEffect(() => {
    if (showToast && currentXP === maxXP) {
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached level ${level + 1}!`,
        variant: "default",
      });
    }
  }, [currentXP, maxXP, level, showToast, toast]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <div className="font-semibold">Level {level}</div>
        <div className="text-muted-foreground">{currentXP}/{maxXP} XP</div>
      </div>
      <div className="relative">
        <Progress 
          value={progress}
          className="h-3 bg-cosmic-dark/30" 
        />
        {progress > 0 && (
          <div 
            className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
            style={{ width: `${progress}%` }}
          >
            <div className="xp-particles absolute inset-0"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default XPProgressBar;
