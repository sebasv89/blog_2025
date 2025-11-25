import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import type { Metadata } from "next";

type ParamsPromise = {
  params: Promise<{ category: string }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  { params }: ParamsPromise
): Promise<Metadata> {
  const { category } = await params;
  return { title: `Categoría: ${category}` };
}

export default async function CategoryPage({ params }: ParamsPromise) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  return (
    <div>
      <h1 className="page-title">Categoría: {category}</h1>
      <ul className="grid grid-3 mt-lg">
        {posts.map((p) => (
          <li key={`${p.categorySlug}/${p.slug}`} className="post-card">
            <a className="post-title" href={`/blog/${p.categorySlug}/${p.slug}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}


