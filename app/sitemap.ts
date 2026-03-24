import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/metadata";
import { products } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/shop", "/custom-suits", "/lookbook", "/about", "/contact"];

  const staticEntries = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
    lastModified: new Date(),
  }));

  const productEntries = products.map((product) => ({
    url: `${siteUrl}/shop/${product.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...productEntries];
}


