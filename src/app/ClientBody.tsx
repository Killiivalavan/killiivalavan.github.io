'use client';

import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function ClientBody() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Projects />
        <Skills />
      </main>
      <ThemeToggle />
    </div>
  );
}
