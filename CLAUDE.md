# BASITH.OS — project memory for Claude Code

Personal portfolio + learning-in-public blog for Basith (fresher, ~1 yr experience, software engineer + product work at a startup). Audience: recruiters and curious engineers equally. Live at https://whitebeard19.github.io/ (GitHub Pages, deploys on push to `main`).

Read `README.md` first for the editing guide. This file holds the rules that must not drift.

## Stack
- Astro 7 static site, MDX content collections, Preact islands, Expressive Code (github-dark), RSS + sitemap, self-hosted Fontsource fonts.
- Node 22. Commands: `npm run dev` (drafts visible), `npm run build` (real build, no drafts), `npm run build:drafts` + `npm run preview`, `npm run flag -- "flag{...}"`.
- Always run `npm run build` before pushing. Deploy = push to `main` (workflow in `.github/workflows/deploy.yml`; it uses `actions/configure-pages` for origin/base path, so never hardcode the base path; use the `url()` helper from `src/lib/content.ts` for every internal link).

## Where things live
- `src/config/site.ts` — ALL personal details (`SITE`, `NOW`, `ABOUT`, `LAB`). Edit personal info here, nowhere else.
- `src/config/taxonomy.ts` — layers, topics, colours, git-graph lane positions.
- `src/content.config.ts` — post and build schemas. Security posts require `scope`.
- `src/content/posts/<slug>/index.mdx` (+ `Toy.tsx`) — one folder per post. `src/content/builds/<slug>/index.mdx` — projects.
- `src/pages/writing/[...slug].astro` — the single post shell; `layer` picks the style.
- `src/components/kit/` reusable toys, `src/components/toys/` home toys, `src/components/mdx/` post components, `src/components/islands/` client islands.
- `src/styles/global.css` — design tokens + shared styles. `docs/post-template.mdx`, `docs/Toy-template.tsx` — starting points.

## The four layers (post `layer` -> look)
| layer | style | colour |
|---|---|---|
| hardware | build log (cream breadboard sheet, `series`, `<BenchLog>`, `<Photo>`) | `#ff5a4e` |
| software | editor note (tabs, outline, status bar) | `#4aa8ff` |
| security | lab notes (sandbox banner, stage rail, `scope.json`, lime hazard stripes) | `#b8ff3b` |
| product | teardown (commit rail, `case.json`) | `#ff6fd8` |

Topics: ELEC, LOGIC, SYS, CLOUD, AI, CRYPTO, CTF, DEFENSE, PROD, HACKATHON.

## Design rules (do not break)
- Look: purple PCB background, gold pads, keycap buttons, window frames, LED topic filters, git-log writing list. Fonts: Bricolage Grotesque (display), Silkscreen (labels), Atkinson Hyperlegible (body), JetBrains Mono (code). Colours come from CSS variables in `global.css`. Do NOT add new colours, fonts, or UI libraries; reuse existing tokens and components.
- Hazard stripes are for the security lane only.
- Every post gets its own interactive toy (a `Toy.tsx`, placed with `<Toy title="...">`). Use `client:visible` for toys. No global "toy bench" filter.
- No posting-cadence claims anywhere on the site (no "weekly", "daily", "new every week"). No leaderboard, no server, no backend.
- Accessibility: keep visible focus states, real buttons/links, contrast on dark and cream sheets, and a sensible mobile layout (check at 390px width).

## Security content rule (important)
Security posts are learning and defence only: CTF writeups, concepts, a sandboxed home lab, how to defend. Every one has a `scope` (what was legally in bounds). No how-to for attacking systems the author doesn't own, no working exploits against real targets, no real credentials or private data. If a request drifts there, reframe to concept + defence or decline.

## Flags (CTF boxes)
- Flags are hashed client-side only. Generate with `npm run flag -- "flag{...}"`, paste `flagHash` into the post frontmatter, hide the plain flag inside the post or toy. Optional `flagHint`, `flagLesson`, `flagLabel`.
- Found flags live in the visitor's localStorage (key defined in `src/lib/flags.ts`). Home flag is `SITE.homeFlag`.

## Content rules
- Drafts: `draft: true` shows in dev only. Set `draft: false` to publish. The four example posts and five example builds are made-up samples; remove or rewrite them with real content before publishing.
- NEVER invent facts about Basith (employer, projects, dates, links, degree). Use a clear `[PLACEHOLDER]` and ask. Search for `[` to find leftovers.
- Writing voice: first person, plain, specific, honest about being a learner. No vague filler.
- New post checklist: copy `docs/post-template.mdx`, set `num` (next number), `layer`, `topics`, `summary`; add the toy; build; check desktop and 390px in a browser; then `draft: false`.

## Git
- Small focused commits on `main` (or a branch + PR if asked). Don't push without a passing `npm run build`.

## Planned content (as of now; do not claim any of it is published)
- AWS Solutions Architect preparation notes and a system design series. Layer: software, topic `SYS`, plus a `CLOUD` topic. Frame as "preparing for", never claim the certification. Use the `series` field (panel should show on software posts too). Each post gets a toy; a reusable architecture-diagram component belongs in `src/components/kit/`.
- Hackathon project write-ups. Each project is a build in `src/content/builds/` plus a post (layer depends on the project; product-style teardown uses the `case` panel, labelled `hackathon.json` with team size, hours, result, role). Optional `HACKATHON` topic.
- No cadence claims for any series. Show planned parts in the series panel, publish each when ready.
