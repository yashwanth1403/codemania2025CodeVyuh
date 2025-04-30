import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SparklesIcon, UserIcon, MailIcon } from "lucide-react";
import PuzzlePiece from "@/components/PuzzlePiece";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signup(formData.name, formData.email, formData.password);
      // The AuthContext handles the redirection
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative flex items-center justify-center">
      {/* Dynamic background */}
      <div className="cosmic-gradient absolute inset-0 -z-10"></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

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

      <div className="w-full max-w-md p-4">
        <Card className="holographic-card border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="h-6 w-6 text-cosmic-accent" />
              <span className="font-bold text-xl bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
                CollabSpark
              </span>
            </div>
            <CardTitle className="text-2xl font-bold">
              Create Your Account
            </CardTitle>
            <CardDescription>
              Join thousands of students finding their perfect creative matches
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-900/20 border border-red-800 text-red-100 px-4 py-2 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-cosmic-light">
                  Full Name
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-cosmic-light/50" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-cosmic-dark/20 border-cosmic-light/20 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-cosmic-light">
                  Email Address
                </Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-cosmic-light/50" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-cosmic-dark/20 border-cosmic-light/20 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-cosmic-light">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-cosmic-dark/20 border-cosmic-light/20"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
              <div className="text-sm text-center text-cosmic-light">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cosmic-accent hover:underline"
                >
                  Log In
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
