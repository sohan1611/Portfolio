"use client";

import * as React from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function Reveal({ children, className = "", delay = 0, once = false }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          // Only hide if it's not set to once
          setIsVisible(false);
        }
      },
      // Trigger when 10% of the element is visible
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(14px)",
        // Remove delay on exit so it hides immediately when out of view
        transition: isVisible
          ? `opacity 300ms ease-out ${delay}ms, transform 300ms ease-out ${delay}ms`
          : `opacity 300ms ease-out, transform 300ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}
