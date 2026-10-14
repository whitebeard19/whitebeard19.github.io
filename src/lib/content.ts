import { getCollection, type CollectionEntry } from 'astro:content';
import { createHash } from 'node:crypto';
import { LAYERS, TOPICS, type LayerKey } from '../config/taxonomy';
import { SITE, NOW } from '../config/site';

export type Post = CollectionEntry<'posts'>;
export type Build = CollectionEntry<'builds'>;

/** Prefix a site path with the base path (GitHub Pages project sites live under /<repo>/). */
export const url = (path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return base + '/' + path.replace(/^\//, '');
};

/** Drafts show in `npm run dev`, and in `npm run build:drafts` for previewing. Never in the real build. */
const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', ({ data }) => showDrafts || !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || b.data.num - a.data.num);
}

export async function getBuilds(): Promise<Build[]> {
  const all = await getCollection('builds', ({ data }) => showDrafts || !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const postUrl = (p: Post) => url(`writing/${p.id}/`);
export const buildUrl = (b: Build) => (b.data.page ? url(`builds/${b.id}/`) : b.data.href ? url(b.data.href) : url('builds/'));
export const numLabel = (n: number) => '#' + String(n).padStart(3, '0');

export function minutes(p: Post) {
  if (p.data.minutes) return p.data.minutes;
  const words = (p.body ?? '').replace(/<[^>]+>|import .*|export .*|[{}`#*_>-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Short fake commit hash for the git-log look, stable per post number. */
export const commitHash = (n: number) => ((n * 2654435761) >>> 0).toString(16).padStart(8, '0').slice(0, 7);

const fmtShort = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' });
const fmtLong = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const fmtMonth = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
export const dateShort = (d: Date) => fmtShort.format(d).split(' ').reverse().join(' ');
export const dateLong = (d: Date) => fmtLong.format(d);
export const monthName = (d: Date) => fmtMonth.format(d);

/** Everything a list row needs, in one plain object. */
export function rowOf(p: Post) {
  const L = LAYERS[p.data.layer];
  return {
    id: p.id,
    href: postUrl(p),
    title: p.data.title,
    num: numLabel(p.data.num),
    hash: commitHash(p.data.num),
    date: dateShort(p.data.date),
    month: monthName(p.data.date),
    minutes: minutes(p),
    layer: p.data.layer as LayerKey,
    kind: L.kind,
    kindColor: L.soft,
    laneX: L.lane,
    laneColor: L.color,
    topics: p.data.topics.map((t) => ({ code: t, color: TOPICS[t].color })),
    flagId: p.data.flagHash ? p.id : null,
    draft: p.data.draft,
  };
}
export type Row = ReturnType<typeof rowOf>;

export const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

/** The list of flags for the drawer: the home-page flag plus every post with a flagHash. */
export async function getFlags() {
  const posts = await getPosts();
  return [
    { id: 'home', num: '#0', title: 'Hidden on the home page', href: url(''), hash: sha256(SITE.homeFlag.toLowerCase()) },
    ...posts
      .filter((p) => p.data.flagHash)
      .sort((a, b) => b.data.num - a.data.num)
      .map((p) => ({ id: p.id, num: numLabel(p.data.num), title: p.data.flagLabel ?? p.data.title, href: postUrl(p), hash: p.data.flagHash! })),
  ];
}
export type FlagDef = Awaited<ReturnType<typeof getFlags>>[number];

/** Neighbours in the same layer (older and newer). */
export function neighbours(posts: Post[], p: Post) {
  const same = posts.filter((x) => x.data.layer === p.data.layer);
  const i = same.findIndex((x) => x.id === p.id);
  return { newer: i > 0 ? same[i - 1] : null, older: i >= 0 && i < same.length - 1 ? same[i + 1] : null };
}

/** Props for the command bar (home inline bar and the "/" palette everywhere else). */
export async function commandProps() {
  const S = SITE;
  const posts = (await getPosts()).map((p) => ({ t: p.data.title, h: postUrl(p), id: p.id, n: numLabel(p.data.num) }));
  return {
    posts,
    places: { writing: url('writing/'), 'lab-notes': url('lab-notes/'), builds: url('builds/'), about: url('about/'), now: url('#now') },
    handle: S.handle,
    whoami: `${S.handle} — fresher engineer, learning hardware, software, AI and security in public.`,
    whoamiHref: url('about/'),
    learning: 'right now: ' + NOW.procs.slice(0, 3).map((p) => p.cmd.replace(/^\w+:\s*/, '')).join(' · '),
    nowHref: url('#now'),
  };
}
