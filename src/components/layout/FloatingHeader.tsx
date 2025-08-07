"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, BookOpen, Wrench, Github, Twitter, Menu, X, Palette } from "lucide-react";

const navItems = [
  { id: "hero", icon: Home, href: "#hero", label: "Home" },
  { id: "projects", icon: BookOpen, href: "#projects", label: "My Builds" },
];

const externalLinks = [
  { icon: Github, href: "https://github.com/Killiivalavan", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/killiivalavan", label: "Twitter" },
];

// Define theme types
type ThemeType = 'default' | 'warm-beige';

export default function FloatingHeader() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('warm-beige');

  // Theme toggle functionality
  const cycleTheme = () => {
    const themeSequence: ThemeType[] = ['default', 'warm-beige'];
    const currentIndex = themeSequence.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeSequence.length;
    const nextTheme = themeSequence[nextIndex];
    
    setCurrentTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  };

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeType | null;
    if (savedTheme && ['default', 'warm-beige'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    } else {
      setCurrentTheme('warm-beige');
      localStorage.setItem('portfolio-theme', 'warm-beige');
    }
  }, []);

  // Update body class when theme changes
  useEffect(() => {
    document.body.classList.remove('theme-warm-beige');
    
    if (currentTheme === 'warm-beige') {
      document.body.classList.add('theme-warm-beige');
    }
  }, [currentTheme]);

  // Get the appropriate tooltip text based on current theme
  const getTooltipText = (): string => {
    switch(currentTheme) {
      case 'default': return 'Switch to warm beige theme';
      case 'warm-beige': return 'Switch to default theme';
      default: return 'Toggle theme';
    }
  };

  // Smooth scroll and active state
  useEffect(() => {
     const handleScroll = () => {
       const sections = navItems.map((item) => document.getElementById(item.id));
       const scrollY = window.scrollY + 100; // Increased offset for better detection
       const windowHeight = window.innerHeight;
       
       for (let i = sections.length - 1; i >= 0; i--) {
         const section = sections[i];
         if (section) {
           const sectionTop = section.offsetTop;
           const sectionHeight = section.offsetHeight;
           const sectionBottom = sectionTop + sectionHeight;
           
           // Check if section is in view (with some tolerance for small sections)
           if (scrollY >= sectionTop - 50 && scrollY < sectionBottom + 50) {
             setActive(navItems[i].id);
             break;
           }
         }
       }
     };
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);

  // Smooth scroll on click
  const handleNavClick = (e: React.MouseEvent, href: string, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
         <nav
       className="fixed top-6 left-1/2 z-30 -translate-x-1/2 bg-background/30 backdrop-blur-xl rounded-full shadow-lg border border-border/30 flex items-center px-2 py-1 gap-0 min-w-fit max-w-full"
       style={{ width: "auto" }}
     >
      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-0">
        {navItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={(e) => handleNavClick(e, item.href, item.id)}
            aria-label={item.label}
            className={`group p-2 mx-0.5 rounded-full transition-colors duration-200 flex items-center justify-center ${
              active === item.id ? "bg-teal-accent/80 text-background" : "hover:bg-secondary/60 text-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
        {/* Separator */}
        <div className="w-px h-6 bg-border/40 mx-2" />
        {externalLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="p-2 mx-0.5 rounded-full hover:bg-secondary/60 text-muted-foreground transition-colors duration-200 flex items-center justify-center"
          >
            <item.icon className="w-5 h-5" />
          </a>
        ))}
                 {/* Separator */}
         <div className="w-px h-6 bg-border/40 mx-2" />
         <button
           onClick={cycleTheme}
           className="flex items-center justify-center p-2 mx-0.5 rounded-full hover:bg-secondary/60 transition-colors duration-200 text-muted-foreground hover:text-foreground"
           aria-label={getTooltipText()}
           title={getTooltipText()}
         >
           <Palette size={20} />
         </button>
      </div>
      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded-full hover:bg-secondary/60 text-muted-foreground transition-colors duration-200"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
                 {menuOpen && (
           <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-background/40 backdrop-blur-xl rounded-2xl shadow-lg border border-border/30 flex flex-col items-center py-2 px-3 gap-1 z-40 min-w-[180px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                aria-label={item.label}
                className={`group p-2 my-0.5 rounded-full transition-colors duration-200 flex items-center justify-center w-full ${
                  active === item.id ? "bg-teal-accent/80 text-background" : "hover:bg-secondary/60 text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
              </button>
            ))}
            <div className="w-full h-px bg-border/40 my-1" />
            {externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="p-2 my-0.5 rounded-full hover:bg-secondary/60 text-muted-foreground transition-colors duration-200 flex items-center justify-center w-full"
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
                         <div className="w-full h-px bg-border/40 my-1" />
             <button
               onClick={cycleTheme}
               className="flex items-center justify-center w-full p-2 my-0.5 rounded-full hover:bg-secondary/60 transition-colors duration-200 text-muted-foreground hover:text-foreground"
               aria-label={getTooltipText()}
               title={getTooltipText()}
             >
               <Palette size={20} />
             </button>
          </div>
        )}
      </div>
    </nav>
  );
}
