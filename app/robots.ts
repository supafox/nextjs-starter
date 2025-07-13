import type { MetadataRoute } from "next";

import { publicUrl } from "@/lib/utils";

/**
 * Returns the robots.txt configuration for the application, specifying crawling rules and the absolute sitemap URL.
 *
 * The configuration allows all user agents to crawl the root path while disallowing access to sensitive or internal routes. The sitemap property provides the absolute URL to the sitemap based on the application's base URL.
 *
 * @returns The robots.txt directives and sitemap location as a MetadataRoute.Robots object.
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
