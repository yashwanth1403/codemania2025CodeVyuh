import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, SparklesIcon, LogOut } from "lucide-react";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("user");
      setIsLoggedIn(!!userData);
    };

    checkAuth();
    // Set up listener for changes to localStorage
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-cosmic-primary/70 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SparklesIcon className="text-cosmic-light h-7 w-7" />
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-light to-cosmic-accent bg-clip-text text-transparent">
                CollabSpark
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/about" active={location.pathname === "/about"}>
              About
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink
                  href="/dashboard"
                  active={location.pathname === "/dashboard"}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  href="/challenges"
                  active={location.pathname === "/challenges"}
                >
                  Challenges
                </NavLink>
                <NavLink
                  href="/profile"
                  active={location.pathname === "/profile"}
                >
                  Profile
                </NavLink>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button
                variant="outline"
                className="backdrop-blur-sm border-cosmic-accent/30 text-cosmic-light hover:bg-cosmic-accent/10 hover:text-white hover:border-cosmic-accent"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="hidden sm:flex backdrop-blur-sm border-cosmic-accent/30 text-cosmic-light hover:bg-cosmic-accent/10 hover:text-white hover:border-cosmic-accent"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary">
                    Join Now
                  </Button>
                </Link>
              </>
            )}
            <Button
              variant="ghost"
              className="md:hidden text-cosmic-light hover:bg-cosmic-primary/20"
            >
              <MenuIcon size={24} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => {
  return (
    <Link
      to={href}
      className={`relative px-1 py-2 text-lg transition-all duration-300 group ${
        active ? "text-white font-medium" : "text-cosmic-light hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
          active
            ? "scale-x-100 bg-cosmic-accent"
            : "scale-x-0 bg-white group-hover:scale-x-100"
        }`}
      ></span>
    </Link>
  );
};

export default NavigationBar;
