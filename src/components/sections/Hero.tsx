import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Hero() {
  return (
    <Section id="home" className="min-h-[60vh] flex flex-col justify-center pt-32 pb-16">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-display font-medium text-primary mb-8 hover-glow cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          <span>System Online • Open to Opportunities</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground mb-6">
          <span className="block mb-2">Hello, world.</span>
          <span className="block mb-2">I&apos;m a Software Engineer</span>
          <span className="block text-primary">building high-performance systems.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {portfolioData.personal.subheadline}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href="#projects"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href={portfolioData.personal.resumeUrl}
            download
            className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
          >
            <FileText className="mr-2 h-4 w-4" /> Download Resume
          </a>
        </div>
        
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
      </div>
    </Section>
  );
}
