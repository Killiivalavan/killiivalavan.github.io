import { 
  SiPython, SiPytorch, SiFastapi, SiHuggingface, SiDjango,
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, 
  SiExpress, SiTailwindcss, SiShadcnui, SiPostgresql, SiMongodb, 
  SiMysql, SiSupabase, SiRedis, SiDocker, SiOllama, SiVite
} from 'react-icons/si';

import { ElementType } from 'react';

export type Skill = {
  name: string;
  devicon?: string;
  icon?: ElementType; 
  iconColor?: string;
};

export const skills: Skill[] = [
  { name: "Python", devicon: "python-plain" },
  { name: "PyTorch", devicon: "pytorch-original" },
  { name: "FastAPI", devicon: "fastapi-plain" },
  { name: "Huggingface", icon: SiHuggingface, iconColor: "text-[#FFD21E]" },
  { name: "Django", devicon: "django-plain" },
  { name: "JavaScript", devicon: "javascript-plain" },
  { name: "TypeScript", devicon: "typescript-plain" },
  { name: "React", devicon: "react-original" },
  { name: "Next.js", devicon: "nextjs-plain" },
  { name: "Node.js", devicon: "nodejs-plain" },
  { name: "Express.js", devicon: "express-original" },
  { name: "Vite", devicon: "vitejs-plain" },
  { name: "Tailwind CSS", devicon: "tailwindcss-original" },
  { name: "HTML", devicon: "html5-plain" },
  { name: "Shadcn UI", icon: SiShadcnui, iconColor: "text-black dark:text-white" },
  { name: "PostgreSQL", devicon: "postgresql-plain" },
  { name: "MongoDB", devicon: "mongodb-plain" },
  { name: "MySQL", devicon: "mysql-plain" },
  { name: "Supabase", devicon: "supabase-plain" },
  { name: "Redis", devicon: "redis-plain" },
  { name: "Docker", devicon: "docker-plain" },
  { name: "Ollama", icon: SiOllama, iconColor: "text-black dark:text-white" }
];
