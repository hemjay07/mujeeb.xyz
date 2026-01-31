export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;

  // Visual
  color: string;        // Gallery background (dark)
  accent: string;       // Title/accent color
  caseBg: string;       // Case study background (light)

  // The Speed Flex
  buildTime: string;

  // Case Study Content
  heading: string;
  summary: string;
  challenge: string;
  solution: string;

  // Meta
  role: string;
  techStack: string[];
  year: string;
  category: string;

  // Links
  liveUrl?: string;
  githubUrl?: string;

  // Images (using placeholders for now)
  heroImage: string;
  thumbnail: string;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: 'predictkit',
    title: 'PredictKit',
    tagline: 'On-chain prediction markets made simple',
    description: 'A decentralized prediction market protocol that lets anyone create and trade on real-world events.',

    color: '#1a2f4a',
    accent: '#60a5fa',
    caseBg: '#f0f7ff',

    buildTime: 'TBD',

    heading: 'Democratizing Prediction Markets on Solana',
    summary: 'PredictKit brings the power of prediction markets to everyone. Create markets for any event, trade outcomes, and earn rewards for accurate predictions.',
    challenge: 'Existing prediction market platforms are either centralized, have poor UX, or require complex DeFi knowledge. The average user was locked out of this powerful forecasting tool.',
    solution: 'Built a streamlined protocol on Solana with a clean interface that abstracts away the complexity. Users can create markets in 30 seconds and trade with just a wallet connection.',

    role: 'Full Stack Developer',
    techStack: ['Solana', 'Anchor', 'Next.js', 'Rust', 'TypeScript'],
    year: '2024',
    category: 'DeFi / Prediction Markets',

    liveUrl: 'https://predictkit.xyz',
    githubUrl: 'https://github.com/mujeeb/predictkit',

    heroImage: '/images/projects/predictkit/hero.png',
    thumbnail: '/images/projects/predictkit/thumb.png',
    screenshots: [
      '/images/projects/predictkit/screen-1.png',
      '/images/projects/predictkit/screen-2.png',
    ],
  },
  {
    id: 'truthbounty',
    title: 'TruthBounty',
    tagline: 'Incentivized fact-checking on-chain',
    description: 'A decentralized bounty system where users stake tokens to verify or challenge claims.',

    color: '#2d1f3d',
    accent: '#c084fc',
    caseBg: '#faf5ff',

    buildTime: 'TBD',

    heading: 'Fighting Misinformation with Economic Incentives',
    summary: 'TruthBounty creates a marketplace for truth. Post a claim, stake your tokens, and let the crowd verify or debunk it. Correct verifiers get rewarded.',
    challenge: 'Misinformation spreads faster than corrections. There\'s no economic incentive for people to spend time fact-checking claims on the internet.',
    solution: 'Created a stake-based verification system where truth-seekers are economically rewarded. Verifiers stake tokens on their assessment, creating skin in the game.',

    role: 'Full Stack Developer',
    techStack: ['Solana', 'Anchor', 'React', 'Rust', 'IPFS'],
    year: '2024',
    category: 'Social / Verification',

    liveUrl: 'https://truthbounty.io',
    githubUrl: 'https://github.com/mujeeb/truthbounty',

    heroImage: '/images/projects/truthbounty/hero.png',
    thumbnail: '/images/projects/truthbounty/thumb.png',
    screenshots: [
      '/images/projects/truthbounty/screen-1.png',
      '/images/projects/truthbounty/screen-2.png',
    ],
  },
  {
    id: 'foresight',
    title: 'Foresight',
    tagline: 'AI-powered market analysis for traders',
    description: 'An intelligent dashboard that aggregates on-chain data and provides actionable trading insights.',

    color: '#0f2830',
    accent: '#34d399',
    caseBg: '#ecfdf5',

    buildTime: 'TBD',

    heading: 'Turning On-Chain Chaos Into Clarity',
    summary: 'Foresight processes millions of transactions to surface trading signals that humans would miss. Real-time alerts, whale tracking, and sentiment analysis.',
    challenge: 'Crypto markets move too fast. By the time a trader spots an opportunity, it\'s often too late. Manual analysis can\'t keep up with 24/7 markets.',
    solution: 'Built an AI pipeline that ingests blockchain data in real-time, identifies patterns, and pushes actionable alerts. Focus on signal-to-noise ratio.',

    role: 'Full Stack Developer',
    techStack: ['Next.js', 'Python', 'OpenAI', 'Solana', 'WebSocket'],
    year: '2024',
    category: 'Analytics / Trading',

    liveUrl: 'https://foresight.trade',
    githubUrl: 'https://github.com/mujeeb/foresight',

    heroImage: '/images/projects/foresight/hero.png',
    thumbnail: '/images/projects/foresight/thumb.png',
    screenshots: [
      '/images/projects/foresight/screen-1.png',
      '/images/projects/foresight/screen-2.png',
    ],
  },
  {
    id: 'idealme',
    title: 'IdealMe',
    tagline: 'Token-gated goal tracking with accountability',
    description: 'Set goals, stake tokens, and earn rewards for completing them. Your tribe keeps you accountable.',

    color: '#3d2314',
    accent: '#fb923c',
    caseBg: '#fff7ed',

    buildTime: 'TBD',

    heading: 'Putting Your Money Where Your Goals Are',
    summary: 'IdealMe gamifies self-improvement with real stakes. Create goals, invite accountability partners, and stake tokens. Hit your goal = keep your stake + earn rewards.',
    challenge: 'New Year\'s resolutions fail because there\'s no real consequence. Apps that track goals have no teeth.',
    solution: 'Designed a system where users stake tokens on their goals. Miss the deadline? Stake goes to your accountability partners. Hit it? You earn from others who failed.',

    role: 'Full Stack Developer',
    techStack: ['Solana', 'Next.js', 'Anchor', 'Tailwind', 'Prisma'],
    year: '2024',
    category: 'Social / Productivity',

    liveUrl: 'https://idealme.app',
    githubUrl: 'https://github.com/mujeeb/idealme',

    heroImage: '/images/projects/idealme/hero.png',
    thumbnail: '/images/projects/idealme/thumb.png',
    screenshots: [
      '/images/projects/idealme/screen-1.png',
      '/images/projects/idealme/screen-2.png',
    ],
  },
  {
    id: 'signalhive',
    title: 'SignalHive',
    tagline: 'Decentralized trading signal marketplace',
    description: 'A platform where traders share signals, build reputation, and monetize their alpha.',

    color: '#1a1a2e',
    accent: '#f472b6',
    caseBg: '#fdf2f8',

    buildTime: 'TBD',

    heading: 'Monetizing Alpha Without Giving It Away',
    summary: 'SignalHive lets skilled traders share signals through a subscription model. Track record is transparent, payouts are automatic, reputation is on-chain.',
    challenge: 'Good traders have alpha but no way to monetize it fairly. Bad actors sell garbage signals with no accountability.',
    solution: 'Built a reputation system backed by verifiable on-chain performance. Subscribers pay creators directly, and historical accuracy is publicly auditable.',

    role: 'Full Stack Developer',
    techStack: ['Solana', 'Next.js', 'Anchor', 'PostgreSQL', 'Stripe'],
    year: '2024',
    category: 'DeFi / Social',

    liveUrl: 'https://signalhive.xyz',
    githubUrl: 'https://github.com/mujeeb/signalhive',

    heroImage: '/images/projects/signalhive/hero.png',
    thumbnail: '/images/projects/signalhive/thumb.png',
    screenshots: [
      '/images/projects/signalhive/screen-1.png',
      '/images/projects/signalhive/screen-2.png',
    ],
  },
  {
    id: 'veilpass',
    title: 'VeilPass',
    tagline: 'Privacy-first encrypted notes on Solana',
    description: 'Store and share encrypted notes on-chain. Only you control your keys, only you can read your data.',

    color: '#1f1f2e',
    accent: '#8b5cf6',
    caseBg: '#f5f3ff',

    buildTime: 'TBD',

    heading: 'Your Notes, Your Keys, Your Privacy',
    summary: 'VeilPass brings true end-to-end encryption to the blockchain. Notes are encrypted client-side before ever touching the chain. Zero-knowledge architecture.',
    challenge: 'Cloud note apps can read your data. "Private" means nothing when servers hold your keys. Users want true ownership of their information.',
    solution: 'Implemented client-side encryption with keys derived from wallet signatures. Data stored on-chain is unreadable without the user\'s private key.',

    role: 'Full Stack Developer',
    techStack: ['Solana', 'Next.js', 'Anchor', 'NaCl', 'TypeScript'],
    year: '2024',
    category: 'Privacy / Infrastructure',

    liveUrl: 'https://veilpass.io',
    githubUrl: 'https://github.com/mujeeb/veilpass',

    heroImage: '/images/projects/veilpass/hero.png',
    thumbnail: '/images/projects/veilpass/thumb.png',
    screenshots: [
      '/images/projects/veilpass/screen-1.png',
      '/images/projects/veilpass/screen-2.png',
    ],
  },
  {
    id: 'x402arcade',
    title: 'x402 Arcade',
    tagline: 'Micropayment gaming with HTTP 402',
    description: 'A retro arcade where every game costs a fraction of a cent. Pay-per-play via the HTTP 402 protocol.',

    color: '#0a1628',
    accent: '#22d3ee',
    caseBg: '#ecfeff',

    buildTime: 'TBD',

    heading: 'Bringing Back the Arcade with Micropayments',
    summary: 'x402 Arcade reimagines pay-per-play for the internet age. Drop 0.001 SOL and play. No subscriptions, no ads, just games.',
    challenge: 'Gaming monetization is broken. Free-to-play means ads and manipulation. Subscriptions mean paying for games you don\'t play.',
    solution: 'Leveraged HTTP 402 (Payment Required) to enable true micropayments. Each game play costs fractions of a cent, streamed directly to creators.',

    role: 'Full Stack Developer',
    techStack: ['Next.js', 'Solana', 'Phaser', 'HTTP 402', 'WebGL'],
    year: '2024',
    category: 'Gaming / Payments',

    liveUrl: 'https://x402arcade.com',
    githubUrl: 'https://github.com/mujeeb/x402arcade',

    heroImage: '/images/projects/x402arcade/hero.png',
    thumbnail: '/images/projects/x402arcade/thumb.png',
    screenshots: [
      '/images/projects/x402arcade/screen-1.png',
      '/images/projects/x402arcade/screen-2.png',
    ],
  },
  {
    id: 'bountynet',
    title: 'BountyNet',
    tagline: 'Decentralized bug bounties for Web3',
    description: 'A protocol connecting security researchers with projects. Stake-based escrow ensures everyone gets paid.',

    color: '#1a1a1a',
    accent: '#ef4444',
    caseBg: '#fef2f2',

    buildTime: 'TBD',

    heading: 'Making Security Profitable for Everyone',
    summary: 'BountyNet decentralizes the bug bounty process. Projects post bounties with escrowed funds, researchers submit findings, validators verify, everyone gets paid.',
    challenge: 'Web3 security is critical but bug bounty platforms take huge cuts and have slow payouts. Researchers don\'t trust projects to pay.',
    solution: 'Built an on-chain escrow system where bounty funds are locked at creation. Smart contracts handle payout logic, removing trust requirements.',

    role: 'Full Stack Developer',
    techStack: ['Solana', 'Anchor', 'Next.js', 'Rust', 'GraphQL'],
    year: '2024',
    category: 'Security / Infrastructure',

    liveUrl: 'https://bountynet.dev',
    githubUrl: 'https://github.com/mujeeb/bountynet',

    heroImage: '/images/projects/bountynet/hero.png',
    thumbnail: '/images/projects/bountynet/thumb.png',
    screenshots: [
      '/images/projects/bountynet/screen-1.png',
      '/images/projects/bountynet/screen-2.png',
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

export const getNextProject = (currentId: string): Project => {
  const currentIndex = projects.findIndex(p => p.id === currentId);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
};

export const getPrevProject = (currentId: string): Project => {
  const currentIndex = projects.findIndex(p => p.id === currentId);
  const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  return projects[prevIndex];
};
