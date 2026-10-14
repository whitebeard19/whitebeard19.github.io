import { useState } from 'preact/hooks';
import HashSalt from '../toys/HashSalt';
import CpuStepper from '../toys/CpuStepper';
import LogicGate from '../toys/LogicGate';
import Rice from '../toys/Rice';

const TABS = [
  { key: 'security', name: 'Security', color: 'var(--lime)', C: HashSalt },
  { key: 'software', name: 'Software & AI', color: 'var(--blue)', C: CpuStepper },
  { key: 'hardware', name: 'Hardware', color: '#ff8a70', C: LogicGate },
  { key: 'product', name: 'Product', color: 'var(--pink)', C: Rice },
];

/** The home page toy bench. Swap or add toys in the TABS list above. */
export default function ToyBench({ start = 'security' }: { start?: string }) {
  const [tab, setTab] = useState(start);
  const cur = TABS.find((t) => t.key === tab) ?? TABS[0];
  const C = cur.C;
  return (
    <figure style="flex:1 1 520px;min-width:0;margin:0;background:var(--cream);color:var(--ink);border:2px solid var(--night);border-radius:12px;overflow:hidden;box-shadow:0 18px 40px rgba(10,0,30,.5)">
      <div class="window__bar">
        <span class="dots" aria-hidden="true"><span /><span /><span /></span>
        <span>toybench.app</span>
        <span class="pid">PID 007</span>
      </div>
      <div style="padding:14px 18px 18px">
        <div role="group" aria-label="Layer" style="display:flex;flex-wrap:wrap;gap:3px;background:var(--ink);border-radius:22px;padding:3px;width:fit-content;max-width:100%">
          {TABS.map((t) => (
            <button type="button" aria-pressed={tab === t.key} onClick={() => setTab(t.key)} class="label"
              style={`min-height:40px;padding:0 14px;border-radius:20px;border:none;cursor:pointer;font-size:12px;${tab === t.key ? `background:${t.color};color:var(--ink)` : 'background:transparent;color:#fff'}`}>{t.name}</button>
          ))}
        </div>
        <C />
      </div>
    </figure>
  );
}
