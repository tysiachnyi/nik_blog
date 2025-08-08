import type { MetadataRoute } from "next";

// Robots directives: allow normal search engines, block common AI crawlers.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "PerplexityBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
      { userAgent: "Omgilibot", disallow: "/" },
    ],
  };
}


