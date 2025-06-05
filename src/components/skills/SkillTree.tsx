'use client';

import { useState, useRef, useEffect } from 'react';
import SkillNode from './SkillNode';
import ConnectionLine from './ConnectionLine';
import { skillTreeData } from '@/lib/skillsData';
import { polarToCartesian, calculateConnectionPath, NodePosition } from '@/lib/skillTreeUtils';

export default function SkillTree() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  // Add a state to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);
  
  // Recalculate container size on window resize
  useEffect(() => {
    // Set isClient to true once component is mounted on client
    setIsClient(true);
    
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };
    
    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Only proceed with calculations if on client-side
  if (!isClient) {
    // Return a simplified placeholder with same dimensions during SSR
    return (
      <div 
        ref={containerRef}
        className="relative w-full max-w-[800px] h-[800px] mx-auto bg-[#050c0c] rounded-full border border-border/30 overflow-hidden"
        style={{ aspectRatio: '1/1' }}
      >
        {/* Placeholder content */}
      </div>
    );
  }
  
  // Calculate center point of the container
  const centerX = containerSize.width / 2;
  const centerY = containerSize.height / 2;
  
  // Calculate radius multiplier based on container size
  const radiusMultiplier = Math.min(containerSize.width, containerSize.height) / 8;
  
  // Calculate positions for all nodes
  const nodePositions = new Map<string, NodePosition>();
  
  skillTreeData.forEach(node => {
    nodePositions.set(
      node.id,
      polarToCartesian(node.angle, node.level, centerX, centerY, radiusMultiplier)
    );
  });
  
  // Calculate connection paths
  const connections: { path: string; sourceId: string; targetId: string }[] = [];
  
  skillTreeData.forEach(node => {
    const sourcePosition = nodePositions.get(node.id);
    
    if (sourcePosition) {
      node.connections.forEach(targetId => {
        const targetPosition = nodePositions.get(targetId);
        
        if (targetPosition && node.id < targetId) { // Avoid duplicate connections
          try {
            const path = calculateConnectionPath(
              sourcePosition.x,
              sourcePosition.y,
              targetPosition.x,
              targetPosition.y
            );
            
            if (path && path.startsWith('M')) {
              connections.push({
                path,
                sourceId: node.id,
                targetId
              });
            }
          } catch (error) {
            console.warn(`Failed to calculate path between ${node.id} and ${targetId}`, error);
          }
        }
      });
    }
  });
  
  // Get the connected node IDs for the hovered node
  const getConnectedNodeIds = (nodeId: string | null): string[] => {
    if (!nodeId) return [];
    
    const node = skillTreeData.find(n => n.id === nodeId);
    return node ? node.connections : [];
  };
  
  const connectedNodeIds = getConnectedNodeIds(hoveredNodeId);
  
  // Determine if a connection should be highlighted
  const isConnectionHighlighted = (sourceId: string, targetId: string) => {
    if (!hoveredNodeId) return false;
    return sourceId === hoveredNodeId || targetId === hoveredNodeId;
  };
  
  // Determine if a node should be highlighted
  const isNodeHighlighted = (nodeId: string) => {
    if (!hoveredNodeId) return false;
    
    // The hovered node itself is highlighted
    if (nodeId === hoveredNodeId) return true;
    
    // If the hovered node is connected to this node, highlight it
    return connectedNodeIds.includes(nodeId);
  };
  
  // Determine if a node's tooltip should be shown
  const shouldShowTooltip = (nodeId: string) => {
    // Always show tooltip for the hovered node
    if (nodeId === hoveredNodeId) return true;
    
    // Show tooltip for directly connected nodes when a node is hovered
    if (hoveredNodeId && connectedNodeIds.includes(nodeId)) return true;
    
    return false;
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[800px] h-[800px] mx-auto bg-[#050c0c] rounded-full border border-border/30 overflow-hidden"
      style={{ aspectRatio: '1/1' }}
    >
      {/* Single subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-teal-accent/5 to-transparent opacity-20 pointer-events-none" />
      
      {/* SVG Layer for connections - Always visible now */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        style={{ zIndex: 5 }}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
      >
        {connections.map((connection, index) => (
          <ConnectionLine
            key={`${connection.sourceId}-${connection.targetId}`}
            path={connection.path}
            isHighlighted={isConnectionHighlighted(connection.sourceId, connection.targetId)}
            delay={`${(index * 0.1) % 2}s`}
          />
        ))}
      </svg>
      
      {/* Nodes Layer */}
      {skillTreeData.map(node => {
        const position = nodePositions.get(node.id);
        
        if (!position) return null;
        
        return (
          <SkillNode
            key={node.id}
            node={node}
            position={position}
            onHover={setHoveredNodeId}
            isHighlighted={isNodeHighlighted(node.id)}
            showTooltip={shouldShowTooltip(node.id)}
            isHovered={node.id === hoveredNodeId}
          />
        );
      })}
    </div>
  );
} 