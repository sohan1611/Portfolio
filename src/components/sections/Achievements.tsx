"use client";

import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Award, Eye, Download, X, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Certificate {
  title: string;
  issuer: string;
  status: string;
  certificateFile: string | null;
  showViewButton: boolean;
  showDownloadButton: boolean;
}

export function Achievements() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close modal on Escape key and trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
      
      // Simple focus trap
      if (e.key === "Tab" && selectedCert && modalRef.current) {
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

    if (selectedCert) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
      window.addEventListener("keydown", handleKeyDown);
      // Focus the close button when modal opens
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  const renderCertificateViewer = (fileUrl: string, title: string) => {
    const isPdf = fileUrl.toLowerCase().endsWith(".pdf");
    if (isPdf) {
      return (
        <iframe
          src={`${fileUrl}#toolbar=0`}
          className="w-full h-[60vh] md:h-[75vh] rounded-md border border-border"
          title={`${title} Certificate`}
        />
      );
    }
    return (
      <img
        src={fileUrl}
        alt={`${title} Certificate`}
        className="w-full h-auto max-h-[75vh] object-contain rounded-md"
      />
    );
  };

  return (
    <Section id="achievements" className="border-t border-border bg-background">
      <div className="max-w-4xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Certifications</h2>
          <div className="h-1 w-12 bg-primary rounded"></div>
        </div>

        <div className="space-y-6">
          {portfolioData.achievements.map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-card border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-full shrink-0">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground mb-3">{item.issuer}</p>
                  
                  {item.status === "Ongoing" && (
                    <div className="inline-flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                        <Clock className="h-3 w-3" /> Coming Soon
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        Certification in progress — certificate will be available after completion.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {item.status === "Completed" && item.showViewButton && (
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button
                    onClick={() => setSelectedCert(item as Certificate)}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`View ${item.title} certificate`}
                  >
                    <Eye className="mr-2 h-4 w-4" /> View Certificate
                  </button>
                  
                  {item.showDownloadButton && item.certificateFile && (
                    <a
                      href={item.certificateFile}
                      download
                      className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Download ${item.title} certificate`}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download Certificate
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Certificate Modal */}
      {selectedCert && selectedCert.certificateFile && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            ref={modalRef}
            className="relative bg-card border border-border p-4 md:p-6 rounded-xl shadow-xl w-full max-w-5xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 id="modal-title" className="text-lg font-semibold text-foreground">
                {selectedCert.title} – {selectedCert.issuer}
              </h2>
              <button
                ref={closeBtnRef}
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="w-full bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
              {renderCertificateViewer(selectedCert.certificateFile, selectedCert.title)}
            </div>
          </div>
        </div>,
        document.body
      )}
    </Section>
  );
}
