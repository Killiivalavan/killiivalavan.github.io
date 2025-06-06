'use client';

import { useEffect, useState } from 'react';

interface ConnectionLineProps {
  path: string;
  isHighlighted: boolean;
  delay?: string;
}

export default function ConnectionLine({ path, isHighlighted, delay = '0s' }: ConnectionLineProps) {
  // Add client-side only state
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Base opacity
  const baseOpacity = mounted ? (isHighlighted ? 0.8 : 0.3) : 0;
  
  // Validate the path to ensure it's a valid SVG path string
  const isValidPath = (pathString: string): boolean => {
    // Basic validation - check if it starts with M and contains valid path commands
    return typeof pathString === 'string' && 
           pathString.trim().startsWith('M') && 
           pathString.length > 3;
  };
  
  // If path is invalid, don't render anything
  if (!isValidPath(path)) {
    return null;
  }
  
  return (
    <>
      {/* Base line - always visible */}
      <path
        d={path}
        fill="none"
        strokeWidth={isHighlighted ? 2 : 1}
        className={`transition-all duration-300 ${isHighlighted ? 'stroke-teal-accent' : 'stroke-muted'}`}
        strokeOpacity={baseOpacity}
        strokeLinecap="round"
      />
      
      {/* Subtle glow effect for all lines */}
      <path
        d={path}
        fill="none"
        strokeWidth={isHighlighted ? 3 : 2}
        className={`transition-all duration-300 ${isHighlighted ? 'stroke-teal-accent' : 'stroke-muted-foreground'}`}
        strokeOpacity={isHighlighted ? 0.2 : 0.05}
        strokeLinecap="round"
      />
      
      {/* Animated glow effect for highlighted lines */}
      {isHighlighted && (
        <path
          d={path}
          fill="none"
          strokeWidth={3}
          className="stroke-teal-accent animate-pulse"
          strokeOpacity={0.3}
          strokeLinecap="round"
          style={{
            animationDelay: delay,
            animationDuration: '2s',
          }}
        />
      )}
    </>
  );
} 