import { remark } from "remark";
import html from "remark-html";

export default async function Readme({ markdown }: { markdown: string }) {
  const processed = await remark().use(html).process(markdown);
  const contentHtml = processed.toString();
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
  );
}
