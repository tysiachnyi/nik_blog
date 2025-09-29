import Link from "next/link";
import { getAllPosts } from "@/lib/md";
import { Header1 } from "../components";

export const metadata = {
  title: "Blog",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <section className="space-y-6">
      <Header1>Blog</Header1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-border hover:bg-muted rounded-lg border p-4 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-lg font-medium">
                    {post.frontmatter.title}
                  </h2>
                  <time className="text-muted-foreground text-xs">
                    {new Date(post.frontmatter.date).toLocaleDateString()}
                  </time>
                </div>
                {post.frontmatter.excerpt ? (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {post.frontmatter.excerpt}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
