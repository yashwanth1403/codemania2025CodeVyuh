import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { HexagonIcon, StarIcon, Circle, Link2Icon } from "lucide-react";
import ActionButton from "@/components/ActionButton";
import SparkParticles from "@/components/SparkParticles";
import { motion } from "framer-motion";
import CategoryHoneycomb from "@/components/challenges/CategoryHoneycomb";
import FilterSystem from "@/components/challenges/FilterSystem";
import EnhancedChallengeCard from "@/components/challenges/EnhancedChallengeCard";
import { useToast } from "@/hooks/use-toast";

// Constants moved to the beginning for better organization
const filters = {
  categories: [
    "All",
    "Design",
    "Development",
    "Research",
    "Marketing",
    "Business",
    "Data Science",
  ],
  difficulty: ["All", "Beginner", "Intermediate", "Advanced"],
  duration: ["All", "24 hours", "48 hours", "72 hours", "1 week"],
};

const challenges = [
  {
    id: 1,
    title: "AI-Powered Study Assistant",
    description:
      "Design and prototype an AI chatbot that helps students organize their study schedule and provides personalized learning tips.",
    category: "Design",
    difficulty: "Intermediate",
    duration: "48 hours",
    participantsCount: 3,
    maxParticipants: 5,
    tags: ["AI/ML", "UX/UI", "Education"],
    featured: true,
  },
  {
    id: 2,
    title: "Campus Sustainability Dashboard",
    description:
      "Build a real-time dashboard that visualizes energy usage, waste management, and sustainability metrics across campus buildings.",
    category: "Development",
    difficulty: "Advanced",
    duration: "72 hours",
    participantsCount: 4,
    maxParticipants: 6,
    tags: ["Data Viz", "Full-Stack", "Sustainability"],
    featured: false,
  },
  {
    id: 3,
    title: "AR Campus Tour Guide",
    description:
      "Create an augmented reality experience that guides new students and visitors through important campus locations with interactive elements.",
    category: "Development",
    difficulty: "Advanced",
    duration: "72 hours",
    participantsCount: 2,
    maxParticipants: 4,
    tags: ["AR/VR", "Mobile", "3D Modeling"],
    featured: true,
  },
  {
    id: 4,
    title: "Student Mental Health App",
    description:
      "Design a mobile app focused on supporting student mental health through guided meditation, mood tracking, and resource connection.",
    category: "Design",
    difficulty: "Intermediate",
    duration: "48 hours",
    participantsCount: 3,
    maxParticipants: 5,
    tags: ["Health", "UX/UI", "Mobile"],
    featured: false,
  },
  {
    id: 5,
    title: "Campus Event Discovery Platform",
    description:
      "Build a platform that helps students discover events, clubs, and activities based on their interests and schedule.",
    category: "Development",
    difficulty: "Intermediate",
    duration: "72 hours",
    participantsCount: 5,
    maxParticipants: 6,
    tags: ["Web Dev", "Database", "API"],
    featured: false,
  },
  {
    id: 6,
    title: "Research Data Visualization Tool",
    description:
      "Create an interactive visualization tool to help researchers present complex data in intuitive, engaging ways.",
    category: "Data Science",
    difficulty: "Advanced",
    duration: "72 hours",
    participantsCount: 2,
    maxParticipants: 4,
    tags: ["Data Viz", "Analytics", "Research"],
    featured: true,
  },
];

const ChallengesHub: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [activeDuration, setActiveDuration] = useState("All");
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [connectionLines, setConnectionLines] = useState<
    { from: number; to: number }[]
  >([]);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);

    // Generate random connection lines between challenges
    const tempLines: { from: number; to: number }[] = [];

    challenges.forEach((challenge) => {
      const similarChallenges = challenges.filter(
        (c) =>
          c.id !== challenge.id &&
          (c.category === challenge.category ||
            c.tags.some((tag) => challenge.tags.includes(tag)))
      );

      if (similarChallenges.length > 0) {
        const randomSimilar =
          similarChallenges[
            Math.floor(Math.random() * similarChallenges.length)
          ];
        if (
          !tempLines.some(
            (line) =>
              (line.from === challenge.id && line.to === randomSimilar.id) ||
              (line.from === randomSimilar.id && line.to === challenge.id)
          )
        ) {
          tempLines.push({
            from: challenge.id,
            to: randomSimilar.id,
          });
        }
      }
    });

    setConnectionLines(tempLines);
  }, []);

  // Filter challenges based on selected filters
  useEffect(() => {
    let filtered = [...challenges];

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (challenge) => challenge.category === activeCategory
      );
    }

    if (activeDifficulty !== "All") {
      filtered = filtered.filter(
        (challenge) => challenge.difficulty === activeDifficulty
      );
    }

    if (activeDuration !== "All") {
      filtered = filtered.filter(
        (challenge) => challenge.duration === activeDuration
      );
    }

    setFilteredChallenges(filtered);
  }, [activeCategory, activeDifficulty, activeDuration]);

  const handleViewChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Selected",
      description: `You've selected challenge #${challengeId}`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Dynamic background */}
      <div className="cosmic-gradient absolute inset-0 -z-10"></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      {/* Navigation */}
      <NavigationBar />

      {/* Main content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              Challenge
            </span>
            <span className="bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Explore micro-collaboration challenges designed to spark creativity
            and build your portfolio in just a few days.
          </p>

          {/* Category Honeycomb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-xl font-semibold mb-4 text-cosmic-light">
              Browse by Category
            </h2>
            <CategoryHoneycomb
              categories={filters.categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Difficulty Filter */}
            <FilterSystem
              title="Difficulty Level"
              options={filters.difficulty}
              activeOption={activeDifficulty}
              onOptionChange={setActiveDifficulty}
            />

            {/* Duration Filter */}
            <FilterSystem
              title="Duration"
              options={filters.duration}
              activeOption={activeDuration}
              onOptionChange={setActiveDuration}
            />
          </div>

          {/* View toggle and results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-300">
              Showing{" "}
              <span className="font-medium text-white">
                {filteredChallenges.length}
              </span>{" "}
              challenges
            </p>

            <div className="flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-l-md ${
                  viewMode === "grid"
                    ? "bg-cosmic-primary text-white"
                    : "bg-cosmic-dark/40 text-gray-300 hover:bg-cosmic-dark/60"
                }`}
              >
                <HexagonIcon size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-r-md ${
                  viewMode === "list"
                    ? "bg-cosmic-primary text-white"
                    : "bg-cosmic-dark/40 text-gray-300 hover:bg-cosmic-dark/60"
                }`}
              >
                <Link2Icon size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Challenge cards */}
        <div>
          {filteredChallenges.length > 0 ? (
            <div
              className={`
              relative
              ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col space-y-4"
              }
            `}
            >
              {/* Connection lines between related challenges */}
              {viewMode === "grid" &&
                connectionLines.map((line, index) => {
                  const fromChallenge = filteredChallenges.find(
                    (c) => c.id === line.from
                  );
                  const toChallenge = filteredChallenges.find(
                    (c) => c.id === line.to
                  );

                  // Only draw lines if both challenges are in the filtered results
                  if (fromChallenge && toChallenge) {
                    return (
                      <div
                        key={`line-${index}`}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <svg
                          className="absolute inset-0 w-full h-full"
                          style={{ zIndex: -1 }}
                        >
                          <motion.line
                            x1="50%"
                            y1="50%"
                            x2="70%"
                            y2="30%"
                            stroke="rgba(124, 58, 237, 0.3)"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                              duration: 1.5,
                              delay: 1 + index * 0.2,
                            }}
                          />
                        </svg>
                      </div>
                    );
                  }
                  return null;
                })}

              {filteredChallenges.map((challenge, index) => (
                <EnhancedChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  viewMode={viewMode}
                  delay={index * 0.1}
                  onViewDetails={handleViewChallenge}
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-12 holographic-card border-0 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Circle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                No challenges found
              </h3>
              <p className="text-gray-300">
                Try adjusting your filters to find more challenges.
              </p>
              <Button
                className="mt-4 bg-cosmic-primary hover:bg-cosmic-primary/80"
                onClick={() => {
                  setActiveCategory("All");
                  setActiveDifficulty("All");
                  setActiveDuration("All");
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>

        {/* Create your own challenge CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="holographic-card border-0 rounded-xl p-8 max-w-3xl mx-auto">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear" }}
              className="mx-auto h-12 w-12 bg-gradient-to-r from-cosmic-secondary to-cosmic-accent rounded-full flex items-center justify-center mb-4"
            >
              <StarIcon className="text-white" size={24} />
            </motion.div>
            <h2 className="text-2xl font-bold mb-3">
              <span className="bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
                Don't see what you're looking for?
              </span>
            </h2>
            <p className="text-gray-300 mb-6">
              Create your own challenge and invite collaborators with
              complementary skills to join you.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
              >
                Create a Challenge
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Action button */}
      <ActionButton />
    </div>
  );
};

export default ChallengesHub;
