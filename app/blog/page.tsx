import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata = {
  title: "Blog",
  description: "Listado de todos los artículos",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  return (
    <div className="blog-index">
      <h1 className="page-title">Todos los posts</h1>
      <div className="pills">
        <Link href="/blog" className="pill pill-active">
          Todos <span className="pill-count">{posts.length}</span>
        </Link>
        {categories.map((c) => (
          <Link key={c.slug} href={`/blog/${c.slug}`} className="pill">
            {c.name} <span className="pill-count">{c.count}</span>
          </Link>
        ))}
      </div>
      <section className="grid grid-3 mt-lg">
        {posts.map((p) => (
          <PostCard key={`${p.categorySlug}/${p.slug}`} post={p} />
        ))}
      </section>
    </div>
  );
}


