import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import XPProgressBar from "@/components/gamification/XPProgressBar";
import AchievementsGrid from "@/components/gamification/AchievementsGrid";
import LeaderboardTower from "@/components/gamification/LeaderboardTower";
import ActionButton from "@/components/ActionButton";
import { Star, Trophy, Award, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Achievement } from "@/components/gamification/AchievementsGrid";

// Sample user data
const userData = {
  id: "user-1",
  name: "Alex Chen",
  level: 7,
  currentXP: 350,
  maxXP: 500,
  joinDate: "2023-09-15",
  totalXP: 2850,
  completedChallenges: 12,
  collaborations: 5,
};

// Sample achievements data
const achievementsData: Achievement[] = [
  {
    id: "a1",
    title: "First Contribution",
    description: "Complete your first project contribution",
    type: "bronze",
    earned: true,
    earnedDate: "2023-09-20",
  },
  {
    id: "a2",
    title: "Team Player",
    description: "Collaborate on 5 different projects",
    type: "silver",
    earned: true,
    earnedDate: "2023-11-05",
  },
  {
    id: "a3",
    title: "Rising Star",
    description: "Earn 1000 XP total",
    type: "gold",
    earned: true,
    earnedDate: "2023-12-10",
  },
  {
    id: "a4",
    title: "Challenge Master",
    description: "Complete 10 challenges",
    type: "gold",
    earned: true,
    earnedDate: "2024-02-15",
  },
  {
    id: "a5",
    title: "Expert Collaborator",
    description: "Complete 25 successful collaborations",
    type: "platinum",
    earned: false,
    progress: 5,
    maxProgress: 25,
  },
  {
    id: "a6",
    title: "Innovation Pioneer",
    description: "Create a challenge that 50+ people participate in",
    type: "platinum",
    earned: false,
    progress: 12,
    maxProgress: 50,
  },
  {
    id: "a7",
    title: "Knowledge Sharer",
    description: "Help 10 new members with onboarding",
    type: "silver",
    earned: false,
    progress: 3,
    maxProgress: 10,
  },
  {
    id: "a8",
    title: "Community Connector",
    description: "Make connections with 20 other collaborators",
    type: "bronze",
    earned: true,
    earnedDate: "2024-01-05",
  },
];

// Sample leaderboard data
const leaderboardData = [
  {
    id: "user-5",
    name: "Jordan Lee",
    avatar: undefined,
    score: 8750,
    position: 1,
  },
  {
    id: "user-2",
    name: "Sam Harrison",
    avatar: undefined,
    score: 7320,
    position: 2,
  },
  {
    id: "user-3",
    name: "Taylor Swift",
    avatar: undefined,
    score: 6540,
    position: 3,
  },
  {
    id: "user-4",
    name: "Morgan James",
    avatar: undefined,
    score: 4200,
    position: 4,
  },
  {
    id: "user-1",
    name: "Alex Chen",
    avatar: undefined,
    score: 2850,
    position: 5,
    isCurrentUser: true,
  },
  {
    id: "user-6",
    name: "Jamie Rodriguez",
    avatar: undefined,
    score: 2100,
    position: 6,
  },
  {
    id: "user-7",
    name: "Casey Kim",
    avatar: undefined,
    score: 1890,
    position: 7,
  },
  {
    id: "user-8",
    name: "Riley Johnson",
    avatar: undefined,
    score: 980,
    position: 8,
  },
];

// Sample milestones data
const milestonesData = [
  { id: "m1", title: "Join the platform", completed: true },
  { id: "m2", title: "Complete profile setup", completed: true },
  { id: "m3", title: "Join first challenge", completed: true },
  { id: "m4", title: "Complete first collaboration", completed: true },
  { id: "m5", title: "Reach Level 5", completed: true },
  { id: "m6", title: "Earn 5 achievements", completed: true },
  { id: "m7", title: "Create your first challenge", completed: false },
  { id: "m8", title: "Reach Top 3 in leaderboard", completed: false },
];

const GamificationProfile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const [userState, setUserState] = useState(userData);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Demo function to simulate earning XP
  const earnXP = (amount: number) => {
    let newXP = userState.currentXP + amount;
    let newLevel = userState.level;
    let newMaxXP = userState.maxXP;
    let leveledUp = false;

    // Level up logic
    if (newXP >= newMaxXP) {
      newLevel += 1;
      newXP = newXP - newMaxXP;
      newMaxXP = Math.round(newMaxXP * 1.2); // Each level requires 20% more XP
      leveledUp = true;
    }

    setUserState({
      ...userState,
      currentXP: newXP,
      level: newLevel,
      maxXP: newMaxXP,
      totalXP: userState.totalXP + amount,
    });

    if (leveledUp) {
      // Show level up celebration
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached level ${newLevel}!`,
        variant: "default",
      });
    } else {
      // Show XP earned toast
      toast({
        title: "XP Earned!",
        description: `You gained ${amount} XP!`,
        variant: "default",
      });
    }
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
        <div
          className={`transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <Card className="border-cosmic-accent/20 overflow-hidden">
                <CardHeader className="bg-cosmic-dark pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-cosmic-accent/30 flex items-center justify-center border-2 border-cosmic-accent">
                        <span className="text-2xl font-bold">
                          {userState.level}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{userState.name}</h2>
                        <p className="text-sm text-gray-300">
                          Joined {userState.joinDate}
                        </p>
                      </div>
                    </div>
                    <Sparkles className="w-8 h-8 text-cosmic-accent animate-pulse-soft" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <XPProgressBar
                    currentXP={userState.currentXP}
                    maxXP={userState.maxXP}
                    level={userState.level}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cosmic-dark/30 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-300">Total XP</p>
                      <p className="text-xl font-bold text-cosmic-accent">
                        {userState.totalXP}
                      </p>
                    </div>
                    <div className="bg-cosmic-dark/30 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-300">Challenges</p>
                      <p className="text-xl font-bold text-cosmic-accent">
                        {userState.completedChallenges}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {achievementsData
                      .filter((a) => a.earned)
                      .slice(0, 4)
                      .map((achievement) => (
                        <div
                          key={achievement.id}
                          className="scale-75 origin-top-left"
                        >
                          <Award
                            className={`w-8 h-8 ${
                              achievement.type === "platinum"
                                ? "text-cyan-400"
                                : achievement.type === "gold"
                                ? "text-yellow-400"
                                : achievement.type === "silver"
                                ? "text-gray-300"
                                : "text-amber-700"
                            }`}
                          />
                        </div>
                      ))}
                    {achievementsData.filter((a) => a.earned).length > 4 && (
                      <div className="flex items-center justify-center w-8 h-8 bg-cosmic-dark/50 rounded-full">
                        <span className="text-xs">
                          +{achievementsData.filter((a) => a.earned).length - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col gap-2">
                    <Button
                      className="w-full bg-cosmic-accent hover:bg-cosmic-accent/80"
                      onClick={() => earnXP(50)}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Earn 50 XP (Demo)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full md:w-2/3">
              <Tabs defaultValue="achievements" className="w-full">
                <TabsList className="w-full bg-cosmic-dark/50">
                  <TabsTrigger
                    value="achievements"
                    className="flex-1 data-[state=active]:bg-cosmic-accent"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger
                    value="leaderboard"
                    className="flex-1 data-[state=active]:bg-cosmic-accent"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Leaderboard
                  </TabsTrigger>
                  <TabsTrigger
                    value="milestones"
                    className="flex-1 data-[state=active]:bg-cosmic-accent"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Milestones
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="achievements" className="pt-4">
                  <Card className="bg-cosmic-dark/30 border-cosmic-accent/20">
                    <CardHeader>
                      <CardTitle>Your Achievements</CardTitle>
                      <CardDescription className="text-gray-300">
                        Earned {achievementsData.filter((a) => a.earned).length}{" "}
                        of {achievementsData.length} achievements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AchievementsGrid achievements={achievementsData} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="leaderboard" className="pt-4">
                  <LeaderboardTower
                    title="XP Leaderboard"
                    users={leaderboardData}
                  />
                </TabsContent>

                <TabsContent value="milestones" className="pt-4">
                  <Card className="bg-cosmic-dark/30 border-cosmic-accent/20">
                    <CardHeader>
                      <CardTitle>Progress Milestones</CardTitle>
                      <CardDescription className="text-gray-300">
                        Completed{" "}
                        {milestonesData.filter((m) => m.completed).length} of{" "}
                        {milestonesData.length} milestones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute top-4 left-4 w-0.5 h-[calc(100%-2rem)] bg-cosmic-accent/30"></div>

                        <div className="space-y-8">
                          {milestonesData.map((milestone, index) => (
                            <div key={milestone.id} className="relative ml-8">
                              <div
                                className={`
                                absolute -left-10 top-0 w-8 h-8 rounded-full
                                flex items-center justify-center
                                ${
                                  milestone.completed
                                    ? "bg-cosmic-accent text-white"
                                    : "bg-cosmic-dark/50 text-gray-400"
                                }
                              `}
                              >
                                {milestone.completed ? (
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </svg>
                                ) : (
                                  index + 1
                                )}
                              </div>

                              {milestone.completed && (
                                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full animate-pulse-soft opacity-50 bg-cosmic-accent"></div>
                              )}

                              <div
                                className={`
                                p-4 rounded-lg
                                ${
                                  milestone.completed
                                    ? "bg-cosmic-accent/10 border border-cosmic-accent/30"
                                    : "bg-cosmic-dark/20 border border-gray-700"
                                }
                              `}
                              >
                                <h4
                                  className={
                                    milestone.completed
                                      ? "font-medium"
                                      : "text-gray-400"
                                  }
                                >
                                  {milestone.title}
                                </h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Action button */}
      <ActionButton />
    </div>
  );
};

export default GamificationProfile;
