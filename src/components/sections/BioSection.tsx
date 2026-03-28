'use client';

import { ExternalLink } from 'lucide-react';
import { SiSpotify } from 'react-icons/si';
import Image from 'next/image';
import Link from 'next/link';
import { homeData } from '@/data/home';

export default function BioSection() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 lg:items-stretch items-center justify-between">
      {/* Left Column: Image */}
      <div className="w-full max-w-[370px] lg:max-w-[480px] lg:self-stretch rounded-[2rem] overflow-hidden shrink-0 relative min-h-[450px]">
         <Image 
           src="/images/profile.webp" 
           alt="Profile" 
           fill 
           className="object-cover" 
           priority 
           sizes="(max-width: 1024px) 370px, 480px" 
         />
      </div>
      
      {/* Right Column: Info */}
      <div className="flex flex-col flex-1 max-w-[500px] pt-4 lg:pt-0">
         <h1 className="font-chillax text-4xl text-foreground/90 tracking-tight mb-8">
           {homeData.greeting}
         </h1>
         
         <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
           <p>
             I'm <span className="font-semibold text-foreground">{homeData.name}</span>: {homeData.roles.map((role, i) => (
               <span key={role}>
                 {role === 'Tinkerer' ? <span className="font-semibold text-foreground">{role}</span> : role}
                 {i < homeData.roles.length - 1 ? ', ' : '.'}
               </span>
             ))}
           </p>
             <p>
               {homeData.bio.map((para, i) => (
                 <span key={i}>
                   {para}
                   {i < homeData.bio.length - 1 && <br />}
                 </span>
               ))}
             </p>
           <p>
             <span>Resume's </span>
             <Link
               href={homeData.resumeUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="text-foreground hover:scale-105 hover:font-semibold transition-all duration-200 cursor-pointer"
             >
               here
             </Link>
             <span>. But you can find the unfiltered version of me </span>
             <span className="inline-flex items-center">
               <span>on </span>
               <a
                 href={homeData.spotifyUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 px-2 py-1 bg-card/50 border border-dashed faded-border rounded-md hover:bg-card hover:scale-105 transition-all duration-200 ml-1 text-sm text-foreground"
                 style={{ userSelect: 'none' }}
               >
                 <SiSpotify className="h-4 w-4 text-green-500" />
                 Spotify
               </a>
             </span>
           </p>
         </div>
         
         <div className="mt-12">
            <h3 className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase mb-6">Actively Building:</h3>
            
            <div className="space-y-2">
               {homeData.activelyBuilding.map((project) => (
                 <div key={project.id} className="group transition-transform duration-300 ease-out hover:scale-105 transform-gpu overflow-visible mr-6 lg:mr-8">
                   <a
                     href={project.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block cursor-pointer"
                   >
                     <div className="project-hoverable relative flex items-start space-x-4 p-4 rounded-lg border border-transparent transition-all duration-300 group-hover:bg-card/30 group-hover:shadow-lg group-hover:border-border/30 -mx-4 md:-mx-4">
                       <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2">
                           <h3 className="text-lg font-semibold text-foreground group-hover:text-teal-accent transition-colors leading-none">
                             {project.title}
                           </h3>
                           <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-teal-accent transition-colors flex-shrink-0" />
                         </div>
                         <p className="text-[15px] text-muted-foreground leading-snug -mt-1">
                           {project.description}
                         </p>
                       </div>
                     </div>
                   </a>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
