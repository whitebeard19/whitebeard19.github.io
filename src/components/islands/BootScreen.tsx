import { useEffect, useRef, useState } from 'preact/hooks';

/**
 * Boot sequence on the home page: plays once per browser session (skippable),
 * and again whenever the power switch is flipped back on.
 * Hides the hero via the `booting` / `power-off` classes on <html> (see global.css).
 */
export default function BootScreen({ lines }: { lines: string[] }) {
  const [n, setN] = useState(-1);
  const [on, setOn] = useState(true);
  const timer = useRef<number | undefined>();
  const done = useRef<number | undefined>();
  const root = document.documentElement;

  const clear = () => { clearInterval(timer.current); clearTimeout(done.current); };
  const finish = () => {
    clear();
    setN(-1);
    root.classList.remove('booting');
    try { sessionStorage.setItem('booted', '1'); } catch {}
  };
  const start = () => {
    clear();
    setOn(true);
    setN(0);
    root.classList.add('booting');
    let k = 0;
    timer.current = window.setInterval(() => {
      k += 1;
      setN(k);
      if (k >= lines.length) { clearInterval(timer.current); done.current = window.setTimeout(finish, 450); }
    }, 330);
  };

  useEffect(() => {
    if (root.classList.contains('booting')) start();
    const onPower = (e: Event) => {
      const v = (e as CustomEvent<boolean>).detail;
      if (v) start();
      else { clear(); setN(-1); setOn(false); root.classList.remove('booting'); }
    };
    window.addEventListener('power', onPower);
    return () => { clear(); window.removeEventListener('power', onPower); };
  }, []);

  if (on && n < 0) return null;
  const shown = on ? lines.slice(0, n) : ['System halted.', 'Flip the power switch to boot again.'];
  return (
    <section class="wrap" aria-label="Booting" style="padding-top:28px;padding-bottom:24px">
      <div style="min-height:520px;background:var(--night);border:2px solid #000;border-radius:12px;padding:clamp(20px,4vw,48px);font-family:var(--f-mono);font-size:clamp(15px,1.6vw,19px);line-height:1.8;color:var(--green);box-shadow:inset 0 0 80px rgba(61,220,132,.08)">
        {shown.map((t, i) => (
          <div style={!on ? 'color:var(--muted-2)' : i === lines.length - 1 ? 'color:var(--yellow)' : ''}>{t}</div>
        ))}
        <span aria-hidden="true" style="display:inline-block;width:12px;height:22px;background:var(--green);vertical-align:middle;animation:caret 1s steps(1) infinite" />
        {on && (
          <div style="margin-top:28px">
            <button type="button" class="key" onClick={finish} style="border-color:var(--muted);color:#d9d4e2;background:transparent">SKIP BOOT →</button>
          </div>
        )}
      </div>
    </section>
  );
}
