"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

export function Highlights() {
  return (
    <Section id="highlights" className="pt-0 pb-16 md:pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioData.highlights.map((highlight, index) => (
          <Reveal key={index} delay={index * 60}>
            <div className="p-6 rounded-xl glass-surface flex flex-col justify-center transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30">
              <span className="text-sm font-display font-medium text-muted-foreground/80 mb-2">{highlight.title}</span>
              <span className={`text-base ${
                highlight.title === "Availability"
                  ? "font-medium text-[#AFC4E5] tracking-[0.01em] leading-relaxed"
                  : "font-display font-semibold text-foreground"
              }`}>
                {highlight.value}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
