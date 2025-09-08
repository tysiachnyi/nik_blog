type Props = {
  title: string;
  href: string;
};

export const ContactCard = ({ title, href }: Props) => {
  return (
    <a href={href} className="border-border hover:bg-muted rounded border p-4">
      {title}
    </a>
  );
};
