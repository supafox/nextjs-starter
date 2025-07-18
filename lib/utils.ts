import { RESPONSIVE_BREAKPOINTS } from "@/constants/tailwind";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildResponsiveGridClasses(
  value: number | Record<string, number> | undefined,
  classMap: Record<string, Record<number, string>>
): string[] {
  if (typeof value === "number") {
    const className = classMap[""]?.[value];
    return className ? [className] : [];
  }

  if (!value) return [];

  const classes: string[] = [];

  // Find the smallest defined breakpoint to use as base
  let baseBreakpoint: string | null = null;
  let baseValue: number | null = null;

  for (const bp of ["sm", "md", "lg", "xl", "2xl"]) {
    if (value[bp]) {
      baseBreakpoint = bp;
      baseValue = value[bp];
      break;
    }
  }

  // Set base class if we found a value, otherwise default to 1
  const finalBaseValue = baseValue || 1;
  const defaultClassName = classMap[""]?.[finalBaseValue];
  if (defaultClassName) {
    classes.push(defaultClassName);
  }

  // Process breakpoints, skipping the one used as base
  RESPONSIVE_BREAKPOINTS.forEach((breakpoint) => {
    if (breakpoint === baseBreakpoint) return; // Skip the base breakpoint
    const breakpointValue = value[breakpoint];
    if (breakpointValue) {
      const className = classMap[breakpoint]?.[breakpointValue];
      if (className) {
        classes.push(className);
      }
    }
  });

  return classes;
}

export function generateNonce() {
  // Generate a random array of 16 bytes
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  // Universal base64 encoding
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    // Browser environment
    return window.btoa(String.fromCharCode(...array));
  } else if (typeof Buffer !== "undefined") {
    // Node.js environment
    return Buffer.from(array).toString("base64");
  } else {
    throw new Error("No base64 encoding method available");
  }
}

export function publicUrl() {
  const appUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  const baseUrl = new URL(
    appUrl.startsWith("http") ? appUrl : `https://${appUrl}`
  );
  return baseUrl;
}

export function absoluteUrl(path: string) {
  const baseUrl = publicUrl();
  return new URL(path, baseUrl).href;
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
