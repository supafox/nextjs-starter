import type { MetadataRoute } from "next";

import { publicUrl } from "@/lib/utils";

/**
 * Generates a sitemap with entries for the application's base URL and legal pages.
 *
 * @returns An array of sitemap entries, each specifying the URL, last modified date, change frequency, and priority.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = publicUrl();

  return [
    {
      url: baseUrl.href,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl.href}/legal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl.href}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl.href}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
