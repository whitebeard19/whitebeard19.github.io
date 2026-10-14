import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { LAYER_KEYS, TOPIC_KEYS } from './config/taxonomy';

/**
 * Posts: one folder per post, src/content/posts/<slug>/index.mdx
 * The folder name becomes the URL: /writing/<slug>
 */
const posts = defineCollection({
  loader: glob({
    pattern: '**/index.{md,mdx}',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx?$/, ''),
  }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      /** Post number shown as #041. Keep it increasing. */
      num: z.number().int().positive(),
      date: z.coerce.date(),
      layer: z.enum(LAYER_KEYS),
      topics: z.array(z.enum(TOPIC_KEYS)).min(1),
      /** Drafts show in `npm run dev` but are never published. */
      draft: z.boolean().default(false),
      /** Optional: override the computed reading time (minutes). */
      minutes: z.number().int().positive().optional(),

      // ── security (lab notes) ──
      /** Required for security posts: where this happened and why it was allowed. */
      scope: z.string().optional(),
      /** e.g. "[practice CTF]", "home lab", "my own server" */
      source: z.string().optional(),
      level: z.string().optional(),
      /** SHA-256 of the flag hidden in this post. Make one with: npm run flag -- "flag{...}" */
      flagHash: z.string().regex(/^[0-9a-f]{64}$/).optional(),
      flagHint: z.string().optional(),
      flagLesson: z.string().optional(),
      /** Short label for the flag drawer, defaults to the title. */
      flagLabel: z.string().optional(),

      // ── hardware (build log) ──
      series: z
        .object({ name: z.string(), part: z.number().int(), parts: z.array(z.string()), project: z.string().optional() })
        .optional(),

      // ── product (teardown) ──
      case: z.record(z.string(), z.string()).optional(),

      /** Filename shown in the post window's title bar. Defaults to <slug>.md */
      file: z.string().optional(),
    })
    .superRefine((d, ctx) => {
      if (d.layer === 'security' && !d.scope) {
        ctx.addIssue({ code: 'custom', message: 'Security posts need a `scope` (where this happened, and why it was allowed).', path: ['scope'] });
      }
    }),
});

/** Builds: one folder per project, src/content/builds/<slug>/index.mdx → /builds/<slug> */
const builds = defineCollection({
  loader: glob({
    pattern: '**/index.{md,mdx}',
    base: './src/content/builds',
    generateId: ({ entry }) => entry.replace(/\/index\.mdx?$/, ''),
  }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    status: z.enum(['running', 'bench', 'shipped', 'queued']),
    layer: z.enum(LAYER_KEYS),
    stack: z.string(),
    since: z.string().optional(),
    progress: z.object({ done: z.number().int().min(0), of: z.number().int().positive(), label: z.string() }),
    order: z.number().default(100),
    draft: z.boolean().default(false),
    /** Links shown on the project page, e.g. [{ label: 'SOURCE ON GITHUB', href: 'https://…' }] */
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    /** Key/value panel on the project page (spec.json). */
    spec: z.record(z.string(), z.string()).optional(),
    /** Changelog entries for the side rail. */
    changelog: z.array(z.object({ when: z.string(), text: z.string(), tone: z.enum(['normal', 'bad', 'good']).default('normal') })).default([]),
    /** Post folder names related to this build. */
    related: z.array(z.string()).default([]),
    /** If true, the card links to the project page. Otherwise to `href` or /builds. */
    page: z.boolean().default(true),
    href: z.string().optional(),
  }),
});

export const collections = { posts, builds };
