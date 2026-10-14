import { useState } from 'preact/hooks';

const STEPS = [
  { name: 'Signed up', key: 'signup', v: 100, note: 'Everyone starts here. 100% by definition.' },
  { name: 'Connect data', key: 'connect_data', v: 52, note: 'The leak: 48% of signups drop before connecting data. Recordings show people leaving to find credentials.' },
  { name: 'First project', key: 'first_project', v: 48, note: 'Almost everyone who connects goes on to create a project. The problem is upstream.' },
  { name: 'Invited teammate', key: 'invite', v: 21, note: 'A normal drop for a team tool. Not the fire to fight first.' },
];

/** Probe each funnel step like a node in a circuit. Example data. */
export default function FunnelProbe() {
  const [step, setStep] = useState(1);
  return (
    <div>
      <div style="display:flex;flex-direction:column;gap:10px">
        {STEPS.map((s, i) => (
          <button type="button" aria-pressed={step === i} onClick={() => setStep(i)}
            style={`display:grid;grid-template-columns:150px minmax(0,1fr) 64px;align-items:center;gap:12px;padding:8px;border-radius:10px;border:2px solid ${step === i ? 'var(--ink)' : 'transparent'};background:${step === i ? '#fff3c4' : 'transparent'};color:var(--ink);cursor:pointer;text-align:left;font-size:15px`}>
            <span style="font-weight:700">{s.name}</span>
            <span aria-hidden="true" style="height:22px;border-radius:6px;background:#efecdf;overflow:hidden"><span style={`display:block;height:100%;border-radius:6px;width:${s.v}%;background:${i === 1 ? 'var(--red)' : '#5a1fa8'}`} /></span>
            <span class="mono" style="font-weight:700;text-align:right">{s.v}%</span>
          </button>
        ))}
      </div>
      <div aria-live="polite" style="margin-top:14px;padding:12px 14px;border-radius:10px;background:var(--panel);color:var(--text);font-family:var(--f-mono);font-size:14px;line-height:1.55">
        <span style="color:var(--green)">$ probe {STEPS[step].key}</span><br />{STEPS[step].note}
      </div>
    </div>
  );
}
