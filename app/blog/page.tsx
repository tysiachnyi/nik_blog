import Link from "next/link";
import { getAllPosts } from "@/lib/md";

export const metadata = {
    title: "Blog",
};

export default async function BlogPage() {
    const posts = await getAllPosts();
    return (
        <section className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
            {posts.length === 0 ? (
                <p className="text-muted-foreground">No posts yet.</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.slug} className="rounded-lg border border-border p-4 hover:bg-muted transition-colors">
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="flex items-baseline justify-between gap-4">
                                    <h2 className="font-medium text-lg">{post.frontmatter.title}</h2>
                                    <time className="text-xs text-muted-foreground">{new Date(post.frontmatter.date).toLocaleDateString()}</time>
                                </div>
                                {post.frontmatter.excerpt ? (
                                    <p className="text-sm text-muted-foreground mt-1">{post.frontmatter.excerpt}</p>
                                ) : null}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}


