'use client';

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import type { Project } from "@/data/projects";
import type { Skill } from "@/data/skills";

// ── SkillIcon Helper Component ──────────────────────────────────────────────
function SkillIcon({ skill, className }: { skill: Skill; className?: string }) {
  if (skill.devicon) {
    return <i className={`devicon-${skill.devicon} colored ${className}`} />;
  }
  if (skill.icon) {
    const IconComponent = skill.icon;
    return <IconComponent className={`${className} ${skill.iconColor}`} />;
  }
  return null;
}

// ── ProjectCard: extracted to eliminate duplicated JSX ──────────────────────
function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <article className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/40 hover:shadow-xl hover:shadow-black/20 hover:border-border/80 transition-[box-shadow,border-color] duration-300 ease-out transform-gpu">
      <div className="gg-c-cards__image-container p-4 pb-0 overflow-hidden transform-gpu">
        <div
          className="gg-c-cards__image w-full aspect-[4/3] rounded-xl border border-border/10 bg-muted/10 relative overflow-hidden transition-transform duration-500 ease-out group-hover:scale-110 will-change-transform"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-transparent mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity" />
        </div>
      </div>
      <div className="gg-c-cards__body flex flex-col flex-1 p-6 pb-2">
        <span className="font-abril text-[12px] tracking-[0.1em] text-muted-foreground/60 mb-2">Project</span>
        <h2 className="gg-c-cards__title text-xl font-bold text-foreground mb-3 group-hover:text-teal-accent transition-colors">
          {project.title}
        </h2>
        <p className="text-[15px] text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 px-6 pt-4 pb-6 mt-auto overflow-hidden">
        {project.techStack.map((techName) => {
          const skill = skills.find((s) => s.name === techName);
          if (!skill) return null;
          return (
            <div
              key={techName}
              className="flex items-center gap-2 px-3 py-1.5 bg-card/50 border border-dashed faded-border rounded-lg select-none pointer-events-none"
            >
              <SkillIcon skill={skill} className="w-4 h-4 flex items-center justify-center text-base" />
              <span className="text-[12px] font-medium text-foreground">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );

  return (
    <li className="gg-c-cards__item h-full">
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="gg-c-cards__card group block h-full outline-none">
          {inner}
        </a>
      ) : (
        <div className="gg-c-cards__card group block h-full outline-none">
          {inner}
        </div>
      )}
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
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
    <section id="projects" className="py-8 bg-background">
      <div className="container-custom">
        {/* Projects Subsection */}
        <div className="mb-16 projects-content">
          <div className="mb-8">
            <h2 className="font-chillax text-4xl text-foreground/90 mb-8 tracking-tight">Projects</h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ul>
        </div>

        {/* Tech Stack Subsection - Part of the same section */}
        <div className="mb-8 tech-stack-content">
          <div className="mb-8">
            <h3 className="font-chillax text-4xl text-foreground/90 mb-8 tracking-tight">Skills</h3>
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => {
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
                  <SkillIcon skill={skill} className="w-4 h-4 flex items-center justify-center text-lg" />
                  <span className="text-sm font-medium text-foreground group-hover:text-teal-accent transition-colors">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <Separator />
        </div>
      </div>
    </section>
  );
}
