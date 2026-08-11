"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Target } from "lucide-react";

export function FutureGoals() {
  return (
    <Section id="goals" className="border-t border-border">
      <div className="space-y-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            <SectionHeading>Future Goals</SectionHeading>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioData.futureGoals.map((goal, index) => (
            <Reveal key={index} delay={index * 50}>
              <div className="p-6 rounded-xl glass-surface hover-glow flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  0{index + 1}
                </span>
                <p className="text-foreground text-sm leading-relaxed pt-1">
                  {goal}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
