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
                          {project.url && (
                            <Link
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-teal-accent transition-colors"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </Link>
                          )}
                        </div>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                  </div>
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
                  onMouseDown={(e) => handleMouseDown(e, index)}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-dashed border-border/40 rounded-lg hover:border-teal-accent/50 hover:shadow-sm transition-all duration-200 cursor-grab active:cursor-grabbing select-none"
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
        </div>

        <div className="mt-12">
          <Separator />
        </div>
      </div>
    </section>
  );
}
