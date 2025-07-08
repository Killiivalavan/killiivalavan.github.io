'use client';

import Hero from '@/components/sections/Hero';
import ContactCards from '@/components/sections/ContactCards';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function ClientBody() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <ContactCards />
        <About />
        <Projects />
        <Skills />
      </main>
      <ThemeToggle />
    </div>
  );
}
