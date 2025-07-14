import React, { ReactNode } from "react";

import {
  alignClasses,
  gapClasses,
  RESPONSIVE_BREAKPOINTS,
} from "@/constants/tailwind";

import { cn } from "@/lib/utils";

export interface SectionProps {
  children: ReactNode;
  id: string;
  fullWidth?: boolean;
  hero?: boolean;
  gap?:
    | number
    | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
      };
  className?: string;
  align?:
    | "center"
    | "start"
    | "end"
    | {
        sm?: "center" | "start" | "end";
        md?: "center" | "start" | "end";
        lg?: "center" | "start" | "end";
        xl?: "center" | "start" | "end";
        "2xl"?: "center" | "start" | "end";
      };
}

/**
 * Builds gap-related class names for flex containers
 */
function buildGapClasses(gap: SectionProps["gap"]): string[] {
  if (!gap) return [];

  const flexClassNames: string[] = ["flex", "flex-col"];

  if (typeof gap === "number") {
    const gapClass = gapClasses[""]?.[gap];
    if (gapClass) {
      flexClassNames.push(gapClass);
    } else {
      // Fallback to direct Tailwind class if not found in generated classes
      flexClassNames.push(`gap-${gap}`);
    }
  } else {
    // Handle responsive gap with proper CSS cascade
    const responsiveGapClasses: string[] = [];

    // Set a default base gap (use the smallest breakpoint or default to 0)
    const defaultGap = gap.sm || gap.md || gap.lg || gap.xl || gap["2xl"] || 0;
    const defaultGapClass = gapClasses[""]?.[defaultGap];
    if (defaultGapClass) {
      flexClassNames.push(defaultGapClass);
    }

    // Iterate over responsive breakpoints to handle gap classes dynamically
    // Skip the smallest breakpoint since it's already set as the base
    const breakpointsToProcess = RESPONSIVE_BREAKPOINTS.slice(1); // Skip 'sm'

    breakpointsToProcess.forEach((breakpoint) => {
      const gapValue = gap[breakpoint];
      if (gapValue) {
        const gapClass = gapClasses[breakpoint]?.[gapValue];
        if (gapClass) {
          responsiveGapClasses.push(gapClass);
        } else {
          // Fallback to direct Tailwind class if not found in generated classes
          responsiveGapClasses.push(`${breakpoint}:gap-${gapValue}`);
        }
      }
    });

    flexClassNames.push(...responsiveGapClasses);
  }

  return flexClassNames;
}

/**
 * Gets alignment classes for the specified alignment
 */
function getAlignClasses(align: SectionProps["align"]): string[] {
  if (typeof align === "string" || !align) {
    return (
      alignClasses[""]?.[align || "center"] || ["items-center", "text-center"]
    );
  }

  // Handle responsive alignment
  const classes: string[] = [];
  // The sm breakpoint value is used as the base alignment without a responsive prefix,
  // reflecting Tailwind's mobile-first approach. This base alignment applies to all
  // screen sizes unless overridden by larger breakpoints.
  const defaultAlign =
    align.sm || align.md || align.lg || align.xl || align["2xl"] || "center";
  classes.push(
    ...(alignClasses[""]?.[defaultAlign] || ["items-center", "text-center"])
  );

  RESPONSIVE_BREAKPOINTS.slice(1).forEach((breakpoint) => {
    const alignValue = align[breakpoint];
    if (alignValue) {
      classes.push(...(alignClasses[breakpoint]?.[alignValue] || []));
    }
  });

  return classes;
}

export function Section({
  children,
  id,
  fullWidth = false,
  hero = false,
  gap,
  className,
  align = "center",
}: SectionProps) {
  // Build base padding class
  const basePaddingClass = hero ? "py-16 md:py-25" : "py-16";

  // Build section content with appropriate padding
  const sectionContent = (
    <section id={id} className={cn(basePaddingClass, className)}>
      <div
        className={cn(
          "container",
          ...getAlignClasses(align),
          ...(gap ? buildGapClasses(gap) : [])
        )}
      >
        {children}
      </div>
    </section>
  );

  // Full-width breakout technique: negative margins to escape container constraints
  if (fullWidth) {
    return <div className={cn("bg-primary", className)}>{sectionContent}</div>;
  }

  return sectionContent;
}

// Add displayName for reliable component identification in production
Section.displayName = "Section";
