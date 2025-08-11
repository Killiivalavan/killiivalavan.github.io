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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
         className="group fixed top-6 left-1/2 z-30 -translate-x-1/2 bg-background/40 backdrop-blur-2xl rounded-full shadow-2xl border border-border/50 flex items-center px-2 py-1 gap-0 min-w-fit max-w-full transition-all duration-300 ease-out hover:py-1 hover:px-3"
         style={{ width: "auto" }}
       >
      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-0 transition-all duration-300 ease-out group-hover:gap-1.5">
        {navItems.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={(e) => handleNavClick(e, item.href, item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label={item.label}
              className={`p-2 mx-0.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                active === item.id ? "bg-teal-accent/80 text-background" : "hover:bg-secondary/60 text-muted-foreground"
              } ${
                hoveredItem && hoveredItem !== item.id ? "opacity-40 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </button>
            {/* Tooltip */}
            <span className={`pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-popover/90 text-foreground text-xs shadow-md transition-opacity duration-200 hidden md:block ${
              hoveredItem === item.id ? "opacity-100" : "opacity-0"
            }`}>
              {item.label}
            </span>
          </div>
        ))}
        {/* Separator */}
        <div className={`w-px h-6 bg-muted-foreground/60 mx-2 transition-all duration-300 group-hover:mx-3 ${
          hoveredItem ? "opacity-30" : "opacity-60"
        }`} />
        {externalLinks.map((item) => (
          <div key={item.href} className="relative group">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label={item.label}
              className={`p-2 mx-0.5 rounded-full hover:bg-secondary/60 text-muted-foreground transition-all duration-300 flex items-center justify-center ${
                hoveredItem && hoveredItem !== item.href ? "opacity-40 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </a>
            {/* Tooltip */}
            <span className={`pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-popover/90 text-foreground text-xs shadow-md transition-opacity duration-200 hidden md:block ${
              hoveredItem === item.href ? "opacity-100" : "opacity-0"
            }`}>
              {item.label}
            </span>
          </div>
        ))}
                 {/* Separator */}
         <div className={`w-px h-6 bg-muted-foreground/60 mx-2 transition-all duration-300 group-hover:mx-3 ${
           hoveredItem ? "opacity-30" : "opacity-60"
         }`} />
         <div className="relative group">
           <button
             onClick={cycleTheme}
             onMouseEnter={() => setHoveredItem('theme')}
             onMouseLeave={() => setHoveredItem(null)}
             className={`flex items-center justify-center p-2 mx-0.5 rounded-full hover:bg-secondary/60 transition-all duration-300 text-muted-foreground hover:text-foreground ${
               hoveredItem && hoveredItem !== 'theme' ? "opacity-40 scale-95" : "opacity-100 scale-100"
             }`}
             aria-label={getTooltipText()}
             title={getTooltipText()}
           >
             <Palette size={20} />
           </button>
           {/* Tooltip */}
           <span className={`pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-popover/90 text-foreground text-xs shadow-md transition-opacity duration-200 hidden md:block ${
             hoveredItem === 'theme' ? "opacity-100" : "opacity-0"
           }`}>
             Theme
           </span>
         </div>
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
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-background/30 backdrop-blur-2xl rounded-2xl shadow-2xl border border-border/50 flex flex-col items-center py-2 px-3 gap-1 z-40 min-w-[180px]">
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
            <div className="w-full h-px bg-muted-foreground/60 my-1" />
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
                         <div className="w-full h-px bg-muted-foreground/60 my-1" />
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
