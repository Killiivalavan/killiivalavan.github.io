'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>('#about');

  const handleNavClick = (href: string) => {
    setActiveSection(href);
  };

  return (
    <header className="py-5 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container-custom">
        <nav className="flex justify-center">
          <div className="flex items-center gap-1 px-2 py-1 bg-secondary/80 rounded-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-pill text-sm ${
                  activeSection === link.href ? 'nav-pill-active' : 'hover:bg-secondary/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
