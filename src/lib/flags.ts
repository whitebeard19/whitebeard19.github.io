/**
 * Flag store, client side only. Found flags are saved in this browser's localStorage.
 * There is no server and no leaderboard: answers are checked against SHA-256 hashes.
 */
export type Flag = { id: string; num: string; title: string; href: string; hash: string };

const KEY = 'atheeq.flags.v1';
const EVENT = 'flags:change';

export function getFound(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function setFound(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* private mode: keep it for this page view only */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: ids }));
}

export function onFlags(cb: (ids: string[]) => void) {
  const h = (e: Event) => cb((e as CustomEvent<string[]>).detail ?? getFound());
  const s = (e: StorageEvent) => e.key === KEY && cb(getFound());
  window.addEventListener(EVENT, h);
  window.addEventListener('storage', s);
  return () => {
    window.removeEventListener(EVENT, h);
    window.removeEventListener('storage', s);
  };
}

export async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

export type TryResult = { kind: 'empty' } | { kind: 'miss' } | { kind: 'new' | 'again'; flag: Flag };

export async function tryFlag(raw: string, flags: Flag[]): Promise<TryResult> {
  const v = raw.trim().toLowerCase();
  if (!v) return { kind: 'empty' };
  const h = await sha256(v);
  const flag = flags.find((f) => f.hash === h);
  if (!flag) return { kind: 'miss' };
  const found = getFound();
  if (found.includes(flag.id)) return { kind: 'again', flag };
  setFound([...found, flag.id]);
  return { kind: 'new', flag };
}

export function message(r: TryResult): { ok: boolean; text: string } {
  if (r.kind === 'new') return { ok: true, text: `Captured flag ${r.flag.num}. Its LED is lit.` };
  if (r.kind === 'again') return { ok: true, text: `You already have ${r.flag.num}. Nice memory.` };
  if (r.kind === 'empty') return { ok: false, text: 'Paste a flag first. They look like flag{...}.' };
  return { ok: false, text: 'Not a flag on this site. Keep looking.' };
}

/** Read the flag list the layout embeds in the page. */
export function pageFlags(): Flag[] {
  try {
    return JSON.parse(document.getElementById('flag-data')?.textContent || '[]');
  } catch {
    return [];
  }
}
