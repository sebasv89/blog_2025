import Link from "next/link";
import { getAllCategories } from "@/lib/posts";

export default function Nav() {
  const categories = getAllCategories();
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          svelez.blog
        </Link>
        <nav className="nav">
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/blog/${c.slug}`} className="nav-link subtle">
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}


