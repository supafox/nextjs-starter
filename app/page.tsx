import Link from "next/link";

import {
  LogoContentlayer,
  LogoEslint,
  LogoMotion,
  LogoNext,
  LogoPrettier,
  LogoShadcn,
  LogoSupafox,
  LogoTailwindcss,
  LogoVercel,
} from "@supafox/icons";

import { Provider } from "@/lib/types";

import { buttonVariants } from "@/components/ui/button";
import { Grid, GridCell } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Copy, Header } from "@/components/ui/text";

// Icon map for provider logos
const iconMap = {
  LogoSupafox,
  LogoNext,
  LogoTailwindcss,
  LogoShadcn,
  LogoMotion,
  LogoEslint,
  LogoPrettier,
  LogoContentlayer,
} as const;

const providers: Provider[] = [
  {
    name: "Supafox",
    logo: "LogoSupafox",
    url: "https://supafox.dev",
  },
  {
    name: "Next.js",
    logo: "LogoNext",
    url: "https://nextjs.org",
  },
  {
    name: "Tailwind CSS",
    logo: "LogoTailwindcss",
    url: "https://tailwindcss.com",
  },
  {
    name: "Shadcn",
    logo: "LogoShadcn",
    url: "https://ui.shadcn.com",
  },
  {
    name: "Motion",
    logo: "LogoMotion",
    url: "https://motion.dev",
  },
  {
    name: "ESLint",
    logo: "LogoEslint",
    url: "https://eslint.org",
  },
  {
    name: "Prettier",
    logo: "LogoPrettier",
    url: "https://prettier.io",
  },
  {
    name: "Contentlayer2",
    logo: "LogoContentlayer",
    url: "https://github.com/timlrx/contentlayer2",
  },
];

// Helper function to safely get an icon component from the icon map
function getIconComponent(iconName: string) {
  return iconMap[iconName as keyof typeof iconMap] || null;
}

export default function Home() {
  return (
    <>
      <Section id="hero" gap={8} fullWidth hero className="bg-card">
        <Stack gap={2} className="max-w-[900px]">
          <Header
            as="h1"
            size="56"
            className="max-w-[900px] text-card-foreground"
          >
            Kickstart Your Next.js Project
          </Header>
          <Copy className="max-w-[700px] text-card-foreground">
            Everything you need to build fast, accessible web apps with Next.js.
            No setup required. Open Source. Developer Approved.
          </Copy>
        </Stack>
        <Stack gap={2} direction="row">
          <Link
            className={buttonVariants()}
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsupafox%2Fnextjs-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LogoVercel />
            Deploy now
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </Link>
        </Stack>
      </Section>
      <Section id="built-with" gap={8}>
        <Stack gap={2}>
          <Header as="h2" size="48" className="max-w-[900px]">
            Built with the Best.
          </Header>
          <Copy className="max-w-[700px]">
            Supafox gives you the modern stack your project deserves.
            Preconfigured, performant, production-ready.
          </Copy>
        </Stack>
        <Grid columns={{ sm: 1, md: 3 }} showGuides>
          {providers.map((provider) => (
            <GridCell key={provider.name}>
              <Stack gap={4} className="items-center text-center">
                {(() => {
                  const IconComponent = getIconComponent(provider.logo);
                  return IconComponent ? (
                    <IconComponent className="size-6" />
                  ) : null;
                })()}
                <Stack>
                  <Header as="h2" size="16">
                    {provider.name}
                  </Header>

                  <Link
                    href={provider.url}
                    className="text-label-14 text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website
                  </Link>
                </Stack>
              </Stack>
            </GridCell>
          ))}
        </Grid>
      </Section>
    </>
  );
}
