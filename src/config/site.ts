/**
 * ─────────────────────────────────────────────────────────────
 *  YOUR DETAILS LIVE HERE.
 *  Everything in [SQUARE BRACKETS] is a placeholder: replace it.
 *  Posts live in src/content/posts, projects in src/content/builds.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: 'Abdul Basith',
  firstName: 'Basith',
  /** Shown in the logo, boot screen and footer. */
  os: 'BASITH.OS',
  version: '1.0',
  /** Used in the terminal prompt: basith@board:~$ */
  handle: 'basith',
  city: 'Chennai',
  email: 'abdulbasithatwork@gmail.com',
  /** One sentence for search engines and link previews. */
  description:
    'Abdul Basith, a fresher engineer learning computers in public: hardware, software and AI, security, and product notes.',

  hero: {
    tagline:
      'A fresher taking computers apart, one layer at a time, and writing down everything I find inside.',
    intro:
      "By day I build software at a startup. Outside work I'm learning how computers work from transistors up, plus AI engineering, system design and security. Every post here is the explainer I wish I'd found when I was stuck.",
  },

  /** Footer + about page links. Remove any you don't use. */
  socials: [
    { label: 'GITHUB', href: 'https://github.com/whitebeard19' },
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/abdulbasith2309' },
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
    { cpu: 48, cmd: 'learn: nand2tetris, from transistors to a whole computer', layer: 'hardware' },
    { cpu: 41, cmd: 'practise: pwn.college challenges', layer: 'security' },
    { cpu: 36, cmd: 'learn: AI engineering and system design for AI', layer: 'software' },
    { cpu: 30, cmd: 'ship: project work at DemanualAI', layer: 'software' },
    { cpu: 22, cmd: 'prepare: AWS Solutions Architect Associate', layer: 'software' },
    { cpu: 14, cmd: 'write: the next post', layer: 'product' },
  ],
} as const;

/** About page. */
export const ABOUT = {
  neofetch: [
    ['OS', 'basith.os 1.0 (fresher edition)'],
    ['Host', 'DemanualAI, Chennai'],
    ['Uptime', '~1 year in the industry'],
    ['Role', 'software engineer, learning out loud'],
    ['Shell', '[Python, TypeScript, JavaScript]'],
    ['Learning', 'nand2tetris · AI engineering · system design · AWS'],
    ['Writes', 'explainers on whatever I’m learning'],
    ['Open to', 'open source contributions'],
  ],
  recruiter: {
    title: 'Software Engineer · DemanualAI · Chennai',
    bullets: [
      'About a year into my first engineering role at an early-stage startup, working across several projects and picking up a bit of everything a small team needs.',
      'Built new systems and reworked an existing codebase to make it more secure.',
      'Teaching myself the fundamentals: nand2tetris from transistors up, AI engineering and system design, and security practice on pwn.college. Preparing for the AWS Solutions Architect Associate exam.',
      'Keep a public blog that explains what I learn, with a small interactive demo I build for each post.',
      'Open to: open source contributions · Based in Chennai.',
    ],
  },
  dayJob: {
    title: 'Software Engineer · DemanualAI',
    when: '2025 → HEAD · Chennai',
    bullets: [
      'Work across several projects at the startup, building and improving software.',
      'Improved an existing codebase into a more secure one.',
      'Learning how production software is built, reviewed and kept alive.',
    ],
  },
  nightBench: [
    'Working through nand2tetris: building a computer from logic gates up.',
    'Learning AI engineering and how to design systems around AI.',
    'Practising on pwn.college and preparing for the AWS Solutions Architect Associate exam.',
  ],
  education: { when: '2021 → 2025', title: 'B.Tech IT, Jerusalem College of Engineering', note: 'Where I learned the basics of software and computing.' },
  /** Learning roadmap: state is 'shipped' | 'learning' | 'queued'. */
  roadmap: {
    hardware: [
      { name: 'nand2tetris', state: 'learning', note: 'Going from transistors and logic gates up to a working computer.' },
    ],
    software: [
      { name: 'Shipping software at a startup', state: 'shipped', note: 'My day job: building and improving real projects.' },
      { name: 'System design', state: 'learning', note: 'Studying how larger systems fit together, including AWS (preparing for Solutions Architect Associate).' },
      { name: 'AI engineering & system design for AI', state: 'learning', note: 'Learning how to build and design systems around AI models.' },
      { name: 'C++ and Rust', state: 'queued', note: 'Planned next, for closer-to-the-metal programming.' },
    ],
    security: [
      { name: 'pwn.college', state: 'learning', note: 'Practising challenges on a platform built for it.' },
      { name: 'Reverse engineering', state: 'queued', note: 'Planned next.' },
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
