import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/md";

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  return (
    <article className="prose">
      <h1>{post.frontmatter.title}</h1>
      <div className="text-muted-foreground -mt-4 mb-6 text-sm">
        <time>{new Date(post.frontmatter.date).toLocaleDateString()}</time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
