import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../../config/site';
import { LAYERS, LAYER_KEYS, type LayerKey } from '../../config/taxonomy';
import { getPosts } from '../../lib/content';

export function getStaticPaths() {
  return LAYER_KEYS.map((layer) => ({ params: { layer } }));
}

export async function GET(context: APIContext) {
  const layer = context.params.layer as LayerKey;
  const posts = (await getPosts()).filter((p) => p.data.layer === layer && !p.data.draft);
  return rss({
    title: `${SITE.name} — ${LAYERS[layer].name.toLowerCase()}`,
    description: `Only the ${LAYERS[layer].name.toLowerCase()} posts from ${SITE.name}.`,
    site: new URL(import.meta.env.BASE_URL, context.site),
    items: posts.map((p) => ({ title: p.data.title, description: p.data.summary, pubDate: p.data.date, link: `writing/${p.id}/` })),
  });
}
