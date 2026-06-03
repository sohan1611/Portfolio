"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { portfolioData } from "@/data/portfolio";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="#home" className="text-sm font-semibold tracking-tight hover:text-primary transition-colors">
            {portfolioData.personal.name}
          </Link>
          {portfolioData.personal.openToInternship && (
            <span className="hidden md:inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
              Open to Internship Opportunities
            </span>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        
        {/* Mobile Nav Toggle can be handled via Command Palette or a simple menu later, 
            for now just keeping the Theme Toggle visible on mobile */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <span className="text-xs text-muted-foreground">Press /</span>
        </div>
      </div>
    </header>
  );
}
