'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

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
    title: "Recode",
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
    title: "ParanoiaNet",
    description: "An AI-powered creative writing tool that transforms simple user inputs into elaborate conspiracy theories, complete with fictional evidence, mysterious organizations, and interconnected events.",
    year: "2025",
    status: "Completed",
    imageUrl: "/images/projects/conspiracy-ai.png",
    technologies: ["Streamlit", "Python"],
    githubUrl: "https://github.com/Killiivalavan/AI-conspiracy-theorist",
  },
  {
    id: 4,
    title: "TaleForge",
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
    title: "Simple-it",
    description: "A Python summarizer that converts PDFs and audio to concise text and audio summaries.",
    year: "2025",
    status: "Completed",
    imageUrl: "https://placehold.co/600x400/5c7ca9/dbdbda",
    technologies: ["Python"],
    githubUrl: "https://github.com/Killiivalavan/Summarizer-using-LLM",
  },
];

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isChangingPage, setIsChangingPage] = useState(false);
  const projectsPerPage = 4;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // Get current page projects with placeholders for incomplete pages
  const getCurrentPageProjects = () => {
    const startIndex = currentPage * projectsPerPage;
    const pageProjects = projects.slice(startIndex, startIndex + projectsPerPage);
    
    // If we have less than 4 projects, add placeholders to maintain grid structure
    if (pageProjects.length < projectsPerPage) {
      const placeholdersNeeded = projectsPerPage - pageProjects.length;
      const placeholders = Array(placeholdersNeeded).fill(null);
      return [...pageProjects, ...placeholders];
    }
    
    return pageProjects;
  };
  
  // Handle pagination with animation and looping
  const goToNextPage = useCallback(() => {
    if (!isChangingPage) {
      setIsChangingPage(true);
      setTimeout(() => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0)); // Loop to first page
        setIsChangingPage(false);
      }, 300);
    }
  }, [totalPages, isChangingPage]);
  
  const goToPrevPage = useCallback(() => {
    if (!isChangingPage) {
      setIsChangingPage(true);
      setTimeout(() => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1)); // Loop to last page
        setIsChangingPage(false);
      }, 300);
    }
  }, [totalPages, isChangingPage]);
  
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  // Get projects for the current page (with placeholders)
  const currentProjects = getCurrentPageProjects();
  
  // Render each project card or placeholder
  const renderItem = (item: Project | null, index: number) => {
    // If it's a placeholder, render an empty div with the same dimensions
    if (item === null) {
      return (
        <div 
          key={`placeholder-${index}`} 
          className="w-full opacity-0" 
          style={{ height: '272px', minHeight: '272px' }}
          aria-hidden="true" 
        />
      );
    }
    
    // Otherwise render the actual project card
    return (
      <Link
        href={item.githubUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        key={item.id}
        className="block w-full group"
      >
        <Card 
          className={`bg-card border-border/10 overflow-hidden shadow-lg flex flex-col transition-all duration-300 
            group-hover:shadow-xl group-hover:scale-[1.02] group-hover:border-teal-accent/40 
            group-hover:shadow-teal-accent/10 cursor-pointer
            ${isChangingPage ? 'opacity-0' : 'opacity-100'}`}
          style={{ height: '272px', minHeight: '272px' }}
        >
          <CardHeader className="pt-6 pb-3">
            <CardTitle className="text-xl group-hover:text-teal-accent transition-colors duration-300">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <p className="text-sm mb-4 line-clamp-4 flex-grow">{item.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {item.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <section className="section pb-4" id="projects">
      <div className="container-custom">
        <div className="mb-8">
          <p className="section-title">BUILDS & BREAKTHROUGHS</p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 rounded-full z-10 hidden md:flex hover:bg-card hover:text-teal-accent hover:border-teal-accent/40"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {/* Fixed width and height grid to ensure consistent card sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 mb-6" style={{
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gridAutoRows: "272px"
          }}>
            {currentProjects.map((project, index) => renderItem(project, index))}
          </div>
          
          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 rounded-full z-10 hidden md:flex hover:bg-card hover:text-teal-accent hover:border-teal-accent/40"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          {/* Mobile Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              className="rounded-full hover:bg-card hover:text-teal-accent hover:border-teal-accent/40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              className="rounded-full hover:bg-card hover:text-teal-accent hover:border-teal-accent/40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <Separator />
        </div>
      </div>
    </section>
  );
}
