import Link from "next/link";

export default function Home() {
  return (
    <section className="font-sans">
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Hi, I&apos;m Nik
        </h1>

        <p className="max-w-prose leading-relaxed">
          I&apos;m a software engineer with a bachelor&apos;s degree in computer
          science.
        </p>
        <p className="text-muted-foreground max-w-prose leading-relaxed">
          Based in Düsseldorf, Germany.
        </p>

        <p className="text-muted-foreground max-w-prose leading-relaxed">
          Lately I&apos;ve been spending more time learning and applying AI/ML
          to real products.
        </p>

        <p className="text-muted-foreground max-w-prose leading-relaxed">
          Interests: AI/ML, Web development, and API design. I work mainly with
          TypeScript/Node.js and Python, and I like React, Next.js, Tailwind
          CSS, AWS, PostgreSQL, and MongoDB.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/blog"
            className="group border-border hover:bg-muted rounded-lg border p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Read the blog</span>
              <span className="opacity-50 transition group-hover:opacity-100">
                →
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              Notes on engineering, productivity, and more.
            </p>
          </Link>
          <Link
            href="/projects"
            className="group border-border hover:bg-muted rounded-lg border p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">My projects</span>
              <span className="opacity-50 transition group-hover:opacity-100">
                →
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              A collection of open source projects and experiments
            </p>
          </Link>
          <Link
            href="/contact"
            className="group border-border hover:bg-muted rounded-lg border p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Get in touch</span>
              <span className="opacity-50 transition group-hover:opacity-100">
                →
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              Email and socials.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
