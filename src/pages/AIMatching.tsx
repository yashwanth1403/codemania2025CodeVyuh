import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  LightbulbIcon,
  BotIcon,
  UserIcon,
  HexagonIcon,
  LinkIcon,
} from "lucide-react";
import ActionButton from "@/components/ActionButton";
import MatchProfileCard from "@/components/MatchProfileCard";
import SkillBubble from "@/components/SkillBubble";
import ProjectSuggestionCard from "@/components/ProjectSuggestionCard";

const skills = [
  { id: 1, name: "UI Design", level: 4, category: "design" },
  { id: 2, name: "React", level: 5, category: "frontend" },
  { id: 3, name: "Node.js", level: 3, category: "backend" },
  { id: 4, name: "Figma", level: 4, category: "design" },
  { id: 5, name: "Python", level: 3, category: "backend" },
  { id: 6, name: "Data Viz", level: 4, category: "analytics" },
  { id: 7, name: "UX Research", level: 2, category: "design" },
  { id: 8, name: "Arduino", level: 3, category: "hardware" },
  { id: 9, name: "AI/ML", level: 2, category: "data" },
];

const matchProfiles = [
  {
    id: 1,
    name: "Alex Chen",
    skills: ["UI Design", "Illustration", "Animation"],
    compatibility: 92,
    avatar: "https://i.pravatar.cc/150?img=1",
    department: "Digital Arts",
  },
  {
    id: 2,
    name: "Jordan Taylor",
    skills: ["Node.js", "MongoDB", "API Design"],
    compatibility: 89,
    avatar: "https://i.pravatar.cc/150?img=2",
    department: "Computer Science",
  },
  {
    id: 3,
    name: "Morgan Rivera",
    skills: ["Data Analysis", "Python", "Research"],
    compatibility: 85,
    avatar: "https://i.pravatar.cc/150?img=3",
    department: "Statistics",
  },
];

const projectSuggestions = [
  {
    id: 1,
    title: "AR Campus Tour Guide",
    description:
      "Create an AR application that guides new students around campus with interactive elements",
    difficulty: "Medium",
    duration: "72 hours",
    skills: ["Mobile Dev", "AR/VR", "UI Design"],
  },
  {
    id: 2,
    title: "Student Wellness Dashboard",
    description:
      "Build a dashboard that helps students track and improve their mental and physical wellbeing",
    difficulty: "Easy",
    duration: "48 hours",
    skills: ["Frontend", "Data Viz", "UX Research"],
  },
  {
    id: 3,
    title: "Sustainable Dining Tracker",
    description:
      "Design a system to track and reduce food waste in campus dining halls",
    difficulty: "Hard",
    duration: "96 hours",
    skills: ["IoT", "Backend", "Analytics"],
  },
];

const AIMatching = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("matches");
  const [matchPreferences, setMatchPreferences] = useState({
    sameProgram: false,
    complementarySkills: true,
    similarAvailability: true,
    previousCollabs: false,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const togglePreference = (preference: keyof typeof matchPreferences) => {
    setMatchPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              AI Matching
            </span>
            <span className="bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
              System
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Our neural network analyzes your skills, interests, and availability
            to find your ideal collaboration partners.
          </p>

          {/* Tab navigation */}
          <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
            <Button
              variant={activeSection === "matches" ? "default" : "outline"}
              onClick={() => setActiveSection("matches")}
              className={
                activeSection === "matches"
                  ? "bg-cosmic-primary"
                  : "border-cosmic-light/30 text-cosmic-light"
              }
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Matching Profiles
            </Button>
            <Button
              variant={activeSection === "skills" ? "default" : "outline"}
              onClick={() => setActiveSection("skills")}
              className={
                activeSection === "skills"
                  ? "bg-cosmic-primary"
                  : "border-cosmic-light/30 text-cosmic-light"
              }
            >
              <HexagonIcon className="mr-2 h-4 w-4" />
              Skill Constellation
            </Button>
            <Button
              variant={activeSection === "suggestions" ? "default" : "outline"}
              onClick={() => setActiveSection("suggestions")}
              className={
                activeSection === "suggestions"
                  ? "bg-cosmic-primary"
                  : "border-cosmic-light/30 text-cosmic-light"
              }
            >
              <LightbulbIcon className="mr-2 h-4 w-4" />
              Spark Ideas
            </Button>
          </div>

          {/* Content sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - matching preferences */}
            <div className="lg:col-span-1">
              <Card className="holographic-card border-0 p-6">
                <div className="flex items-center mb-6">
                  <BotIcon className="h-6 w-6 text-cosmic-accent mr-2" />
                  <h3 className="text-xl font-medium text-white">
                    AI Assistant
                  </h3>
                </div>

                <p className="text-sm text-gray-300 mb-6">
                  I'm analyzing your profile to find ideal collaborators. Adjust
                  your preferences for better matches.
                </p>

                <h4 className="text-sm font-medium text-cosmic-light mb-3">
                  Matching Preferences
                </h4>

                <div className="space-y-4">
                  {Object.entries(matchPreferences).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <Switch
                        checked={value}
                        onCheckedChange={() =>
                          togglePreference(key as keyof typeof matchPreferences)
                        }
                        className="data-[state=checked]:bg-cosmic-accent"
                      />
                    </div>
                  ))}
                </div>

                <Separator className="my-6 bg-white/10" />

                <Button className="w-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary">
                  Refresh Matches
                </Button>
              </Card>
            </div>

            {/* Right column - dynamic content based on active section */}
            <div className="lg:col-span-2">
              {activeSection === "matches" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium mb-4">
                    <span className="bg-gradient-to-r from-cosmic-light to-white bg-clip-text text-transparent">
                      Your Top Matches
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchProfiles.map((profile, index) => (
                      <MatchProfileCard
                        key={profile.id}
                        profile={profile}
                        delay={index * 0.2}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "skills" && (
                <div>
                  <h2 className="text-2xl font-medium mb-4">
                    <span className="bg-gradient-to-r from-cosmic-light to-white bg-clip-text text-transparent">
                      Your Skill Constellation
                    </span>
                  </h2>

                  <div className="holographic-card border-0 p-6 rounded-xl min-h-[400px] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="skill-constellation relative w-full h-full">
                        {skills.map((skill, index) => (
                          <SkillBubble
                            key={index}
                            label={skill.name}
                            category={skill.category}
                          />
                        ))}
                        <div className="absolute inset-0 pointer-events-none">
                          <svg className="w-full h-full">
                            <g className="skill-connections">
                              {/* Connection lines will be drawn here with JS */}
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "suggestions" && (
                <div>
                  <h2 className="text-2xl font-medium mb-4">
                    <span className="bg-gradient-to-r from-cosmic-light to-white bg-clip-text text-transparent">
                      Spark Ideas For You
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {projectSuggestions.map((project, index) => (
                      <ProjectSuggestionCard
                        key={project.id}
                        project={project}
                        delay={index * 0.2}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Action button */}
      <ActionButton />
    </div>
  );
};

export default AIMatching;
