import { useState } from 'preact/hooks';

type Node = {
  id: string;
  label: string;
  /** Short tag under the label, e.g. "compute", "storage". */
  kind?: string;
  /** What this box does, shown when it is selected. */
  note: string;
};
type Tier = { name: string; nodes: Node[] };
type Props = {
  /** Rows from the user side down to the data side. */
  tiers: Tier[];
  /** Directed links as [from, to] node ids. */
  links: [string, string][];
  name?: string;
};

/** Kit toy: tap a box in a system diagram to see what it does and what it talks to. */
export default function ArchDiagram({ tiers, links, name = 'architecture' }: Props) {
  const all = tiers.flatMap((t) => t.nodes);
  const [sel, setSel] = useState(all[0]?.id ?? '');
  const cur = all.find((n) => n.id === sel);
  const label = (id: string) => all.find((n) => n.id === id)?.label ?? id;
  const out = links.filter(([a]) => a === sel).map(([, b]) => b);
  const inn = links.filter(([, b]) => b === sel).map(([a]) => a);
  const linked = (id: string) => out.includes(id) || inn.includes(id);
  return (
    <div>
      <div role="group" aria-label={`${name} diagram`} style="display:flex;flex-direction:column;gap:6px">
        {tiers.map((t, ti) => (
          <div>
            {ti > 0 && <div aria-hidden="true" style="text-align:center;color:var(--paper-muted);font-family:var(--f-mono);line-height:1">↓</div>}
            <div class="label" style="font-size:10px;color:var(--paper-muted);margin:2px 0 4px">{t.name.toUpperCase()}</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              {t.nodes.map((n) => {
                const on = n.id === sel;
                const near = linked(n.id);
                return (
                  <button type="button" key={n.id} aria-pressed={on} onClick={() => setSel(n.id)}
                    style={`flex:1 1 120px;min-height:44px;padding:8px 10px;border-radius:6px;cursor:pointer;text-align:left;font-family:var(--f-body);font-size:15px;border:2px solid ${on ? 'var(--ink)' : near ? 'var(--blue)' : '#d8d4c4'};${on ? 'background:var(--ink);color:#fff' : near ? 'background:#e6f2ff;color:var(--ink)' : 'background:#faf9f3;color:var(--ink)'}`}>
                    <strong>{n.label}</strong>
                    {n.kind && <span class="mono" style="display:block;font-size:11px;opacity:.75">{n.kind}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {cur && (
        <div role="status" style="margin-top:14px;padding:12px 14px;border-radius:6px;background:var(--ink);color:#fff;font-size:15px">
          <strong>{cur.label}</strong>: {cur.note}
          <div class="mono" style="margin-top:8px;font-size:12px;color:var(--lime)">
            {inn.length > 0 && <div>← from: {inn.map(label).join(', ')}</div>}
            {out.length > 0 && <div>→ to: {out.map(label).join(', ')}</div>}
            {inn.length + out.length === 0 && <div>no links</div>}
          </div>
        </div>
      )}
    </div>
  );
}
