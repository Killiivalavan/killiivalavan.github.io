import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mindscape — Killiivalavan",
  description:
    "an opinionated canvas of goated content!",
};

import MindscapeSection from "@/components/sections/MindscapeSection";

export default function MindscapePage() {
  return <MindscapeSection />;
}
