export const metadata = {
    title: "Contact",
};

export default function ContactPage() {
    return (
        <section className="space-y-6 max-w-prose">
            <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
            <p className="text-muted-foreground">
                You can contact me via email, LinkedIn, or GitHub.
            </p>
            <div className="grid gap-3">
                <a href="mailto:nikita.tysiachnyi@gmail.com" className="rounded border border-border p-4 hover:bg-muted">Email</a>
                <a href="https://linkedin.com/in/niktys" className="rounded border border-border p-4 hover:bg-muted">LinkedIn</a>
                <a href="https://github.com/tysiachnyi" className="rounded border border-border p-4 hover:bg-muted">GitHub</a>
            </div>
        </section>
    );
}


