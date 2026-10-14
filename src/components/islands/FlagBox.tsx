import { useEffect, useState } from 'preact/hooks';
import { getFound, onFlags, pageFlags, tryFlag, message } from '../../lib/flags';

type Props = { id: string; num: string; hint?: string; lesson?: string; where?: string };

/** The flag box at the end of a post that hides a flag. */
export default function FlagBox({ id, num, hint, lesson, where = 'somewhere in this post' }: Props) {
  const [got, setGot] = useState(false);
  const [val, setVal] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setGot(getFound().includes(id));
    return onFlags((ids) => setGot(ids.includes(id)));
  }, []);

  const submit = async (e: Event) => {
    e.preventDefault();
    const r = await tryFlag(val, pageFlags());
    let m = message(r);
    if ('flag' in r && r.flag.id !== id) m = { ok: true, text: `That’s a real flag, but from ${r.flag.num}, not this post. Logged it in your drawer anyway.` };
    if (r.kind === 'miss') m = { ok: false, text: 'Not this one. Read the post again, slowly.' };
    setMsg(m);
  };

  return (
    <section id="flag" aria-labelledby="flag-h" style="margin:52px 0 0;background:var(--panel);color:var(--text);border:3px solid var(--ink);border-radius:16px;overflow:hidden">
      <div class="hazard" aria-hidden="true" style="height:10px" />
      <div style="padding:18px 20px 20px">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px">
          <h2 id="flag-h" class="label" style="margin:0;font-weight:400;font-size:14px;color:var(--lime)">FLAG BOX · {num}</h2>
          <span class="mono" style="display:inline-flex;align-items:center;gap:8px;font-size:13px">
            <span class={'led' + (got ? ' is-on' : '')} aria-hidden="true" />{got ? 'flag found' : 'hides a flag'}
          </span>
        </div>
        {got ? (
          <div style="margin-top:12px">
            <p style="margin:0;font-family:var(--f-display);font-weight:700;font-size:26px;line-height:1.2;color:#fff">Captured. Its LED in your flag drawer is lit.</p>
            {lesson && <p style="margin:8px 0 0;font-size:17px;line-height:1.55">What it taught: {lesson}</p>}
          </div>
        ) : (
          <div>
            <p style="margin:10px 0 14px;font-size:17px;line-height:1.55">This post hides one flag, {where}. Found it? Paste it here. It's checked in your browser against a SHA-256 hash, so the answer key isn't stored in the page.</p>
            <form onSubmit={submit} style="display:flex;flex-wrap:wrap;gap:8px">
              <label for="post-flag" class="sr-only">Flag for this post</label>
              <input id="post-flag" class="field" type="text" autocomplete="off" spellcheck={false} placeholder="flag{...}" value={val}
                onInput={(e) => setVal((e.target as HTMLInputElement).value)} style="flex:1 1 240px;min-height:48px;font-size:16px;caret-color:var(--lime)" />
              <button type="submit" class="key key--lime" style="border-color:var(--lime)">CHECK ↵</button>
              {hint && (
                <button type="button" aria-expanded={showHint} onClick={() => setShowHint(!showHint)} class="label"
                  style="min-height:48px;padding:0 14px;border-radius:8px;border:2px dashed #6b5a85;background:transparent;color:var(--text);font-size:12px;cursor:pointer">
                  {showHint ? 'HIDE HINT' : 'NEED A HINT?'}
                </button>
              )}
            </form>
            <div aria-live="polite">{msg && <div class={'msg ' + (msg.ok ? 'ok' : 'bad')}>{msg.text}</div>}</div>
            {showHint && hint && <p style="margin:12px 0 0;padding:10px 12px;border-radius:8px;border:1px solid var(--yellow);color:#fff3c4;font-size:15px;line-height:1.5">Hint: {hint}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
