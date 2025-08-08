import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

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
    "robots": "noai, noimageai",
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
        {/* Set theme ASAP to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored || (prefersDark ? 'dark' : 'light');
                if (theme === 'dark') document.documentElement.classList.add('dark');
              } catch(e) {}
            })();
          `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="mx-auto max-w-6xl px-6 min-h-screen flex flex-col">
          <header className="sticky top-0 z-40 -mx-6 border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
              <Link href="/" className="font-semibold tracking-tight">Nik</Link>
              <div className="flex items-center gap-5 text-sm">
                <Link href="/blog" className="hover:opacity-80">Blog</Link>
                <Link href="/contact" className="hover:opacity-80">Contact</Link>
                <ThemeToggle />
              </div>
            </nav>
          </header>
          <main className="py-10 flex-1">{children}</main>
          <footer className="pb-10 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nik. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
