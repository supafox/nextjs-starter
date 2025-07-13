import Link from "next/link";

import { siteConfig } from "@/data/site";

import { Stack } from "@/components/ui/stack";
import { Copy } from "@/components/ui/text";

export default function MainFooter() {
  return (
    <footer className="min-h-16 py-6 md:py-0 flex items-center border-t border-border">
      <Stack
        direction={{ sm: "column", md: "row" }}
        gap={4}
        className="items-center md:justify-between container"
      >
        <Copy size="14">
          {siteConfig.name} &copy; {new Date().getFullYear()}. All rights
          reserved.
        </Copy>
        <Stack gap={4} direction="row">
          <Link href="/legal/privacy" className="text-copy-14 hover:underline">
            Privacy
          </Link>
          <Link href="/legal/terms" className="text-copy-14 hover:underline">
            Terms
          </Link>
        </Stack>
      </Stack>
    </footer>
  );
}
