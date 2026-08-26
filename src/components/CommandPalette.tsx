"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const GROUPS = ["Sections", "Projects", "Skills", "Certifications"] as const;
const MAX_RESULTS_PER_GROUP = 5;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

type CommandGroup = (typeof GROUPS)[number];

interface CommandEntry {
  name: string;
  href: string;
  group: CommandGroup;
  keywords?: string[];
}

const SKILL_SOURCES = [
  portfolioData.skills.programmingLanguages,
  portfolioData.skills.frameworks,
  portfolioData.skills.databases,
  portfolioData.skills.ai,
  portfolioData.skills.auth,
  portfolioData.skills.cloud,
  portfolioData.skills.tools,
  portfolioData.skills.aiDev,
];

const UNIQUE_SKILLS = Array.from(
  new Map<string, string>(
    SKILL_SOURCES.flat().map((skill): [string, string] => [skill.toLowerCase(), skill])
  ).values()
);

const COMMAND_ENTRIES: CommandEntry[] = [
  { name: "Home", href: "/#home", group: "Sections" },
  { name: "Highlights", href: "/#highlights", group: "Sections" },
  { name: "About", href: "/#about", group: "Sections" },
  { name: "Education", href: "/#education", group: "Sections" },
  { name: "Skills", href: "/#skills", group: "Sections" },
  { name: "Future Goals", href: "/#goals", group: "Sections" },
  { name: "Projects", href: "/#projects", group: "Sections" },
  { name: "Achievements", href: "/#achievements", group: "Sections" },
  { name: "Resume", href: "/#resume", group: "Sections" },
  { name: "Contact", href: "/#contact", group: "Sections" },
  ...portfolioData.projects.map((project) => ({
    name: project.title,
    href: `/projects/${project.slug}`,
    group: "Projects" as const,
    keywords: [...project.technologies, project.status],
  })),
  ...UNIQUE_SKILLS.map((skill) => ({
    name: skill,
    href: "/#skills",
    group: "Skills" as const,
  })),
  ...portfolioData.achievements.map((achievement) => ({
    name: achievement.title,
    href: "/#achievements",
    group: "Certifications" as const,
    keywords: [achievement.issuer],
  })),
];

const matchesQuery = (entry: CommandEntry, normalizedQuery: string) =>
  [entry.name, ...(entry.keywords ?? [])].some((value) =>
    value.toLowerCase().includes(normalizedQuery)
  );

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  const openPalette = React.useCallback(() => {
    const activeElement = document.activeElement;
    previousFocusRef.current = activeElement instanceof HTMLElement ? activeElement : null;
    setIsOpen(true);
  }, []);

  const closePalette = React.useCallback(() => {
    setIsOpen(false);

    const previousFocus = previousFocusRef.current;
    if (previousFocus && document.contains(previousFocus)) {
      previousFocus.focus();
    }
    previousFocusRef.current = null;
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === "Escape" && isOpen) {
        closePalette();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [closePalette, isOpen, openPalette]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const matchingEntries = COMMAND_ENTRIES.filter((entry) =>
    isSearching ? matchesQuery(entry, normalizedQuery) : entry.group === "Sections"
  );
  const groupedResults = GROUPS.map((group) => {
    const entries = matchingEntries.filter((entry) => entry.group === group);
    return {
      group,
      entries: isSearching ? entries.slice(0, MAX_RESULTS_PER_GROUP) : entries,
    };
  }).filter(({ entries }) => entries.length > 0);

  const handleSelect = (href: string) => {
    closePalette();
    setQuery("");
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] sm:pt-[25vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 command-palette-overlay"
            onClick={closePalette}
          />
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl mx-4"
          >
            <div className="flex items-center border-b border-border px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                autoFocus
                aria-label="Search sections, projects and skills"
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {groupedResults.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">
                  No results found.
                </p>
              ) : (
                groupedResults.map(({ group, entries }) => (
                  <div key={group}>
                    <div className="px-2 pb-1 pt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {group}
                    </div>
                    {entries.map((entry) => (
                      <button
                        key={`${entry.group}-${entry.name}-${entry.href}`}
                        onClick={() => handleSelect(entry.href)}
                        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none hover:bg-muted focus:bg-muted text-foreground"
                      >
                        {entry.name}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
