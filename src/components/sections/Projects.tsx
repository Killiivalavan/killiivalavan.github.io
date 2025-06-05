'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Carousel } from "@/components/ui/carousel";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  year: string;
  status: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "D.A.I.S.Y",
    description: "DAISY is an offline AI voice assistant built with Python, using LLaMA 3.2 and RAG for smart, voice-based interactions.",
    year: "2023 - Present",
    status: "Active",
    imageUrl: "/images/projects/DAISY.png",
    technologies: ["Python"],
    githubUrl: "https://github.com/Killiivalavan/DAISY",
    //liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "AI Game Code Iterator",
    description: "An AI tool that iteratively reviews, improves, and refactors code using a local language model, streamlining the development process using Groq API and Ollama as fallback.",
    year: "2024 - Present",
    status: "Active",
    imageUrl: "/images/projects/code-iterator-ai.png",
    technologies: ["Python", "Next.js", "Groq API", "Ollama"],
    githubUrl: "https://github.com/Killiivalavan/code-iterator-AI",
    //liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "AI Conspiracy Theorist",
    description: "An AI-powered creative writing tool that transforms simple user inputs into elaborate conspiracy theories, complete with fictional evidence, mysterious organizations, and interconnected events.",
    year: "2025",
    status: "Completed",
    imageUrl: "/images/projects/conspiracy-ai.png",
    technologies: ["Streamlit", "Python"],
    githubUrl: "https://github.com/Killiivalavan/AI-conspiracy-theorist",
  },
  {
    id: 4,
    title: "Interactive Story Generator",
    description: "An offline AI-powered story generator that uses a local language model to create dynamic, branching narratives based on user input in real time.",
    year: "2025",
    status: "Completed",
    imageUrl: "https://placehold.co/600x400/48a398/dbdbda",
    technologies: ["Python"],
    githubUrl: "https://github.com/Killiivalavan/Story-Genarator",
    //liveUrl: "https://example.com",
  },
  {
    id: 5,
    title: "Expense Tracker",
    description: "A comprehensive expense tracking application with authentication, interactive dashboards, and data visualization capabilities.",
    year: "2023",
    status: "Completed",
    imageUrl: "/images/projects/exp-tracker.png",
    technologies: ["Flask", "JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/Killiivalavan/Expense-Tracker",
    //liveUrl: "https://example.com",
  },
  {
    id: 6,
    title: "PySummarizer",
    description: "A Python summarizer that converts PDFs and audio to concise text and audio summaries.",
    year: "2025",
    status: "Completed",
    imageUrl: "https://placehold.co/600x400/5c7ca9/dbdbda",
    technologies: ["Python"],
    githubUrl: "https://github.com/Killiivalavan/Summarizer-using-LLM",
  },
];

export default function Projects() {
  // Determine peek size based on screen width
  const [peekSize, setPeekSize] = useState(60);
  const [blurAmount, setBlurAmount] = useState(2);
  
  useEffect(() => {
    const updateSizes = () => {
      // Responsive peek size based on screen width
      if (window.innerWidth >= 1280) {
        setPeekSize(100); // Large screens
        setBlurAmount(2.5); // More blur on larger screens
      } else if (window.innerWidth >= 768) {
        setPeekSize(80);  // Medium screens
        setBlurAmount(2); // Medium blur
      } else {
        setPeekSize(40);  // Small screens
        setBlurAmount(1.5); // Less blur for better mobile experience
      }
    };
    
    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  // Render each project card
  const renderProjectCard = (project: Project) => (
    <Card key={project.id} className="bg-card border-border/10 overflow-hidden h-full shadow-lg flex flex-col">
      <CardHeader className="pt-6">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <div className="text-sm text-muted-foreground">{project.year}</div>
        </div>
        <CardDescription className="text-muted-foreground">{project.status}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-3 mt-auto">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-teal-accent flex items-center gap-1"
          >
            GitHub <ExternalLink size={12} />
          </Link>
        )}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-teal-accent flex items-center gap-1"
          >
            Live Demo <ExternalLink size={12} />
          </Link>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <section className="section py-16" id="projects">
      <div className="container-custom">
        <div className="mb-8">
          <p className="section-title">BUILDS & BREAKTHROUGHS</p>
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <p className="mt-2 text-muted-foreground">
            I build projects from 0 to 1, turning ideas into reality. Take a look at some of my favorite projects below.
          </p>
        </div>

        <div>
          <Carousel 
            peekSize={peekSize}
            blurAmount={blurAmount}
            showControls={true}
            gap={16}
            className="pb-8"
            autoPlay={true}
            autoPlayInterval={6000}
          >
            {projects.map((project) => renderProjectCard(project))}
          </Carousel>
        </div>

        <div className="mt-12">
          <Separator />
        </div>
      </div>
    </section>
  );
}
