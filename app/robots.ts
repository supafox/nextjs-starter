import type { MetadataRoute } from "next";

import { publicUrl } from "@/lib/utils";

/**
 * Generates robots.txt rules and sitemap URL for the application.
 *
 * Returns a configuration object specifying user-agent-specific crawling rules and the absolute sitemap URL, based on the application's base URL from the environment.
 *
 * @returns A {@link MetadataRoute.Robots} object containing robots.txt directives and sitemap location.
 *
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = publicUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/_static/",
          "/admin/",
          "/dashboard/",
          "/private/",
          "/internal/",
          "/temp/",
          "/test/",
          "/debug/",
          "/.well-known/",
          "/robots.txt",
          "/sitemap.xml",
        ],
      },
    ],
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
  };
}
