import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config/site';
import { getPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: new URL(import.meta.env.BASE_URL, context.site),
    items: posts.filter((p) => !p.data.draft).map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: `writing/${p.id}/`,
      categories: [p.data.layer, ...p.data.topics],
    })),
  });
}
