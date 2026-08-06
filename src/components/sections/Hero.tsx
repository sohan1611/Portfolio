import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ViewResumeButton } from "../ui/ViewResumeButton";

export function Hero() {
  return (
    <Section id="home" className="min-h-[60vh] flex flex-col justify-center pt-32 pb-16">
      <div className="max-w-3xl space-y-6">
        <Reveal once={true}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground mb-8 leading-tight">
            <span className="block mb-2">Building AI Systems,</span>
            <span className="block mb-2">Data-Driven Products &</span>
            <span className="block text-primary">Modern Web Applications</span>
          </h1>
        </Reveal>
        <Reveal delay={80} once={true}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {portfolioData.personal.subheadline}
          </p>
        </Reveal>
        
        <Reveal delay={150} once={true}>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#projects"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <ViewResumeButton className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-muted hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground" />
            <a
              href={portfolioData.personal.resumeUrl}
              download
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-muted hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            >
              <FileText className="mr-2 h-4 w-4" /> Download Resume
            </a>
          </div>
        </Reveal>
        
        <Reveal delay={200} once={true}>
          <div className="flex items-center gap-4 pt-6 text-muted-foreground">
            <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <FaGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <FaLinkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <div className="h-4 w-px bg-border mx-2"></div>
            <span className="text-sm font-medium text-foreground">CGPA: {portfolioData.personal.cgpa}</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
