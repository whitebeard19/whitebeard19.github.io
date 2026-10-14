import { useState } from 'preact/hooks';

type Field = { from: number; to: number; label: string };
type Props = {
  /** Space-separated hex bytes, e.g. "50 4B 03 04 …" */
  bytes: string;
  /** Byte ranges (inclusive) and what they mean. In a label, {n} is the position inside the range and {len} its length. */
  fields?: Field[];
  /** Byte range to highlight as "the giveaway", inclusive. */
  highlight?: [number, number];
  name?: string;
};

const ch = (b: string) => { const n = parseInt(b, 16); return n >= 32 && n < 127 ? String.fromCharCode(n) : '.'; };

/** Kit toy: hover or tap bytes in a hex dump to see what they mean. */
export default function HexViewer({ bytes, fields = [], highlight, name = 'mystery_file' }: Props) {
  const B = bytes.trim().split(/\s+/).map((x) => x.toUpperCase());
  const [at, setAt] = useState(0);
  const field = (i: number) => {
    const f = fields.find((x) => i >= x.from && i <= x.to);
    return f ? f.label.replace('{n}', String(i - f.from + 1)).replace('{len}', String(f.to - f.from + 1)) : '';
  };
  const hot = (i: number) => !!highlight && i >= highlight[0] && i <= highlight[1];
  const rows = Array.from({ length: Math.ceil(B.length / 16) }, (_, r) => r);
  const grid = 'display:grid;grid-template-columns:84px repeat(8,minmax(0,1fr)) 12px repeat(8,minmax(0,1fr));gap:4px;align-items:center';
  const cell = (i: number) => {
    if (i >= B.length) return <span />;
    const on = i === at;
    return (
      <button type="button" onMouseEnter={() => setAt(i)} onFocus={() => setAt(i)} onClick={() => setAt(i)}
        aria-label={`byte ${i}, hex ${B[i]}, character ${ch(B[i])}. ${field(i)}`}
        style={`min-height:34px;border-radius:4px;cursor:pointer;font-family:var(--f-mono);font-size:14px;border:1.5px solid ${on ? 'var(--ink)' : hot(i) ? '#4d7a00' : '#d8d4c4'};${on ? 'background:var(--ink);color:var(--lime)' : hot(i) ? 'background:#eaffc9;color:var(--ink)' : 'background:#faf9f3;color:var(--paper-muted)'}`}>
        {B[i]}
      </button>
    );
  };
  const head = (a: number) => Array.from({ length: 8 }, (_, k) => <span>{(a + k).toString(16).toUpperCase().padStart(2, '0')}</span>);
  return (
    <div>
      <div class="mono" style="font-size:12px;color:#5b4a75;margin-bottom:8px">{name} · {B.length} bytes shown</div>
      <div style="overflow-x:auto">
        <div style="min-width:560px;display:flex;flex-direction:column;gap:4px;font-family:var(--f-mono);font-size:14px">
          <div aria-hidden="true" style={grid + ';color:#8a7fa0;font-size:11px;text-align:center'}>
            <span style="text-align:left">OFFSET</span>{head(0)}<span />{head(8)}
          </div>
          {rows.map((r) => (
            <div style={grid}>
              <span style="color:#8a7fa0;font-size:13px">{(r * 16).toString(16).padStart(8, '0')}</span>
              {Array.from({ length: 8 }, (_, k) => cell(r * 16 + k))}
              <span aria-hidden="true" />
              {Array.from({ length: 8 }, (_, k) => cell(r * 16 + 8 + k))}
            </div>
          ))}
        </div>
      </div>
      <div aria-live="polite" style="margin-top:14px;padding:10px 12px;border-radius:8px;background:var(--panel);color:var(--text);font-family:var(--f-mono);font-size:14px;line-height:1.55">
        <span style="color:var(--lime)">byte {at}:</span> 0x{B[at]} = "{ch(B[at])}"<br /><span style="color:var(--muted)">{field(at) || '—'}</span>
      </div>
    </div>
  );
}
