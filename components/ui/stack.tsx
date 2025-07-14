import React, { ReactNode } from "react";

import {
  alignClasses,
  directionClasses,
  gapClasses,
  RESPONSIVE_BREAKPOINTS,
} from "@/constants/tailwind";

import { cn } from "@/lib/utils";

export interface StackProps {
  children: ReactNode;
  direction?:
    | "row"
    | "column"
    | {
        sm?: "row" | "column";
        md?: "row" | "column";
        lg?: "row" | "column";
        xl?: "row" | "column";
        "2xl"?: "row" | "column";
      };
  gap?:
    | number
    | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
      };
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
  className?: string;
}

/**
 * Gets alignment classes for the specified alignment
 */
function getAlignClasses(align: StackProps["align"]): string[] {
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

export function Stack({
  children,
  direction = "column",
  gap,
  align,
  className,
}: StackProps) {
  // Build class names dynamically
  const classNames: string[] = ["flex"];

  // Handle direction classes
  if (typeof direction === "string") {
    const directionClass = directionClasses[""][direction];
    if (directionClass) {
      classNames.push(directionClass);
    } else {
      // Fallback to direct Tailwind class if not found in generated classes
      classNames.push(direction === "row" ? "flex-row" : "flex-col");
    }
    if (direction === "row") {
      classNames.push("items-center");
    }
  } else {
    // Handle responsive direction with proper CSS cascade
    const responsiveClasses: string[] = [];

    // Set a default base direction (use the smallest breakpoint or default to column)
    const defaultDirection =
      direction.sm ||
      direction.md ||
      direction.lg ||
      direction.xl ||
      direction["2xl"] ||
      "column";
    const defaultDirectionClass = directionClasses[""][defaultDirection];
    if (defaultDirectionClass) {
      classNames.push(defaultDirectionClass);
    }

    // Iterate over responsive breakpoints to handle direction classes dynamically
    // Skip the smallest breakpoint since it's already set as the base
    const breakpointsToProcess = RESPONSIVE_BREAKPOINTS.slice(1); // Skip 'sm'

    breakpointsToProcess.forEach((breakpoint) => {
      const directionValue = direction[breakpoint];
      if (directionValue) {
        const directionClass = directionClasses[breakpoint][directionValue];
        if (directionClass) {
          responsiveClasses.push(directionClass);
        } else {
          // Fallback to direct Tailwind class if not found in generated classes
          responsiveClasses.push(
            `${breakpoint}:${directionValue === "row" ? "flex-row" : "flex-col"}`
          );
        }
        if (directionValue === "row") {
          responsiveClasses.push(`${breakpoint}:items-center`);
        }
      }
    });

    classNames.push(...responsiveClasses);
  }

  // Handle gap classes
  if (typeof gap === "number") {
    const gapClass = gapClasses[""][gap];
    if (gapClass) {
      classNames.push(gapClass);
    } else {
      // Fallback to direct Tailwind class if not found in generated classes
      classNames.push(`gap-${gap}`);
    }
  } else if (gap) {
    // Handle responsive gap with proper CSS cascade
    const responsiveGapClasses: string[] = [];

    // Set a default base gap (use the smallest breakpoint or default to 0)
    const defaultGap = gap.sm || gap.md || gap.lg || gap.xl || gap["2xl"] || 0;
    const defaultGapClass = gapClasses[""]?.[defaultGap];
    if (defaultGapClass) {
      classNames.push(defaultGapClass);
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

    classNames.push(...responsiveGapClasses);
  }

  // Handle alignment classes
  const alignmentClasses = getAlignClasses(align);
  classNames.push(...alignmentClasses);
  // Add custom className
  if (className) {
    classNames.push(className);
  }

  return <div className={cn(...classNames)}>{children}</div>;
}

// Add displayName for reliable component identification in production
Stack.displayName = "Stack";
