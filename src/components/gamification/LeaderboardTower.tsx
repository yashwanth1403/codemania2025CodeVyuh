
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  position: number;
  isCurrentUser?: boolean;
}

interface LeaderboardTowerProps {
  title: string;
  users: LeaderboardUser[];
  className?: string;
}

const LeaderboardTower = ({
  title,
  users,
  className
}: LeaderboardTowerProps) => {
  const sortedUsers = [...users].sort((a, b) => a.position - b.position);
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-cosmic-dark text-white p-4 border-b border-cosmic-accent/20">
        <CardTitle className="text-xl flex items-center gap-2">
          <Trophy className="w-5 h-5 text-cosmic-accent" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative h-96 overflow-hidden">
        <div className="tower-bg absolute inset-0 bg-gradient-to-t from-cosmic-dark to-cosmic-primary opacity-30" />
        
        <div className="relative h-full flex flex-col-reverse">
          {sortedUsers.map((user, index) => {
            // Calculate height percentage based on position
            const heightPercent = Math.max(10, 100 - (user.position - 1) * 15);
            
            return (
              <div 
                key={user.id}
                className={cn(
                  "transition-all duration-500 ease-out",
                  "flex items-center justify-between px-4 py-2",
                  "border-t border-cosmic-light/10",
                  user.isCurrentUser && "bg-cosmic-accent/10"
                )}
                style={{
                  height: `${heightPercent}%`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full",
                    user.position <= 3 ? "bg-gradient-to-br from-cosmic-accent to-cosmic-light text-white" : "bg-cosmic-dark/40 text-white"
                  )}>
                    {user.position}
                  </div>
                  
                  <div className={cn(
                    "flex items-center gap-2",
                    index === 0 ? "animate-pulse-soft" : ""
                  )}>
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full bg-cosmic-dark/30"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-cosmic-dark/30 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className={cn(
                      "font-medium",
                      user.isCurrentUser ? "text-cosmic-accent" : "text-white"
                    )}>
                      {user.name}
                    </span>
                  </div>
                </div>
                
                <div className={cn(
                  "text-lg font-bold",
                  user.position === 1 ? "text-cosmic-accent" : "text-white"
                )}>
                  {user.score}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

function Trophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 11.5V14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2.5" />
      <path d="M5 8h14" />
      <path d="M10 17v3" />
      <path d="M14 17v3" />
      <path d="M9 20h6" />
      <path d="M6.4 9a1 1 0 0 0 .8 1h10.4a1 1 0 0 0 .8-1" />
      <path d="M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
    </svg>
  )
}

export default LeaderboardTower;
