'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 mt-20 border-t border-border/20">
      <div className="container-custom">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/" className="p-2 rounded-full hover:bg-secondary transition-colors duration-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Github size={20} />
          </Link>
          <Link href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Linkedin size={20} />
          </Link>
          <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Twitter size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
