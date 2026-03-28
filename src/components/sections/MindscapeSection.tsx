'use client';

import InfiniteCanvas from "@/components/sections/MindscapeCanvas";
import Link from "next/link";

export default function MindscapeSection() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      {/* Floating back button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/40 backdrop-blur-2xl border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 shadow-xl cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
        <h1 className="font-chillax text-4xl text-foreground/90 tracking-tight mb-1">
          Mindscape
        </h1>
        <p className="text-[13px] text-muted-foreground/60 max-w-[350px]">
          an opinionated canvas of goated content!
        </p>
      </div>

      {/* The canvas fills the entire viewport */}
      <InfiniteCanvas />
    </div>
  );
}
