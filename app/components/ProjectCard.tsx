import { truncateWords } from "@/lib/utils";
import Link from "next/link";

type Props = {
  name: string;
  id: number;
  language?: string | null;
  description?: string;
};

export const ProjectCard = ({ name, id, language, description }: Props) => {
  return (
    <Link
      href={`/projects/${name}`}
      key={id}
      className="group border-border hover:bg-muted rounded-lg border p-5 transition-colors"
    >
      <h2 className="text-lg font-semibold">{name}</h2>
      {language && (
        <p className="text-muted-foreground my-1 text-sm">{language}</p>
      )}
      {description && <p>{truncateWords(description, 18)}</p>}
    </Link>
  );
};
