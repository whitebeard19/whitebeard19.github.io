import { useState } from 'preact/hooks';

const MODES = ['BRIDGED', 'HOST-ONLY', 'INTERNAL'] as const;
type Mode = (typeof MODES)[number];
const T = [
  { name: 'Target VM', sub: 'the practice app, built to be broken', r: { BRIDGED: true, 'HOST-ONLY': true, INTERNAL: true } },
  { name: 'My laptop (the host)', sub: 'the machine running everything', r: { BRIDGED: true, 'HOST-ONLY': true, INTERNAL: false } },
  { name: 'Home Wi-Fi devices', sub: 'phones, TV, family laptops', r: { BRIDGED: true, 'HOST-ONLY': false, INTERNAL: false } },
  { name: 'The internet', sub: 'everything else, everywhere', r: { BRIDGED: true, 'HOST-ONLY': false, INTERNAL: false } },
];
const V: Record<Mode, { head: string; text: string; bad: boolean }> = {
  BRIDGED: { head: 'Bridged: risky for practice.', text: 'The VM joins your home network like a real device. Anything you try in an exercise could touch your family’s laptop or the internet.', bad: true },
  'HOST-ONLY': { head: 'Host-only: better.', text: 'Nothing on your home network or the internet can be reached, but the host laptop still can. Fine if the host is locked down; I wanted one more wall.', bad: false },
  INTERNAL: { head: 'Internal network: what I use.', text: 'The VMs can only see each other. Not the host, not the Wi-Fi, not the internet. If something goes wrong, it goes wrong inside the box.', bad: false },
};
const ink = 'var(--ink)';

/** Who can a practice VM reach in each VirtualBox network mode? */
export default function ReachToy() {
  const [mode, setMode] = useState<Mode>('BRIDGED');
  const v = V[mode];
  return (
    <div style="margin:0 -18px -18px">
      <div role="group" aria-label="Network mode" style={`display:flex;flex-wrap:wrap;width:fit-content;background:${ink};border-radius:22px;padding:3px;margin:0 18px 14px`}>
        {MODES.map((m) => (
          <button type="button" class="label" aria-pressed={mode === m} onClick={() => setMode(m)}
            style={`min-height:40px;padding:0 14px;border-radius:20px;border:none;cursor:pointer;font-size:12px;${mode === m ? `background:var(--lime);color:${ink}` : 'background:transparent;color:#fff'}`}>{m}</button>
        ))}
      </div>
      <div style="padding:20px 18px;display:flex;flex-wrap:wrap;gap:20px;align-items:center;background:var(--cream);border-top:2px solid var(--ink)">
        <div style={`flex:0 1 180px;min-width:150px;border:3px solid ${ink};border-radius:12px;padding:14px;background:var(--panel);color:#fff;text-align:center`}>
          <div class="label" style="font-size:11px;color:var(--lime)">START HERE</div>
          <div style="margin-top:6px;font-family:var(--f-display);font-weight:800;font-size:20px;line-height:1.15">Practice VM</div>
          <div style="margin-top:4px;font-size:13px;color:#cfc6e0">where I run the exercises</div>
        </div>
        <ul style="flex:1 1 320px;min-width:0;list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px">
          {T.map((t, i) => {
            const ok = t.r[mode];
            const risky = ok && i > 0;
            const col = !ok ? '#c9c4d6' : risky ? 'var(--red)' : '#4d9a00';
            return (
              <li style="display:grid;grid-template-columns:minmax(40px,1fr) minmax(150px,2fr) 92px;align-items:center;gap:10px">
                <span aria-hidden="true" style={`display:block;height:4px;border-radius:2px;${ok ? `background-color:${col};background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.85) 0 4px,transparent 4px 12px);background-size:24px 4px;animation:flowx .7s linear infinite` : 'background-image:repeating-linear-gradient(90deg,#c9c4d6 0 6px,transparent 6px 12px)'}`} />
                <span style={`padding:10px 12px;border-radius:10px;border:2px solid ${ink};background:#fff;font-size:15px;line-height:1.3`}><strong>{t.name}</strong><br /><span style="font-size:13px;color:#5b4a75">{t.sub}</span></span>
                <span class="label" style={`text-align:center;padding:6px 4px;border-radius:14px;font-size:10px;${!ok ? 'background:#ece9df;color:#5b4a75' : risky ? 'background:#ffd6d3;color:#8a1d17;border:1.5px solid #c4302a' : 'background:#eaffc9;color:#2f6b00;border:1.5px solid #4d7a00'}`}>{ok ? 'REACHABLE' : 'BLOCKED'}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <p aria-live="polite" style={`margin:0;padding:14px 18px;border-top:2px solid ${ink};font-size:16px;line-height:1.5;background:${v.bad ? '#ffd6d3' : '#eaffc9'}`}><strong>{v.head}</strong> {v.text}</p>
    </div>
  );
}
