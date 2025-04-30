
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import SparkParticles from '@/components/SparkParticles';
import PuzzlePiece from '@/components/PuzzlePiece';
import ProjectCard from '@/components/ProjectCard';
import ActionButton from '@/components/ActionButton';
import { Button } from '@/components/ui/button';
import { SparklesIcon } from 'lucide-react';

const sampleProjects = [
  {
    id: 1,
    title: "Sustainable Campus App",
    description: "Design a mobile app that helps students track and reduce their carbon footprint on campus",
    participants: 3,
    maxParticipants: 5,
    duration: "48 hours",
    tags: ["Design", "Sustainability", "Mobile"]
  },
  {
    id: 2,
    title: "Mental Health Game",
    description: "Code a mini-game that promotes mental wellness and stress relief for students during finals",
    participants: 2,
    maxParticipants: 4,
    duration: "72 hours",
    tags: ["Game Dev", "Health", "Code"]
  },
  {
    id: 3,
    title: "AI Study Assistant",
    description: "Create a concept for an AI-powered study assistant that helps with time management",
    participants: 4,
    maxParticipants: 6,
    duration: "24 hours",
    tags: ["AI", "Productivity", "Education"]
  }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

      {/* Floating puzzle pieces */}
      <PuzzlePiece x="10%" y="20%" scale={1.2} rotationDeg={15} delay={0.2} />
      <PuzzlePiece x="85%" y="15%" scale={0.9} rotationDeg={-10} color="text-cosmic-accent/70" delay={0.5} />
      <PuzzlePiece x="70%" y="60%" scale={1.1} rotationDeg={5} color="text-cosmic-secondary/70" delay={0.3} />
      <PuzzlePiece x="20%" y="70%" scale={0.8} rotationDeg={-20} color="text-cosmic-accent/60" delay={0.7} />

      {/* Main content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <div className="mb-6">
            <h2 className={`text-sm uppercase tracking-wider text-cosmic-light mb-3 transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Micro-Collaboration Platform For Students
            </h2>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-100 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
                Connect. Create. 
              </span>
              <span className="bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
                Collaborate.
              </span>
            </h1>
            <p className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-200 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Join short-term creative challenges with other students across disciplines. 
              Find your perfect match for 1-3 day micro-projects and build your portfolio while having fun.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Button size="lg" className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary text-lg">
                Start Collaborating
              </Button>
              <Button size="lg" variant="outline" className="border-cosmic-light/30 text-cosmic-light hover:bg-cosmic-light/10 hover:border-cosmic-light text-lg">
                How It Works
              </Button>
            </div>
          </div>
        </div>

        {/* Featured projects section */}
        <section className={`mb-20 transition-all duration-1000 delay-500 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
                Active Challenges
              </span>
            </h2>
            <Button variant="link" className="text-cosmic-light hover:text-white">
              View All <SparklesIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                participants={project.participants}
                maxParticipants={project.maxParticipants}
                duration={project.duration}
                tags={project.tags}
                className={`transition-all duration-700 transform ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${0.6 + index * 0.2}s` }}
              />
            ))}
          </div>
        </section>

        {/* How it works section */}
        <section className={`mb-20 transition-all duration-1000 delay-700 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              How CollabSpark Works
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Create Your Profile",
                description: "Add your skills, interests, and availability for micro-collaborations"
              },
              {
                number: "02",
                title: "Match & Connect",
                description: "Our AI pairs you with complementary collaborators for short-term projects"
              },
              {
                number: "03",
                title: "Collaborate & Create",
                description: "Work together on bite-sized challenges and build your portfolio"
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="holographic-card p-6 rounded-xl group hover:shadow-[0_0_15px_rgba(123,58,237,0.5)]"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-cosmic-secondary to-cosmic-accent bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium mb-3 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-800 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              Ready to Spark Your Next Collaboration?
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of students finding their perfect creative match for micro-projects that boost skills and portfolios
          </p>
          <Button size="lg" className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary text-lg px-8 py-6">
            Join The Community <SparklesIcon className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>

      {/* Action button */}
      <ActionButton />
    </div>
  );
};

export default Index;
