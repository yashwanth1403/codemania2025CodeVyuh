import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PuzzlePiece from "@/components/PuzzlePiece";
import { SparklesIcon, Users, Calendar, Trophy, Lightbulb } from "lucide-react";
import ActionButton from "@/components/ActionButton";

interface UserData {
  id?: string;
  clerkId: string;
  name: string;
  email: string;
  profileComplete?: boolean;
  username?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Load user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // No user data found, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

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
                  Welcome, {userData.name}
                </span>
              </h1>
              <p className="text-cosmic-light mt-2">
                Your collaboration journey begins here
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 md:mt-0 border-cosmic-accent/30 text-cosmic-light hover:bg-cosmic-accent/10"
              onClick={handleLogout}
            >
              Log Out
            </Button>
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
              {[
                {
                  title: "Sustainable Campus App",
                  description:
                    "Design a mobile app that helps students track and reduce their carbon footprint on campus",
                  participants: 3,
                  maxParticipants: 5,
                  duration: "48 hours",
                  tags: ["Design", "Sustainability", "Mobile"],
                },
                {
                  title: "Mental Health Game",
                  description:
                    "Code a mini-game that promotes mental wellness and stress relief for students during finals",
                  participants: 2,
                  maxParticipants: 4,
                  duration: "72 hours",
                  tags: ["Game Dev", "Health", "Code"],
                },
                {
                  title: "AI Study Assistant",
                  description:
                    "Create a concept for an AI-powered study assistant that helps with time management",
                  participants: 4,
                  maxParticipants: 6,
                  duration: "24 hours",
                  tags: ["AI", "Productivity", "Education"],
                },
              ].map((project, index) => (
                <Card
                  key={index}
                  className="holographic-card border-0 hover:shadow-lg transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex justify-between mb-3">
                      <div className="text-xs text-cosmic-light">
                        <span className="font-medium">
                          {project.participants}
                        </span>
                        /{project.maxParticipants} Members
                      </div>
                      <div className="text-xs text-cosmic-light">
                        {project.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, idx) => (
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
                  {[
                    {
                      message: "You completed your profile setup",
                      time: "Just now",
                      icon: (
                        <SparklesIcon className="h-5 w-5 text-cosmic-accent" />
                      ),
                    },
                    {
                      message: "Welcome to CollabSpark! Your journey begins",
                      time: "Today",
                      icon: <Users className="h-5 w-5 text-cosmic-secondary" />,
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b border-cosmic-primary/10"
                    >
                      <div className="bg-cosmic-primary/20 p-2 rounded-full">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-cosmic-light/60">
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

      {/* Action button */}
      <ActionButton />
    </div>
  );
};

export default Dashboard;
