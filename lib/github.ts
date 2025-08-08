const USER = "tysiachnyi";
const TOPIC = "project";

const headers = {
  Accept: "application/vnd.github+json",
};

type Project = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language?: string | null;
  topics?: string[];
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
