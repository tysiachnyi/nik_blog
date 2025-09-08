import { ContactCard, Header1 } from "../components";

export const metadata = {
  title: "Contact",
  alternates: {
    canonical: "/contact",
  },
};

const cardsData = [
  {
    title: "Email",
    href: "mailto:nikita.tysiachnyi@gmail.com",
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/niktys",
  },
  {
    title: "GitHub",
    href: "https://github.com/tysiachnyi",
  },
];

export default function ContactPage() {
  return (
    <section className="max-w-prose space-y-6">
      <Header1>Contact</Header1>
      <p className="text-muted-foreground">
        You can contact me via {cardsData.map((card) => card.title).join(", ")}.
      </p>
      <div className="grid gap-3">
        {cardsData.map((card) => (
          <ContactCard key={card.title} title={card.title} href={card.href} />
        ))}
      </div>
    </section>
  );
}
