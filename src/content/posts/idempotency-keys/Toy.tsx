import { useState } from 'preact/hooks';

type Line = { t: string; c: string };
const ink = 'var(--ink)';

/** Be the impatient customer: mash Pay with and without an idempotency key. */
export default function ImpatientCustomer() {
  const [useKey, setUseKey] = useState(false);
  const [reqs, setReqs] = useState(0);
  const [charges, setCharges] = useState(0);
  const [log, setLog] = useState<Line[]>([]);

  const send = (retry: boolean) => {
    setReqs((r) => r + 1);
    setCharges((c) => {
      const key = useKey ? 'key=8e1f' : 'no key';
      let line: Line;
      let next = c;
      if (useKey && c > 0) line = { t: `POST /charge (${key}) → seen before, replaying ch_19x`, c: '#7cc0ff' };
      else { next = c + 1; line = { t: `POST /charge (${key}) → NEW charge ch_${18 + next}x ₹499`, c: !useKey && next > 1 ? '#ff8a8a' : 'var(--green)' }; }
      const pre = retry ? [{ t: '…response lost in transit, client retries', c: 'var(--muted-2)' }] : [];
      setLog((l) => l.concat(pre, [line]).slice(-7));
      return next;
    });
  };
  const reset = (k = useKey) => { setUseKey(k); setReqs(0); setCharges(0); setLog([]); };
  const bad = charges > 1;
  return (
    <div style="margin:0 -18px -18px">
      <div style={`display:flex;flex-wrap:wrap;justify-content:flex-start;padding:0 18px 14px;border-bottom:2px solid ${ink}`}>
        <button type="button" aria-pressed={useKey} onClick={() => reset(!useKey)} class="label"
          style={`min-height:44px;padding:0 16px;border-radius:22px;border:2px solid ${ink};cursor:pointer;font-size:12px;color:${ink};background:${useKey ? 'var(--green)' : '#fff'}`}>
          IDEMPOTENCY KEY: {useKey ? 'ON' : 'OFF'}
        </button>
      </div>
      <div style="display:flex;flex-wrap:wrap">
        <div style="flex:1 1 260px;padding:20px 18px;display:flex;flex-direction:column;align-items:center;gap:14px;background:var(--cream)">
          <div style={`width:200px;max-width:100%;border:3px solid ${ink};border-radius:22px;padding:18px 16px;background:#fff;text-align:center`}>
            <div style="font-size:14px;color:#5b4a75">Order #2201</div>
            <div style="margin:4px 0 14px;font-family:var(--f-display);font-weight:800;font-size:32px">₹499</div>
            <button type="button" class="key" onClick={() => send(false)} style={`width:100%;border-color:${ink};background:var(--green);color:${ink}`}>PAY</button>
            <button type="button" onClick={() => { send(false); setTimeout(() => send(true), 350); }}
              style={`margin-top:10px;width:100%;min-height:40px;border-radius:10px;border:2px dashed ${ink};background:transparent;color:${ink};font-size:14px;cursor:pointer`}>Simulate timeout + auto-retry</button>
          </div>
          <button type="button" onClick={() => reset()} style="min-height:40px;padding:0 14px;border:none;background:transparent;color:#5a1fa8;text-decoration:underline;cursor:pointer;font-size:15px">Reset</button>
        </div>
        <div style="flex:2 1 320px;min-width:0;display:flex;flex-direction:column">
          <div style={`display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-bottom:2px solid ${ink}`}>
            <div style={`padding:12px 16px;border-right:2px solid ${ink}`}><div style="font-size:13px;color:#5b4a75">Requests received</div><div class="mono" style="font-weight:700;font-size:28px">{reqs}</div></div>
            <div style={`padding:12px 16px;background:${bad ? '#ffd6d3' : charges === 1 ? '#d8f7e6' : '#fff'}`}><div style="font-size:13px;color:#5b4a75">Customer charged</div><div class="mono" aria-live="polite" style="font-weight:700;font-size:28px">{charges === 0 ? '₹0' : `₹499 × ${charges}`}</div></div>
          </div>
          <div style="flex:1;min-height:190px;background:var(--panel);color:var(--text);padding:10px 14px;font-family:var(--f-mono);font-size:13px;line-height:1.7;overflow:hidden">
            <div style="color:var(--muted-2)">server.log</div>
            {log.map((l) => <div style={`color:${l.c}`}>{l.t}</div>)}
            {log.length === 0 && <div style="color:var(--muted-2)">waiting for requests…</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
