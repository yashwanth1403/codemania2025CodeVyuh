import React, { useState } from "react";
import { HexagonIcon, X } from "lucide-react";
import { cn } from "../lib/utils";

interface SkillBubbleProps {
  label: string;
  category?: string;
  color?: string;
  onRemove?: () => void;
}

const SkillBubble: React.FC<SkillBubbleProps> = ({
  label,
  category = "Other",
  color = "blue",
  onRemove,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get category color
  const getCategoryColor = () => {
    if (color === "green") return "from-green-400 to-emerald-400";
    if (color === "purple") return "from-purple-400 to-pink-400";
    if (color === "orange") return "from-orange-400 to-amber-400";
    if (color === "yellow") return "from-yellow-400 to-amber-300";
    if (color === "red") return "from-red-400 to-rose-400";
    if (color === "gray") return "from-gray-400 to-slate-400";

    // Default blue
    return "from-blue-400 to-cyan-400";
  };

  const baseColor =
    color === "green"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-blue-100 text-blue-700 border-blue-200";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full border",
        baseColor,
        "transition-all duration-300 hover:shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-xs font-medium">{label}</span>
      {category && (
        <span className="text-xs opacity-60">·&nbsp;{category}</span>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            "ml-1 rounded-full flex items-center justify-center w-4 h-4",
            "hover:bg-white transition-colors"
          )}
        >
          <X size={12} className="text-current" />
        </button>
      )}
    </div>
  );
};

export default SkillBubble;
