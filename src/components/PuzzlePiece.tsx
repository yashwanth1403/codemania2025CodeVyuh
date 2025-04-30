
import React, { useState } from 'react';
import { Puzzle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PuzzlePieceProps {
  x: string;
  y: string;
  scale?: number;
  rotationDeg?: number;
  color?: string;
  delay?: number;
  className?: string;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  x,
  y,
  scale = 1,
  rotationDeg = 0,
  color = 'text-cosmic-light',
  delay = 0,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn("absolute transition-all duration-700", className)}
      style={{
        left: x,
        top: y,
        transform: `scale(${isHovered ? scale * 1.2 : scale}) rotate(${rotationDeg}deg)`,
        transition: `transform 0.5s ease, opacity 0.5s ease ${delay}s`,
        zIndex: 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Puzzle 
        className={cn(
          "animate-float transition-all duration-500",
          isHovered ? "text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : color
        )}
        size={48 * scale}
        strokeWidth={isHovered ? 2.5 : 1.5}
      />
      {isHovered && (
        <div className="absolute inset-0 -z-10 animate-sparkle">
          <div className="absolute inset-0 bg-white opacity-20 rounded-full blur-md"></div>
        </div>
      )}
    </div>
  );
};

export default PuzzlePiece;
