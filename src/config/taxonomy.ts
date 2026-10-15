/**
 * The four layers and their topics. Each post has one layer and one or more topics.
 * You can add topics here; the first topic of a post must belong to the post's layer.
 */

export const LAYER_KEYS = ['hardware', 'software', 'security', 'product'] as const;
export type LayerKey = (typeof LAYER_KEYS)[number];

export const LAYERS: Record<
  LayerKey,
  { name: string; color: string; soft: string; kind: string; kindLong: string; lane: number }
> = {
  hardware: { name: 'HARDWARE', color: '#ff5a4e', soft: '#ff8a70', kind: 'BUILD LOG', kindLong: 'BUILD LOG · HARDWARE', lane: 8 },
  software: { name: 'SOFTWARE & AI', color: '#4aa8ff', soft: '#7cc0ff', kind: 'NOTE', kindLong: 'NOTE · SOFTWARE & AI', lane: 26 },
  security: { name: 'SECURITY', color: '#b8ff3b', soft: '#b8ff3b', kind: 'LAB NOTES', kindLong: 'LAB NOTES', lane: 44 },
  product: { name: 'PRODUCT', color: '#ff6fd8', soft: '#ff9be6', kind: 'TEARDOWN', kindLong: 'TEARDOWN · PRODUCT', lane: 62 },
};

export const TOPIC_KEYS = ['ELEC', 'LOGIC', 'SYS', 'CLOUD', 'AI', 'CRYPTO', 'CTF', 'DEFENSE', 'PROD', 'HACKATHON'] as const;
export type TopicKey = (typeof TOPIC_KEYS)[number];

export const TOPICS: Record<TopicKey, { name: string; color: string; layer: LayerKey }> = {
  ELEC: { name: 'Electronics', color: '#ff5a4e', layer: 'hardware' },
  LOGIC: { name: 'Digital logic', color: '#ff9f1c', layer: 'hardware' },
  SYS: { name: 'Systems', color: '#4aa8ff', layer: 'software' },
  CLOUD: { name: 'Cloud & AWS', color: '#ffd23f', layer: 'software' },
  AI: { name: 'AI & agents', color: '#2ee6d6', layer: 'software' },
  CRYPTO: { name: 'Crypto basics', color: '#b8ff3b', layer: 'security' },
  CTF: { name: 'CTFs & lab', color: '#e2ff8f', layer: 'security' },
  DEFENSE: { name: 'Secure code', color: '#ffffff', layer: 'security' },
  PROD: { name: 'Product notes', color: '#ff6fd8', layer: 'product' },
  HACKATHON: { name: 'Hackathons', color: '#ff9be6', layer: 'product' },
};

export const topicsOf = (layer: LayerKey) =>
  (Object.keys(TOPICS) as TopicKey[]).filter((t) => TOPICS[t].layer === layer);
