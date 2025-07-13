import Link from "next/link";

import { allLegals } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { formatDate } from "@/lib/utils";

import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Copy, Header } from "@/components/ui/text";
import { MdxHeader } from "@/components/mdx/header";

export const metadata = {
  title: "Legal",
  description: "This section includes legal documents for the app.",
};

export default function LegalsPage() {
  const legals = allLegals
    .filter((legal) => legal.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <>
      <Section id="hero" gap={8} fullWidth hero className="bg-card">
        <MdxHeader
          heading="Legal"
          text="This section includes legal documents for the app."
        />
      </Section>
      <Section id="content" gap={8}>
        {legals?.length ? (
          <Grid columns={{ sm: 1, md: 2 }} gap={4}>
            {legals.map((legal) => (
              <Link
                key={legal._id}
                href={legal.slug}
                className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <Stack gap={4}>
                  <Stack gap={2}>
                    <Header as="h2" size="24">
                      {legal.pageTitle}
                    </Header>
                    {legal.pageDescription && (
                      <Copy className="text-muted-foreground">
                        {legal.pageDescription}
                      </Copy>
                    )}
                  </Stack>
                  {legal.date && (
                    <Copy size="14" className="text-muted-foreground">
                      {formatDate(legal.date)}
                    </Copy>
                  )}
                </Stack>
              </Link>
            ))}
          </Grid>
        ) : (
          <Copy className="text-muted-foreground">
            No legal documents published.
          </Copy>
        )}
      </Section>
    </>
  );
}
