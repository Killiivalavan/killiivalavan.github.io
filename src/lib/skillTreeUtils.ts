import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface SkillNode {
  id: string;
  name: string;
  icon: LucideIcon | IconType;
  level: number; // 0 = center, 1 = first ring, 2 = second ring, etc.
  angle: number; // degrees (0-360)
  connections: string[]; // IDs of connected nodes
}

export interface NodePosition {
  x: number;
  y: number;
}

/**
 * Convert polar coordinates (angle, radius) to cartesian (x, y)
 */
export function polarToCartesian(
  angle: number, 
  level: number, 
  centerX: number, 
  centerY: number, 
  radiusMultiplier: number = 100
): NodePosition {
  // Convert angle from degrees to radians
  const angleInRadians = (angle - 90) * (Math.PI / 180);
  
  // Calculate radius based on level
  const radius = level * radiusMultiplier;
  
  // Calculate x and y positions
  const x = centerX + radius * Math.cos(angleInRadians);
  const y = centerY + radius * Math.sin(angleInRadians);
  
  return { x, y };
}

/**
 * Calculate the SVG path for a curved connection between two nodes
 */
export function calculateConnectionPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  curvature: number = 0.2
): string {
  // Validate inputs to prevent NaN or invalid values
  if (
    typeof startX !== 'number' || 
    typeof startY !== 'number' || 
    typeof endX !== 'number' || 
    typeof endY !== 'number' ||
    isNaN(startX) || isNaN(startY) || isNaN(endX) || isNaN(endY)
  ) {
    console.warn('Invalid coordinates provided to calculateConnectionPath', { startX, startY, endX, endY });
    return 'M 0 0'; // Return a minimal valid path as fallback
  }
  
  // Calculate control points for the curve
  const dx = endX - startX;
  const dy = endY - startY;
  const midX = startX + dx / 2;
  const midY = startY + dy / 2;
  
  // Add some curvature
  const controlX = midX;
  const controlY = midY - curvature * Math.sqrt(dx * dx + dy * dy);
  
  // Format with fixed precision to avoid floating point issues
  const formatCoord = (coord: number) => Number(coord.toFixed(2));
  
  return `M ${formatCoord(startX)} ${formatCoord(startY)} Q ${formatCoord(controlX)} ${formatCoord(controlY)} ${formatCoord(endX)} ${formatCoord(endY)}`;
} 