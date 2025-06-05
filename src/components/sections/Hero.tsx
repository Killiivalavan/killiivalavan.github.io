'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Hero() {
  return (
    <section className="section pt-20 pb-4" id="about">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2">
              Hi, I'm <span className="text-red-accent">Killiivalavan</span>
            </h1>
            <p className="text-muted-foreground">
              A developer who builds things like it's a hobby, a habit, and occasionally, a cry for help...
            </p>            
          </div>
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full border-4 border-muted overflow-hidden">
              <img 
                src="/images/profile.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
