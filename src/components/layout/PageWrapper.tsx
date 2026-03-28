import Link from 'next/link';
import TimeDisplay from './TimeDisplay';

// PageWrapper is now a React Server Component.
// Only the TimeDisplay child is client-side, keeping the layout shell fully static.
export default function PageWrapper({ children, scrollable = false }: { children: React.ReactNode; scrollable?: boolean }) {
  return (
    <div className={`w-full flex flex-col items-center font-sans bg-background text-foreground ${
        scrollable ? 'min-h-screen' : 'min-h-screen lg:h-screen justify-center overflow-hidden'
      }`}>
      <div className={`w-full max-w-[1016px] flex flex-col px-6 sm:px-12 lg:px-0 ${
        scrollable ? '' : 'h-full'
      }`}>
        <header className="w-full shrink-0 py-6">
          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">Killiivalavan</Link>
            <nav className="flex flex-wrap gap-4 sm:gap-8 text-[14px] sm:text-[15px] font-medium items-center text-muted-foreground">
              <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
              <Link href="/bucket-list" className="hover:text-foreground transition-colors">Bucket List</Link>
              <Link href="/mindscape" className="hover:text-foreground transition-colors">Mindscape</Link>
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
        <footer className="w-full shrink-0 pb-8">
          <div className="w-full border-t border-border/40 pt-6">
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
