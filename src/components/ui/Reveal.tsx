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

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const set = (visible: boolean) => {
      el.setAttribute("data-reveal", visible ? "visible" : "hidden");
    };

    // Anything already on screen when JS takes over stays visible, so a dead
    // observer can never blank the page.
    const { top, bottom } = el.getBoundingClientRect();
    set(top < window.innerHeight && bottom > 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          set(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          // Only hide if it's not set to once
          set(false);
        }
      },
      // Trigger when 10% of the element is visible, 40px inside the viewport.
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={delay !== 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
