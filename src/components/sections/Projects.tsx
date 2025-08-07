'use client';

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ExternalLink, BookOpen, Code, Brain, FileText, Calculator, Sparkles } from "lucide-react";

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
  icon: React.ComponentType<{ className?: string }> | string;
  iconColor: string;
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
    icon: "/images/projects/DAISY-logo.png",
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Recode",
    description: "An AI tool that iteratively reviews, improves, and refactors code using a local language model, streamlining the development process using Groq API and Ollama as fallback.",
    year: "2024 - Present",
    status: "Active",
    imageUrl: "/images/projects/code-iterator-ai.png",
    technologies: ["Python", "Next.js", "Groq API", "Ollama"],
    githubUrl: "https://github.com/Killiivalavan/Recode",
    icon: Code,
    iconColor: "bg-purple-100 text-purple-600",
  },
  {
    id: 3,
    title: "ParanoiaNet",
    description: "An AI-powered creative writing tool that transforms simple user inputs into elaborate conspiracy theories, complete with fictional evidence, mysterious organizations, and interconnected events.",
    year: "2025",
    status: "Completed",
    imageUrl: "/images/projects/conspiracy-ai.png",
    technologies: ["Streamlit", "Python"],
    githubUrl: "https://github.com/Killiivalavan/ParanoiaNet",
    icon: Sparkles,
    iconColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 4,
    title: "TaleForge",
    description: "An offline AI-powered story generator that uses a local language model to create dynamic, branching narratives based on user input in real time.",
    year: "2025",
    status: "Completed",
    imageUrl: "https://placehold.co/600x400/48a398/dbdbda",
    technologies: ["Python"],
    githubUrl: "https://github.com/Killiivalavan/TaleForge",
    icon: BookOpen,
    iconColor: "bg-green-100 text-green-600",
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
    icon: Calculator,
    iconColor: "bg-red-100 text-red-600",
  },
  {
    id: 6,
    title: "Simple-it",
    description: "A Python summarizer that converts PDFs and audio to concise text and audio summaries.",
    year: "2025",
    status: "Completed",
    imageUrl: "https://placehold.co/600x400/5c7ca9/dbdbda",
    technologies: ["Python"],
    githubUrl: "https://github.com/Killiivalavan/Simple-it",
    icon: FileText,
    iconColor: "bg-indigo-100 text-indigo-600",
  },
];

export default function Projects() {
  return (
    <section className="section pb-4" id="projects">
      <div className="container-custom">
        <div className="mb-8">
          <p className="section-title">Build Logs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            return (
              <div key={project.id} className="rounded-lg p-6 group hover:shadow-lg transition-all duration-300 shadow-sm">
                <div className="flex items-start space-x-5">
                  {/* Circular Icon or Image */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5`}>
                    {typeof project.icon === 'string' ? (
                      <img
                        src={project.icon}
                        alt={`${project.title} logo`}
                        className="w-14 h-14 object-contain rounded-full"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.10))' }}
                      />
                    ) : (
                      <project.icon className="w-7 h-7" />
                    )}
                  </div>
                  {/* Project Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-teal-accent transition-colors">
                        {project.title}
                      </h3>
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
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

        <div className="mt-12">
          <Separator />
        </div>
      </div>
    </section>
  );
}
