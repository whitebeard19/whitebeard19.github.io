/**
 * ─────────────────────────────────────────────────────────────
 *  YOUR DETAILS LIVE HERE.
 *  Everything in [SQUARE BRACKETS] is a placeholder: replace it.
 *  Posts live in src/content/posts, projects in src/content/builds.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: 'Atheeq Basith',
  firstName: 'Atheeq',
  /** Shown in the logo, boot screen and footer. */
  os: 'ATHEEQ.OS',
  version: '5.0',
  /** Used in the terminal prompt: atheeq@board:~$ */
  handle: 'atheeq',
  city: '[CITY]',
  email: '[YOUR EMAIL]',
  /** One sentence for search engines and link previews. */
  description:
    'Atheeq Basith, a fresher engineer learning computers in public: hardware, software and AI, beginner security, and product notes.',

  hero: {
    tagline:
      'A fresher taking computers apart, one layer at a time, and writing down everything I find inside.',
    intro:
      "By day I write software at a startup and wrestle with AI tools. By night I'm on a breadboard figuring out how a CPU adds two numbers, or in my home lab learning how systems get broken so I can build them to hold. Every post here is the explainer I wish I'd found when I was stuck.",
  },

  /** Footer + about page links. Remove any you don't use. */
  socials: [
    { label: 'GITHUB', href: 'https://github.com/[YOUR-USERNAME]' },
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/[YOUR-PROFILE]' },
    { label: 'X', href: 'https://x.com/[YOUR-HANDLE]' },
  ],

  /** Put your CV at public/cv.pdf, or set this to null to hide the button. */
  cv: 'cv.pdf' as string | null,

  /** Newsletter form. Buttondown: https://buttondown.com/api/emails/embed-subscribe/<your-username> */
  newsletterAction: 'https://buttondown.com/api/emails/embed-subscribe/[YOUR-BUTTONDOWN-USERNAME]',

  /** The hidden flag on the home page logo. Its hash is generated automatically. */
  homeFlag: 'flag{h3ll0_fr0m_th3_b0ard}',
};

/** "Currently compiling": what you're learning right now (home page htop panel). */
export const NOW = {
  month: 'OCT 2026',
  blurb:
    "What I'm learning this month, as honestly as htop would report it. Some of these will turn into posts; some will turn into lessons about giving up gracefully.",
  load: ['curious', 'stubborn', '3 chai'],
  procs: [
    { cpu: 48, cmd: 'learn: digital logic — nand2tetris, chapter 3', layer: 'hardware' },
    { cpu: 41, cmd: 'practise: beginner crypto challenges on [CTF platform]', layer: 'security' },
    { cpu: 36, cmd: 'build: tinyagent — tool calling from scratch', layer: 'software' },
    { cpu: 30, cmd: 'ship: [current feature] at [STARTUP]', layer: 'software' },
    { cpu: 22, cmd: 'write: the next post', layer: 'product' },
    { cpu: 8, cmd: 'solder: header pins without burning a finger (again)', layer: 'hardware' },
  ],
} as const;

/** About page. */
export const ABOUT = {
  neofetch: [
    ['OS', 'atheeq.os 5.0 (fresher edition)'],
    ['Host', '[STARTUP], [CITY]'],
    ['Uptime', '~1 year in the industry'],
    ['Role', 'software engineer, learning out loud'],
    ['Shell', '[Python, TypeScript]'],
    ['Learning', 'digital logic · AI agents · security (beginner)'],
    ['Bench', 'breadboards, a multimeter, an isolated home lab'],
    ['Writes', 'explainers on whatever I’m learning'],
    ['Open to', "[roles / internships you'd like to hear about]"],
  ],
  recruiter: {
    title: 'Software Engineer · [STARTUP] · [CITY]',
    bullets: [
      'About a year into my first engineering role at an early-stage startup, where I ship product features and pick up a bit of everything a small team needs.',
      '[One concrete thing you built or improved at work, in a line.]',
      'Teaching myself computer fundamentals from the ground up: digital logic on breadboards, AI agents from scratch, and security through beginner CTFs in an isolated home lab.',
      'Keep a public blog that explains what I learn, with a small interactive demo I build for each post.',
      'Open to: [roles / internships] · Location: [city / remote].',
    ],
  },
  dayJob: {
    title: 'Software Engineer · [STARTUP]',
    when: '2025 → HEAD · [CITY]',
    bullets: [
      '[A system or feature you work on, and who it helps.]',
      '[A real result: something faster, cheaper, or less broken.]',
      'Learning how production software is built, reviewed and kept alive.',
    ],
  },
  nightBench: [
    'Building a 4-bit CPU on breadboards to see how computers really work.',
    'Beginner security: CTFs and a sandboxed home lab, learning to defend by understanding attacks.',
    'Writing an AI agent from scratch, and blogging every lesson.',
  ],
  education: { when: '20XX → 2025', title: '[DEGREE], [COLLEGE]', note: '[Final-year project worth naming.]' },
  /** Learning roadmap: state is 'shipped' | 'learning' | 'queued'. */
  roadmap: {
    hardware: [
      { name: 'Logic gates & binary', state: 'shipped', note: 'Comfortable with how gates make arithmetic. Wrote the explainer for it.' },
      { name: 'Breadboard CPU', state: 'learning', note: 'Clock, registers and the ALU work. The control unit is my current puzzle.' },
      { name: 'Reading a datasheet', state: 'learning', note: 'Slowly getting fluent in timing diagrams and pin tables.' },
      { name: 'Designing a real PCB', state: 'queued', note: 'Once the breadboard version actually runs a program.' },
    ],
    software: [
      { name: 'Shipping web features', state: 'shipped', note: 'My day job: building and maintaining real features at the startup.' },
      { name: 'AI agents from scratch', state: 'learning', note: 'Writing tool-calling by hand so I understand it, not just import it.' },
      { name: 'Systems & performance', state: 'learning', note: 'Caches, memory, why things are slow. The fun kind of deep.' },
      { name: 'Distributed systems', state: 'queued', note: 'Consensus and queues are next on the reading list.' },
    ],
    security: [
      { name: 'Beginner CTFs', state: 'learning', note: 'Practising on intentionally vulnerable targets in a sandbox. Slowly getting less bad.' },
      { name: 'Crypto fundamentals', state: 'learning', note: 'What hashing, salting and encryption actually do, and when each is right.' },
      { name: 'Writing secure code', state: 'learning', note: 'Turning every lesson from an attack into a defence in my own code.' },
      { name: 'Responsible disclosure', state: 'queued', note: 'Learning how to report a bug properly, before I ever need to.' },
    ],
    product: [
      { name: 'Talking to users', state: 'learning', note: 'At a small startup, everyone does a bit of this. Learning to ask better questions.' },
      { name: 'Prioritisation', state: 'learning', note: 'Figuring out what not to build, which is harder than it sounds.' },
      { name: 'Writing clear specs', state: 'queued', note: 'Getting better at describing a feature before building it.' },
    ],
  },
} as const;

/** Lab-notes page: the rules shown in rules.txt, and the "start here" reading path (post folder names). */
export const LAB = {
  rules: [
    'Only practice targets, or machines I own.',
    'The lab never touches my home network.',
    'No real systems. No real people’s data.',
    'Find a real bug? Report it privately.',
  ],
  startHere: [
    // { slug: 'password123', why: 'Why stored passwords need hashing at all.' },
    { slug: 'my-first-ctf', why: 'A real practice event, with the parts that beat me left in.' },
  ],
};
