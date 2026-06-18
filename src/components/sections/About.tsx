"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { BookOpen } from "lucide-react";

export function About() {
  return (
    <Section id="about" className="border-t border-border bg-muted/30">
      <div className="max-w-3xl space-y-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">About</h2>
              <div className="h-1 w-12 bg-primary rounded mt-2"></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="max-w-3xl text-lg text-muted-foreground leading-relaxed space-y-6">
            {portfolioData.about.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
