import { portfolioData } from "@/data/portfolio";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-8">
      <div className="mx-auto flex max-w-content flex-col items-center justify-center px-4 md:px-6 space-y-4">
        <div className="flex items-center gap-6">
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.personal.email}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
            <Mail className="h-5 w-5" />
          </a>
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <FaGithub className="h-5 w-5" />
          </a>
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
            <FaLinkedin className="h-5 w-5" />
          </a>
        </div>
        <p className="text-sm font-display text-muted-foreground/80 tracking-wide text-center">
          © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
