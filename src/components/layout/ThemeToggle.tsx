'use client';

import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

// Define theme types
type ThemeType = 'default' | 'warm-beige';

export default function ThemeToggle() {
  // Initialize with warm-beige as the default theme
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('warm-beige');
  
  // Toggle between themes in sequence
  const cycleTheme = () => {
    const themeSequence: ThemeType[] = ['default', 'warm-beige'];
    const currentIndex = themeSequence.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeSequence.length;
    const nextTheme = themeSequence[nextIndex];
    
    setCurrentTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  };
  
  // Initialize theme from localStorage on component mount
  useEffect(() => {
    // Only run on client-side
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeType | null;
    if (savedTheme && ['default', 'warm-beige'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    } else {
      // If no theme is saved, set warm-beige as default and save to localStorage
      setCurrentTheme('warm-beige');
      localStorage.setItem('portfolio-theme', 'warm-beige');
    }
  }, []);
  
  // Update body class when theme changes
  useEffect(() => {
    // Remove all theme classes first
    document.body.classList.remove('theme-warm-beige');
    
    // Apply the current theme class if not default
    if (currentTheme === 'warm-beige') {
      document.body.classList.add('theme-warm-beige');
    }
  }, [currentTheme]);
  
  // Get the appropriate tooltip text based on current theme
  const getTooltipText = (): string => {
    switch(currentTheme) {
      case 'default': return 'Switch to warm beige theme';
      case 'warm-beige': return 'Switch to default theme';
      default: return 'Toggle theme';
    }
  };
  
  return (
    <button
      onClick={cycleTheme}
      className="theme-toggle"
      aria-label={getTooltipText()}
      title={getTooltipText()}
    >
      <Palette size={20} />
    </button>
  );
} 