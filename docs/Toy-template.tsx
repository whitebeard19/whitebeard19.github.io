// Copy next to your post as Toy.tsx. It's a Preact component: state + buttons, nothing else.
import { useState } from 'preact/hooks';

export default function MyToy() {
  const [n, setN] = useState(0);
  return (
    <div>
      <p style="margin:0 0 12px">You clicked {n} times.</p>
      <button type="button" class="key key--yellow key--sm" onClick={() => setN(n + 1)}>CLICK ME</button>
    </div>
  );
}
