import { useState } from 'preact/hooks';

const CODE = ['def total(xs):', '    s = 0', '    for x in xs:', '        s = s + x', '    return s', '', 'print(total([3, 5, 2]))'];
const L = '[3, 5, 2]';
type Step = { l: number; f: string[]; v: [string, string][]; o: string; n: string };
const T: Step[] = [
  { l: 7, f: ['<module>'], v: [], o: '', n: 'Python starts at the first line it can actually run: the print call.' },
  { l: 2, f: ['<module>', 'total'], v: [['xs', L]], o: '', n: 'Calling total() pushes a new frame onto the call stack. xs lives in it.' },
  { l: 3, f: ['<module>', 'total'], v: [['xs', L], ['s', '0']], o: '', n: 's is a local variable: it exists only inside this frame.' },
  { l: 4, f: ['<module>', 'total'], v: [['xs', L], ['s', '0'], ['x', '3']], o: '', n: 'The loop pulls the first item: x = 3.' },
  { l: 3, f: ['<module>', 'total'], v: [['xs', L], ['s', '3'], ['x', '3']], o: '', n: 's = 0 + 3. Back to the loop for the next item.' },
  { l: 4, f: ['<module>', 'total'], v: [['xs', L], ['s', '3'], ['x', '5']], o: '', n: 'x = 5.' },
  { l: 3, f: ['<module>', 'total'], v: [['xs', L], ['s', '8'], ['x', '5']], o: '', n: 's = 3 + 5.' },
  { l: 4, f: ['<module>', 'total'], v: [['xs', L], ['s', '8'], ['x', '2']], o: '', n: 'x = 2, the last item.' },
  { l: 3, f: ['<module>', 'total'], v: [['xs', L], ['s', '10'], ['x', '2']], o: '', n: 'Nothing left in xs, so the loop ends.' },
  { l: 5, f: ['<module>', 'total'], v: [['xs', L], ['s', '10'], ['x', '2']], o: '', n: 'return hands 10 back to the caller…' },
  { l: 7, f: ['<module>'], v: [], o: '10', n: '…and the frame is popped. Its locals are gone; only the printed 10 survives.' },
];
const ink = 'var(--ink)';
const btn = (bg: string) => `min-height:44px;padding:0 14px;border-color:${ink};color:${ink};background:${bg}`;

export default function CpuStepper() {
  const [pc, setPc] = useState(0);
  const st = T[pc];
  const prev = pc > 0 ? T[pc - 1] : null;
  return (
    <div>
      <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
        <div style="background:var(--panel);border-radius:8px;overflow:hidden">
          <div style="padding:6px 10px;background:var(--panel-2);color:#cfc6e0;font-family:var(--f-mono);font-size:12px">total.py</div>
          <ol style="list-style:none;margin:0;padding:8px 0;font-family:var(--f-mono);font-size:14px;line-height:1.75">
            {CODE.map((t, i) => {
              const on = st.l === i + 1;
              return (
                <li style={`color:${on ? '#fff' : '#cfc6e0'};background:${on ? '#3d2a66' : 'transparent'};box-shadow:${on ? 'inset 4px 0 0 var(--yellow)' : 'none'}`}>
                  <span style={`display:inline-block;width:30px;text-align:right;padding-right:12px;color:${on ? 'var(--yellow)' : '#6f5f8f'}`}>{i + 1}</span>
                  <span style="white-space:pre">{t || ' '}</span>
                </li>
              );
            })}
          </ol>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;font-family:var(--f-mono);font-size:13px">
          <div>
            <div class="label" style="font-size:11px;margin-bottom:4px">CALL STACK</div>
            <div style="display:flex;flex-direction:column-reverse;gap:4px">
              {st.f.map((name, i) => (
                <div style={`padding:6px 10px;border-radius:6px;border:2px solid ${ink};${i === st.f.length - 1 ? 'background:var(--blue);font-weight:700' : 'background:#fff'};color:${ink}`}>{name}{name === 'total' ? '(xs)' : ''}</div>
              ))}
            </div>
          </div>
          <div>
            <div class="label" style="font-size:11px;margin-bottom:4px">VARIABLES</div>
            <div style={`background:#fff;border:2px solid ${ink};border-radius:6px;padding:6px 10px;min-height:66px`}>
              {st.v.map(([k, v]) => {
                const changed = !prev || !prev.v.some((q) => q[0] === k && q[1] === v);
                return <div style={`padding:1px 4px;border-radius:3px;${changed ? 'background:var(--yellow)' : ''}`}>{k} = {v}</div>;
              })}
              {st.v.length === 0 && <div style="color:#6f6656">(none in this frame)</div>}
            </div>
          </div>
          <div>
            <div class="label" style="font-size:11px;margin-bottom:4px">STDOUT</div>
            <div style="background:var(--night);color:var(--green);border-radius:6px;padding:6px 10px;min-height:22px">{st.o || ' '}</div>
          </div>
        </div>
      </div>
      <p aria-live="polite" style="margin:12px 0 0;min-height:48px;font-size:15px;line-height:1.45"><strong>Step {pc}/{T.length - 1}.</strong> {st.n}</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
        <button type="button" class="key key--sm" style={btn('#fff')} onClick={() => setPc(Math.max(0, pc - 1))}>← BACK</button>
        <button type="button" class="key key--sm" style={btn('var(--blue)')} onClick={() => setPc(Math.min(T.length - 1, pc + 1))}>STEP →</button>
        <button type="button" class="key key--sm" style={btn('#fff')} onClick={() => setPc(0)}>RESET</button>
      </div>
    </div>
  );
}
