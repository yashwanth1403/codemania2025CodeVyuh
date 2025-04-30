import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import {
  HexagonIcon,
  StarIcon,
  Circle,
  Link2Icon,
  FilterIcon,
  SlidersHorizontal,
} from "lucide-react";
import ActionButton from "@/components/ActionButton";
import { motion, AnimatePresence } from "framer-motion";
import CategoryHoneycomb from "@/components/challenges/CategoryHoneycomb";
import FilterSystem from "@/components/challenges/FilterSystem";
import EnhancedChallengeCard from "@/components/challenges/EnhancedChallengeCard";
import ChallengeDetails from "@/components/challenges/ChallengeDetails";
import { useToast } from "@/hooks/use-toast";
import {
  getAllChallenges,
  getChallengeById,
  joinChallenge,
  leaveChallenge,
  Challenge,
} from "@/services/challengeService";
import { formatDifficulty, calculateDuration } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

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

const ChallengesHub: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [activeDuration, setActiveDuration] = useState("All");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [connectionLines, setConnectionLines] = useState<
    { from: string; to: string }[]
  >([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch challenges on component mount
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getAllChallenges();
        setChallenges(data);
        setFilteredChallenges(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        toast({
          title: "Error",
          description: "Failed to load challenges. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [toast]);

  useEffect(() => {
    setIsLoaded(true);

    // Generate random connection lines between related challenges
    if (challenges.length > 0) {
      const tempLines: { from: string; to: string }[] = [];

      challenges.forEach((challenge) => {
        // Find similar challenges based on tags
        const similarChallenges = challenges.filter(
          (c) =>
            c.id !== challenge.id &&
            (c.category === challenge.category ||
              (c.tags &&
                challenge.tags &&
                c.tags.some((tag) => challenge.tags?.includes(tag))))
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
    }
  }, [challenges]);

  // Filter challenges based on selected filters
  useEffect(() => {
    if (challenges.length === 0) return;

    let filtered = [...challenges];

    // Category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (challenge) => challenge.category === activeCategory
      );
    }

    // Difficulty filter
    if (activeDifficulty !== "All") {
      const difficultyMap: Record<string, string> = {
        Beginner: "EASY",
        Intermediate: "MEDIUM",
        Advanced: "HARD",
      };

      filtered = filtered.filter(
        (challenge) => challenge.difficulty === difficultyMap[activeDifficulty]
      );
    }

    // Duration filter
    if (activeDuration !== "All") {
      filtered = filtered.filter((challenge) => {
        const duration = calculateDuration(
          challenge.startDate,
          challenge.endDate
        );
        return duration === activeDuration;
      });
    }

    setFilteredChallenges(filtered);
  }, [activeCategory, activeDifficulty, activeDuration, challenges]);

  // Handle challenge selection for detailed view
  const handleViewChallenge = async (challengeId: string) => {
    try {
      const challenge = await getChallengeById(challengeId);
      setSelectedChallenge(challenge);
    } catch (error) {
      console.error(`Error fetching challenge ${challengeId}:`, error);
      toast({
        title: "Error",
        description: "Failed to load challenge details. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle joining a challenge
  const handleJoinChallenge = async (challengeId: string) => {
    try {
      // If user is logged in, use their ID, otherwise create a temporary guest ID
      const participantId = user
        ? user.id
        : `guest_${Math.random().toString(36).substring(2, 9)}`;

      await joinChallenge(challengeId, participantId);

      // Update challenges data
      setChallenges((prev) =>
        prev.map((challenge) => {
          if (challenge.id === challengeId) {
            // Create a copy of the participants array or initialize it if it doesn't exist
            const participants = challenge.participants
              ? [...challenge.participants]
              : [];
            // Only add the user if they're not already in the array
            if (!participants.includes(participantId)) {
              participants.push(participantId);
            }
            return { ...challenge, participants };
          }
          return challenge;
        })
      );

      // If there's a selected challenge, update it as well
      if (selectedChallenge && selectedChallenge.id === challengeId) {
        const participants = selectedChallenge.participants
          ? [...selectedChallenge.participants]
          : [];
        if (!participants.includes(participantId)) {
          participants.push(participantId);
        }
        setSelectedChallenge({ ...selectedChallenge, participants });
      }

      toast({
        title: "Challenge Joined!",
        description: "You've successfully joined the challenge.",
      });

      return Promise.resolve();
    } catch (error) {
      console.error(`Error joining challenge ${challengeId}:`, error);
      toast({
        title: "Error",
        description: "Failed to join challenge. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  // Handle leaving a challenge
  const handleLeaveChallenge = async (challengeId: string) => {
    try {
      // If user is logged in, use their ID, otherwise we can't leave (this should rarely happen)
      const participantId = user ? user.id : null;

      if (!participantId) {
        toast({
          title: "Error",
          description:
            "Unable to identify your participation. Please try again.",
          variant: "destructive",
        });
        return Promise.reject("No participant ID");
      }

      await leaveChallenge(challengeId, participantId);

      // Update challenges data
      setChallenges((prev) =>
        prev.map((challenge) => {
          if (challenge.id === challengeId && challenge.participants) {
            const participants = challenge.participants.filter(
              (id) => id !== participantId
            );
            return { ...challenge, participants };
          }
          return challenge;
        })
      );

      // If there's a selected challenge, update it as well
      if (
        selectedChallenge &&
        selectedChallenge.id === challengeId &&
        selectedChallenge.participants
      ) {
        const participants = selectedChallenge.participants.filter(
          (id) => id !== participantId
        );
        setSelectedChallenge({ ...selectedChallenge, participants });
      }

      toast({
        title: "Challenge Left",
        description: "You've successfully left the challenge.",
      });

      return Promise.resolve();
    } catch (error) {
      console.error(`Error leaving challenge ${challengeId}:`, error);
      toast({
        title: "Error",
        description: "Failed to leave challenge. Please try again.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  // Format challenges for the EnhancedChallengeCard component
  const formatChallengeForCard = (challenge: Challenge) => {
    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      category: challenge.category || "Miscellaneous",
      difficulty: formatDifficulty(challenge.difficulty),
      duration: calculateDuration(challenge.startDate, challenge.endDate),
      participantsCount: challenge.participants?.length || 0,
      maxParticipants: challenge.maxParticipants || 5,
      tags: challenge.tags || [],
      featured: challenge.status === "ACTIVE",
    };
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
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
                Challenge
              </span>
              <span className="bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>

            {/* Mobile filter toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden mt-4 border-cosmic-light/30 text-cosmic-light"
            >
              <FilterIcon size={16} className="mr-2" />
              Filters
            </Button>
          </div>

          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Explore micro-collaboration challenges designed to spark creativity
            and build your portfolio in just a few days.
          </p>

          {/* Mobile filter section */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              showMobileFilters
                ? "max-h-[1000px] opacity-100 mb-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="holographic-card p-4 rounded-xl">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-cosmic-light mb-2">
                  Categories
                </h2>
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm ${
                        category === activeCategory
                          ? "bg-cosmic-primary text-white"
                          : "bg-cosmic-dark/40 text-gray-300 hover:bg-cosmic-dark/60"
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Difficulty Filter */}
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light mb-2">
                    Difficulty
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.difficulty.map((level) => (
                      <button
                        key={level}
                        className={`px-3 py-1 rounded-full text-xs ${
                          level === activeDifficulty
                            ? "bg-cosmic-primary text-white"
                            : "bg-cosmic-dark/40 text-gray-300 hover:bg-cosmic-dark/60"
                        }`}
                        onClick={() => setActiveDifficulty(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light mb-2">
                    Duration
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.duration.map((duration) => (
                      <button
                        key={duration}
                        className={`px-3 py-1 rounded-full text-xs ${
                          duration === activeDuration
                            ? "bg-cosmic-primary text-white"
                            : "bg-cosmic-dark/40 text-gray-300 hover:bg-cosmic-dark/60"
                        }`}
                        onClick={() => setActiveDuration(duration)}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Category Honeycomb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block mb-10"
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

          {/* Desktop Filters */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin mr-2">
                <Circle className="h-6 w-6 text-cosmic-accent" />
              </div>
              <p>Loading challenges...</p>
            </div>
          ) : filteredChallenges.length > 0 ? (
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
                  challenge={formatChallengeForCard(challenge)}
                  viewMode={viewMode}
                  delay={index * 0.1}
                  onViewDetails={() => handleViewChallenge(challenge.id)}
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
          <div className="holographic-card cosmic-border rounded-xl p-8 max-w-3xl mx-auto">
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
                onClick={() => navigate("/challenges/create")}
              >
                Create a Challenge
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Challenge Details Modal */}
      <AnimatePresence>
        {selectedChallenge && (
          <ChallengeDetails
            challenge={selectedChallenge}
            onClose={() => setSelectedChallenge(null)}
            onJoin={handleJoinChallenge}
            onLeave={handleLeaveChallenge}
          />
        )}
      </AnimatePresence>

      {/* Action button */}
      <ActionButton />
    </div>
  );
};

export default ChallengesHub;
