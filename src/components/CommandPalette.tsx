"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const LINKS = [
  { name: "Home", href: "/#home" },
  { name: "Highlights", href: "/#highlights" },
  { name: "About", href: "/#about" },
  { name: "Education", href: "/#education" },
  { name: "Skills", href: "/#skills" },
  { name: "Future Goals", href: "/#goals" },
  { name: "Projects", href: "/#projects" },
  { name: "Achievements", href: "/#achievements" },
  { name: "Resume", href: "/#resume" },
  { name: "Contact", href: "/#contact" },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredLinks = LINKS.filter((link) =>
    link.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setIsOpen(false);
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
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl mx-4"
          >
            <div className="flex items-center border-b border-border px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                autoFocus
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredLinks.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">
                  No results found.
                </p>
              ) : (
                filteredLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleSelect(link.href)}
                    className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none hover:bg-muted focus:bg-muted text-foreground"
                  >
                    {link.name}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
