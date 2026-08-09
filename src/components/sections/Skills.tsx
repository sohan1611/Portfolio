"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Code2, Brain, Sparkles, Layers, Database, Cpu, Lock, Cloud, Wrench, Bot } from "lucide-react";
import React from "react";
import type { IconType } from "react-icons";
import {
  SiC,
  SiClaude,
  SiCloudflare,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGoogle,
  SiGooglecloud,
  SiGooglegemini,
  SiJavascript,
  SiNextdotjs,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRailway,
  SiReact,
  SiRedis,
  SiRender,
  SiResend,
  SiSqlalchemy,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiUpstash,
  SiVercel,
} from "react-icons/si";

// react-icons 5.6.0 predates SiNeon; 5.7.0 cannot be adopted because it drops SiOpenai.
const SiNeonLocal: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 0V24l-9.365-8.045V24H0V0ZM2.942 21.087h8.751V9.563l9.365 8.204V2.919L2.942 2.914Z" />
  </svg>
);

const FG = "var(--foreground)";

const SKILL_MARKS: Record<string, { icon: IconType; colour: string }> = {
  "Python": { icon: SiPython, colour: "#3776AB" },
  "Next.js": { icon: SiNextdotjs, colour: FG },
  "TypeScript": { icon: SiTypescript, colour: "#3178C6" },
  "React": { icon: SiReact, colour: "#61DAFB" },
  "JavaScript": { icon: SiJavascript, colour: "#F7DF1E" },
  "FastAPI": { icon: SiFastapi, colour: "#009688" },
  "Java": { icon: SiOpenjdk, colour: FG },
  "Express.js": { icon: SiExpress, colour: FG },
  "C": { icon: SiC, colour: "#A8B9CC" },
  "Tailwind CSS": { icon: SiTailwindcss, colour: "#06B6D4" },
  "PostgreSQL": { icon: SiPostgresql, colour: "#4169E1" },
  "Supabase": { icon: SiSupabase, colour: "#3FCF8E" },
  "Neon": { icon: SiNeonLocal, colour: "#34D59A" },
  "Redis": { icon: SiRedis, colour: "#FF4438" },
  "Prisma ORM": { icon: SiPrisma, colour: FG },
  "SQLAlchemy": { icon: SiSqlalchemy, colour: "#D71F00" },
  "OpenAI API": { icon: SiOpenai, colour: FG },
  "Gemini API": { icon: SiGooglegemini, colour: "#8E75B2" },
  "Google OAuth": { icon: SiGoogle, colour: "#4285F4" },
  "Resend": { icon: SiResend, colour: FG },
  "Vercel": { icon: SiVercel, colour: FG },
  "Render": { icon: SiRender, colour: FG },
  "Railway": { icon: SiRailway, colour: FG },
  "Cloudflare": { icon: SiCloudflare, colour: "#F38020" },
  "Google Cloud Run": { icon: SiGooglecloud, colour: "#4285F4" },
  "Upstash": { icon: SiUpstash, colour: "#00E9A3" },
  "Git": { icon: SiGit, colour: "#F03C2E" },
  "GitHub": { icon: SiGithub, colour: FG },
  "GitHub Actions": { icon: SiGithubactions, colour: "#2088FF" },
  "Docker": { icon: SiDocker, colour: "#2496ED" },
  "Claude Code": { icon: SiClaude, colour: "#D97757" },
  "OpenAI Codex": { icon: SiOpenai, colour: FG },
};

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
        {items.map((item) => {
          const mark = SKILL_MARKS[item];
          const { icon: SkillIcon, colour } = mark ?? {};

          return (
            <li
              key={item}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/40 text-xs font-display font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              style={mark ? ({ "--brand": colour } as React.CSSProperties) : undefined}
            >
              {SkillIcon && <SkillIcon aria-hidden className="h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-[var(--brand)]" />}
              {item}
            </li>
          );
        })}
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
