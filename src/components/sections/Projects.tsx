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
  // Rule: `*-logo.png` = transparent, tightly-cropped mark.
  //        `*-img.png`  = full-bleed screenshot.
  // Single box for all cards so heights align: logos contain+center with
  // padding on the card bg, screenshots cover+top edge-to-edge.
  const isLogo = project.imageUrl.toLowerCase().includes('-logo');
  const inner = (
    <article className="flex flex-col h-full min-w-0 w-full bg-card rounded-2xl overflow-hidden border border-border/40 hover:shadow-xl hover:shadow-black/20 hover:border-border/80 transition-[box-shadow,border-color] duration-300 ease-out transform-gpu">
      <div className="gg-c-cards__image-container p-4 pb-0 overflow-hidden transform-gpu">
        <div
          className="gg-c-cards__image w-full aspect-[16/10] sm:aspect-[4/3] rounded-xl border border-border/10 bg-muted/10 relative overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.03] will-change-transform"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className={isLogo ? 'object-contain object-center p-6 sm:p-8' : 'object-cover object-top'}
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, 33vw"
          />
          <div className="absolute inset-0 bg-transparent mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity" />
        </div>
      </div>
      <div className="gg-c-cards__body flex flex-col flex-1 p-6 pb-2">
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
    <>
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="gg-c-cards__card group block h-full outline-none">
          {inner}
        </a>
      ) : (
        <div className="gg-c-cards__card group block h-full outline-none">
          {inner}
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [isLastVisible, setIsLastVisible] = useState(false);

  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentDeltaRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const hoverIndexRef = useRef<number | null>(null);

  // Cleanup animation frame on unmount
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        setIsFirstVisible(scrollLeft === 0);
        setIsLastVisible(scrollLeft + clientWidth >= scrollWidth - 5); // 5px tolerance
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const firstCard = container.querySelector('li');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 16 : container.offsetWidth * 0.85;
    container.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollLeft = () => {
    scrollByCard(-1);
  };

  const scrollRight = () => {
    scrollByCard(1);
  };

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
    <section id="projects" className="py-8 bg-background w-full max-w-full min-w-0 overflow-x-clip md:overflow-visible">
      <div className="w-full max-w-full min-w-0">
        {/* Projects Subsection */}
        <div className="mb-16 projects-content min-w-0">
          <div className="mb-6 sm:mb-8">
            <h2 className="font-chillax text-4xl text-foreground/90 mb-2 tracking-tight">Projects</h2>
            <p className="text-[13px] text-muted-foreground sm:hidden">swipe to explore →</p>
          </div>

          <div className="relative w-full max-w-full min-w-0">
            <ul
              ref={scrollContainerRef}
              className="flex gap-4 w-full max-w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-2 -mb-2"
              style={{ scrollPadding: '0 1rem' }}
            >
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="flex-shrink-0 min-w-0 basis-[85%] sm:basis-[60%] md:basis-[calc(33.333%-10.67px)] snap-center"
                >
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
            <div className="absolute top-1/2 left-1 md:left-0 -translate-y-1/2 md:-translate-x-4 z-10">
              {!isFirstVisible && (
                <button
                  onClick={scrollLeft}
                  aria-label="Scroll projects left"
                  className="bg-card/70 hover:bg-card/90 md:bg-card/50 md:hover:bg-card/80 backdrop-blur-sm border border-border/20 text-foreground rounded-full p-1.5 md:p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
            </div>
            <div className="absolute top-1/2 right-1 md:right-0 -translate-y-1/2 md:translate-x-4 z-10">
              {!isLastVisible && (
                <button
                  onClick={scrollRight}
                  aria-label="Scroll projects right"
                  className="bg-card/70 hover:bg-card/90 md:bg-card/50 md:hover:bg-card/80 backdrop-blur-sm border border-border/20 text-foreground rounded-full p-1.5 md:p-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack Subsection - Part of the same section */}
        <div className="mb-8 tech-stack-content min-w-0">
          <div className="mb-8">
            <h3 className="font-chillax text-4xl text-foreground/90 mb-8 tracking-tight">Skills</h3>
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2 sm:gap-3 min-w-0">
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
