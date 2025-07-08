'use client';

import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <section className="mt-4">
      <div className="container-custom">
        <p className="section-title">ABOUT</p>
        <p className="mb-4">
          I like making tools that are useful, a little weird, and <span className="text-teal-accent">smarter than they need to be</span>. Most of my ideas start with "wouldn't it be cool if…" and end with something I didn't fully plan, but absolutely stand by.
        </p>
        <p className="mb-4">
          I enjoy working with <span className="text-red-accent">AI, clean code, and software</span> that feels like it was made by someone who cared.
          I don't really chase trends or try to optimize for attention. But I do love the adrenaline of shipping fast, breaking things, fixing them, and somehow ending up with something that works — and feels right.
        </p>
        <p>
          Just building stuff I'd use — and being quietly proud when someone else does too.
        </p>

        <div className="mt-8">
          <Separator />
        </div>
      </div>
    </section>
  );
}
