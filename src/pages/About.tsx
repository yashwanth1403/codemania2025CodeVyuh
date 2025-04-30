import React, { useEffect, useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import PuzzlePiece from "@/components/PuzzlePiece";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
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
      <PuzzlePiece
        x="20%"
        y="70%"
        scale={0.8}
        rotationDeg={-20}
        color="text-cosmic-accent/60"
        delay={0.7}
      />

      {/* Main content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <div className="mb-6">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-100 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
                About CollabSpark
              </span>
            </h1>
            <p
              className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-200 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Our mission is to transform how students collaborate on creative
              projects
            </p>
          </div>
        </div>

        {/* About sections */}
        <section
          className={`mb-16 transition-all duration-1000 delay-400 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="holographic-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-cosmic-light">
                Our Story
              </h2>
              <p className="text-gray-300 mb-4">
                CollabSpark was born from a simple observation: students from
                different disciplines rarely get to work together on creative
                projects, despite the incredible potential of interdisciplinary
                collaboration.
              </p>
              <p className="text-gray-300">
                Founded by a team of university students in 2023, our platform
                aims to break down the silos between academic disciplines and
                create opportunities for micro-collaborations that fit into busy
                student schedules.
              </p>
            </div>

            <div className="holographic-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-cosmic-light">
                Why Micro-Collaboration?
              </h2>
              <p className="text-gray-300 mb-4">
                Traditional collaboration often requires long-term commitments
                that students cannot always make. Our platform focuses on
                short-term projects (1-3 days) that:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Fit between classes and other commitments</li>
                <li>Create quick portfolio-building opportunities</li>
                <li>Allow students to experiment with new skills</li>
                <li>Build a diverse network across disciplines</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className={`mb-16 transition-all duration-1000 delay-600 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              What Makes Us Different
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Matching",
                description:
                  "Our algorithm pairs students based on complementary skills and learning goals, not just availability",
              },
              {
                title: "Focus on Learning",
                description:
                  "Projects are designed to be educational and skill-building, not just task-oriented",
              },
              {
                title: "Gamified Experience",
                description:
                  "Earn XP, unlock achievements, and build a visual representation of your collaboration journey",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="holographic-card p-6 rounded-xl group hover:shadow-[0_0_15px_rgba(123,58,237,0.5)]"
              >
                <h3 className="text-xl font-medium mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team section */}
        <section
          className={`mb-16 transition-all duration-1000 delay-800 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              Our Team
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: "Alex Chen",
                role: "Founder & CEO",
                background: "Computer Science",
              },
              {
                name: "Maya Rodriguez",
                role: "Head of Design",
                background: "Graphic Design",
              },
              {
                name: "Jamal Wilson",
                role: "Lead Developer",
                background: "Software Engineering",
              },
              {
                name: "Sarah Kim",
                role: "Community Manager",
                background: "Communications",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="holographic-card p-6 rounded-xl text-center group hover:shadow-[0_0_15px_rgba(0,204,255,0.5)]"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-secondary to-cosmic-accent mx-auto mb-4"></div>
                <h3 className="text-xl font-medium mb-1 text-white">
                  {member.name}
                </h3>
                <p className="text-cosmic-accent mb-1">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.background}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-900 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              Ready to Join the Revolution?
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Create your profile now and start matching with other students for
            your next micro-collaboration
          </p>
          <Link to="/profile-setup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary text-lg px-8 py-6"
            >
              Get Started Now
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default About;
