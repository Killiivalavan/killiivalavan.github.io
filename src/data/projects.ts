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
    title: "chesshell",
    description: "A CLI tool that lets you play chess in the terminal with a graphical board, daily puzzles from lichess and games with local Stockfish AI.",
    imageUrl: "/images/projects/chesshell-img.png",
    url: "https://chesshell.pages.dev/",
    techStack: ["Golang"],
  },
  {
    id: 2,
    title: "D.A.I.S.Y",
    description: "A JARVIS-inspired AI voice assistant that can connect with openclaw to get an upgraded experience.",
    imageUrl: "/images/projects/DAISY-logo.png",
    url: "https://github.com/Killiivalavan/DAISY",
    techStack: ["Python"],
  },
  {
    id: 3,
    title: "tabstone",
    description: "A browser extension that helps you conquer tab clutter by archiving and organizing your tabs for a cleaner browsing experience.",
    imageUrl: "/images/projects/tabstone-img.png",
    url: "https://tabstone.vercel.app/",
    techStack: ["HTML", "JavaScript"],
  },
  {
    id: 4,
    title: "the B-side",
    description: "A social network for music lovers to log, rate, and review their favorite albums and tracks, and discover new music.",
    imageUrl: "/images/projects/thebside-logo.png",
    url: "https://thebside.club/",
    techStack: ["Vite", "Supabase"],
  }
];
