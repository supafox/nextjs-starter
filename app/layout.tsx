import type { Metadata } from "next";

import { ThemeProvider } from "@/context/theme-context";

import "@/assets/styles/globals.css";

import { headers } from "next/headers";

import { fontMono, fontSans } from "@/assets/fonts";
import { defaultMeta } from "@/data/metadata";
import MainLayout from "@/layouts/main-layout";

export const metadata: Metadata = {
  ...defaultMeta,
};

/**
 * Defines the root layout for the application, applying global HTML structure, font styles, and theme configuration.
 *
 * Wraps all pages with a consistent layout, applies global fonts and background, and configures the theme provider to support system themes. If a valid Base64 nonce is present in the request headers, it is passed to the theme provider for CSP compatibility; otherwise, the nonce is omitted.
 *
 * @param children - The content to display within the layout.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce");

  // Validate nonce format if present
  // Base64 string with variable length and optional padding
  let validNonce: string | undefined;
  if (nonce) {
    if (/^[A-Za-z0-9+/]+={0,2}$/.test(nonce)) {
      validNonce = nonce;
    } else {
      // eslint-disable-next-line no-console
      console.warn("Invalid nonce format detected, nonce will be omitted");
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} bg-background font-sans text-copy-16 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          nonce={validNonce}
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
