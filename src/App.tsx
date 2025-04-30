import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Index from "./pages/Index";
import AIMatching from "./pages/AIMatching";
import ChallengesHub from "./pages/ChallengesHub";
import CreateChallenge from "./pages/CreateChallenge";
import GamificationProfile from "./pages/GamificationProfile";
import NotFound from "./pages/NotFound";
import ProfileSetup from "./pages/ProfileSetup";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// This is a wrapper component that provides the AuthProvider
// We need this because AuthProvider needs access to useNavigate which must be used inside Router
const AppWithAuth = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* All routes are now publicly accessible */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-matching" element={<AIMatching />} />
        <Route path="/challenges" element={<ChallengesHub />} />
        <Route path="/challenges/create" element={<CreateChallenge />} />
        <Route path="/profile" element={<GamificationProfile />} />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <AppWithAuth />
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
