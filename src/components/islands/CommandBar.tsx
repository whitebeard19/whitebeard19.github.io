import { useEffect, useRef, useState } from 'preact/hooks';
import { pageFlags, tryFlag, message, getFound } from '../../lib/flags';

type PostRef = { t: string; h: string; id: string; n: string };
type Line = { text: string; kind?: 'in' | 'err' | 'ok'; href?: string; label?: string };

type Props = {
  posts: PostRef[];
  places: Record<string, string>;
  handle: string;
  whoami: string;
  whoamiHref: string;
  learning: string;
  nowHref: string;
  /** inline = the bar on the home page; palette = opens with "/" on every other page */
  mode: 'inline' | 'palette';
};

const CHIPS = ['help', 'whoami', 'open lab-notes', 'find flag', 'flags'];

export default function CommandBar(p: Props) {
  const [cmd, setCmd] = useState('');
  const [log, setLog] = useState<Line[]>([]);
  const [open, setOpen] = useState(p.mode === 'inline');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (p.mode !== 'palette') return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    };
    const req = () => setOpen(true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('palette:open', req);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('palette:open', req); };
  }, []);

  useEffect(() => { if (open && p.mode === 'palette') input.current?.focus(); }, [open]);

  const push = (lines: Line[]) => setLog((l) => l.concat(lines).slice(-8));

  const findPost = (q: string) => {
    const k = q.replace(/^#/, '').trim();
    if (!k) return null;
    return p.posts.find((x) => x.id === k || x.n === '#' + k.padStart(3, '0')) ?? null;
  };

  const run = async (raw: string) => {
    const c = raw.trim();
    const lc = c.toLowerCase();
    setCmd('');
    if (!lc) return;
    if (lc === 'clear') { setLog([]); return; }
    const out: Line[] = [{ text: '$ ' + c, kind: 'in' }];
    if (lc.startsWith('flag{')) {
      const m = message(await tryFlag(c, pageFlags()));
      push([...out, { text: m.text, kind: m.ok ? 'ok' : 'err' }]);
      return;
    }
    if (lc === 'help') out.push({ text: 'commands: ls · whoami · open <place | post #> · find <word> · learning · flags · find flag · clear' });
    else if (lc === 'ls') out.push({ text: Object.keys(p.places).map((x) => x + '/').join('  ') });
    else if (lc === 'whoami') out.push({ text: p.whoami, href: p.whoamiHref, label: 'more →' });
    else if (lc === 'learning') out.push({ text: p.learning, href: p.nowHref, label: 'htop →' });
    else if (lc === 'flags') {
      const all = pageFlags();
      const got = getFound().filter((id) => all.some((f) => f.id === id)).length;
      out.push({ text: `${got} of ${all.length} flags found in this browser. The FLAGS button up top shows which.` });
    } else if (lc === 'find flag') out.push({ text: `there are ${pageFlags().length} flags on this site. one is on the home page: hover the logo. paste flags here.` });
    else if (lc.startsWith('find ') || lc.startsWith('grep ')) {
      const q = lc.replace(/^(find|grep)\s+/, '');
      const hits = p.posts.filter((x) => x.t.toLowerCase().includes(q)).slice(0, 4);
      if (!hits.length) out.push({ text: `no posts match "${q}".`, kind: 'err' });
      hits.forEach((h) => out.push({ text: h.n + ' ' + h.t, href: h.h, label: 'open →' }));
    } else if (lc.startsWith('open') || lc.startsWith('cd')) {
      const t = lc.replace(/^(open|cd)\s*/, '').replace(/[~/]/g, '');
      const post = findPost(t);
      if (p.places[t]) out.push({ text: `opening ~/${t} …`, href: p.places[t], label: 'go →' });
      else if (post) out.push({ text: `opening ${post.n} ${post.t}`, href: post.h, label: 'go →' });
      else out.push({ text: `no such place: ${t || '(empty)'}. try ls, or open a post number like open 41`, kind: 'err' });
    } else if (lc.startsWith('sudo')) out.push({ text: 'nice try. this incident will be reported to /dev/null.', kind: 'err' });
    else out.push({ text: `command not found: ${c}. try help`, kind: 'err' });
    push(out);
  };

  const color = (k?: Line['kind']) => (k === 'in' ? 'var(--green)' : k === 'err' ? '#ff8a8a' : k === 'ok' ? 'var(--lime)' : 'var(--text)');

  const bar = (
    <div class="window" style="box-shadow:none;border-radius:10px">
      <form onSubmit={(e) => { e.preventDefault(); run(cmd); }} style="display:flex;align-items:center;gap:10px;padding:0 14px;min-height:52px;font-family:var(--f-mono);font-size:15px">
        <label for={'cmd-' + p.mode} style="color:var(--green);white-space:nowrap">{p.handle}@board:~$</label>
        <input
          ref={input}
          id={'cmd-' + p.mode}
          type="text"
          autocomplete="off"
          spellcheck={false}
          value={cmd}
          onInput={(e) => setCmd((e.target as HTMLInputElement).value)}
          placeholder="type help, or click a command →"
          style="flex:1;min-width:80px;min-height:44px;background:transparent;border:none;outline:none;color:#fff;caret-color:var(--green);font-family:var(--f-mono);font-size:15px"
        />
        <span aria-hidden="true" class="label" style="display:flex;gap:6px;align-items:center;font-size:11px;color:#a99fbb">PRESS <span class="kbd" style="color:#a99fbb">↵</span></span>
      </form>
      <div style="display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px">
        {CHIPS.map((c) => (
          <button type="button" onClick={() => run(c)} style="min-height:32px;padding:0 10px;border-radius:6px;border:1px solid var(--line-2);background:var(--panel-2);color:#d9d4e2;font-family:var(--f-mono);font-size:13px;cursor:pointer">{c}</button>
        ))}
      </div>
      {log.length > 0 && (
        <div aria-live="polite" style="border-top:1px solid var(--line);padding:10px 14px 12px;font-family:var(--f-mono);font-size:14px;line-height:1.6">
          {log.map((l) => (
            <div style={`color:${color(l.kind)};${l.kind === 'ok' ? 'font-weight:700' : ''}`}>
              {l.text}{l.href && <> <a href={l.href} style="color:var(--yellow)">{l.label}</a></>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (p.mode === 'inline') return bar;
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Command bar" onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      style="position:fixed;inset:0;z-index:80;background:rgba(11,4,24,0.72);display:flex;align-items:flex-start;justify-content:center;padding:12vh 16px 16px">
      <div style="width:min(760px,100%)">
        {bar}
        <p class="mono" style="margin:10px 0 0;font-size:13px;color:var(--muted);text-align:center">Esc to close</p>
      </div>
    </div>
  );
}
