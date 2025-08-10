## My Blog

This is my personal blog built with Next.js 15. It has a minimal UI and supports dark/light mode. I write posts as Markdown files in the `posts/` folder.

### Features

- Pages: Home, Blog, Projects, Contact
- Markdown posts: `.md` files in `posts/` are auto-listed on `/blog` and rendered at `/blog/[slug]`
- Dark/Light mode: toggle in the header (saved in `localStorage`)
- Static generation for fast, SEO-friendly pages
- Tailwind v4 styling with simple design tokens in `app/globals.css`

### Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS v4
- gray-matter, remark, remark-html

### Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

### Structure

```
app/
  layout.tsx                  # Layout, header, footer, theme
  page.tsx                    # Home
  projects/page.tsx           # Projects list
  projects/[slug/]/page.tsx   # Project page
  blog/page.tsx               # Blog list
  blog/[slug]/page.tsx        # Blog post
  contact/page.tsx            # Contact
  ThemeToggle.tsx             # Theme switcher (client)
lib/
  md.ts                       # Markdown parsing + helpers
  github.ts                   # Fetches data from GitHub API
  utils.ts                    # Reusable utility functions
posts/                        # My posts
```

### Theming notes

- Class-based dark mode (`.dark`) to avoid flashes
- Theme tokens in `app/globals.css` (`--background`, `--foreground`, etc.)
- Toggle component lives in the header (`ThemeToggle`)

### Optional next steps

- Set `metadataBase` (site URL) in `app/layout.tsx`
- Add `sitemap` and `robots` if needed
- Add an OG image generator

### License (public repo note)

All code and content in this repository are © 2025 Nikita Tysiachnyi. All rights reserved. See `LICENSE`.
