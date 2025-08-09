const USER = "tysiachnyi";
const TOPIC = "project";

const headers = {
  Accept: "application/vnd.github+json",
};

export type Project = {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  language?: string | null;
  topics?: string[];
  url: string;
  homepage?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  license?: { key?: string; name?: string } | null;
  updated_at?: string;

  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export async function listProjects(): Promise<Project[]> {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=user:${USER}+topic:${TOPIC}&per_page=100`,
    { headers },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
  return data.items as Project[];
}

/**
 * Fetch repository README as raw Markdown. Returns null if missing.
 */
export async function getProjectReadmeMarkdown(
  slug: string,
): Promise<string | null> {
  // Use the GitHub API 'readme' endpoint which resolves the default branch and path
  const res = await fetch(
    `https://api.github.com/repos/${USER}/${slug}/readme`,
    {
      headers: {
        ...headers,
        // Ask for raw markdown directly
        Accept: "application/vnd.github.raw",
      },
      next: { revalidate: 3600 },
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub README error: ${res.status}`);
  const text = await res.text();
  return text || null;
}

export async function getProject(slug: string): Promise<Project> {
  const res = await fetch(`https://api.github.com/repos/tysiachnyi/${slug}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
