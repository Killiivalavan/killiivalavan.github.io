'use client';

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ExternalLink, BookOpen, Code, Brain, FileText, Calculator, Sparkles } from "lucide-react";
import {
  SiPython,
  SiPytorch,
  SiFastapi,
  SiHuggingface,
  SiDjango,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiShadcnui,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiSupabase,
  SiRedis,
  SiDocker,
  SiOllama,
} from 'react-icons/si';
import { useState, useRef, useEffect } from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "D.A.I.S.Y",
    description: "D.A.I.S.Y is a smart AI voice assistant that runs completely offline",
    imageUrl: "/images/projects/DAISY.png",
    url: "https://github.com/Killiivalavan/DAISY",
    icon: "/images/projects/DAISY-logo.png",
  },
  {
    id: 2,
    title: "tabstone",
    description: "Kill tab clutter, revive only what matters later.",
    imageUrl: "/images/projects/code-iterator-ai.png",
    url: "https://tabstone.vercel.app/",
    icon: "/images/projects/tabstone-logo.png",
  },
  {
    id: 3,
    title: "Simple-it",
    description: "A no-fuss tool to get summaries from PDF and audio files.",
    imageUrl: "/images/projects/conspiracy-ai.png",
    url: "https://github.com/Killiivalavan/Simple-it",
    icon: "/images/projects/Simpleit-logo.png",
  },
  {
    id: 4,
    title: "ParanoiaNet",
    description: "An AI that generates conspiracy theories based on user prompts for fun.",
    imageUrl: "https://placehold.co/600x400/48a398/dbdbda",
    url: "https://github.com/Killiivalavan/ParanoiaNet",
    icon: "/images/projects/Paranoianet-logo.png",
  },
  {
    id: 5,
    title: "TaleForge",
    description: "Interactive fiction powered by AI - your decisions write the plot.",
    imageUrl: "/images/projects/exp-tracker.png",
    url: "https://github.com/Killiivalavan/TaleForge",
    icon: "/images/projects/TaleForge-logo.png",
  },

];

// Skills data
type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
};

const skills: Skill[] = [
  // Row 1
  { name: "Python", icon: SiPython, iconColor: "text-blue-500" },
  { name: "PyTorch", icon: SiPytorch, iconColor: "text-orange-500" },
  { name: "FastAPI", icon: SiFastapi, iconColor: "text-green-500" },
  { name: "Huggingface", icon: SiHuggingface, iconColor: "text-yellow-500" },
  { name: "Django", icon: SiDjango, iconColor: "text-green-600" },
  
  // Row 2
  { name: "JavaScript", icon: SiJavascript, iconColor: "text-yellow-500" },
  { name: "TypeScript", icon: SiTypescript, iconColor: "text-blue-600" },
  { name: "React", icon: SiReact, iconColor: "text-blue-500" },
  { name: "Next.js", icon: SiNextdotjs, iconColor: "text-black dark:text-white" },
  { name: "Node.js", icon: SiNodedotjs, iconColor: "text-green-600" },
  
  // Row 3
  { name: "Express.js", icon: SiExpress, iconColor: "text-black dark:text-white" },
  { name: "Tailwind CSS", icon: SiTailwindcss, iconColor: "text-blue-500" },
  { name: "Shadcn UI", icon: SiShadcnui, iconColor: "text-black dark:text-white" },
  { name: "PostgreSQL", icon: SiPostgresql, iconColor: "text-blue-600" },
  { name: "MongoDB", icon: SiMongodb, iconColor: "text-green-500" },
  
  // Row 4
  { name: "MySQL", icon: SiMysql, iconColor: "text-blue-500" },
  { name: "Supabase", icon: SiSupabase, iconColor: "text-green-500" },
  { name: "Redis", icon: SiRedis, iconColor: "text-red-500" },
  { name: "Docker", icon: SiDocker, iconColor: "text-blue-500" },
  { name: "Ollama", icon: SiOllama, iconColor: "text-purple-500" },
];

export default function Projects() {
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentDeltaRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const hoverIndexRef = useRef<number | null>(null);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const applyTransform = (index: number, x: number, y: number, scale: number = 1, rotation: number = 0) => {
    const element = skillRefs.current[index];
    if (!element) return;
    
    // Use transform3d for hardware acceleration
    element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotation}deg)`;
  };

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  // Smooth spring animation function
  const springTo = (index: number, targetX: number, targetY: number, targetScale: number = 1, targetRotation: number = 0) => {
    const element = skillRefs.current[index];
    if (!element) return;

    let currentX = 0;
    let currentY = 0;
    let currentScale = 1;
    let currentRotation = 0;
    let velocityX = 0;
    let velocityY = 0;
    let velocityScale = 0;
    let velocityRotation = 0;

    const stiffness = 0.15;
    const damping = 0.8;
    const mass = 1;

    const animate = () => {
      // Calculate spring forces
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const dScale = targetScale - currentScale;
      const dRotation = targetRotation - currentRotation;

      // Apply spring physics
      const forceX = dx * stiffness;
      const forceY = dy * stiffness;
      const forceScale = dScale * stiffness;
      const forceRotation = dRotation * stiffness;

      // Update velocities
      velocityX = (velocityX + forceX / mass) * damping;
      velocityY = (velocityY + forceY / mass) * damping;
      velocityScale = (velocityScale + forceScale / mass) * damping;
      velocityRotation = (velocityRotation + forceRotation / mass) * damping;

      // Update positions
      currentX += velocityX;
      currentY += velocityY;
      currentScale += velocityScale;
      currentRotation += velocityRotation;

      // Apply transform
      applyTransform(index, currentX, currentY, currentScale, currentRotation);

      // Continue animation if still moving
      const isMoving = Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01 || 
                      Math.abs(velocityScale) > 0.001 || Math.abs(velocityRotation) > 0.01;

      if (isMoving) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Snap to final position
        applyTransform(index, targetX, targetY, targetScale, targetRotation);
      }
    };

    animate();
  };

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    const element = skillRefs.current[index];
    if (!element) return;
    
    // Cancel any ongoing spring animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    element.setPointerCapture(e.pointerId);
    activeIndexRef.current = index;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    currentDeltaRef.current = { x: 0, y: 0 };
    
    // Immediate scale up with slight rotation for tactile feedback
    applyTransform(index, 0, 0, 1.1, 2);
    
    // Add pressed state styling
    element.style.filter = 'brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.15))';
  };

  const handlePointerMove = (e: React.PointerEvent, index: number) => {
    if (activeIndexRef.current !== index) return;
    
    const maxDistance = 25; // Slightly increased for better feel
    const dx = clamp(e.clientX - pointerStartRef.current.x, -maxDistance, maxDistance);
    const dy = clamp(e.clientY - pointerStartRef.current.y, -maxDistance, maxDistance);
    
    currentDeltaRef.current = { x: dx, y: dy };
    
    // Dynamic scale and rotation based on distance
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normalizedDistance = distance / maxDistance;
    const scale = 1.1 + (normalizedDistance * 0.08); // 1.1 to 1.18
    const rotation = 2 - (normalizedDistance * 4); // 2 to -2 degrees
    
    // Smooth transform with slight delay for fluid feel
    applyTransform(index, dx, dy, scale, rotation);
  };

  const handlePointerUp = (e: React.PointerEvent, index: number) => {
    if (activeIndexRef.current !== index) return;
    
    const element = skillRefs.current[index];
    try {
      if (element) element.releasePointerCapture(e.pointerId);
    } catch {}
    
    activeIndexRef.current = null;

    // Remove pressed state styling and spring back to original position
    if (element) {
      element.style.filter = '';
      // Spring back to original position with bounce
      springTo(index, 0, 0, 1.0, 0);
    }
  };
  
  const handlePointerCancel = (e: React.PointerEvent, index: number) => {
    handlePointerUp(e, index);
  };
  
  const handlePointerLeave = (e: React.PointerEvent, index: number) => {
    if (activeIndexRef.current === index) {
      handlePointerUp(e, index);
    }
  };

  // Enhanced hover effects
  const handleMouseEnter = (index: number) => {
    if (activeIndexRef.current !== null) return; // Don't interfere with dragging
    
    hoverIndexRef.current = index;
    const element = skillRefs.current[index];
    if (!element) return;

    // Subtle hover animation
    element.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    element.style.transform = 'translate3d(0, -2px, 0) scale(1.02)';
    element.style.filter = 'brightness(1.05) drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
  };

  const handleMouseLeave = (index: number) => {
    if (hoverIndexRef.current !== index) return;
    
    hoverIndexRef.current = null;
    const element = skillRefs.current[index];
    if (!element) return;

    // Smooth return to original state
    element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    element.style.transform = 'translate3d(0, 0, 0) scale(1)';
    element.style.filter = '';

    // Clean up transition
    setTimeout(() => {
      if (element && hoverIndexRef.current !== index) {
        element.style.transition = '';
      }
    }, 300);
  };

  return (
    <section className="section pb-4" id="projects">
      <div className="container-custom">
        {/* Main "My Builds" Heading */}
        <div className="mb-12">
          <h2 className="section-title text-2xl sm:text-3xl lg:text-4xl font-bold text-left">
            My Builds
          </h2>
        </div>

        {/* Build Logs Subsection */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 uppercase tracking-wide">Build Logs</h3>
            <p className="text-muted-foreground">Projects I've built and shipped</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => {
              return (
                <div key={project.id} className="rounded-lg p-6 group hover:shadow-lg transition-all duration-300 shadow-sm">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      <div className="flex items-start space-x-5">
                        {/* Circular Icon or Image */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5`}>
                          {typeof project.icon === 'string' ? (
                            <img
                              src={project.icon}
                              alt={`${project.title} logo`}
                              className="w-20 h-20 object-contain rounded-full"
                              style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.10))' }}
                            />
                          ) : (
                            <project.icon className="w-7 h-7" />
                          )}
                        </div>
                        {/* Project Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0">
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-teal-accent transition-colors">
                              {project.title}
                            </h3>
                            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-teal-accent transition-colors" />
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start space-x-5">
                      {/* Circular Icon or Image */}
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5`}>
                        {typeof project.icon === 'string' ? (
                          <img
                            src={project.icon}
                            alt={`${project.title} logo`}
                            className="w-20 h-20 object-contain rounded-full"
                            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.10))' }}
                          />
                        ) : (
                          <project.icon className="w-7 h-7" />
                        )}
                      </div>
                      {/* Project Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-teal-accent transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Build Kit Subsection */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 uppercase tracking-wide">Build Kit</h3>
            <p className="text-muted-foreground">Technologies I use to bring ideas to life</p>
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    skillRefs.current[index] = el;
                  }}
                  onPointerDown={(e) => handlePointerDown(e, index)}
                  onPointerMove={(e) => handlePointerMove(e, index)}
                  onPointerUp={(e) => handlePointerUp(e, index)}
                  onPointerCancel={(e) => handlePointerCancel(e, index)}
                  onPointerLeave={(e) => handlePointerLeave(e, index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-dashed faded-border rounded-lg hover:border-teal-accent/50 hover:shadow-sm transition-all duration-200 cursor-grab active:cursor-grabbing select-none"
                  style={{ 
                    userSelect: 'none',
                    willChange: 'transform, filter',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px'
                  }}
                >
                  <IconComponent className={`w-4 h-4 ${skill.iconColor}`} />
                  <span className="text-sm font-medium text-foreground group-hover:text-teal-accent transition-colors">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <Separator />
        </div>
      </div>
    </section>
  );
}
