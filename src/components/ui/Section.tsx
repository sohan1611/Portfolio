import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, id, ...props }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn("w-full py-16 md:py-24", className)}
        {...props}
      >
        <div className="mx-auto w-full max-w-content px-4 md:px-6">
          {children}
        </div>
      </section>
    );
  }
);
Section.displayName = "Section";
