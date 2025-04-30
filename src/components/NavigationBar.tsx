
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, SparklesIcon } from 'lucide-react';

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
      isScrolled ? 'bg-cosmic-dark/70 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
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
            <NavLink href="/" active={location.pathname === '/'}>Home</NavLink>
            <NavLink href="/ai-matching" active={location.pathname === '/ai-matching'}>AI Matching</NavLink>
            <NavLink href="/challenges" active={location.pathname === '/challenges'}>Challenges</NavLink>
            <NavLink href="/about" active={location.pathname === '/about'}>About</NavLink>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex backdrop-blur-sm border-cosmic-accent/30 text-cosmic-light hover:bg-cosmic-accent/10 hover:text-white hover:border-cosmic-accent">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary">
              Join Now
            </Button>
            <Button variant="ghost" className="md:hidden text-cosmic-light hover:bg-cosmic-primary/20">
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
        active ? 'text-white font-medium' : 'text-cosmic-light hover:text-white'
      }`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
        active ? 'scale-x-100 bg-cosmic-accent' : 'scale-x-0 bg-white group-hover:scale-x-100'
      }`}></span>
    </Link>
  );
};

export default NavigationBar;
