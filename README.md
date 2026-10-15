# BASITH.OS

My portfolio and learning-in-public blog. Built with Astro + MDX, with small Preact "toys" inside posts, and hosted free on GitHub Pages.

## Run it on your computer

You need Node.js 22 or newer.

```sh
npm install
npm run dev          # http://localhost:4321  (drafts are visible here)
```

## 1. Put in your real details (do this first)

Almost everything personal is in **one file: `src/config/site.ts`**. Replace every `[SQUARE BRACKET]` placeholder:

| What | Where in `site.ts` |
|---|---|
| Name, city, email, intro text | `SITE` |
| GitHub / LinkedIn / X links | `SITE.socials` |
| CV | put the PDF at `public/cv.pdf` (or set `SITE.cv` to `null`) |
| Newsletter | `SITE.newsletterAction` (your Buttondown username) |
| Home "Currently compiling" panel | `NOW` |
| About page: neofetch, recruiter mode, job, education, roadmap | `ABOUT` |
| Lab notes rules + "start here" list | `LAB` |

Topics (ELEC, LOGIC, SYS, AI, CRYPTO, CTF, DEFENSE, PROD) and layer colours are in `src/config/taxonomy.ts`.

> Search the project for `[` to find any placeholder you missed.

## 2. Replace the example posts

The four posts in `src/content/posts/` and the builds in `src/content/builds/` are **examples with made-up details**. They are all `draft: true`, so they show in `npm run dev` but **never get published**. Use them as references for each post style, then delete them or rewrite them with your real story.

## 3. Write a post

1. Make a folder: `src/content/posts/my-post-slug/` (the folder name becomes the URL `/writing/my-post-slug/`).
2. Copy `docs/post-template.mdx` into it as `index.mdx` and fill in the top section.
3. The `layer` picks the look automatically:

   | layer | style | extras |
   |---|---|---|
   | `hardware` | build log (cream breadboard sheet) | `series` progress panel, `<BenchLog>`, `<Photo>` |
   | `software` | editor note (tabs, outline, status bar) | code blocks with titles, line highlights, diffs |
   | `security` | lab notes (sandbox banner, stage rail) | **`scope` is required**, optional hidden flag |
   | `product` | teardown (commit rail) | `case` panel |

4. Add a toy: copy `docs/Toy-template.tsx` next to the post as `Toy.tsx`, import it at the top of the post, and place it with `<Toy title="…"><MyToy client:visible /></Toy>`.
   Reusable toys live in `src/components/kit/` (e.g. `HexViewer`). Home-page toys live in `src/components/toys/`.
5. Set `draft: false` when it's ready.

Components you can use in any post without importing: `<Toy>`, `<Hat role="PM HAT">`, `<Spoiler>`, `<Photo>`, `<BenchLog>`.

### Hiding a flag in a post

```sh
npm run flag -- "flag{your_secret_here}"
```

Paste the printed `flagHash:` line into the post's frontmatter, hide the flag itself somewhere in the post (inside a toy works best), and optionally add `flagHint` and `flagLesson`. The flag box and the flag drawer pick it up automatically. Only the hash is stored in the site; found flags are saved in the visitor's browser.

The home-page flag (in the logo's tooltip) is `SITE.homeFlag`.

### Builds (projects)

One folder per project in `src/content/builds/<slug>/index.mdx`. Set `page: false` if a project doesn't need its own page yet.

## 4. Publish on GitHub Pages

1. Create a GitHub repo. Name it **`<your-username>.github.io`** to get the site at `https://<your-username>.github.io/`. Any other name works too and lives at `https://<your-username>.github.io/<repo>/`.
2. Push this folder to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` now builds and deploys in about two minutes (see the **Actions** tab).

Custom domain later: put the domain in `public/CNAME` (one line, e.g. `basith.dev`), set it in Settings → Pages, and point your DNS at GitHub.

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Local site with drafts |
| `npm run build` | The real build (no drafts) into `dist/` |
| `npm run build:drafts` then `npm run preview` | Preview the built site including drafts |
| `npm run flag -- "flag{…}"` | Hash a flag for a post |

## What's where

```
src/config/site.ts        ← your details
src/config/taxonomy.ts    ← layers, topics, colours
src/content/posts/        ← one folder per post (index.mdx + Toy.tsx + images)
src/content/builds/       ← one folder per project
src/pages/                ← routes: /, /writing, /writing/<post>, /lab-notes, /builds, /builds/<project>, /about, /404, RSS feeds
src/components/           ← header, git-log rows, flag drawer, command bar, toys
src/styles/global.css     ← design tokens (colours, fonts) and shared styles
.github/workflows/        ← GitHub Pages deploy
```
