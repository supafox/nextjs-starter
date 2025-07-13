import React, { ReactNode } from "react";

import { gapClasses, RESPONSIVE_BREAKPOINTS } from "@/constants/tailwind";

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
}

/**
 * Generates an array of Tailwind CSS class names for flex containers with gap spacing, supporting both fixed and responsive gap values.
 *
 * If a numeric gap is provided, returns the corresponding gap class or a direct Tailwind gap class. For responsive gap objects, applies the smallest breakpoint as the base gap and adds responsive classes for larger breakpoints as specified.
 *
 * @param gap - The gap value or responsive gap object to convert into class names
 * @returns An array of class names for flex layout and gap spacing
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
 * Renders a section element with configurable padding, optional full-width breakout, and responsive gap layout for its children.
 *
 * If `fullWidth` is enabled, the section breaks out of its container to span the entire viewport width. When a `gap` is provided, children are wrapped in a flex column with responsive spacing between them. The `hero` prop increases vertical padding for prominent sections.
 *
 * @param id - The unique identifier for the section element
 * @param children - The content to display within the section
 */
export function Section({
  children,
  id,
  fullWidth = false,
  hero = false,
  gap,
  className,
}: SectionProps) {
  // Build base padding class
  const basePaddingClass = hero ? "py-25" : "py-16";

  // Build section content with appropriate padding
  const sectionContent = (
    <section id={id} className={cn(basePaddingClass, !gap && className)}>
      {gap ? (
        <div className={cn(...buildGapClasses(gap), className)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );

  // Full-width breakout technique: negative margins to escape container constraints
  if (fullWidth) {
    return (
      <div
        className={cn(
          "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
          gap && className
        )}
      >
        <div className="container">{sectionContent}</div>
      </div>
    );
  }

  return sectionContent;
}

// Add displayName for reliable component identification in production
Section.displayName = "Section";
