"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Mail, FileText, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { ViewResumeButton } from "../ui/ViewResumeButton";
import { SectionHeading } from "../ui/SectionHeading";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable");
      }

      await navigator.clipboard.writeText(portfolioData.personal.email);
      setCopyState("copied");
      resetTimerRef.current = setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
      resetTimerRef.current = setTimeout(() => setCopyState("idle"), 4000);
    }
  };

  return (
    <Section id="resume" className="border-t border-border bg-muted/30 pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Resume Summary Card */}
        <div className="space-y-6">
        <Reveal>
          <SectionHeading align="center" className="mb-8">Resume Overview</SectionHeading>
        </Reveal>
          
        <Reveal delay={80}>
          <div className="p-6 md:p-8 rounded-xl glass-surface">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Education</h3>
                  <p className="font-medium text-foreground">{portfolioData.education[0].institution}</p>
                  <p className="text-sm text-foreground mt-1">{portfolioData.education[0].degree}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Academic Standing</h3>
                  <p className="font-bold text-2xl text-foreground">{portfolioData.personal.cgpa}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Core Skills</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {portfolioData.skills.programmingLanguages.join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Interests</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {portfolioData.skills.interests.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4">
              <ViewResumeButton
                label="View Full PDF Resume"
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-md border border-border bg-card px-6 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-muted hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <a
                href={portfolioData.personal.resumeUrl}
                download
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background shadow transition-all duration-200 hover:bg-foreground/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <FileText className="mr-2 h-4 w-4" /> Download Full PDF Resume
              </a>
            </div>
          </div>
        </Reveal>
        </div>

        {/* Contact Links */}
        <Reveal>
          <div id="contact" className="text-center pt-8 border-t border-border/50 scroll-mt-20">
          <SectionHeading align="center" className="mb-4">Let&apos;s Connect</SectionHeading>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
            Ready to contribute to impactful engineering teams. Feel free to reach out via email or connect on LinkedIn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.personal.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </a>
            <button
              onClick={handleCopyEmail}
              className="flex w-full sm:w-auto h-12 items-center justify-center rounded-md border border-border bg-card px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-muted hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            >
              {copyState === "copied" ? (
                <><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> Copied!</>
              ) : copyState === "failed" ? (
                <><AlertCircle className="mr-2 h-4 w-4 text-amber-500" /> Copy failed</>
              ) : (
                <><Copy className="mr-2 h-4 w-4" /> Copy Email</>
              )}
            </button>
          </div>
          {copyState === "failed" && (
            <p role="status" aria-live="polite" className="text-sm text-muted-foreground mb-6">
              Copying is not available. Select this address instead: <span className="select-all">{portfolioData.personal.email}</span>
            </p>
          )}

          <div className="flex justify-center gap-4">
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
