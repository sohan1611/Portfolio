"use client";

import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { Section } from "../ui/Section";
import { Award, Eye, Download, X, Clock, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface Certificate {
  title: string;
  issuer: string;
  programType?: string;
  verificationUrl?: string;
  verificationNote?: string;
  status: string;
  certificateFile: string | null;
  certificateWidth?: number;
  certificateHeight?: number;
  showViewButton: boolean;
  showDownloadButton: boolean;
}

export function Achievements() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeModal = useCallback(() => {
    setSelectedCert(null);
    triggerRef.current?.focus();
  }, []);

  // Close modal on Escape key and trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
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
  }, [selectedCert, closeModal]);

  const renderCertificateViewer = (
    fileUrl: string,
    title: string,
    width?: number,
    height?: number,
  ) => {
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
    // Image certificates should carry their real dimensions in portfolio.ts.
    return (
      <Image
        src={fileUrl}
        alt={`${title} Certificate`}
        width={width ?? 3509}
        height={height ?? 2712}
        sizes="(max-width: 1024px) 100vw, 1024px"
        className="w-full h-auto max-h-[75vh] object-contain rounded-md"
      />
    );
  };

  return (
    <Section id="achievements" className="border-t border-border bg-background">
      <div className="max-w-4xl space-y-8">
        <Reveal>
          <SectionHeading>Certifications</SectionHeading>
        </Reveal>

        <div className="space-y-6">
          {portfolioData.achievements.map((item, index) => (
            <Reveal key={index} delay={index * 60}>
              <div 
                className="p-6 rounded-xl glass-surface hover-glow flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-full shrink-0">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className={`text-sm font-display text-muted-foreground${item.programType || item.verificationUrl ? "" : " mb-3"}`}>{item.issuer}</p>
                  {item.programType && (
                    <p className={`mt-1 text-xs font-display text-muted-foreground${item.verificationUrl ? "" : " mb-3"}`}>{item.programType}</p>
                  )}
                  {item.verificationUrl && (
                    <div className="mt-2">
                      <a
                        href={item.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify credential for ${item.title}`}
                        className={`inline-flex items-center gap-1 rounded text-xs font-display text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring${item.verificationNote ? "" : " mb-3"}`}
                      >
                        Verify credential
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                      {item.verificationNote && (
                        <p className="mt-1 mb-3 text-xs text-muted-foreground">{item.verificationNote}</p>
                      )}
                    </div>
                  )}
                  
                  {item.status === "Ongoing" && (
                    <div className="inline-flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-display font-medium text-amber-500 border border-amber-500/20">
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
                    type="button"
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setSelectedCert(item as Certificate);
                    }}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-display font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`View ${item.title} certificate`}
                  >
                    <Eye className="mr-2 h-4 w-4" /> View Certificate
                  </button>
                  
                  {item.showDownloadButton && item.certificateFile && (
                    <a
                      href={item.certificateFile}
                      download
                      className="inline-flex h-10 items-center justify-center rounded-md border border-primary px-4 text-sm font-display font-medium text-primary transition-all duration-200 hover:bg-primary/10 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Download ${item.title} certificate`}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download Certificate
                    </a>
                  )}
                </div>
              )}
              </div>
            </Reveal>
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
          onClick={closeModal}
        >
          <div 
            ref={modalRef}
            className="relative bg-card border border-border p-4 md:p-6 rounded-xl shadow-xl w-full max-w-5xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 id="modal-title" className="text-lg font-semibold text-foreground">
                {selectedCert.title} – {selectedCert.issuer}
              </h2>
              <button
                ref={closeBtnRef}
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="w-full bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
              {renderCertificateViewer(
                selectedCert.certificateFile,
                selectedCert.title,
                selectedCert.certificateWidth,
                selectedCert.certificateHeight,
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </Section>
  );
}
