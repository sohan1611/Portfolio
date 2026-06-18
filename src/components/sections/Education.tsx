"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <Section id="education" className="border-t border-border bg-muted/30">
      <div className="max-w-3xl space-y-8">
        <Reveal>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Education Timeline</h2>
            <div className="h-1 w-12 bg-primary rounded"></div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative border-l-2 border-border ml-3 md:ml-4 space-y-8">
            {portfolioData.education.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-10">
                <div className="absolute -left-[18px] top-1 h-8 w-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-primary">
                  <GraduationCap className="h-4 w-4" />
                </div>
                
                <div className="flex flex-col mb-2 space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">{item.duration}</span>
                  <h3 className="text-xl font-bold text-foreground">{item.degree}</h3>
                  <span className="text-base text-foreground">{item.institution}</span>
                  <span className="text-sm font-semibold text-primary pt-1">CGPA: {item.cgpa}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
