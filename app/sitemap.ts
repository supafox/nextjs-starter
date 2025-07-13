import type { MetadataRoute } from "next";

import { publicUrl } from "@/lib/utils";

/**
 * Generates a sitemap containing multiple entries for the application's base URL and legal pages.
 *
 * @returns An array with sitemap entries including the base URL, legal index page, privacy policy, and terms of service.
 * Each entry includes the URL, current date as last modified, yearly change frequency, and highest priority (1.0).
 *
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
