import { useEffect, useRef, useState } from 'preact/hooks';
import { sha256 } from '../../lib/flags';

const SALTS: Record<string, string> = { asha: 'x9#Lq2', ravi: 'P7&mz4' };
const ink = 'var(--ink)';

/** Two users, same password: see why hashes need a per-user salt. Real SHA-256 in the browser. */
export default function HashSalt({ initial = 'chai123' }: { initial?: string }) {
  const [pw, setPw] = useState(initial);
  const [salted, setSalted] = useState(false);
  const [h, setH] = useState<{ asha: string; ravi: string } | null>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const prev = useRef<string | null>(null);
  const reset = useRef(true);

  useEffect(() => {
    let live = true;
    (async () => {
      const asha = await sha256((salted ? SALTS.asha : '') + pw);
      const ravi = await sha256((salted ? SALTS.ravi : '') + pw);
      if (!live) return;
      if (!reset.current && prev.current && prev.current !== asha) {
        let n = 0;
        for (let i = 0; i < 64; i++) { let x = parseInt(prev.current[i], 16) ^ parseInt(asha[i], 16); while (x) { n += x & 1; x >>= 1; } }
        setFlipped(n);
      } else setFlipped(null);
      reset.current = false;
      prev.current = asha;
      setH({ asha, ravi });
    })();
    return () => { live = false; };
  }, [pw, salted]);

  const same = h && h.asha === h.ravi;
  return (
    <div>
      <p style="margin:14px 0 12px;font-size:16px;line-height:1.5">Two users picked the <strong>same password</strong>. A good site never stores it, only a hash. Type below, then switch salt on.</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end">
        <label class="label" style="flex:1 1 220px;display:flex;flex-direction:column;gap:4px;font-size:11px">SHARED PASSWORD
          <input type="text" value={pw} spellcheck={false} autocomplete="off" onInput={(e) => setPw((e.target as HTMLInputElement).value)}
            style={`min-height:46px;padding:0 12px;border-radius:8px;border:2px solid ${ink};background:#fff;color:${ink};font-family:var(--f-mono);font-size:16px`} />
        </label>
        <button type="button" class="key key--sm" aria-pressed={salted} onClick={() => { reset.current = true; setSalted(!salted); }}
          style={`min-height:46px;border-color:${ink};color:${ink};background:${salted ? 'var(--lime)' : '#fff'}`}>{salted ? 'SALT: ON' : 'SALT: OFF'}</button>
      </div>
      <div style="margin-top:14px;background:var(--panel);color:var(--text);border-radius:8px;padding:10px 12px;font-family:var(--f-mono);font-size:13px;line-height:1.7;overflow-x:auto">
        <div style="color:var(--muted-2)">users table (what the database actually stores)</div>
        {(['asha', 'ravi'] as const).map((u) => (
          <div style="display:grid;grid-template-columns:48px 70px minmax(0,1fr);gap:10px;white-space:nowrap">
            <span style="color:var(--yellow)">{u}</span>
            <span style="color:var(--muted)">{salted ? SALTS[u] : '(none)'}</span>
            <span style={`color:${same ? '#ff8a8a' : 'var(--lime)'}`}>{h ? h[u].slice(0, 40) + '…' : 'hashing…'}</span>
          </div>
        ))}
      </div>
      <div aria-live="polite" style={`margin-top:10px;padding:10px 12px;border-radius:8px;font-size:15px;line-height:1.45;${same ? 'background:#ffd6d3;border:2px solid #c4302a' : 'background:#eaffc9;border:2px solid #4d7a00'}`}>
        {!h ? '' : same
          ? 'Identical hashes. Whoever cracks one password has cracked both, and every other account that used it.'
          : 'Different hashes for the same password. A random salt per user means each one has to be attacked separately.'}
      </div>
      <p style="margin:10px 0 0;font-size:14px;color:var(--paper-muted)">
        {flipped === null ? 'Change one letter and watch the whole hash change.' : `Your last keystroke flipped ${flipped} of 256 bits. Tiny change in, chaos out.`} Real SHA-256, computed in your browser. Nothing leaves this page.
      </p>
    </div>
  );
}
