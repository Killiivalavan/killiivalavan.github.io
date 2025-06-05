'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, FileDown } from 'lucide-react';

export default function ContactCards() {
  return (
    <section className="pt-3 pb-6">
      <div className="container-custom">
        <div className="flex justify-start gap-3">
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
            href="mailto:killiivalavan.inbox@gmail.com"
            className="p-2 rounded-full bg-secondary hover:bg-red-accent hover:text-background transition-colors duration-200 inline-flex"
          >
            <Mail size={18} />
          </Link>
          <Link
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-secondary hover:bg-teal-accent hover:text-background transition-colors duration-200 inline-flex"
            aria-label="Download Resume"
            download
          >
            <FileDown size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
} 