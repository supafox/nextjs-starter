"use client";

import { usePathname } from "next/navigation";

import { domAnimation, LazyMotion, m } from "motion/react";

import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Skip all animations if the user has “reduce motion” turned on
  if (prefersReducedMotion) return <>{children}</>;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        key={pathname} // ← forces re-mount on every route change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
