import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categoryNames } from "./config";

export type PostFrontmatter = {
  title: string;
  date: string; // ISO string
  excerpt?: string;
  tags?: string[];
  category?: string; // Display name (optional, fallback from folder)
};

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  categorySlug: string;
  categoryName: string;
};

export type PostFull = PostSummary & {
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function toTitleCase(input: string): string {
  return input
    .split(/[-_ ]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAllCategorySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export function getAllCategories(): { slug: string; name: string; count: number }[] {
  const categories = getAllCategorySlugs();
  return categories.map((slug) => {
    const posts = getPostsByCategory(slug);
    const displayName =
      categoryNames[slug] ?? posts[0]?.categoryName ?? toTitleCase(slug);
    return { slug, name: displayName, count: posts.length };
  });
}

function readPostFile(
  categorySlug: string,
  filename: string
): PostFull | null {
  const fullPath = path.join(CONTENT_DIR, categorySlug, filename);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;
  const extless = filename.replace(/\.mdx?$/i, "");
  const slug = slugify(extless);
  const title = fm.title ?? toTitleCase(extless);
  const date = fm.date ?? new Date().toISOString();
  const excerpt = fm.excerpt;
  const categoryName = fm.category ?? toTitleCase(categorySlug);
  return {
    slug,
    title,
    date,
    excerpt,
    categorySlug,
    categoryName,
    content,
  };
}

export function getPostsByCategory(categorySlug: string | null | undefined): PostSummary[] {
  if (!categorySlug) return [];
  const dir = path.join(CONTENT_DIR, categorySlug);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const posts = files
    .map((f) => readPostFile(categorySlug, f))
    .filter(Boolean) as PostFull[];
  return posts
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map(({ content: _c, ...summary }) => summary);
}

export function getAllPosts(): PostSummary[] {
  return getAllCategorySlugs()
    .flatMap((c) => getPostsByCategory(c))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(categorySlug: string, postSlug: string): PostFull | null {
  if (!categorySlug || !postSlug) {
    return null;
  }
  const dir = path.join(CONTENT_DIR, categorySlug);
  if (!fs.existsSync(dir)) return null;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  // Debug: helps diagnose 404s during development
  if (process.env.NODE_ENV !== "production") {
    console.log("[getPost] category:", categorySlug, "slug:", postSlug);
    console.log("[getPost] dir:", dir, "files:", files);
  }
  for (const file of files) {
    const p = readPostFile(categorySlug, file);
    if (process.env.NODE_ENV !== "production") {
      console.log("[getPost] candidate:", file, "->", p?.slug);
    }
    if (p) {
      if (p.slug === postSlug) return p;
      const rawName = file.replace(/\.mdx?$/i, "");
      if (slugify(rawName) === slugify(postSlug)) return p;
    }
  }
  return null;
}


