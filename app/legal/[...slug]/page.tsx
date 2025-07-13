import Link from "next/link";
import { notFound } from "next/navigation";

import { allLegals } from "contentlayer/generated";

import { publicUrl } from "@/lib/utils";

import { Mdx } from "@/components/mdx/components";
import { MdxHeader } from "@/components/mdx/header";

import "@/assets/styles/mdx.css";

import { Metadata, ResolvingMetadata } from "next";

import { ChevronRight } from "@supafox/icons";

import { absoluteUrl, cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getLegalFromParams(params: Awaited<Props["params"]>) {
  const slug = params?.slug?.join("/");
  const legal = allLegals.find(
    (legal) => legal.slugAsParams === slug && legal.published
  );

  if (!legal) {
    return null;
  }

  return legal;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const legal = await getLegalFromParams(resolvedParams);

  if (!legal) {
    return {};
  }

  const url = publicUrl();
  const previousImages = (await parent).openGraph?.images || [];

  const ogUrl = new URL("/api/og", url);
  ogUrl.searchParams.set("heading", legal.metaTitle);
  ogUrl.searchParams.set("type", "Legal");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: legal.metaTitle,
    description: legal.metaDescription,
    openGraph: {
      title: legal.metaTitle,
      description: legal.metaDescription,
      type: "article",
      url: absoluteUrl(legal.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: legal.metaTitle,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: legal.metaTitle,
      description: legal.metaDescription,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  Awaited<Props["params"]>[]
> {
  return allLegals
    .filter((legal) => legal.published)
    .map((legal) => ({
      slug: legal.slugAsParams.split("/"),
    }));
}

export default async function LegalPage({ params }: Props) {
  const resolvedParams = await params;
  const legal = await getLegalFromParams(resolvedParams);

  if (!legal) {
    notFound();
  }

  return (
    <>
      <Section id="hero" gap={8} fullWidth hero className="bg-card">
        <Stack gap={2}>
          <MdxHeader heading={legal.pageTitle} text={legal.pageDescription} />
        </Stack>
      </Section>
      <Section id="content" gap={8}>
        <Mdx code={legal.body.code} />
        <Link
          href="/legal"
          className={cn(buttonVariants({ variant: "ghost" }), "w-fit mx-auto")}
        >
          <ChevronRight height={16} className="mr-2" />
          See all legal docs
        </Link>
      </Section>
    </>
  );
}
