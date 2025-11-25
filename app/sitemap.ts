import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
  ];

  const cats = getAllCategories();
  for (const c of cats) {
    entries.push({ url: `${base}/blog/${c.slug}`, lastModified: new Date() });
    const posts = getPostsByCategory(c.slug);
    for (const p of posts) {
      entries.push({
        url: `${base}/blog/${p.categorySlug}/${p.slug}`,
        lastModified: new Date(p.date),
      });
    }
  }
  return entries;
}


