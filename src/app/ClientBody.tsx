'use client';

import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Footer from '@/components/layout/Footer';
import FloatingHeader from '@/components/layout/FloatingHeader';

export default function ClientBody() {
  return (
    <div className="min-h-screen flex flex-col">
      <FloatingHeader />
      <main className="flex-grow">
        <Hero />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
