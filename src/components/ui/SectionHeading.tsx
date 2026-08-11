import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  children,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={cn(isCentered && "text-center", className)}>
      <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">
        {children}
      </h2>
      <div
        aria-hidden="true"
        className={cn("h-1 w-12 bg-primary rounded mt-2", isCentered && "mx-auto")}
      />
    </div>
  );
}
