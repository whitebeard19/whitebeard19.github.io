// Usage: npm run flag -- "flag{your_flag_here}"
// Prints the SHA-256 to paste into a post's `flagHash`. Flags are compared in lowercase.
import { createHash } from 'node:crypto';
const flag = (process.argv[2] || '').trim().toLowerCase();
if (!/^flag\{.+\}$/.test(flag)) {
  console.error('Give me a flag like: npm run flag -- "flag{my_secret}"');
  process.exit(1);
}
console.log(`\n  flagHash: ${createHash('sha256').update(flag).digest('hex')}\n`);
console.log('  Paste that line into the post frontmatter. Hide the flag itself somewhere in the post.\n');
