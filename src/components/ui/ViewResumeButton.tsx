"use client";

import { portfolioData } from "@/data/portfolio";

import { PdfViewerButton } from "./PdfViewerButton";

interface ViewResumeButtonProps {
  className?: string;
  label?: string;
}

export function ViewResumeButton({ className = "", label = "View Resume" }: ViewResumeButtonProps) {
  return (
    <PdfViewerButton
      fileUrl={portfolioData.personal.resumeUrl}
      title={`Resume – ${portfolioData.personal.name}`}
      label={label}
      iframeTitle="Resume"
      closeLabel="Close resume viewer"
      className={className}
    />
  );
}
