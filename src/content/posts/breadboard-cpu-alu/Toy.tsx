import { useState } from 'preact/hooks';

const ink = 'var(--ink)';
const bits = (n: number) => [3, 2, 1, 0].map((i) => (n >> i) & 1);
const row = 'display:grid;grid-template-columns:70px repeat(5,minmax(0,52px)) 1fr;gap:8px;align-items:center';

/** 4-bit ALU: flip bits, switch ADD/SUB, watch two's complement happen. */
export default function Alu4() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);
  const [sub, setSub] = useState(false);
  const bx = sub ? b ^ 15 : b;
  const raw = a + bx + (sub ? 1 : 0);
  const res = raw & 15;
  const carry = raw > 15 ? 1 : 0;
  const signed = res > 7 ? res - 16 : res;
  const sw = (n: number, set: (v: number) => void, label: string) =>
    bits(n).map((v, k) => {
      const pos = 3 - k;
      return (
        <button type="button" class="key key--sm" aria-pressed={!!v} aria-label={`${label} bit ${pos}, currently ${v}`} onClick={() => set(n ^ (1 << pos))}
          style={`height:44px;padding:0;border-color:${ink};font-family:var(--f-mono);font-weight:700;font-size:16px;${v ? `background:${ink};color:var(--yellow)` : `background:#fff;color:${ink}`}`}>{v}</button>
      );
    });
  const sum = sub ? `${a} − ${b} = ${signed}` : `${a} + ${b} = ${res}${carry ? ' (+16 carry)' : ''}`;
  const explain = !sub
    ? carry ? `The answer needed a fifth bit, so the carry LED lit. On a 4-bit machine that is overflow: ${a + b} does not fit.` : 'Four bits hold 0 to 15. Each LED is a power of two: 8, 4, 2, 1.'
    : `To subtract, the XOR chip flips every bit of B and the adder adds 1 more. That is two’s complement: ${signed < 0 ? `the result is negative, so the top bit is set (${res} unsigned = ${signed} signed).` : carry ? 'carry lit means no borrow was needed.' : 'carry off means a borrow happened.'}`;
  const opBtn = (on: boolean) => `min-height:40px;padding:0 16px;border-radius:20px;border:none;cursor:pointer;font-size:12px;${on ? `background:var(--yellow);color:${ink}` : 'background:transparent;color:#fff'}`;
  return (
    <div>
      <div role="group" aria-label="Operation" style={`display:flex;width:fit-content;background:${ink};border-radius:22px;padding:3px;margin-bottom:16px`}>
        <button type="button" class="label" aria-pressed={!sub} onClick={() => setSub(false)} style={opBtn(!sub)}>ADD</button>
        <button type="button" class="label" aria-pressed={sub} onClick={() => setSub(true)} style={opBtn(sub)}>SUB</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;overflow-x:auto">
        <div style={row}><span class="label">A</span><span />{sw(a, setA, 'A')}<span class="mono" style="font-size:16px;padding-left:8px">= {a}</span></div>
        <div style={row}><span class="label">B</span><span />{sw(b, setB, 'B')}<span class="mono" style="font-size:16px;padding-left:8px">= {b}</span></div>
        {sub && (
          <div style={row}>
            <span class="label" style="font-size:11px;color:#5b4a75">B XOR 1</span><span />
            {bits(b ^ 15).map((v) => <span class="mono" style="height:36px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:#ece6f5;font-weight:700">{v}</span>)}
            <span style="font-size:14px;color:#5b4a75;padding-left:8px">+ carry-in 1</span>
          </div>
        )}
        <div aria-hidden="true" style={`height:3px;background:${ink};margin:4px 0`} />
        <div style={row.replace('center', 'end')}>
          <span class="label" style="padding-bottom:20px">OUT</span>
          {[carry, ...bits(res)].map((v, i) => (
            <span style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <span aria-hidden="true" style={`width:30px;height:38px;border-radius:15px 15px 3px 3px;transition:background 160ms,box-shadow 160ms;background:${v ? '#ff3b3b' : '#efd4d4'};box-shadow:${v ? '0 0 18px 5px rgba(255,59,59,.5)' : 'none'}`} />
              <span class="mono" style="font-size:12px;color:#5b4a75">{['C', '8', '4', '2', '1'][i]}</span>
            </span>
          ))}
          <span class="mono" aria-live="polite" style="font-size:18px;font-weight:700;padding:0 0 20px 8px">{sum}</span>
        </div>
      </div>
      <p style="margin:16px 0 0;padding-top:12px;border-top:2px solid var(--ink);font-size:15px;line-height:1.5;color:var(--paper-muted)">{explain}</p>
    </div>
  );
}
