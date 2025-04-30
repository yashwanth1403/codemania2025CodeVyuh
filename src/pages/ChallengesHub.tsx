
import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { HexagonIcon, StarIcon, Circle, Link2Icon } from 'lucide-react';
import ActionButton from '@/components/ActionButton';
import SparkParticles from '@/components/SparkParticles';
import ChallengeCard from '@/components/ChallengeCard';

const filters = {
  categories: [
    "All",
    "Design",
    "Development",
    "Research",
    "Marketing",
    "Business",
    "Data Science"
  ],
  difficulty: [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced"
  ],
  duration: [
    "All",
    "24 hours",
    "48 hours",
    "72 hours",
    "1 week"
  ]
};

const challenges = [
  {
    id: 1,
    title: "AI-Powered Study Assistant",
    description: "Design and prototype an AI chatbot that helps students organize their study schedule and provides personalized learning tips.",
    category: "Design",
    difficulty: "Intermediate",
    duration: "48 hours",
    participantsCount: 3,
    maxParticipants: 5,
    tags: ["AI/ML", "UX/UI", "Education"],
    featured: true
  },
  {
    id: 2,
    title: "Campus Sustainability Dashboard",
    description: "Build a real-time dashboard that visualizes energy usage, waste management, and sustainability metrics across campus buildings.",
    category: "Development",
    difficulty: "Advanced",
    duration: "72 hours",
    participantsCount: 4,
    maxParticipants: 6,
    tags: ["Data Viz", "Full-Stack", "Sustainability"],
    featured: false
  },
  {
    id: 3,
    title: "AR Campus Tour Guide",
    description: "Create an augmented reality experience that guides new students and visitors through important campus locations with interactive elements.",
    category: "Development",
    difficulty: "Advanced",
    duration: "72 hours",
    participantsCount: 2,
    maxParticipants: 4,
    tags: ["AR/VR", "Mobile", "3D Modeling"],
    featured: true
  },
  {
    id: 4,
    title: "Student Mental Health App",
    description: "Design a mobile app focused on supporting student mental health through guided meditation, mood tracking, and resource connection.",
    category: "Design",
    difficulty: "Intermediate",
    duration: "48 hours",
    participantsCount: 3,
    maxParticipants: 5,
    tags: ["Health", "UX/UI", "Mobile"],
    featured: false
  },
  {
    id: 5,
    title: "Campus Event Discovery Platform",
    description: "Build a platform that helps students discover events, clubs, and activities based on their interests and schedule.",
    category: "Development",
    difficulty: "Intermediate",
    duration: "72 hours",
    participantsCount: 5,
    maxParticipants: 6,
    tags: ["Web Dev", "Database", "API"],
    featured: false
  },
  {
    id: 6,
    title: "Research Data Visualization Tool",
    description: "Create an interactive visualization tool to help researchers present complex data in intuitive, engaging ways.",
    category: "Data Science",
    difficulty: "Advanced",
    duration: "72 hours",
    participantsCount: 2,
    maxParticipants: 4,
    tags: ["Data Viz", "Analytics", "Research"],
    featured: true
  }
];

const ChallengesHub = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [activeDuration, setActiveDuration] = useState("All");
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter challenges based on selected filters
  useEffect(() => {
    let filtered = [...challenges];
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(challenge => challenge.category === activeCategory);
    }
    
    if (activeDifficulty !== "All") {
      filtered = filtered.filter(challenge => challenge.difficulty === activeDifficulty);
    }
    
    if (activeDuration !== "All") {
      filtered = filtered.filter(challenge => challenge.duration === activeDuration);
    }
    
    setFilteredChallenges(filtered);
  }, [activeCategory, activeDifficulty, activeDuration]);

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Dynamic background */}
      <div className="cosmic-gradient absolute inset-0 -z-10"></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      {/* Navigation */}
      <NavigationBar />

      {/* Spark particles effect */}
      <SparkParticles />

      {/* Main content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className={`transition-all duration-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              Challenge 
            </span>
            <span className="bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            Explore micro-collaboration challenges designed to spark creativity and build your portfolio in just a few days.
          </p>

          {/* Filters */}
          <div className={`mb-8 transition-all duration-1000 delay-100 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-cosmic-light mb-2 block">
                  Category
                </label>
                <div className="holographic-card border-0 rounded-lg p-1">
                  <ToggleGroup 
                    type="single" 
                    value={activeCategory}
                    onValueChange={(value) => value && setActiveCategory(value)}
                    className="flex flex-wrap justify-start"
                  >
                    {filters.categories.map((category) => (
                      <ToggleGroupItem 
                        key={category} 
                        value={category}
                        className="text-xs m-1 data-[state=on]:bg-cosmic-primary data-[state=on]:text-white"
                      >
                        {category}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <label className="text-sm font-medium text-cosmic-light mb-2 block">
                  Difficulty Level
                </label>
                <div className="holographic-card border-0 rounded-lg p-1">
                  <ToggleGroup 
                    type="single" 
                    value={activeDifficulty}
                    onValueChange={(value) => value && setActiveDifficulty(value)}
                    className="flex flex-wrap justify-start"
                  >
                    {filters.difficulty.map((level) => (
                      <ToggleGroupItem 
                        key={level} 
                        value={level}
                        className="text-xs m-1 data-[state=on]:bg-cosmic-primary data-[state=on]:text-white"
                      >
                        {level}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              
              {/* Duration Filter */}
              <div>
                <label className="text-sm font-medium text-cosmic-light mb-2 block">
                  Duration
                </label>
                <div className="holographic-card border-0 rounded-lg p-1">
                  <ToggleGroup 
                    type="single" 
                    value={activeDuration}
                    onValueChange={(value) => value && setActiveDuration(value)}
                    className="flex flex-wrap justify-start"
                  >
                    {filters.duration.map((time) => (
                      <ToggleGroupItem 
                        key={time} 
                        value={time}
                        className="text-xs m-1 data-[state=on]:bg-cosmic-primary data-[state=on]:text-white"
                      >
                        {time}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
            </div>
            
            {/* View toggle and results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-300">
                Showing <span className="font-medium text-white">{filteredChallenges.length}</span> challenges
              </p>
              
              <div className="flex">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-md ${viewMode === 'grid' 
                    ? 'bg-cosmic-primary text-white' 
                    : 'bg-cosmic-dark/40 text-gray-300 hover:bg-cosmic-dark/60'}`}
                >
                  <HexagonIcon size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-md ${viewMode === 'list' 
                    ? 'bg-cosmic-primary text-white' 
                    : 'bg-cosmic-dark/40 text-gray-300 hover:bg-cosmic-dark/60'}`}
                >
                  <Link2Icon size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Challenge cards */}
          <div className={`transition-all duration-1000 delay-200 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {filteredChallenges.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'flex flex-col space-y-4'}
              `}>
                {filteredChallenges.map((challenge, index) => (
                  <ChallengeCard 
                    key={challenge.id}
                    challenge={challenge}
                    viewMode={viewMode}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 holographic-card border-0 rounded-xl">
                <Circle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No challenges found</h3>
                <p className="text-gray-300">Try adjusting your filters to find more challenges.</p>
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
              </div>
            )}
          </div>

          {/* Create your own challenge CTA */}
          <div className={`mt-12 text-center transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="holographic-card border-0 rounded-xl p-8 max-w-3xl mx-auto">
              <StarIcon className="mx-auto h-10 w-10 text-cosmic-accent mb-4" />
              <h2 className="text-2xl font-bold mb-3">
                <span className="bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
                  Don't see what you're looking for?
                </span>
              </h2>
              <p className="text-gray-300 mb-6">
                Create your own challenge and invite collaborators with complementary skills to join you.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
              >
                Create a Challenge
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Action button */}
      <ActionButton />
    </div>
  );
};

export default ChallengesHub;
