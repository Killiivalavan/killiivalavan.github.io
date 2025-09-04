'use client';

import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, FileDown } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const indiaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
      const hours = indiaTime.getHours().toString().padStart(2, '0');
      const minutes = indiaTime.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}${minutes} hrs`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('killiivalavan.inbox@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center py-12 lg:py-16" id="hero">
      <div className="container-custom flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          {/* Left Section - Profile Photo with Footer Info */}
          <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start space-y-6 justify-center lg:pr-8">
            <div className="w-72 h-80 sm:w-80 sm:h-96 lg:w-[450px] lg:h-[540px] rounded-2xl border border-border/30 overflow-hidden bg-card/10">
              <img 
                src="/images/profile.jpg" 
                alt="Killiivalavan" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Footer Information - Below the image */}
            <div className="flex items-center justify-between text-sm text-muted-foreground w-72 h-8 sm:w-80 sm:h-8 lg:w-[450px] lg:h-8">
              <span>Coimbatore, India</span>
              <span>{currentTime}</span>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="w-full lg:w-3/5 space-y-4 lg:pl-4">
            {/* Greeting and Introduction */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-red-accent">Killiivalavan</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                A developer who builds things like it's a hobby, a habit, and occasionally, a cry for help...
              </p>
            </div>

            {/* Contact and Social Links */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="https://www.linkedin.com/in/killiivalavan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-blue-accent hover:text-background transition-colors duration-200"
                >
                  <Linkedin size={18} />
                </Link>
                <Link
                  href="https://x.com/killiivalavan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-blue-accent hover:text-background transition-colors duration-200"
                >
                  <Twitter size={18} />
                </Link>
                <Link
                  href="https://github.com/Killiivalavan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-neutral-accent hover:text-background transition-colors duration-200"
                >
                  <Github size={18} />
                </Link>
                <Link
                  href="/documents/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-teal-accent hover:text-background transition-colors duration-200"
                  aria-label="View Resume"
                >
                  <FileDown size={18} />
                </Link>
              </div>
              
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <button
                  className="p-0 h-auto text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200 bg-transparent border-none cursor-pointer"
                  onClick={handleEmailCopy}
                >
                  killiivalavan.inbox@gmail.com
                </button>
                {copied && (
                  <span className="text-teal-accent text-sm font-medium">Copied!</span>
                )}
              </div>
            </div>

            {/* About/Philosophy Section with Bullet Points */}
            <div className="space-y-2 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p><span className="text-muted-foreground">-</span> I develop websites, apps and occasionally i make music too.</p>
              <p><span className="text-muted-foreground">-</span> Currently exploring ambitious projects and new tech stacks.</p>
              <p><span className="text-muted-foreground">-</span> Most things I make are either useful, fun, or both.</p>
              <p><span className="text-muted-foreground">-</span> I like fast builds, sharp code, and ideas that stick.</p>
              <p><span className="text-muted-foreground">-</span> Building what I want to see exist — for now, that's the job.</p>
            </div>

            {/* Spotify Link */}
            <div className="text-muted-foreground text-sm sm:text-base">
              <span>Resume's </span>
              <Link
                href="/documents/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:scale-105 hover:font-semibold transition-all duration-200 cursor-pointer"
              >
                here
              </Link>
              <span>. But you can find the unfiltered version of me </span>
              <span className="inline-flex items-center">
                <span>on </span>
                <a
                  href="https://open.spotify.com/user/31aqr2jxg755zil5kcmw72vqdnda?si=ba02211e78a84c11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2 py-1 bg-card/50 border border-dashed faded-border rounded-md hover:bg-card hover:scale-105 transition-all duration-200 ml-1 text-sm text-foreground"
                  style={{ userSelect: 'none' }}
                >
                  <SiSpotify className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
                  Spotify
                </a>
              </span>
            </div>

            {/* Under Development Section */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-semibold">Under Development</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                A music-focused take on Letterboxd, built around community and not just catalogs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
