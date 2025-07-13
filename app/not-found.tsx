import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Copy, Header } from "@/components/ui/text";

export default function NotFound() {
  return (
    <Section id="not-found" className="flex flex-col py-0 -mt-16">
      <Stack gap={8} className="items-center justify-center h-dvh">
        <Stack gap={2} className="items-center justify-center">
          <Header as="h1" size="56">
            404
          </Header>
          <Copy className="max-w-[400px] text-center">
            You would&apos;ve gotten away with it, if it weren&apos;t for those
            meddling kids, and their nosy dog.
          </Copy>
        </Stack>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Go to Home
        </Link>
      </Stack>
    </Section>
  );
}
