import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { categoryOrder, siteIntro, siteTitle } from "@/lib/config";

export default function Home() {
  const categories = getAllCategories();
  // Ordenar categorías según config, luego el resto alfabéticamente
  const ordered = [
    ...categoryOrder.filter((c) => categories.some((k) => k.slug === c)),
    ...categories
      .map((c) => c.slug)
      .filter((c) => !categoryOrder.includes(c))
      .sort(),
  ];
  return (
    <div className="home">
      <h1 className="home-title">{siteTitle}</h1>
      <p className="home-intro">{siteIntro}</p>

      {ordered.map((slug) => {
        const cat = categories.find((c) => c.slug === slug);
        const posts = getPostsByCategory(slug);
        if (!cat || posts.length === 0) return null;
        return (
          <section key={slug} className="category-block">
            <h2 className="category-title">
              <Link href={`/blog/${slug}`} className="category-link">
                {cat.name}
              </Link>
            </h2>
            <ul className="post-list">
              {posts.map((p) => (
                <li key={`${p.categorySlug}/${p.slug}`} className="post-row">
                  <Link href={`/blog/${p.categorySlug}/${p.slug}`} className="post-link">
                    {p.title}
                  </Link>
                  <span className="post-date">
                    {new Date(p.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
