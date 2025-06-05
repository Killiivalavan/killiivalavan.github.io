'use client';

import { useState, useEffect } from 'react';
import { SkillNode as SkillNodeType } from '@/lib/skillTreeUtils';
import { NodePosition } from '@/lib/skillTreeUtils';

interface SkillNodeProps {
  node: SkillNodeType;
  position: NodePosition;
  onHover: (id: string | null) => void;
  isHighlighted: boolean;
  showTooltip: boolean;
  isHovered: boolean;
}

export default function SkillNode({ 
  node, 
  position, 
  onHover, 
  isHighlighted, 
  showTooltip,
  isHovered
}: SkillNodeProps) {
  const Icon = node.icon;
  // Add client-side only state for tooltip
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleMouseEnter = () => {
    onHover(node.id);
  };
  
  const handleMouseLeave = () => {
    onHover(null);
  };
  
  // Determine the size based on the level (center node is larger)
  const size = node.level === 0 ? 60 : 40;
  
  // Calculate position with offset to center the node
  const left = position.x - size / 2;
  const top = position.y - size / 2;
  
  // Determine the glow intensity based on whether it's highlighted
  const glowIntensity = isHighlighted ? 'shadow-lg shadow-teal-accent/20' : '';
  const borderIntensity = isHighlighted ? 'border-teal-accent' : 'border-border/70';
  
  // Add subtle animation based on node level
  const animationDelay = `${(node.id.length * 0.5) % 5}s`;
  const animationClass = node.level === 0 
    ? 'animate-pulse' 
    : isHighlighted 
      ? 'animate-pulse' 
      : '';

  // Calculate tooltip position based on node's angle in the tree
  // This helps avoid overlaps by placing the tooltip in a strategic position
  const getTooltipPosition = () => {
    // Use the node's angle to determine the best position for the tooltip
    // Angles are in degrees (0-360)
    const angle = node.angle;
    
    // Define positions based on angle quadrants
    if (angle >= 315 || angle < 45) {
      // Right side - place tooltip to the right
      return {
        className: "absolute top-1/2 left-full transform -translate-y-1/2 ml-3",
        arrowClass: "absolute top-1/2 -left-1 transform -translate-y-1/2 rotate-180"
      };
    } else if (angle >= 45 && angle < 135) {
      // Bottom side - place tooltip below
      return {
        className: "absolute top-full left-1/2 transform -translate-x-1/2 mt-3",
        arrowClass: "absolute -top-1 left-1/2 transform -translate-x-1/2 -rotate-90"
      };
    } else if (angle >= 135 && angle < 225) {
      // Left side - place tooltip to the left
      return {
        className: "absolute top-1/2 right-full transform -translate-y-1/2 mr-3",
        arrowClass: "absolute top-1/2 -right-1 transform -translate-y-1/2"
      };
    } else {
      // Top side - place tooltip above
      return {
        className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3",
        arrowClass: "absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-90"
      };
    }
  };
  
  const tooltipPosition = getTooltipPosition();
  
  return (
    <div
      id={`skill-node-${node.id}`}
      className={`absolute rounded-full flex items-center justify-center bg-[#050c0c] 
                 ${glowIntensity} ${borderIntensity} border-2 transition-all duration-300
                 hover:shadow-lg hover:shadow-teal-accent/30 hover:border-teal-accent
                 ${animationClass}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}px`,
        top: `${top}px`,
        zIndex: isHovered ? 20 : 10, // Increase z-index for hovered nodes
        animationDelay,
        animationDuration: '3s',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className={`${node.level === 0 ? 'w-6 h-6' : 'w-5 h-5'} ${isHighlighted ? 'text-teal-accent' : 'text-muted-foreground'}`} />
      
      {/* Only show tooltips on client-side to prevent hydration mismatches */}
      {mounted && showTooltip && (
        <div 
          className={`${tooltipPosition.className} 
                    fixed-tooltip bg-[#050c0c]/95 text-popover-foreground px-2 py-1 rounded text-xs 
                    whitespace-nowrap transition-opacity duration-200 border border-border/30 backdrop-blur-sm
                    ${isHovered ? 'opacity-100 font-medium' : 'opacity-80'}`}
          style={{ 
            zIndex: 100 // Much higher z-index to ensure it's always on top
          }}
        >
          <div className="tooltip-content relative">
            {node.name}
          </div>
        </div>
      )}
    </div>
  );
} 