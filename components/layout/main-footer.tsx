import Link from "next/link";

import { Copy } from "@/components/ui/text";

import { Stack } from "../ui/stack";

/**
 * Renders the main footer with a responsive layout, displaying a copyright
 * notice and navigation links to the privacy policy and terms of service pages.
 */
export default function MainFooter() {
  return (
    <footer className="min-h-16 py-6 md:py-0 flex items-center border-t border-border">
      <Stack
        direction={{ sm: "column", md: "row" }}
        gap={4}
        className="items-center md:justify-between container"
      >
        <Copy size="14">
          SuperBrand &copy; {new Date().getFullYear()}. All rights reserved.
        </Copy>
        <Stack gap={4} direction="row">
          <Link href="/privacy" className="text-copy-14 hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-copy-14 hover:underline">
            Terms
          </Link>
        </Stack>
      </Stack>
    </footer>
  );
}
