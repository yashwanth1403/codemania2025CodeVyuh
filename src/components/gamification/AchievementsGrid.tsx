
import React from 'react';
import AchievementBadge, { AchievementType } from './AchievementBadge';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: AchievementType;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
}

interface AchievementsGridProps {
  achievements: Achievement[];
  className?: string;
}

const AchievementsGrid = ({ achievements, className }: AchievementsGridProps) => {
  // Group achievements by type
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.type]) {
      acc[achievement.type] = [];
    }
    acc[achievement.type].push(achievement);
    return acc;
  }, {} as Record<AchievementType, Achievement[]>);
  
  // Order to display types
  const typeOrder: AchievementType[] = ['platinum', 'gold', 'silver', 'bronze'];
  
  return (
    <div className={className}>
      {typeOrder.map((type) => {
        const typeAchievements = groupedAchievements[type] || [];
        if (typeAchievements.length === 0) return null;
        
        return (
          <div key={type} className="mb-6">
            <h3 className="text-lg font-semibold mb-3 capitalize">{type} Achievements</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {typeAchievements.map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  type={achievement.type}
                  earned={achievement.earned}
                  date={achievement.earnedDate}
                  progress={achievement.progress}
                  maxProgress={achievement.maxProgress}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementsGrid;
