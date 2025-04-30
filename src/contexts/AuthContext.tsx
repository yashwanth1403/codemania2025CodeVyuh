import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { demoUsers } from "@/lib/demoData";

interface Skill {
  name: string;
  category: string;
}

interface Interest {
  name: string;
  category: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface User {
  id?: string;
  clerkId: string;
  email: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  profileComplete?: boolean;
  skills?: Skill[];
  interests?: Interest[];
  socialLinks?: SocialLink[];
  xpPoints?: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate Clerk authentication
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Find user in demo data
      const demoUser = demoUsers.find((user) => user.email === email);

      if (!demoUser) {
        throw new Error("User not found");
      }

      // Clone the user to avoid reference issues
      const userData: User = JSON.parse(JSON.stringify(demoUser));

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Determine where to redirect - all demo users are complete
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Check if email already exists in demo data
      if (demoUsers.some((user) => user.email === email)) {
        throw new Error("Email already in use");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Create new user with demo data format
      const userData: User = {
        id: `user${Math.floor(Math.random() * 10000)}`,
        clerkId: `local_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 10)}`,
        email,
        name,
        username: email.split("@")[0],
        profileComplete: false,
        xpPoints: 0,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Always redirect to profile setup after signup
      navigate("/profile-setup");
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
