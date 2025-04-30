
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Trophy, Star, Sparkles } from "lucide-react";
import { cn } from '@/lib/utils';

export type AchievementType = 'bronze' | 'silver' | 'gold' | 'platinum';

interface AchievementBadgeProps {
  title: string;
  description: string;
  type: AchievementType;
  earned: boolean;
  date?: string;
  progress?: number;
  maxProgress?: number;
  className?: string;
}

const AchievementBadge = ({
  title,
  description,
  type,
  earned,
  date,
  progress = 0,
  maxProgress = 1,
  className
}: AchievementBadgeProps) => {
  const typeConfig = {
    bronze: {
      icon: Trophy,
      bgClass: 'bg-amber-700/20',
      borderClass: 'border-amber-700',
      textClass: 'text-amber-500',
    },
    silver: {
      icon: Trophy,
      bgClass: 'bg-slate-400/20',
      borderClass: 'border-slate-400',
      textClass: 'text-slate-300',
    },
    gold: {
      icon: Trophy,
      bgClass: 'bg-yellow-500/20',
      borderClass: 'border-yellow-500',
      textClass: 'text-yellow-500',
    },
    platinum: {
      icon: Star,
      bgClass: 'bg-cyan-500/20',
      borderClass: 'border-cyan-500',
      textClass: 'text-cyan-400',
    }
  };
  
  const Icon = typeConfig[type].icon;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          className={cn(
            "group relative cursor-pointer",
            "perspective-1000",
            earned ? "opacity-100" : "opacity-50 grayscale",
            className
          )}
        >
          <div 
            className={cn(
              "badge-container relative rounded-full h-14 w-14 flex items-center justify-center",
              "transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180",
              typeConfig[type].bgClass,
              typeConfig[type].borderClass,
              "border-2"
            )}
          >
            <div className="achievement-front absolute inset-0 flex items-center justify-center backface-hidden">
              <Icon 
                className={cn("w-8 h-8", typeConfig[type].textClass)} 
              />
              {earned && (
                <Sparkles 
                  className="absolute w-full h-full text-yellow-300/50 animate-pulse-soft" 
                />
              )}
            </div>
            <div className="achievement-back absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180">
              <span className={cn("text-xs font-bold", typeConfig[type].textClass)}>
                {type.toUpperCase()}
              </span>
            </div>
          </div>
          {!earned && maxProgress > 1 && (
            <span className="absolute -bottom-2 -right-2 text-xs bg-cosmic-dark/80 px-2 py-0.5 rounded-full">
              {progress}/{maxProgress}
            </span>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 overflow-hidden" align="center">
        <div className={cn(
          "p-4", 
          earned 
            ? `${typeConfig[type].bgClass} border-b-2 ${typeConfig[type].borderClass}`
            : "bg-muted/50 border-b-2 border-gray-500"
        )}>
          <div className="flex items-center gap-2">
            <Icon className={cn("w-5 h-5", earned ? typeConfig[type].textClass : "text-gray-400")} />
            <h3 className="font-semibold">{title}</h3>
            {earned && <Badge variant="secondary" className="ml-auto">Earned</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="p-3 bg-card">
          {earned && date && (
            <p className="text-xs text-muted-foreground">
              Earned on {date}
            </p>
          )}
          {!earned && maxProgress > 1 && (
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full", 
                  typeConfig[type].bgClass
                )} 
                style={{ width: `${(progress / maxProgress) * 100}%` }}
              />
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AchievementBadge;
