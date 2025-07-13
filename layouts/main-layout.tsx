"use client";

import { useEffect, useState } from "react";

import { motion as m } from "motion/react";

import MainFooter from "@/components/layout/main-footer";
import MainNavbar from "@/components/layout/main-navbar";
import { TailwindIndicator } from "@/components/tailwind-indicator";

// Custom hook to detect reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if the media query matches
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes to the preference
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Provides the main application layout with animated transitions that respect the user's reduced motion preference.
 *
 * Renders a navigation bar, main content area, footer, and a Tailwind indicator, applying fade animations unless reduced motion is preferred.
 *
 * @param children - The content to display within the main layout
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  // Animation configuration based on user preference
  const animationConfig = prefersReducedMotion
    ? {
        // Disable animations for users who prefer reduced motion
        initial: {},
        animate: {},
        exit: {},
        transition: { duration: 0 },
      }
    : {
        // Standard animation with reduced duration for better UX
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.6, ease: "easeInOut" as const },
      };

  return (
    <m.div {...animationConfig}>
      <MainNavbar />
      <main className="flex-1 container pt-16 min-h-dvh">{children}</main>
      <MainFooter />
      <TailwindIndicator />
    </m.div>
  );
}
