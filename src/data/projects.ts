export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
  techStack: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "the B-side",
    description: "A social network to log, rate, and review music",
    imageUrl: "/images/projects/thebside-logo.png",
    url: "https://thebside.club/",
    techStack: ["Vite", "Supabase"],
  },
  {
    id: 2,
    title: "tabstone",
    description: "An extension that lets archive tabs and kill tab clutter",
    imageUrl: "/images/projects/tabstone-img.png",
    url: "https://tabstone.vercel.app/",
    techStack: ["HTML", "JavaScript"],
  },
  {
    id: 3,
    title: "D.A.I.S.Y",
    description: "An AI centric voice assitant inspired by JARVIS",
    imageUrl: "/images/projects/DAISY-logo.png",
    url: "https://github.com/Killiivalavan/DAISY",
    techStack: ["Python"],
  },
];
