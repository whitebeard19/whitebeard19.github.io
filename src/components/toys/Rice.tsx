import { useState } from 'preact/hooks';

type F = { name: string; r: number; i: number; c: number; e: number };
const START: F[] = [
  { name: 'Team invites', r: 8, i: 7, c: 8, e: 5 },
  { name: 'Faster search', r: 9, i: 5, c: 7, e: 6 },
  { name: 'Dark mode', r: 6, i: 3, c: 9, e: 2 },
  { name: 'CSV export', r: 3, i: 6, c: 6, e: 3 },
];
const POT = [
  { key: 'r', label: 'REACH', fmt: (v: number) => v * 100 + '/mo' },
  { key: 'i', label: 'IMPACT', fmt: (v: number) => (v / 4).toFixed(1) + '×' },
  { key: 'c', label: 'CONFIDENCE', fmt: (v: number) => v * 10 + '%' },
  { key: 'e', label: 'EFFORT', fmt: (v: number) => v + ' wk' },
] as const;
const ink = 'var(--ink)';
const score = (f: F) => (f.r * 100) * (f.i / 4) * (f.c / 10) / f.e;

export default function Rice() {
  const [feats, setFeats] = useState(START);
  const [sel, setSel] = useState(0);
  const cur = feats[sel];
  const max = Math.max(...feats.map(score));
  const ranked = feats.map((f, idx) => ({ f, idx, sc: score(f) })).sort((x, y) => y.sc - x.sc);
  return (
    <div>
      <div role="group" aria-label="Feature to tune" style="display:flex;flex-wrap:wrap;gap:6px;margin:16px 0 12px">
        {feats.map((f, idx) => (
          <button type="button" aria-pressed={sel === idx} onClick={() => setSel(idx)}
            style={`min-height:40px;padding:0 12px;border-radius:20px;border:2px solid ${ink};cursor:pointer;font-size:14px;font-weight:700;color:${ink};background:${sel === idx ? 'var(--pink)' : 'transparent'}`}>{f.name}</button>
        ))}
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 18px">
        {POT.map((p) => (
          <label style="display:grid;grid-template-columns:34px minmax(0,1fr);gap:4px 10px;align-items:center">
            <span aria-hidden="true" style={`position:relative;display:block;width:34px;height:34px;border-radius:50%;background:${ink};box-shadow:inset 0 -3px 0 rgba(0,0,0,.35);transition:transform 160ms var(--ease);transform:rotate(${-135 + (cur[p.key] - 1) * 30}deg)`}>
              <span style="position:absolute;left:50%;top:3px;width:3px;height:11px;margin-left:-1.5px;background:var(--yellow);border-radius:2px" />
            </span>
            <span style="display:flex;flex-direction:column;gap:2px">
              <span class="label" style="display:flex;justify-content:space-between;font-size:11px"><span>{p.label}</span><span>{p.fmt(cur[p.key])}</span></span>
              <input type="range" min="1" max="10" step="1" value={cur[p.key]} style="accent-color:var(--pink);width:100%;height:28px;margin:0"
                onInput={(e) => { const v = Number((e.target as HTMLInputElement).value); setFeats(feats.map((f, i) => (i === sel ? { ...f, [p.key]: v } : f))); }} />
            </span>
          </label>
        ))}
      </div>
      <ol style="list-style:none;margin:16px 0 0;padding:0;display:flex;flex-direction:column;gap:6px">
        {ranked.map((o, k) => (
          <li style="display:grid;grid-template-columns:22px 120px minmax(0,1fr) 50px;align-items:center;gap:8px;font-size:14px">
            <span class="mono" style="font-weight:700">{k + 1}</span>
            <span style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{o.f.name}</span>
            <span aria-hidden="true" style="height:12px;background:#e9e5d6;border-radius:6px;overflow:hidden">
              <span style={`display:block;height:100%;border-radius:6px;transition:width 220ms var(--ease);width:${((o.sc / max) * 100).toFixed(1)}%;background:${o.idx === sel ? 'var(--pink)' : ink}`} />
            </span>
            <span class="mono" style="font-size:13px;text-align:right">{Math.round(o.sc)}</span>
          </li>
        ))}
      </ol>
      <p style="margin:12px 0 0;font-size:15px;color:var(--paper-muted)">RICE = reach × impact × confidence ÷ effort. Turn the knobs; the roadmap re-ranks itself. Example features.</p>
    </div>
  );
}
