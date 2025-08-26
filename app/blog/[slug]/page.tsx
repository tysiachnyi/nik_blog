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
  const ogImage =
    post.frontmatter.ogImage || "https://www.nikitatysiachnyi.com/og-image.png";
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      url: `https://www.nikitatysiachnyi.com/blog/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      site: "@nikitatysiachnyi",
      creator: "@nikitatysiachnyi",
      images: [ogImage],
    },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt || "",
    datePublished: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: "Nikita Tysiachnyi",
    },
    image:
      post.frontmatter.ogImage ||
      "https://www.nikitatysiachnyi.com/og-image.png",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.nikitatysiachnyi.com/blog/${slug}`,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose">
        <h1>{post.frontmatter.title}</h1>
        <div className="text-muted-foreground -mt-4 mb-6 text-sm">
          <time>{new Date(post.frontmatter.date).toLocaleDateString()}</time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
