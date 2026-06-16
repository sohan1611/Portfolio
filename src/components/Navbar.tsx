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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/75 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="#home" className="text-sm font-display font-bold tracking-tight text-slate-900/85 dark:text-slate-200/85 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
            {portfolioData.personal.name}
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-display font-medium text-slate-900/80 dark:text-slate-200/80 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 relative"
            >
              <span className="relative">
                {link.name}
              </span>
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
