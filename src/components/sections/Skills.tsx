import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Code2, Brain, Sparkles, Layers, Database, Cpu, Lock, Cloud, Wrench, Bot } from "lucide-react";
import React from "react";

function SkillCard({ title, items, icon: Icon }: { title: string, items: string[], icon: React.ElementType }) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium border border-border/50"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Skills</h2>
          <div className="h-1 w-12 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCard title="Programming Languages" items={portfolioData.skills.programmingLanguages} icon={Code2} />
          <SkillCard title="Frameworks & Libraries" items={portfolioData.skills.frameworks} icon={Layers} />
          <SkillCard title="Databases & ORM" items={portfolioData.skills.databases} icon={Database} />
          <SkillCard title="AI & APIs" items={portfolioData.skills.ai} icon={Cpu} />
          <SkillCard title="Authentication & Integrations" items={portfolioData.skills.auth} icon={Lock} />
          <SkillCard title="Cloud & Deployment" items={portfolioData.skills.cloud} icon={Cloud} />
          <SkillCard title="Engineering Tools" items={portfolioData.skills.tools} icon={Wrench} />
          <SkillCard title="AI-Assisted Development" items={portfolioData.skills.aiDev} icon={Bot} />
        </div>

        <div className="pt-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Interests & Learning</h2>
          <div className="h-1 w-12 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCard title="Areas of Interest" items={portfolioData.skills.interests} icon={Brain} />
          <SkillCard title="Currently Learning" items={portfolioData.skills.currentlyLearning} icon={Sparkles} />
        </div>
      </div>
    </Section>
  );
}
