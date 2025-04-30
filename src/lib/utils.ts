import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Create a formatted date string from a Date object or string
 */
export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  // Format in a human-readable format
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Convert a difficulty value to a user-friendly string
 */
export function formatDifficulty(difficulty: string): string {
  const difficultyMap: Record<string, string> = {
    EASY: "Beginner",
    MEDIUM: "Intermediate",
    HARD: "Advanced",
  };

  return difficultyMap[difficulty] || difficulty;
}

/**
 * Convert a duration to a user-friendly string
 */
export function calculateDuration(
  startDate: Date | string,
  endDate: Date | string
): string {
  if (typeof startDate === "string") {
    startDate = new Date(startDate);
  }

  if (typeof endDate === "string") {
    endDate = new Date(endDate);
  }

  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return "24 hours";
  } else if (diffDays <= 2) {
    return "48 hours";
  } else if (diffDays <= 3) {
    return "72 hours";
  } else if (diffDays <= 7) {
    return "1 week";
  } else if (diffDays <= 14) {
    return "2 weeks";
  } else if (diffDays <= 30) {
    return "1 month";
  } else {
    return `${Math.floor(diffDays / 30)} months`;
  }
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Parse tags from a comma-separated string
 */
export function parseTags(tagsString: string): string[] {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * Format tags into a comma-separated string
 */
export function formatTags(tags: string[]): string {
  return tags.join(", ");
}
