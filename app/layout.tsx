import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nik Blog",
    template: "%s · Nik Blog",
  },
  description: "Personal blog and notes",
  other: {
    // Opt-out hints for some AI crawlers that respect meta tags
    robots: "noai, noimageai",
  },
  metadataBase: new URL("https://www.nikitatysiachnyi.com"),
  openGraph: {
    title: "Nik Blog",
    description: "Personal blog and notes",
    url: "https://www.nikitatysiachnyi.com",
    siteName: "Nik Blog",
    images: [{ url: "https://www.nikitatysiachnyi.com/og-image.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (event.matches) {document.documentElement.classList.add("dark")}
                else {document.documentElement.classList.remove("dark")}
                });
              } catch(e) {
               console.log('prefers-color-scheme Error:' e)
               }
            })();
          `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen antialiased`}
      >
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6">
          <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 -mx-6 border-b border-black/10 backdrop-blur dark:border-white/10">
            <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
              <Link href="/" className="font-semibold tracking-tight">
                Nik
              </Link>
              <div className="flex items-center gap-5 text-sm">
                <Link href="/blog" className="hover:opacity-80">
                  Blog
                </Link>
                <Link href="/projects" className="hover:opacity-80">
                  Projects
                </Link>
                <Link href="/contact" className="hover:opacity-80">
                  Contact
                </Link>
                <ThemeToggle />
              </div>
            </nav>
          </header>
          <main className="flex-1 py-10">{children}</main>
          <footer className="text-muted-foreground pb-10 text-xs">
            © {new Date().getFullYear()} Nik. All rights reserved.
          </footer>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
