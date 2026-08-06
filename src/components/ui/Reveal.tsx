"use client";

import * as React from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function Reveal({ children, className = "", delay = 0, once = false }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const prefersReducedMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  React.useEffect(() => {
    if (prefersReducedMotion) return;

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
  }, [once, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: prefersReducedMotion || isVisible ? 1 : 0,
        transform: prefersReducedMotion || isVisible ? "translateY(0)" : "translateY(14px)",
        // Remove delay on exit so it hides immediately when out of view
        transition: prefersReducedMotion
          ? "none"
          : isVisible
          ? `opacity 300ms ease-out ${delay}ms, transform 300ms ease-out ${delay}ms`
          : `opacity 300ms ease-out, transform 300ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}
