import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      // In a real implementation, this would call your API and Clerk SDK
      // For demo, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData: User = {
        clerkId: `user_${Math.random().toString(36).substring(2, 10)}`,
        email,
        name: "Demo User",
        profileComplete: false,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Determine where to redirect
      if (!userData.profileComplete) {
        navigate("/profile-setup");
      } else {
        navigate("/dashboard");
      }
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
      // In a real implementation, this would call your API and Clerk SDK
      // For demo, we'll simulate a successful signup
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData: User = {
        clerkId: `user_${Math.random().toString(36).substring(2, 10)}`,
        email,
        name,
        profileComplete: false,
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
