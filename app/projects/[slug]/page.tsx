import { Project, getProject, getProjectReadmeMarkdown } from "@/lib/github";
import Image from "next/image";
import Readme from "./Readme";

export const revalidate = 3600;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project: Project = await getProject(slug);
  const readmeMd = await getProjectReadmeMarkdown(slug);
  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Image
          src={project.owner.avatar_url}
          alt={project.owner.login}
          width={64}
          height={64}
          className="rounded"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.name}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
            {project.language ? (
              <span className="bg-muted text-foreground rounded-full px-2 py-1 text-xs">
                {project.language}
              </span>
            ) : null}
            {project.license?.name ? <span>{project.license.name}</span> : null}
            {project.updated_at ? (
              <time dateTime={project.updated_at}>
                Updated {new Date(project.updated_at).toLocaleDateString()}
              </time>
            ) : null}
          </div>
        </div>
      </header>

      {project.description ? (
        <p className="text-muted-foreground max-w-prose text-base leading-relaxed">
          {project.description}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <a
          href={project.html_url}
          className="border-border hover:bg-muted rounded border px-3 py-2 text-sm"
        >
          View on GitHub
        </a>
        {project.homepage ? (
          <a
            href={project.homepage}
            className="border-border hover:bg-muted rounded border px-3 py-2 text-sm"
          >
            Visit site
          </a>
        ) : null}
      </div>

      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {typeof project.stargazers_count === "number" ? (
          <div className="border-border rounded-lg border p-4">
            <dt className="text-muted-foreground text-xs">Stars</dt>
            <dd className="text-lg font-medium">{project.stargazers_count}</dd>
          </div>
        ) : null}
        {typeof project.forks_count === "number" ? (
          <div className="border-border rounded-lg border p-4">
            <dt className="text-muted-foreground text-xs">Forks</dt>
            <dd className="text-lg font-medium">{project.forks_count}</dd>
          </div>
        ) : null}
        {typeof project.open_issues_count === "number" ? (
          <div className="border-border rounded-lg border p-4">
            <dt className="text-muted-foreground text-xs">Open issues</dt>
            <dd className="text-lg font-medium">{project.open_issues_count}</dd>
          </div>
        ) : null}
      </dl>

      {readmeMd ? (
        <div className="mt-6">
          <Readme markdown={readmeMd} />
        </div>
      ) : null}
    </section>
  );
}
