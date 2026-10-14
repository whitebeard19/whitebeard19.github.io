import { useState } from 'preact/hooks';

const FN = { AND: (x: boolean, y: boolean) => x && y, OR: (x: boolean, y: boolean) => x || y, XOR: (x: boolean, y: boolean) => x !== y, NAND: (x: boolean, y: boolean) => !(x && y) };
type Gate = keyof typeof FN;
const ink = 'var(--ink)';

export default function LogicGate() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [gate, setGate] = useState<Gate>('XOR');
  const out = FN[gate](a, b);
  const sw = (on: boolean) => `min-width:92px;min-height:44px;border-color:${ink};font-family:var(--f-mono);font-weight:700;font-size:14px;${on ? `background:${ink};color:var(--yellow)` : `background:#fff;color:${ink}`}`;
  const wire = (on: boolean, top: string) =>
    `position:absolute;left:0;width:32%;top:${top};height:4px;border-radius:2px;background-color:${on ? 'var(--red)' : '#c9c4d6'};` +
    (on ? 'background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.8) 0 4px,transparent 4px 12px);background-size:24px 4px;animation:flowx .6s linear infinite;' : '');
  return (
    <div>
      <div role="group" aria-label="Gate type" style="display:flex;flex-wrap:wrap;gap:6px;margin:16px 0">
        {(Object.keys(FN) as Gate[]).map((g) => (
          <button type="button" aria-pressed={gate === g} onClick={() => setGate(g)} class="pill" style={`--c:var(--pink);min-height:44px;color:${ink};border-color:${ink};${gate === g ? 'background:var(--pink)' : ''}`}>{g}</button>
        ))}
      </div>
      <div style="display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px">
        <div style="display:flex;flex-direction:column;gap:10px">
          <button type="button" class="key key--sm" aria-pressed={a} aria-label="Input A" style={sw(a)} onClick={() => setA(!a)}>A = {a ? 1 : 0}</button>
          <button type="button" class="key key--sm" aria-pressed={b} aria-label="Input B" style={sw(b)} onClick={() => setB(!b)}>B = {b ? 1 : 0}</button>
        </div>
        <div aria-hidden="true" style="position:relative;height:110px">
          <span style={wire(a, '28%')} />
          <span style={wire(b, '68%')} />
          <span class="label" style={`position:absolute;left:30%;top:50%;transform:translateY(-50%);min-width:76px;height:70px;border-radius:6px 36px 36px 6px;background:${ink};color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;padding:0 10px`}>{gate}</span>
          <span style={`position:absolute;right:0;width:22%;top:50%;height:4px;border-radius:2px;background:${out ? 'var(--red)' : '#c9c4d6'}`} />
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
          <span aria-hidden="true" style={`width:40px;height:48px;border-radius:20px 20px 4px 4px;transition:background 160ms,box-shadow 160ms;background:${out ? '#ff3b3b' : '#e7c9c9'};box-shadow:${out ? '0 0 26px 8px rgba(255,59,59,.55)' : 'none'}`} />
          <span class="mono" style="font-weight:700;font-size:14px">OUT {out ? 1 : 0}</span>
        </div>
      </div>
      <p style="margin:14px 0 0;font-size:15px;color:var(--paper-muted)">Click A and B. Under every app, every model, every password check: billions of these.</p>
    </div>
  );
}
