import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/md";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.nikitatysiachnyi.com";
  const staticRoutes = ["/", "/blog", "/projects", "/contact"];
  const postSlugs = getPostSlugs();

  const routes = [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
    })),
    ...postSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date().toISOString(),
    })),
  ];

  return routes;
}
