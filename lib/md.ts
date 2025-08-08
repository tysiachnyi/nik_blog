import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostFrontmatter = {
    title: string;
    date: string; // ISO string
    excerpt?: string;
    tags?: string[];
};

export type Post = {
    slug: string;
    content: string;
    frontmatter: PostFrontmatter;
};

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
        .readdirSync(postsDirectory)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processed = await remark().use(html).process(content);
    const contentHtml = processed.toString();

    return {
        slug,
        content: contentHtml,
        frontmatter: data as PostFrontmatter,
    };
}

export async function getAllPosts(): Promise<Post[]> {
    const slugs = getPostSlugs();
    const posts = await Promise.all(slugs.map((s) => getPostBySlug(s)));
    return posts
        .filter((p): p is Post => Boolean(p))
        .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}


