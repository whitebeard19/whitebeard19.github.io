import { useEffect, useRef, useState } from 'preact/hooks';
import { getFound, onFlags, tryFlag, message, type Flag } from '../../lib/flags';

export default function FlagDrawer({ flags }: { flags: Flag[] }) {
  const [found, setFound] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [fresh, setFresh] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFound(getFound());
    const off = onFlags((ids) => {
      setFound((prev) => {
        const added = ids.find((i) => !prev.includes(i));
        if (added) setFresh(added);
        return ids;
      });
    });
    const openReq = () => setOpen(true);
    window.addEventListener('drawer:open', openReq);
    return () => { off(); window.removeEventListener('drawer:open', openReq); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [open]);

  const n = flags.filter((f) => found.includes(f.id)).length;
  const led = (id: string) => 'led' + (found.includes(id) ? ' is-on' : '') + (fresh === id ? ' pop' : '');

  const submit = async (e: Event) => {
    e.preventDefault();
    const m = message(await tryFlag(val, flags));
    setMsg(m);
    if (m.ok) setVal('');
  };

  return (
    <div class="drawer-wrap" ref={wrap}>
      <button
        type="button"
        class="drawer-btn"
        aria-expanded={open}
        aria-controls="flag-drawer"
        aria-label={`Flag drawer. ${n} of ${flags.length} flags found in this browser.`}
        onClick={() => setOpen(!open)}
      >
        <span>FLAGS</span>
        <span aria-hidden="true" style="display:flex;gap:4px">
          {flags.map((f) => <span class={led(f.id)} style="width:9px;height:9px" />)}
        </span>
        <span class="count">{n}/{flags.length}</span>
      </button>
      {open && (
        <div id="flag-drawer" class="drawer" role="region" aria-label="Flag drawer">
          <div class="window__bar" style="padding-right:6px">
            <span style="display:flex;align-items:center;gap:8px">
              <span class="hazard hazard-sq" aria-hidden="true" style="width:12px;height:12px" />flags.drawer
            </span>
            <button type="button" onClick={() => setOpen(false)} class="label" style="min-width:44px;min-height:36px;border:none;background:transparent;color:#cfc6e0;cursor:pointer">
              CLOSE
            </button>
          </div>
          <div style="padding:14px 16px 16px">
            <p style="margin:0 0 12px;font-size:15px;line-height:1.5">
              Some posts hide a flag. Find one, paste it here or in that post's flag box, and its LED lights up.
            </p>
            <ul>
              {flags.map((f) => (
                <li>
                  <a href={f.href}>
                    <span class={led(f.id)} style="width:12px;height:12px" aria-hidden="true" />
                    <span class="mono" style="font-size:13px;color:var(--orange)">{f.num}</span>
                    <span class="t">{f.title}</span>
                    <span class={'status' + (found.includes(f.id) ? ' is-on' : '')}>{found.includes(f.id) ? 'FOUND' : 'HIDDEN'}</span>
                  </a>
                </li>
              ))}
            </ul>
            <form onSubmit={submit} style="margin-top:14px;display:flex;gap:8px">
              <label for="drawer-flag" class="sr-only">Paste a flag</label>
              <input id="drawer-flag" class="field" type="text" autocomplete="off" spellcheck={false} placeholder="flag{...}" value={val} onInput={(e) => setVal((e.target as HTMLInputElement).value)} />
              <button type="submit" class="key key--lime key--sm" style="border-color:var(--lime)">CHECK</button>
            </form>
            <div aria-live="polite">{msg && <div class={'msg ' + (msg.ok ? 'ok' : 'bad')}>{msg.text}</div>}</div>
            <p style="margin:12px 0 0;padding-top:10px;border-top:1px solid var(--line);font-size:13px;line-height:1.5;color:var(--muted)">
              Saved in this browser only. No accounts, no names, no leaderboard. Answers are checked against a SHA-256 hash, so the answer key isn't in the page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
