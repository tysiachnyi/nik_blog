import { listProjects } from "@/lib/github";
import { Header1, ProjectCard } from "../components";

export default async function ProjectsPage() {
  const projects = await listProjects();
  console.log("projects", projects);
  return (
    <section className="space-y-6">
      <Header1>Projects</Header1>
      <p className="text-muted-foreground">
        Here are some of the projects I&apos;ve worked on.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          return (
            <ProjectCard
              id={project.id}
              language={project.language}
              name={project.name}
              description={project.description}
              key={project.name}
            />
          );
        })}
      </div>
    </section>
  );
}
