import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCategories, getPost, getPostsByCategory } from "@/lib/posts";
import { mdxComponents } from "@/components/MDXComponents";
import Link from "next/link";

type ParamsPromise = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  const cats = getAllCategories();
  return cats.flatMap((c) =>
    getPostsByCategory(c.slug).map((p) => ({ category: c.slug, slug: p.slug }))
  );
}

export async function generateMetadata(
  { params }: ParamsPromise
): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: ParamsPromise) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) return notFound();
  return (
    <article className="post">
      <p className="muted">
        <Link href={`/blog/${post.categorySlug}`} className="link">
          {post.categoryName}
        </Link>{" "}
        ·{" "}
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </p>
      <h1 className="post-title-xl">{post.title}</h1>
      <div className="post-content">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}


