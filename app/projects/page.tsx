import { listProjects } from "@/lib/github";
import { truncateWords } from "@/lib/utils";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await listProjects();
  console.log("projects", projects);
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="text-muted-foreground">
        Here are some of the projects I&apos;ve worked on.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          return (
            <Link
              href={`/projects/${project.name}`}
              key={project.id}
              className="group border-border hover:bg-muted rounded-lg border p-5 transition-colors"
            >
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {project.language}
              </p>
              {project.description && (
                <p>{truncateWords(project.description, 18)}</p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
