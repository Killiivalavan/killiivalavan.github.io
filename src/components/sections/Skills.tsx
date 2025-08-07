'use client';

import { Separator } from "@/components/ui/separator";
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

export default function Skills() {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    setStartPos({ x: e.clientX, y: e.clientY });
    setDraggedIndex(index);
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && draggedIndex !== null) {
      const element = skillRefs.current[draggedIndex];
      if (element) {
        const maxDistance = 20; // Maximum drag distance
        
        // Calculate the distance moved from the start position
        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;
        
        // Limit the movement to maxDistance
        const limitedDeltaX = Math.min(Math.max(deltaX, -maxDistance), maxDistance);
        const limitedDeltaY = Math.min(Math.max(deltaY, -maxDistance), maxDistance);
        
        element.style.transform = `translate(${limitedDeltaX}px, ${limitedDeltaY}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging && draggedIndex !== null) {
      const element = skillRefs.current[draggedIndex];
      if (element) {
        // Jiggle animation sequence
        const jiggleSequence = [
          { transform: 'translate(0, 0)', duration: 100 },
          { transform: 'translate(-2px, -1px)', duration: 50 },
          { transform: 'translate(2px, 1px)', duration: 50 },
          { transform: 'translate(-1px, 2px)', duration: 50 },
          { transform: 'translate(1px, -2px)', duration: 50 },
          { transform: 'translate(-1px, -1px)', duration: 50 },
          { transform: 'translate(1px, 1px)', duration: 50 },
          { transform: 'translate(0, 0)', duration: 100 }
        ];

        let currentStep = 0;
        const animateJiggle = () => {
          if (currentStep < jiggleSequence.length) {
            const step = jiggleSequence[currentStep];
            element.style.transition = `transform ${step.duration}ms ease-in-out`;
            element.style.transform = step.transform;
            currentStep++;
            setTimeout(animateJiggle, step.duration);
          } else {
            // Reset transition after animation
            element.style.transition = '';
          }
        };

        animateJiggle();
      }
    }
    setIsDragging(false);
    setDraggedIndex(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, draggedIndex, startPos]);

  return (
    <section className="section py-4" id="skills">
      <div className="container-custom">
        <div className="mb-8">
          <p className="section-title">Build Kit</p>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-3 mt-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  skillRefs.current[index] = el;
                }}
                onMouseDown={(e) => handleMouseDown(e, index)}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-dashed border-white/40 rounded-lg hover:border-teal-accent/50 hover:shadow-sm transition-all duration-200 cursor-grab active:cursor-grabbing select-none"
                style={{ userSelect: 'none' }}
              >
                <IconComponent className={`w-4 h-4 ${skill.iconColor}`} />
                <span className="text-sm font-medium text-foreground group-hover:text-teal-accent transition-colors">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <Separator />
        </div>
      </div>
    </section>
  );
} 