'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TimeDisplay from './TimeDisplay';

export default function PageWrapper({ children, scrollable = false }: { children: React.ReactNode; scrollable?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const navLinks = [
    { href: '/projects', label: 'Projects' },
    { href: '/bucket-list', label: 'Bucket List' },
    { href: '/mindscape', label: 'Mindscape' },
  ].filter(link => {
    const normalizedPath = pathname?.replace(/\/$/, '') || '/';
    return link.href !== normalizedPath;
  });

  return (
    <div className={`w-full flex flex-col items-center font-sans bg-background text-foreground ${
        scrollable ? 'min-h-screen' : 'min-h-screen lg:h-screen justify-center overflow-hidden'
      }`}>
      <div className={`w-full max-w-[1016px] flex flex-col px-6 sm:px-12 lg:px-0 ${
        scrollable ? '' : 'h-full'
      }`}>
        <header className="w-full shrink-0 py-6">
          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            {isHome ? (
              <Link href="/" className="font-chillax text-2xl tracking-tight hover:opacity-80 transition-opacity">Killiivalavan</Link>
            ) : (
              <Link href="/" className="group flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-all duration-200">
                <span className="font-sans text-lg sm:text-xl transition-transform group-hover:-translate-x-1 mb-0.5">←</span>
                <span className="font-sans text-[15px] font-medium tracking-tight">Home</span>
              </Link>
            )}
            <nav className="flex flex-wrap gap-4 sm:gap-8 text-[14px] sm:text-[15px] font-medium items-center text-muted-foreground">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">{link.label}</Link>
              ))}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 w-full flex py-8 lg:py-0 relative scrollbar-hide ${
            scrollable
              ? 'items-start'
              : 'items-center justify-center overflow-y-auto'
          }`}>
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full shrink-0 pb-4">
          <div className="w-full border-t border-border/40 pt-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center text-[14px] font-medium text-muted-foreground gap-4">
               {/* Left side: Social Links */}
               <div className="flex gap-6">
                  <Link href="https://www.linkedin.com/in/killiivalavan/" target="_blank" className="hover:text-foreground transition-colors">LinkedIn</Link>
                  <Link href="https://github.com/Killiivalavan" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link>
                  <Link href="https://x.com/killiivalavan" target="_blank" className="hover:text-foreground transition-colors">Twitter</Link>
               </div>
               
               {/* Right side: Location and Time — TimeDisplay is the only client boundary */}
               <div className="flex gap-2.5 items-center">
                  <span className="text-foreground font-medium">Coimbatore</span>
                  <span>•</span>
                  <TimeDisplay />
               </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
