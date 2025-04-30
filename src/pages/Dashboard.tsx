import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PuzzlePiece from "@/components/PuzzlePiece";
import {
  SparklesIcon,
  Users,
  Calendar,
  Trophy,
  Lightbulb,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { demoProjects, demoChallenges } from "@/lib/demoData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Format date for activity items
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Dynamic background */}
      <div className="cosmic-gradient absolute inset-0 -z-10"></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      {/* Navigation */}
      <NavigationBar />

      {/* Floating puzzle pieces */}
      <PuzzlePiece x="10%" y="20%" scale={1.2} rotationDeg={15} delay={0.2} />
      <PuzzlePiece
        x="85%"
        y="15%"
        scale={0.9}
        rotationDeg={-10}
        color="text-cosmic-accent/70"
        delay={0.5}
      />
      <PuzzlePiece
        x="70%"
        y="60%"
        scale={1.1}
        rotationDeg={5}
        color="text-cosmic-secondary/70"
        delay={0.3}
      />

      {/* Main content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div
          className={`transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
                  Welcome, {user ? user.name : "Explorer"}
                </span>
              </h1>
              <p className="text-cosmic-light mt-2">
                Your collaboration journey begins here
              </p>
            </div>
            {user ? (
              <Button
                variant="outline"
                className="mt-4 md:mt-0 border-cosmic-accent/30 text-cosmic-light hover:bg-cosmic-accent/10"
                onClick={logout}
              >
                Log Out
              </Button>
            ) : (
              <Button
                variant="outline"
                className="mt-4 md:mt-0 border-cosmic-accent/30 text-cosmic-light hover:bg-cosmic-accent/10"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                title: "Find Collaborators",
                description: "Connect with students who complement your skills",
                icon: <Users className="h-10 w-10 text-cosmic-accent" />,
                action: () => navigate("/ai-matching"),
              },
              {
                title: "Explore Challenges",
                description:
                  "Discover micro-projects that match your interests",
                icon: <Lightbulb className="h-10 w-10 text-cosmic-secondary" />,
                action: () => navigate("/challenges"),
              },
              {
                title: "Create Challenge",
                description: "Design your own micro-collaboration opportunity",
                icon: <Plus className="h-10 w-10 text-emerald-400" />,
                action: () => navigate("/challenges/create"),
              },
              {
                title: "Upcoming Deadlines",
                description: "View your active project timelines",
                icon: <Calendar className="h-10 w-10 text-indigo-400" />,
                action: () => console.log("View deadlines"),
              },
              {
                title: "Your Achievements",
                description: "Track your progress and earned badges",
                icon: <Trophy className="h-10 w-10 text-amber-400" />,
                action: () => navigate("/profile"),
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="holographic-card border-0 cursor-pointer hover:shadow-lg transition-all"
                onClick={item.action}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    {item.icon}
                    <SparklesIcon className="h-5 w-5 text-cosmic-light/40" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {demoProjects.map((project, index) => (
                <Card
                  key={index}
                  className="holographic-card border-0 hover:shadow-lg transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-4">
                      {project.description.length > 150
                        ? `${project.description.substring(0, 150)}...`
                        : project.description}
                    </p>
                    <div className="flex justify-between mb-3">
                      <div className="text-xs text-cosmic-light">
                        <span className="font-medium">
                          {project.members.length}
                        </span>
                        /6 Members
                      </div>
                      <div className="text-xs text-cosmic-light">
                        {project.status}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-cosmic-primary/30 border border-cosmic-primary/20 rounded-full px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cosmic-light to-white bg-clip-text text-transparent">
                Recent Activity
              </span>
            </h2>
            <Card className="holographic-card border-0">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Use demo challenges as activity items */}
                  {[
                    {
                      message: `New challenge posted: ${demoChallenges[0].title}`,
                      time: formatDate(demoChallenges[0].deadline),
                      icon: (
                        <SparklesIcon className="h-5 w-5 text-cosmic-accent" />
                      ),
                    },
                    {
                      message: `${demoProjects[1].title} is recruiting new members`,
                      time: formatDate(demoProjects[1].createdAt),
                      icon: <Users className="h-5 w-5 text-indigo-400" />,
                    },
                    {
                      message: `You joined ${demoProjects[0].title}`,
                      time: formatDate(demoProjects[0].createdAt),
                      icon: (
                        <SparklesIcon className="h-5 w-5 text-cosmic-secondary" />
                      ),
                    },
                    {
                      message: "You completed your profile setup",
                      time: "30 days ago",
                      icon: (
                        <SparklesIcon className="h-5 w-5 text-cosmic-accent" />
                      ),
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="p-1 bg-cosmic-dark/50 rounded-full">
                        {activity.icon}
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-cosmic-light mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
