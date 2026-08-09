"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Eye, X, Download, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface ViewResumeButtonProps {
  className?: string;
  label?: string;
}

export function ViewResumeButton({ className = "", label = "View Resume" }: ViewResumeButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const resumeUrl = portfolioData.personal.resumeUrl;
  const closeModal = React.useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close on Escape and trap focus while the modal is open
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <Eye className="mr-2 h-4 w-4" /> {label}
      </button>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="relative bg-card border border-border p-4 md:p-6 rounded-xl shadow-xl w-full max-w-5xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 id="resume-modal-title" className="text-lg font-semibold text-foreground">
                Resume – {portfolioData.personal.name}
              </h2>
              <button
                ref={closeBtnRef}
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close resume viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="w-full bg-muted/50 rounded-lg overflow-hidden">
              <iframe
                src={`${resumeUrl}#toolbar=0`}
                className="w-full h-[60vh] md:h-[75vh] rounded-md border border-border"
                title="Resume"
              />
            </div>

            {/* Fallback actions — some mobile browsers refuse to render PDFs inline */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-md border border-border px-4 text-sm font-display font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-muted hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Open in New Tab
              </a>
              <a
                href={resumeUrl}
                download
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-md bg-primary px-4 text-sm font-display font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
