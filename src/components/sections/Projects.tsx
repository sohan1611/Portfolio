"use client";

import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { PdfViewerButton } from "../ui/PdfViewerButton";
import { ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function Projects() {
  return (
    <Section id="projects" className="border-t border-border bg-muted/10">
      <div className="space-y-12">
        <Reveal>
          <SectionHeading>Featured Projects</SectionHeading>
        </Reveal>

        <div className="space-y-12">
          {portfolioData.projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <div
                className="flex flex-col rounded-xl glass-surface hover-glow overflow-hidden"
              >
                <div className="p-6 md:p-8 flex-grow space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="rounded text-inherit transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded bg-primary/5 border border-primary/20 text-xs font-display font-semibold tracking-wider text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-display font-semibold whitespace-nowrap border transition-opacity duration-300 ${
                      project.status === "In Progress" 
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                        : "bg-[#60A5FA]/10 text-[#60A5FA] border-[#60A5FA]/20"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Problem Statement</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.problemStatement}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Solution</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
                    <ul className="space-y-2 mb-6">
                      {project.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-accent mr-2 mt-0.5 opacity-70">▹</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 md:px-8 py-4 border-t border-border/50 bg-background/30 flex flex-wrap items-center gap-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source Code for ${project.title}`}
                      className="flex items-center text-sm font-display font-medium text-muted-foreground hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <FaGithub className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live Demo for ${project.title}`}
                      className="flex items-center text-sm font-display font-medium text-muted-foreground hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {project.docsUrl && project.docsLabel && (
                    <PdfViewerButton
                      fileUrl={project.docsUrl}
                      title={`${project.title} — ${project.docsLabel}`}
                      label={project.docsLabel}
                      ariaLabel={`${project.docsLabel} for ${project.title}`}
                      iframeTitle={`${project.title} ${project.docsLabel}`}
                      closeLabel={`Close ${project.title} ${project.docsLabel.toLowerCase()} viewer`}
                      icon={<FileText className="mr-2 h-4 w-4" />}
                      className="flex items-center text-sm font-display font-medium text-muted-foreground hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
                    />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
