'use client';

import { bucketListItems } from "@/data/bucket-list";

export default function BucketListSection() {
  return (
    <div className="w-full h-full overflow-y-auto subtle-scrollbar flex flex-col items-center py-2">
      <div className="w-full max-w-[800px] flex flex-col items-start px-2 sm:px-8 pb-24 pt-6">
        <h1 className="font-chillax text-4xl text-left mb-8 text-foreground/90 tracking-tight">Bucket List</h1>
        
        <p className="text-[14px] sm:text-[15px] text-left text-muted-foreground mb-12">
          inspired by <a href="https://prarthanagarwal.me/bucket-list" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline decoration-muted-foreground/40 underline-offset-4 cursor-pointer">Prarthan Agarwal</a> - these are the things I want to do that can make me feel infinite!
        </p>

        <div className="w-full">
          <ol className="list-decimal text-left pl-5 sm:pl-6 space-y-3 marker:text-muted-foreground/70 marker:text-[15px]">
            {bucketListItems.map((item, i) => (
              <li key={i} className={`pl-2 sm:pl-3 text-[15px] sm:text-[16px] leading-relaxed tracking-wide ${
                item.completed ? "line-through text-muted-foreground/80" : "text-foreground"
              }`}>
                {item.text}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
