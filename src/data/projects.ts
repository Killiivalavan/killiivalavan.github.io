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
    description: "A voice-activated personal AI assistant with sub-second latency. Features wake word activation with 13 tools including web search, file operations, and background task management.",
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
  },
  {
    id: 5,
    title: "callmeout",
    description: "An accountability app that tracks your daily Git pushes and uses Discord webhooks to send you annoying reminders until you hit your goal.",
    imageUrl: "/images/projects/callmeout-img.png",
    url: "https://callmeout.vercel.app/",
    techStack: ["Node.js", "HTML", "Supabase"],
  }
];
