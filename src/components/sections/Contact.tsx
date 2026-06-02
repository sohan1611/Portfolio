"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Mail, FileText, Copy, CheckCircle2 } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact" className="border-t border-border bg-muted/30 pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Resume Summary Card */}
        <div id="resume" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Resume Overview</h2>
          </div>
          
          <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
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
                    {portfolioData.skills.languages.join(", ")}
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

            <div className="mt-8 pt-6 border-t border-border flex justify-center">
              <a
                href={portfolioData.personal.resumeUrl}
                download
                className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background shadow transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <FileText className="mr-2 h-4 w-4" /> Download Full PDF Resume
              </a>
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div className="text-center pt-8 border-t border-border/50">
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">Let&apos;s Connect</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
            Ready to contribute to impactful engineering teams. Feel free to reach out via email or connect on LinkedIn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="flex w-full sm:w-auto h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </a>
            <button
              onClick={handleCopyEmail}
              className="flex w-full sm:w-auto h-12 items-center justify-center rounded-md border border-border bg-card px-8 text-sm font-medium shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
            >
              {copied ? (
                <><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> Copied!</>
              ) : (
                <><Copy className="mr-2 h-4 w-4" /> Copy Email</>
              )}
            </button>
          </div>

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
      </div>
    </Section>
  );
}
