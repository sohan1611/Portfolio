import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { portfolioData } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PdfViewerButton } from "@/components/ui/PdfViewerButton";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const DESCRIPTION_LIMIT = 155;

function findProject(slug: string) {
  return portfolioData.projects.find((project) => project.slug === slug);
}

function getMetadataDescription(description: string) {
  const normalized = description.trim().replace(/\s+/g, " ");

  if (normalized.length <= DESCRIPTION_LIMIT) {
    return normalized;
  }

  const truncated = normalized.slice(0, DESCRIPTION_LIMIT - 3);
  const lastSpace = truncated.lastIndexOf(" ");
  const wordBoundary = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return `${wordBoundary.trim()}...`;
}

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return {};
  }

  const title = `${project.title} | ${portfolioData.personal.name}`;
  const description = getMetadataDescription(project.problemStatement);
  const canonical = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <Section id="project" className="border-t border-border bg-muted/10">
      <div className="space-y-12">
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center rounded text-sm font-display font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to projects
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-5">
              <h1 className="text-4xl font-display font-bold tracking-tight text-foreground md:text-5xl">
                {project.title}
              </h1>
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
        </Reveal>

        <Reveal delay={160}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <section>
              <h2 className="text-sm font-semibold text-foreground mb-2">
                Problem Statement
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.problemStatement}
              </p>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-foreground mb-2">
                Solution
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.solution}
              </p>
            </section>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <section>
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Key Features
            </h2>
            <ul className="space-y-2">
              {project.keyFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start text-sm text-muted-foreground"
                >
                  <span className="text-accent mr-2 mt-0.5 opacity-70">▹</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={320}>
          <div className="border-t border-border/50 pt-6 flex flex-wrap items-center gap-6">
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
                className="inline-flex items-center sm:ml-auto rounded-md border border-primary/25 bg-primary/10 px-3 py-1.5 text-sm font-display font-medium text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
