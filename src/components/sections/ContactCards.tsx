'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, FileDown } from 'lucide-react';
import { Toast, useToast } from '@/components/ui/toast';

export default function ContactCards() {
  const { isVisible, message, showToast, hideToast } = useToast();
  const emailAddress = 'killiivalavan.inbox@gmail.com';
  
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Copy email to clipboard
    navigator.clipboard.writeText(emailAddress)
      .then(() => {
        showToast('Email copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy email: ', err);
        // If clipboard API fails, fall back to mailto link
        window.location.href = `mailto:${emailAddress}`;
      });
  };

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
            href={`mailto:${emailAddress}`}
            onClick={handleEmailClick}
            className="p-2 rounded-full bg-secondary hover:bg-red-accent hover:text-background transition-colors duration-200 inline-flex"
            aria-label="Copy email address"
            title="Click to copy email address"
          >
            <Mail size={18} />
          </Link>
          <Link
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-secondary hover:bg-teal-accent hover:text-background transition-colors duration-200 inline-flex"
            aria-label="View Resume"
          >
            <FileDown size={18} />
          </Link>
        </div>
      </div>
      
      {/* Toast notification */}
      <Toast 
        message={message} 
        visible={isVisible} 
        onClose={hideToast} 
        duration={3000}
      />
    </section>
  );
} 