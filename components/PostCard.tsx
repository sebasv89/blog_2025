import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="post-card">
      <h3 className="post-title">
        <Link href={`/blog/${post.categorySlug}/${post.slug}`}>{post.title}</Link>
      </h3>
      <div className="post-meta">
        <span className="pill">
          <Link href={`/blog/${post.categorySlug}`}>{post.categoryName}</Link>
        </span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
      {post.excerpt ? <p className="post-excerpt">{post.excerpt}</p> : null}
    </article>
  );
}


