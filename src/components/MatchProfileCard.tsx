
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Profile {
  id: number;
  name: string;
  skills: string[];
  compatibility: number;
  avatar: string;
  department: string;
}

interface MatchProfileCardProps {
  profile: Profile;
  delay?: number;
}

const MatchProfileCard: React.FC<MatchProfileCardProps> = ({ profile, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate the color based on compatibility percentage
  const getCompatibilityColor = () => {
    if (profile.compatibility >= 90) return 'from-green-400 to-green-300';
    if (profile.compatibility >= 80) return 'from-teal-400 to-teal-300';
    if (profile.compatibility >= 70) return 'from-blue-400 to-blue-300';
    return 'from-purple-400 to-purple-300';
  };

  return (
    <div 
      className={`holographic-card rounded-xl p-5 transition-all duration-500 hover:shadow-[0_0_15px_rgba(123,58,237,0.5)] animate-fade-in`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start">
        {/* Avatar with compatibility ring */}
        <div className="relative">
          <div className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r animate-pulse-soft",
            getCompatibilityColor(),
            isHovered ? 'opacity-70 scale-110' : 'opacity-50'
          )} 
          style={{ 
            transform: `scale(${1.1 + (profile.compatibility / 100) * 0.2})`,
            filter: `blur(${isHovered ? 8 : 5}px)`,
            transition: 'all 0.5s ease'
          }}/>
          
          {profile.avatar ? (
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-white/20 relative z-10"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-cosmic-dark/60 flex items-center justify-center relative z-10">
              <UserIcon className="h-8 w-8 text-cosmic-light" />
            </div>
          )}
          
          <div className="absolute bottom-0 right-0 bg-cosmic-primary text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center border border-white/20 z-20">
            {profile.compatibility}%
          </div>
        </div>
        
        {/* Profile info */}
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-medium text-white">{profile.name}</h3>
          <p className="text-xs text-cosmic-light mb-2">{profile.department}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {profile.skills.map((skill, index) => (
              <span 
                key={index}
                className="inline-block text-xs px-2 py-0.5 rounded-full bg-cosmic-primary/20 text-cosmic-light"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs border-cosmic-light/30 text-cosmic-light hover:bg-cosmic-light/10"
        >
          View Profile
        </Button>
        <Button 
          size="sm"
          className="text-xs bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
        >
          Connect
        </Button>
      </div>
    </div>
  );
};

export default MatchProfileCard;
