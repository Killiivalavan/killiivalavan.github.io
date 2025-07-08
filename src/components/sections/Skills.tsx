'use client';

import { Separator } from "@/components/ui/separator";
import SkillTree from "@/components/skills/SkillTree";

export default function Skills() {
  return (
    <section className="section py-4" id="skills">
      <div className="container-custom">
        <div className="mb-8">
          <p className="section-title">Technical Proficiency</p>
        </div>

        <div className="flex flex-col items-center">
          {/* Skill Tree Component */}
          <div className="w-full max-w-4xl">
            <SkillTree />
          </div>
        </div>

        <div className="mt-12">
          <Separator />
        </div>
      </div>
    </section>
  );
} 