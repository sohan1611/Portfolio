"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto w-full max-w-content px-4 md:px-6"
        >
          {children}
        </motion.div>
      </section>
    );
  }
);
Section.displayName = "Section";
