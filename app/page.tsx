import Link from "next/link";

export default function Home() {
  return (
    <section className="font-sans">
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">Hi, I&apos;m Nik</h1>
        <p className="text-muted-foreground max-w-prose">
          I&apos;m a software engineer  with a passion for building products that help people live better lives.
        </p>
        <p className="text-muted-foreground max-w-prose">
          I&apos;m currently living in Düsseldorf, Germany 🇩🇪
        </p>
        <p className="text-muted-foreground max-w-prose">
          My Tech Stack 🛠️: TypeScript, Python, React, Next.js, Tailwind CSS, Node.js, AWS, MongoDB, PostgreSQL
        </p>
          
        
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/blog"
            className="group rounded-lg border border-border p-5 hover:bg-muted transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Read the blog</span>
              <span className="opacity-50 group-hover:opacity-100 transition">→</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Notes on engineering, productivity, and more.
            </p>
          </Link>
          <Link
            href="/contact"
            className="group rounded-lg border border-border p-5 hover:bg-muted transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Get in touch</span>
              <span className="opacity-50 group-hover:opacity-100 transition">→</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Email and socials.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
