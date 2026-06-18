"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Code2, Brain, Sparkles, Layers, Database, Cpu, Lock, Cloud, Wrench, Bot } from "lucide-react";
import React from "react";

function SkillCard({ title, items, icon: Icon }: { title: string, items: string[], icon: React.ElementType }) {
  return (
    <div className="p-8 rounded-xl glass-surface hover-glow">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2.5 rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
      </div>
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="px-3 py-1.5 rounded-lg bg-muted/40 border border-border/40 text-xs font-display font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const skillCards = [
  { title: "Programming Languages", key: "programmingLanguages" as const, icon: Code2 },
  { title: "Frameworks & Libraries", key: "frameworks" as const, icon: Layers },
  { title: "Databases & ORM", key: "databases" as const, icon: Database },
  { title: "AI & APIs", key: "ai" as const, icon: Cpu },
  { title: "Authentication & Integrations", key: "auth" as const, icon: Lock },
  { title: "Cloud & Deployment", key: "cloud" as const, icon: Cloud },
  { title: "Engineering Tools", key: "tools" as const, icon: Wrench },
  { title: "AI-Assisted Development", key: "aiDev" as const, icon: Bot },
];

const interestCards = [
  { title: "Areas of Interest", key: "interests" as const, icon: Brain },
  { title: "Currently Learning", key: "currentlyLearning" as const, icon: Sparkles },
];

export function Skills() {
  return (
    <Section id="skills">
      <div className="space-y-12">
        <Reveal>
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">Technical Arsenal</h2>
            <div className="h-1 w-12 bg-primary rounded mt-2"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCards.map((card, i) => (
            <Reveal key={card.key} delay={i * 50}>
              <SkillCard title={card.title} items={portfolioData.skills[card.key]} icon={card.icon} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="pt-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Interests & Learning</h2>
            <div className="h-1 w-12 bg-primary rounded"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interestCards.map((card, i) => (
            <Reveal key={card.key} delay={i * 60}>
              <SkillCard title={card.title} items={portfolioData.skills[card.key]} icon={card.icon} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
