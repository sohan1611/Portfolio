import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function Projects() {
  return (
    <Section id="projects" className="border-t border-border bg-muted/10">
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Featured Projects</h2>
          <div className="h-1 w-12 bg-primary rounded"></div>
        </div>

        <div className="space-y-12">
          {portfolioData.projects.map((project) => (
            <div
              key={project.title}
              className="flex flex-col rounded-xl bg-card border border-border shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8 flex-grow space-y-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                    project.status === "In Progress" 
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" 
                      : "bg-primary/10 text-primary"
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
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 md:px-8 py-4 border-t border-border bg-muted/30 flex flex-wrap items-center gap-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
