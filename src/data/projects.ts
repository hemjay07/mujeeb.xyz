export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;

  // Visual
  color: string;        // Gallery background (dark)
  accent: string;       // Title/accent color
  caseBg: string;       // Case study background (light)

  // Featured vs Archive
  archived?: boolean;   // If true, shown in archive section instead of main gallery
  desktopOnly?: boolean; // If true, hidden from mobile gallery (no mobile version)

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
  docsUrl?: string;

  // Images (using placeholders for now)
  heroImage: string;
  thumbnail: string;
  screenshots: string[];
  mobileScreenshots?: string[];

  // Enhanced Case Study Fields
  achievements?: string[];           // Hackathon placements, metrics, recognition
  features?: {                       // Key features with descriptions
    title: string;
    description: string;
  }[];
  technicalHighlights?: string[];    // Interesting technical decisions/challenges
  keyInsight?: string;               // The quotable "aha" moment
  packages?: string[];               // For SDK projects: npm package names
}

export const projects: Project[] = [
  // ==================== FEATURED PROJECTS (1-7) ====================

  // 1. PredictKit
  {
    id: 'predictkit',
    title: 'PredictKit',
    tagline: 'Stripe for prediction markets',
    description: 'Full-stack Web3 prediction market infrastructure: 7 smart contracts, TypeScript SDK, React component library, and Next.js demo app with 120K+ lines of code.',

    color: '#1a2f4a',
    accent: '#8B5CF6', // Violet - matches project branding
    caseBg: '#f0f7ff',

    buildTime: '2 weeks',

    heading: 'The API Layer for On-Chain Prediction Markets',
    summary: 'PredictKit is a complete B2B infrastructure stack for prediction markets on BNB Chain. A monorepo with 5 packages: 7 smart contracts handling market logic, a TypeScript SDK wrapping all blockchain interactions, React components with 10 custom hooks, a Graph subgraph indexing 7 entities, and a full Next.js 16 demo app. 119,872 lines of code. Developers can launch prediction markets without building from scratch.',
    challenge: 'Prediction markets are proven powerful—Polymarket hit $3.2B in 2024 election volume alone. But building one from scratch takes 6+ months. Every team reinvents the same wheel: parimutuel math, resolution logic, oracle integration, liquidity management, and frontend components. The barrier to entry keeps most developers out.',
    solution: 'Created a modular SDK that handles all the complexity. Import @predictkit/sdk for blockchain logic, @predictkit/react for UI components. Deploy a market with createMarket(), embed a betting widget with <PredictionWidget />. Three resolution methods (Chainlink oracle, developer immediate, EIP-712 manual signature) and two market types (P2P parimutuel, AMM with liquidity pools) cover every use case.',

    role: 'Solo Builder',
    techStack: ['Solidity', 'Foundry', 'TypeScript', 'Next.js 16', 'React 19', 'The Graph', 'wagmi v2', 'viem', 'ethers.js', 'Zustand', 'React Query', 'Tailwind v4', 'BNB Chain'],
    year: '2025',
    category: 'DeFi / Infrastructure',

    liveUrl: 'https://predictkit.io',
    githubUrl: 'https://github.com/hemjay07/predictkit',
    docsUrl: 'https://predictkit.io/docs',

    heroImage: '/projects/predictkit/homepage-dark.png',
    thumbnail: '/projects/predictkit/homepage-dark.png',
    screenshots: [
      '/projects/predictkit/homepage-dark.png',      // Gallery 3D card (dark)
      '/projects/predictkit/homepage-light.png',     // Case study carousel 1
      '/projects/predictkit/trade-light.png',        // Case study carousel 2
      '/projects/predictkit/docs-light.png',         // Case study carousel 3
    ],
    mobileScreenshots: [
      '/projects/predictkit/mobile-home-light.png',  // Hero - light home page
      '/projects/predictkit/mobile-docs-scroll.png', // Scroll content - docs page with code
      '/projects/predictkit/mobile-docs.png',        // Additional mobile screenshot
    ],

    achievements: [
      '119,872 lines of code across 5 packages',
      '7 smart contracts with 905 lines of tests',
      '10 custom React hooks + 81 TSX components',
      '15+ page routes with full documentation site',
    ],

    features: [
      {
        title: 'TypeScript SDK',
        description: 'PredictKitClient, MarketClient, and LiquidityClient classes with full TypeScript types. Dual output (CJS + ESM) for maximum compatibility. Real-time event subscriptions and EIP-712 signature helpers.',
      },
      {
        title: 'React Components & Hooks',
        description: '10 custom hooks: useMarket, useLiquidity, useUserPortfolio, useGenesis, and more. Drop-in <PredictionWidget />, <MarketList />, <LiquidityManager /> components.',
      },
      {
        title: 'Embeddable Widget',
        description: 'One-line iframe embed with query params (?theme=dark&hideHeader=true). PostMessage API for bet events, wallet connections, and errors. Full betting flow in one embed.',
      },
      {
        title: 'Subgraph Indexer',
        description: '7 GraphQL entities (Market, Bet, Activity, LiquidityPool, LPPosition, GlobalStats, User). O(1) portfolio queries across unlimited markets.',
      },
      {
        title: 'Genesis Program',
        description: 'Points/tier system (Bronze → Diamond) with referrals. Twitter/Discord OAuth verification. 1,463 lines of gamification logic.',
      },
      {
        title: 'Remotion Video Generation',
        description: '8 video generators + 10 components for automated marketing video creation. TribunalPitch-Final.mp4 and predictkit-premium.mp4 outputs.',
      },
    ],

    technicalHighlights: [
      'EIP-712 typed signatures for off-chain market resolution—cryptographic verification without gas costs',
      'O(1) cumulative fee distribution (Uniswap V2 style): accFeesPerShare pattern regardless of LP count',
      'Storage packing with uint128 saves ~5,000 gas per bet operation',
      'Geometric mean LP tokens: sqrt(amountYes × amountNo) - MIN_LIQUIDITY for first LP',
      'Oracle fallback chain: Chainlink → Developer Immediate → Manual EIP-712 resolution',
      'viem → ethers.js provider bridge for wallet compatibility across SDK versions',
    ],

    keyInsight: 'Polymarket proved the demand. PredictKit enables the supply—10 lines of code to add prediction markets to any app.',

    packages: ['@predictkit/sdk', '@predictkit/react'],
  },

  // 2. TruthBounty
  {
    id: 'truthbounty',
    title: 'TruthBounty',
    tagline: 'Turn prediction accuracy into on-chain reputation',
    description: 'Decentralized reputation protocol aggregating prediction market performance across 6 platforms into soulbound NFT-based identity with Wilson Score anti-gaming.',

    color: '#2d1f3d',
    accent: '#c084fc',
    caseBg: '#faf5ff',

    buildTime: '2 weeks',

    heading: 'Building a Cross-Platform Reputation Protocol for Prediction Markets',
    summary: 'TruthBounty is a decentralized reputation protocol that aggregates prediction market performance across platforms (PancakeSwap, Polymarket, Kalshi, etc.) into a unified, soulbound NFT-based identity. Built with Next.js 14, Solidity, and deployed on BNB Chain, it features a statistically-robust Wilson Score algorithm and copy trading functionality. 284,000+ lines of code across 1,295 source files.',
    challenge: 'Prediction market reputation is fragmented and non-portable. A trader\'s winning streak on Polymarket means nothing on PancakeSwap—every platform is a fresh start. Traditional leaderboards are easily gamed by low-volume lucky wins, and there\'s no way to verify a trader\'s cross-platform track record. This prevents meaningful copy-trading and limits price discovery in prediction markets worth billions annually.',
    solution: 'Built a universal reputation layer using soulbound NFTs that aggregate performance across 6+ prediction platforms. Implemented Wilson Score Lower Bound statistical method to prevent gaming (3/3 wins = 43.8% score vs. 650/1000 wins = 62.1%). Created on-chain copy trading vaults with time-locked withdrawals, simulation mode for strategy testing, and a 5-tier progression system (Bronze → Diamond).',

    role: 'Frontend Vibe-Engineer',
    techStack: ['Next.js 14', 'TypeScript', 'Solidity', 'Foundry', 'wagmi v2', 'viem', 'RainbowKit', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'React Query', 'BNB Chain'],
    year: '2024',
    category: 'DeFi / Reputation',

    liveUrl: 'https://truth-bounty-4r9b.vercel.app',
    githubUrl: 'https://github.com/Leihyn/TruthBounty',

    heroImage: '/projects/truthbounty/desktop-hero.png',
    thumbnail: '/projects/truthbounty/desktop-hero.png',
    screenshots: [
      '/projects/truthbounty/desktop-hero.png',         // Gallery 3D card
      '/projects/truthbounty/desktop-leaderboard.png',  // Case study carousel 1
      '/projects/truthbounty/desktop-markets-new.png',  // Case study carousel 2 - Markets page
      '/projects/truthbounty/desktop-copytrading.png',  // Case study carousel 3
    ],
    mobileScreenshots: [
      '/projects/truthbounty/mobile-hero.png',        // Hero - home page
      '/projects/truthbounty/mobile-leaderboard.png', // Scroll content - leaderboard
    ],

    achievements: [
      '284,002 lines of TypeScript/TSX/Solidity',
      '6 prediction platforms integrated',
      '76 backend API endpoints',
      '5 smart contracts (2,792 lines)',
    ],

    features: [
      {
        title: 'Soulbound Reputation NFT',
        description: 'Non-transferable ERC-721 with dynamic on-chain SVG that evolves with your TruthScore (0-1300 max).',
      },
      {
        title: 'Anti-Gaming Scoring',
        description: 'Wilson Score accounts for sample size—requires 50+ bets for full score, preventing lucky-streak manipulation.',
      },
      {
        title: 'Copy Trading Vault',
        description: 'Deposit BNB, follow top traders with customizable allocation %, 1-hour time-locked withdrawals, simulation mode for risk-free testing.',
      },
    ],

    technicalHighlights: [
      'Wilson Score Algorithm: 95% confidence interval scoring—a 3-win streak scores 43.8% (not 100%), while 650/1000 gets 62.1%',
      'Dynamic on-chain NFT metadata: Base64-encoded SVG generated entirely in Solidity—no IPFS dependency',
      'Multi-platform indexer processes 10,000 blocks at a time, polling BSC RPC every 10 seconds with resume-from-checkpoint',
    ],

    keyInsight: 'Your winning streak means nothing without proof. Wilson Score separates skill from luck—follow traders with verified 65% win rates, not Twitter followers.',
  },

  // 3. MicroRoulette
  {
    id: 'microroulette',
    title: 'MicroRoulette',
    tagline: 'Provably fair roulette on Linera',
    description: 'Production-grade European roulette dApp with SHA256 commit-reveal fairness, sub-second settlement, and all 13 bet types on Linera microchain.',

    color: '#1a0f0f',
    accent: '#F59E0B', // Gold - casino aesthetic
    caseBg: '#fffbeb',

    buildTime: '4 days',

    heading: 'Provably Fair Casino Gaming on Microchains',
    summary: 'MicroRoulette is a European roulette dApp running on Linera\'s microchain blockchain. 7,300+ lines of Rust and Vue.js featuring provably fair randomness via SHA256 commit-reveal, sub-second settlement, and all 13 standard bet types with correct payouts.',
    challenge: 'Traditional online casinos are black boxes—players can\'t verify fairness. Blockchain casinos exist but suffer from high latency and expensive transactions. Fast, verifiable, low-cost casino gaming doesn\'t exist.',
    solution: 'Built on Linera\'s microchain architecture for sub-second finality. SHA256 commit-reveal for provably fair outcomes. All 13 European roulette bet types (Straight 35:1 to Even/Odd 1:1) with correct payouts. Saturating arithmetic prevents overflow exploits.',

    role: 'Solo Builder',
    techStack: ['Rust', 'Linera SDK', 'Vue 3', 'Vite', 'Tailwind CSS', 'Docker', 'WASM'],
    year: '2026',
    category: 'Gaming / Casino',

    githubUrl: 'https://github.com/hemjay07/micro-roulette',

    heroImage: '/projects/microroulette/desktop-hero.png',
    thumbnail: '/projects/microroulette/desktop-hero.png',
    screenshots: [
      '/projects/microroulette/desktop-hero.png',
      '/projects/microroulette/desktop-game.png',
    ],
    mobileScreenshots: [
      '/projects/microroulette/mobile-hero.png',
      '/projects/microroulette/mobile-game.png',
    ],

    achievements: [
      '7,316 lines of code across Rust and Vue.js',
      'Built for Linera Hackathon',
      'All 13 European roulette bet types',
      'Deployed on Linera Conway Testnet',
    ],

    features: [
      {
        title: 'Provably Fair System',
        description: 'SHA256 commit-reveal—server seed + client seed + nonce hashed for verifiable results.',
      },
      {
        title: 'Sub-Second Settlement',
        description: 'Linera microchain enables near-instant bets and payouts. No waiting for confirmations.',
      },
      {
        title: 'Complete Bet Coverage',
        description: 'All 13 European roulette bets: Straight, Split, Street, Corner, Six Line, Red/Black, Odd/Even, Dozens, Columns.',
      },
    ],

    technicalHighlights: [
      'Saturating arithmetic prevents overflow exploits',
      'Atomic transactions—all payouts succeed or none',
      'Multi-layer bet validation with geometric rules',
    ],
  },

  // 4. PrivKit
  {
    id: 'privkit',
    title: 'PrivKit',
    tagline: 'Zero to private in one command',
    description: 'CLI scaffolding tool for Solana privacy development. Think create-react-app, but for blockchain privacy—scaffolds production-ready projects with Privacy Cash, Light Protocol, or Arcium SDKs.',

    color: '#0a1f1c',
    accent: '#14b8a6', // Teal - privacy + Solana vibes
    caseBg: '#ecfdf5',

    buildTime: '5 days',

    heading: 'The create-react-app for Solana Privacy Development',
    summary: 'PrivKit is a CLI that scaffolds complete Solana privacy applications in seconds. 644 lines of TypeScript CLI code, 3,026 lines of web app, 21 React components, and 4 privacy SDK templates (84 template files). Run npx create-solana-privacy-app, choose your privacy SDK, and get a fully configured project with Helius RPC, wallet adapter, and dark theme.',
    challenge: 'Solana privacy development is fragmented. Three major SDKs exist (Privacy Cash, Light Protocol, Arcium) but each has different setup requirements, Node versions, RPC configurations, and testing patterns. Developers spend hours reading docs before writing a single line of privacy code. No unified scaffolding tool exists.',
    solution: 'Built a CLI that abstracts all complexity. Interactive prompts guide template selection, inject Helius API keys via Handlebars templating, auto-detect package managers, and generate production-ready projects. Four templates cover every use case: privacy-cash (private transfers), light-protocol (5000x cheaper compressed tokens), arcium (MPC computation), and full-stack (all three combined).',

    role: 'Solo Builder',
    techStack: ['TypeScript', 'Node.js', 'Commander.js', 'Inquirer.js', 'Handlebars', 'Chalk', 'Ora', 'Zod', 'Next.js 14', 'Tailwind CSS', 'Solana', 'Helius', 'Vitest'],
    year: '2026',
    category: 'Developer Tools / Privacy',

    liveUrl: 'https://privkit.vercel.app',
    githubUrl: 'https://github.com/hemjay07/PrivKit',

    heroImage: '/projects/privkit/hero.png',
    thumbnail: '/projects/privkit/hero.png',
    screenshots: [
      '/projects/privkit/hero.png',
      '/projects/privkit/terminal.png',
      '/projects/privkit/structure.png',
    ],
    mobileScreenshots: [
      '/projects/privkit/mobile-hero.png',
      '/projects/privkit/mobile-terminal.png',
      '/projects/privkit/mobile-structure.png',
    ],

    achievements: [
      '115 source files across CLI and web app',
      '3,670 lines of TypeScript/TSX code',
      '4 privacy SDK templates (84 template files)',
      'Published on npm as create-solana-privacy-app',
    ],

    features: [
      {
        title: 'One-Command Scaffolding',
        description: 'npx create-solana-privacy-app creates a complete project. Interactive prompts for project name, template, package manager, and masked API key input. Non-interactive mode with -y flag for CI/CD.',
      },
      {
        title: '4 Privacy Templates',
        description: 'Privacy Cash (ZK private transfers), Light Protocol (5000x cheaper via compression), Arcium (MPC computation), and Full-Stack (unified API comparing all SDKs).',
      },
      {
        title: 'Helius Integration',
        description: 'Pre-configured Helius RPC for optimal Solana performance. API keys injected via Handlebars templating during scaffolding.',
      },
    ],

    technicalHighlights: [
      'Commander.js CLI with @inquirer/prompts for interactive setup',
      'Handlebars templating processes 84 template files per scaffold',
      'Auto-detection of npm/yarn/pnpm with appropriate lockfile generation',
      'ASCII banner with Chalk styling and Ora spinners for polished UX',
    ],

    keyInsight: 'Privacy development should start with code, not configuration. PrivKit reduces Solana privacy setup from hours to seconds.',

    packages: ['create-solana-privacy-app'],
  },

  // 5. PayShield
  {
    id: 'payshield',
    title: 'PayShield',
    tagline: 'Private payroll for Web3',
    description: 'Confidential payroll on Solana with dual-layer privacy—ShadowPay pool deposits and Bulletproofs zero-knowledge withdrawals. 6,679 lines of TypeScript.',

    color: '#0a1628',
    accent: '#22d3ee',
    caseBg: '#ecfeff',

    buildTime: '2 weeks',

    heading: 'Pay Your Team Without Revealing Who Earns What',
    summary: 'PayShield is a confidential payroll application for Solana. Employers fund private payroll batches using ShadowPay\'s zero-knowledge proof technology, ensuring contributor salaries remain hidden on-chain. 6,679 lines of TypeScript, 20 React components, 7 API endpoints, and real ShadowPay SDK integration.',
    challenge: 'On-chain payroll exposes every employee\'s salary on public blockchains. Competitors can poach talent by seeing compensation. Hackers target wallets with known large balances. DAOs and Web3 companies need the same payroll privacy that traditional companies take for granted.',
    solution: 'Built dual-layer privacy architecture: employer deposits enter ShadowPay privacy pools (ElGamal encryption, mixing with other deposits), recipients claim with 2-step authorize→settle flow using Bulletproofs ZK proofs that hide exact amounts. Claim codes use confusion-resistant alphabet (no 0/O/I/1/l) for error-free transcription.',

    role: 'Solo Builder',
    techStack: ['Next.js 14', 'TypeScript', 'React', 'Tailwind CSS', 'shadcn/ui', 'Solana Web3.js', 'ShadowPay SDK', 'Vercel KV', 'Papa Parse'],
    year: '2026',
    category: 'Privacy / Payments',

    liveUrl: 'https://payshield-one.vercel.app',
    githubUrl: 'https://github.com/hemjay07/payshield',

    heroImage: '/projects/payshield/hero.png',
    thumbnail: '/projects/payshield/hero.png',
    screenshots: [
      '/projects/payshield/hero.png',
      '/projects/payshield/claim.png',
    ],

    achievements: [
      '6,679 lines of TypeScript across 44 files',
      'Targeting $30,000 in hackathon bounties',
      '20 React components, 7 API endpoints',
    ],

    features: [
      {
        title: 'Privacy Pool Deposits',
        description: 'Employer deposits enter ShadowPay shared pool with ElGamal encryption. Multiple employers\' deposits mix together, breaking the link between depositor and funds.',
      },
      {
        title: 'ZK Withdrawals',
        description: '2-step authorize→settle with Bulletproofs hides exact amounts. On-chain observers see a withdrawal happened but not how much.',
      },
      {
        title: 'Claim Code System',
        description: 'Codes use confusion-resistant alphabet (ABCDEFGHJKLMNPQRSTUVWXYZ23456789). Lamport-precise distribution handles cryptocurrency splits with zero loss.',
      },
    ],

    technicalHighlights: [
      'Dual-layer privacy: ElGamal pool mixing (deposits) + Bulletproofs (withdrawals)',
      '2-step ZK withdrawal: authorize → settle with zero-knowledge proof',
      'Lamport-precise distributeEvenly() handles remainders without precision loss',
      'Demo mode attempts real ShadowPay API, logs response, then falls back gracefully',
    ],

    keyInsight: 'Salary transparency is a feature for job seekers, not employers. PayShield gives DAOs the payroll privacy that traditional companies take for granted.',
  },

  // 6. VeilPass
  {
    id: 'veilpass',
    title: 'VeilPass',
    tagline: 'Privacy that passes compliance',
    description: 'Prove KYC, AML, and accredited investor status without revealing personal data—AES-256-GCM encryption and cryptographic commitment schemes for RWA tokenization.',

    color: '#1f1f2e',
    accent: '#8b5cf6',
    caseBg: '#f5f3ff',

    buildTime: '48 hours',

    heading: 'Privacy-Preserving Compliance for Real World Assets',
    summary: 'VeilPass enables users to prove compliance (KYC verified, AML passed, accredited investor) without exposing personal information. 5,370 lines of TypeScript, 30 React components, AES-256-GCM encryption with IV/AuthTag verification, and SHA-256 commitment schemes for zero-knowledge compliance proofs.',
    challenge: 'Tokenizing real-world assets requires compliance verification, but traditional KYC exposes sensitive personal data on public blockchains. Users face a choice: privacy or compliance. RWA platforms can\'t scale without solving this.',
    solution: 'Implemented cryptographic commitments using AES-256-GCM authenticated encryption. Attestations prove compliance claims without revealing underlying data. Selective disclosure with time-limited links (1-30 day TTL) and access count limits (1-100). Two-phase verification prevents race conditions.',

    role: 'Solo Builder',
    techStack: ['Next.js 14', 'TypeScript', 'React', 'Tailwind CSS', 'Solana Web3.js', 'Vercel KV', 'Zod', 'Radix UI'],
    year: '2026',
    category: 'Privacy / Compliance',

    liveUrl: 'https://veilpass-app.vercel.app',

    heroImage: '/projects/veilpass/hero.png',
    thumbnail: '/projects/veilpass/hero.png',
    screenshots: [
      '/projects/veilpass/hero.png',
      '/projects/veilpass/dashboard.png',
    ],
    mobileScreenshots: [
      '/projects/veilpass/mobile-hero.png',
      '/projects/veilpass/mobile-dashboard.png',
    ],

    achievements: [
      '5,370 lines of TypeScript across 54 files',
      '30 React components, 4 API endpoints',
      'Zero on-chain contracts (off-chain attestations)',
    ],

    features: [
      {
        title: 'AES-256-GCM Encryption',
        description: 'Authenticated encryption with proper IV and AuthTag handling. Personal data encrypted client-side before any server interaction.',
      },
      {
        title: 'Selective Disclosure',
        description: 'Choose exactly which compliance claims to share. Time-limited links (1-30 days), access count limits (1-100), automatic expiration.',
      },
      {
        title: 'Zero-Knowledge Proofs',
        description: 'SHA-256 commitment scheme (holder + claimsHash + salt) proves compliance without revealing underlying personal data.',
      },
    ],

    technicalHighlights: [
      'AES-256-GCM with randomBytes(16) IV and getAuthTag() verification',
      'SHA-256 commitment: hash(holder + claimsHash + salt) for ZK proofs',
      'Two-phase verification: pre-check before incrementing access counter',
      'CSS-only confetti animation respecting prefers-reduced-motion',
    ],

    keyInsight: 'Compliance doesn\'t require surveillance. VeilPass proves you passed the test without showing your answers.',
  },

  // 7. X402Arcade
  {
    id: 'x402arcade',
    title: 'X402Arcade',
    tagline: 'Pay-per-play arcade with gasless USDC',
    description: 'Retro arcade with 5 games, HTTP 402 payment protocol, and EIP-3009 gasless USDC transfers. 257K lines of TypeScript across a pnpm monorepo.',

    color: '#1a1a2e',
    accent: '#00d4ff', // Cyan - arcade logo color
    caseBg: '#eff6ff',

    desktopOnly: true, // No mobile version - arcade games require keyboard

    buildTime: '86 hours',

    heading: 'Gasless Arcade Gaming with HTTP 402 Payments',
    summary: 'X402Arcade is a retro arcade platform with 5 classic games (Snake, Tetris, Pong, Breakout, Space Invaders) powered by the x402 protocol. 257,000 lines of TypeScript, 695 files, 110 React components, custom game engine with AABB collision detection. Pay with EIP-3009 gasless USDC signatures—no gas fees, instant play.',
    challenge: 'Web3 gaming suffers from gas fee friction. Every game session requires wallet approval, gas estimation, and transaction confirmation. Microtransactions for arcade plays become impractical when gas exceeds the play cost.',
    solution: 'Built on x402 protocol: HTTP 402 Payment Required responses trigger EIP-3009 TransferWithAuthorization signatures. Gasless USDC transfers with typed data signing. Custom Express middleware handles payment flow. 70% of payments fund daily/weekly prize pool jackpots.',

    role: 'Solo Builder',
    techStack: ['React', 'TypeScript', 'Vite', 'Phaser 3', 'Three.js', 'Express', 'wagmi', 'viem', 'Zustand', 'Redis', 'SQLite', 'Cronos'],
    year: '2026',
    category: 'Gaming / Payments',

    liveUrl: 'https://x402arcade.vercel.app',
    githubUrl: 'https://github.com/Ayobalen/x402Arcade',

    heroImage: '/projects/x402arcade/hero.png',
    thumbnail: '/projects/x402arcade/hero.png',
    screenshots: [
      '/projects/x402arcade/hero.png',
      '/projects/x402arcade/games.png',
      '/projects/x402arcade/gameplay.png',
    ],
    // No mobileScreenshots - desktop only project

    achievements: [
      '257,000 lines of TypeScript across 695 files',
      '110 React components, 39 custom hooks',
      '5 arcade games with custom collision engine',
      'Built for Cronos x402 Hackathon',
    ],

    features: [
      {
        title: 'x402 Payment Protocol',
        description: 'HTTP 402 Payment Required flow with Express middleware. EIP-3009 TransferWithAuthorization for gasless USDC—sign once, play instantly.',
      },
      {
        title: 'Custom Game Engine',
        description: 'AABB collision detection with Minimum Translation Vector (MTV) calculations. Separating axis theorem implementation. 60 FPS canvas rendering.',
      },
      {
        title: 'Prize Pool System',
        description: '70% of payments fund daily/weekly jackpots. Per-game leaderboards with on-chain payouts to top players.',
      },
    ],

    technicalHighlights: [
      'EIP-712 typed data signing prevents signature reuse across chains',
      'Exponential backoff with jitter (±10%) prevents thundering herd',
      'Auto-quality detection adjusts rendering based on device capabilities',
      '35+ accessibility hooks with ARIA live regions and keyboard navigation',
    ],

    keyInsight: 'Gas fees killed microtransactions. x402 brings them back—HTTP-native payments with gasless signatures.',
  },

  // ==================== ARCHIVED PROJECTS ====================

  // Archived 1. Terracred (formerly MantleCred)
  {
    id: 'terracred',
    title: 'TerraCred',
    tagline: 'Borrow against tokenized real estate',
    description: 'DeFi lending platform on Mantle Network—tokenize property into RWA tokens and borrow mNGN stablecoin without selling your assets.',

    color: '#1a1a1a',
    accent: '#ef4444',
    caseBg: '#fef2f2',

    archived: true,

    buildTime: '3 weeks',

    heading: 'Unlock Liquidity From Real Estate Without Selling',
    summary: 'TerraCred bridges traditional real estate with DeFi on Mantle Network. Property owners tokenize real estate into fungible RWA tokens, deposit as collateral, and borrow mNGN stablecoin (pegged to Nigerian Naira). Automated liquidation at 120% health factor maintains platform solvency.',
    challenge: 'Real estate owners in emerging markets (specifically Nigeria) are asset-rich but cash-poor. Traditional banks require months for property loans. Selling means losing the asset. There\'s no way to access liquidity from property quickly.',
    solution: 'Built a lending protocol where property becomes liquid collateral. Submit property for KYC verification, receive RWA tokens representing ownership, deposit tokens to borrow up to 66.67% LTV in mNGN. Oracle service updates prices every 60 minutes. Automated liquidation service monitors health factors.',

    role: 'Lead Engineer',
    techStack: ['Solidity', 'Foundry', 'Next.js', 'Express', 'SQLite', 'wagmi', 'Mantle'],
    year: '2025',
    category: 'DeFi / RWA',

    githubUrl: 'https://github.com/hemjay07/MantleCred',

    heroImage: '/projects/terracred/hero.png',
    thumbnail: '/projects/terracred/hero.png',
    screenshots: [
      '/projects/terracred/hero.png',
      '/projects/terracred/screen-1.png',
      '/projects/terracred/screen-2.png',
    ],

    achievements: [
      'Built for Mantle Global Hackathon 2025',
      '69/71 features validated (97.2% completion)',
      'Full smart contract suite deployed on Mantle Sepolia',
    ],

    features: [
      {
        title: 'Property Tokenization',
        description: 'Submit property details (address, valuation, documents) for KYC verification. Approved properties mint fungible RWA tokens representing fractional ownership.',
      },
      {
        title: 'Collateralized Lending',
        description: 'Deposit RWA tokens, borrow up to 66.67% LTV in mNGN stablecoin. 10% annual interest rate, 12-month loan terms. Repay anytime to withdraw collateral.',
      },
      {
        title: 'Automated Oracle',
        description: 'Price oracle service updates property valuations every 60 minutes. Staleness protection prevents stale price exploitation.',
      },
      {
        title: 'Liquidation Engine',
        description: 'Automated service monitors health factors. Positions below 120% trigger liquidation. Maintains platform solvency without manual intervention.',
      },
    ],

    technicalHighlights: [
      'Four core contracts: LendingPool.sol, PriceOracle.sol, mNGN.sol (stablecoin), RWAToken.sol (property tokens)',
      'Express backend with ethers.js for oracle updates and liquidation monitoring',
      'RainbowKit integration with automatic Mantle network switching',
      'Estimated mainnet deployment cost: ~0.05 MNT for entire contract suite',
    ],

    keyInsight: 'In emerging markets, property is the primary store of wealth. TerraCred turns illiquid real estate into DeFi-native collateral.',
  },

  // Archived 2. Foresight
  {
    id: 'foresight',
    title: 'Foresight',
    tagline: 'Fantasy league for Crypto Twitter',
    description: 'Draft teams of CT influencers, compete in daily prediction contests, and earn ETH rewards based on real-time Twitter engagement.',

    color: '#0f2830',
    accent: '#34d399',
    caseBg: '#ecfdf5',

    archived: true,

    buildTime: '1 week',

    heading: 'Fantasy Sports Meets Crypto Twitter Culture',
    summary: 'Foresight is a Web3 fantasy platform where you draft teams of CT influencers ranked by tier (S/A/B/C), compete in daily prediction gauntlets, and battle in 1v1 arena duels. Real-time scoring based on actual Twitter engagement metrics. 67 tracked influencers including Vitalik, Michael Saylor, and PlanB.',
    challenge: 'Crypto enthusiasts want to monetize their market knowledge but have no skill-based outlet. Traditional fantasy sports ignore crypto culture. Trading signals are unverifiable, and social engagement is disconnected from financial outcomes.',
    solution: 'Created a fantasy league native to CT culture. Draft 5 influencers per team, score based on real Twitter API metrics (follower growth, engagement velocity, meme virality). Daily Gauntlet tournaments with 0.05 ETH entry and zero-sum prize distribution. Farcaster Mini App integration for viral distribution.',

    role: 'Lead Engineer',
    techStack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Solidity', 'Foundry', 'Base', 'Farcaster'],
    year: '2025',
    category: 'Gaming / Social',

    liveUrl: 'https://foresight.game',
    githubUrl: 'https://github.com/Yonkoo11/foresight',

    heroImage: '/projects/foresight/desktop-hero.png',
    thumbnail: '/projects/foresight/desktop-hero.png',
    screenshots: [
      '/projects/foresight/desktop-hero.png',
      '/projects/foresight/desktop-league.png',
      '/projects/foresight/desktop-intel.png',
    ],
    mobileScreenshots: [
      '/projects/foresight/mobile-home.png',
      '/projects/foresight/mobile-team.png',
    ],

    achievements: [
      '67 CT influencers tracked with real-time metrics',
      '6 smart contracts deployed on Base',
      'Farcaster Mini App SDK integration complete',
    ],

    features: [
      {
        title: 'CT Draft Mode',
        description: 'Draft 5 influencers per team from tiered roster. Daily scoring based on Twitter engagement velocity. Influencer base prices from 5-30 points based on tier.',
      },
      {
        title: 'Daily Gauntlet',
        description: '0.05 ETH entry, 5 predictions per day. Zero-sum prize pool: 5/5 correct gets 50%, 4/5 gets 35%, 3/5 gets 15%. Oracle-based automatic settlement.',
      },
      {
        title: 'Arena 1v1 Duels',
        description: 'Head-to-head prediction betting with custom stakes. Create or accept challenges, real-time tracking, instant ETH settlement on resolution.',
      },
      {
        title: 'Foresight Score System',
        description: 'Reputation tiers from Bronze (1.0x) to Diamond (1.2x multiplier). Early adopter bonuses: first 1,000 users get 1.5x for 90 days.',
      },
    ],

    technicalHighlights: [
      'Twitter API integration with batch optimization—100 users per API call, staying within free tier limits',
      'WebSocket-based real-time leaderboard updates with automated cron jobs (metrics every 15 min, scoring daily at 00:00 UTC)',
      'Anti-exploit framework: 7-day ETH vesting, daily withdrawal limits, account age requirements, IP hashing for Sybil resistance',
      'Hybrid dual-token economics (ETH rewards + reputation points) with sustainable 10 ETH/month budget cap',
    ],

    keyInsight: 'Fantasy sports proved people will pay to compete on knowledge. Foresight brings that to the one topic crypto natives care about most: Crypto Twitter itself.',
  },

  // Archived 3. IdealMe
  {
    id: 'idealme',
    title: 'IdealMe',
    tagline: 'Hackathon command center + second brain',
    description: 'Desktop app combining a hackathon opportunity pipeline with an infinite canvas for capturing research, ideas, and inspiration.',

    color: '#3d2314',
    accent: '#fb923c',
    caseBg: '#fff7ed',

    archived: true,

    buildTime: '3 weeks',

    heading: 'The Operating System for Hackathon Grinders',
    summary: 'IdealMe solves two problems for prolific builders: tracking hackathon opportunities through a 5-stage Kanban pipeline (Discovered → Researching → Building → Submitted → Results), and capturing scattered ideas in an infinite canvas "second brain" with node connections, collections, and full-text search.',
    challenge: 'Building 5+ projects per month for Web3 hackathons means constantly juggling deadlines, researching new opportunities, and losing track of ideas scattered across bookmarks, notes, and screenshots. No tool combines opportunity management with knowledge capture.',
    solution: 'Built a desktop app with Electron that combines a Kanban board for hackathon tracking (log opportunities in <10 seconds, deadline urgency coloring, daily notifications) with a tldraw-powered infinite canvas for visual knowledge management. All data stored locally in SQLite for privacy and speed.',

    role: 'Solo Builder',
    techStack: ['Electron', 'React', 'TypeScript', 'SQLite', 'tldraw', 'Zustand', 'Tailwind'],
    year: '2026',
    category: 'Productivity / Desktop',

    githubUrl: 'https://github.com/hemjay07/Ideal-me',

    heroImage: '/projects/idealme/hero.png',
    thumbnail: '/projects/idealme/hero.png',
    screenshots: [
      '/projects/idealme/hero.png',
    ],

    achievements: [
      '32+ features implemented across 2 major modules',
      'Smooth performance at 500+ canvas nodes',
      'Daily notification system for deadline tracking',
    ],

    features: [
      {
        title: 'Hackathon Pipeline',
        description: '5-column Kanban board with drag-and-drop. Quick-add modal (Cmd+N) for logging opportunities in under 10 seconds. Deadline urgency coloring (red <7 days, orange <14 days).',
      },
      {
        title: 'Second Brain Canvas',
        description: 'tldraw-powered infinite canvas with 4 node types (Note, Image, Link, Article). Smart bezier curve connections, collections system, tags with multi-tag filtering.',
      },
      {
        title: 'Daily Notifications',
        description: 'Desktop notification at configured time (default 7:30 PM) reminding you to hunt hackathons. Click notification to open app directly.',
      },
      {
        title: 'Local-First Architecture',
        description: 'All data in SQLite on your device. No cloud dependency, instant performance, complete privacy. R-tree spatial index for viewport culling at 1000+ nodes.',
      },
    ],

    technicalHighlights: [
      'Electron IPC with context isolation and whitelist-based channel exposure for security',
      'R-tree virtual table in SQLite for O(1) viewport queries—canvas stays smooth at 1000+ nodes',
      'Hybrid canvas rendering: Canvas 2D for grid/connections, DOM overlay for node content and text editing',
      'Command-based undo/redo system with SQLite persistence (not memory-based), max 100 history entries',
    ],

    keyInsight: 'The best ideas come at 2am. IdealMe is the command center for builders who never stop—capture everything, miss nothing, win more hackathons.',
  },

  // Archived 4. SpeedBet Arena
  {
    id: 'speedbet-arena',
    title: 'SpeedBet Arena',
    tagline: '1v1 crypto price prediction battles',
    description: '1v1 crypto price prediction battles where players bet on BTC/ETH movements and winner takes all—built on Linera microchains.',

    color: '#1a1a1a',
    accent: '#10b981', // Emerald
    caseBg: '#ecfdf5',

    archived: true,

    buildTime: '2 weeks',

    heading: 'Head-to-Head Crypto Price Prediction on Microchains',
    summary: 'SpeedBet Arena is a 1v1 betting platform where players wager on BTC/ETH price movements. Built on Linera microchains with Rust/WASM smart contracts, featuring on-chain matchmaking, escrow system, and cross-chain messaging. Vue 3 frontend with real-time Chart.js price visualization.',
    challenge: 'Traditional prediction markets are slow and impersonal. Players want fast, competitive, head-to-head action—not anonymous pool betting with delayed resolution.',
    solution: 'Built a 1v1 arena on Linera microchains. Sub-second finality enables real-time matches. On-chain escrow holds stakes, winner takes all. Linera Views (MapView, QueueView, RegisterView) provide persistent state across matches.',

    role: 'Solo Builder',
    techStack: ['Vue 3', 'Vite', 'Chart.js', 'Rust', 'WASM', 'Linera SDK', 'Linera Views'],
    year: '2026',
    category: 'Gaming / Betting',

    liveUrl: 'https://speedbet-arena.vercel.app',
    githubUrl: 'https://github.com/Ayobalen/speedbet-arena',

    heroImage: '/projects/speedbet-arena/hero.png',
    thumbnail: '/projects/speedbet-arena/hero.png',
    screenshots: ['/projects/speedbet-arena/hero.png'],

    achievements: [
      'Built for Linera Hackathon 2026',
      '995/995 features complete (100% coverage)',
      'Full on-chain matchmaking and escrow',
      'Deployed on Linera Conway Testnet',
    ],

    features: [
      {
        title: '1v1 Matchmaking',
        description: 'Create or join matches with custom stakes. On-chain matchmaking pairs players instantly. No waiting for pool fills.',
      },
      {
        title: 'On-Chain Escrow',
        description: 'Stakes locked in smart contract escrow. Winner takes all automatically on resolution. No trust required.',
      },
      {
        title: 'Real-Time Price Charts',
        description: 'Chart.js visualization of BTC/ETH price movements. Watch your prediction play out in real-time.',
      },
    ],

    technicalHighlights: [
      'Linera Views for persistent state: MapView (matches), QueueView (matchmaking), RegisterView (balances)',
      'Cross-chain messaging for multi-application communication',
      'Rust/WASM contracts with linera-sdk 0.15.8',
    ],

    keyInsight: 'Prediction markets don\'t need to be slow. Linera microchains enable the speed competitive players demand.',
  },

  // Archived 5. SignalHive
  {
    id: 'signalhive',
    title: 'SignalHive',
    tagline: 'Transparent on-chain strategy marketplace',
    description: 'Watch trading strategies execute in real-time, view live performance metrics, and copy-trade winning strategies—all verifiable on Somnia blockchain.',

    color: '#1a1a2e',
    accent: '#f472b6',
    caseBg: '#fdf2f8',

    archived: true,

    buildTime: '11 days',

    heading: 'The First Truly Transparent Trading Strategy Marketplace',
    summary: 'SignalHive streams live trading strategies executing on Somnia blockchain. Real-time performance metrics (PnL, Sharpe ratio, win rate, drawdown) update instantly via Somnia Data Streams. Every trade is on-chain and verifiable—no black boxes, no fake track records.',
    challenge: 'Trading signals are black boxes. Sellers claim 90% win rates with no verification. Buyers lose money following unproven strategies. The entire signal selling industry is built on trust that doesn\'t exist.',
    solution: 'Built a marketplace where every trade is on-chain. Enriched queries fetch balance + positions on trade events. Multi-stream subscriptions update trades, metrics, and leaderboard simultaneously. Real-time Sharpe ratio, drawdown, and PnL calculations on every trade.',

    role: 'Solo Builder',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Solidity', 'Foundry', 'Somnia Data Streams', 'wagmi', 'viem', 'Zustand'],
    year: '2025',
    category: 'DeFi / Trading',

    liveUrl: 'https://signalhivee.vercel.app',
    githubUrl: 'https://github.com/hemjay07/signalhive',

    heroImage: '/projects/signalhive/hero.png',
    thumbnail: '/projects/signalhive/hero.png',
    screenshots: [
      '/projects/signalhive/hero.png',
    ],

    achievements: [
      'Built for Somnia Data Streams Hackathon',
      '5 smart contracts deployed on Somnia Testnet',
      'Advanced SDS enriched queries demonstrated',
    ],

    features: [
      {
        title: 'Real-Time Trade Streaming',
        description: 'Watch every strategy trade as it happens. Somnia Data Streams push updates instantly—no polling, no delays. See entries, exits, and position changes live.',
      },
      {
        title: 'Live Performance Metrics',
        description: 'PnL, Sharpe ratio, win rate, and maximum drawdown update with every trade. Complex calculations happen in real-time, not end-of-day.',
      },
      {
        title: 'Strategy Smart Contracts',
        description: 'Three demo strategies deployed: MomentumStrategy (buys 2%+ moves), MeanReversionStrategy (buys dips), GridStrategy (profits from ranging markets).',
      },
      {
        title: 'Copy Trading Subscription',
        description: 'Subscribe to strategies and mirror their trades automatically. All subscriptions recorded on StrategyRegistry contract.',
      },
    ],

    technicalHighlights: [
      'Somnia Data Streams enriched queries fetch balance + positions during trade events in single subscription',
      'Multi-stream subscriptions: trades + metrics + leaderboard all updating simultaneously',
      'Real-time Sharpe ratio calculation on every trade—not batch computed',
      'Graceful fallback to demo mode when SDS unavailable, ensuring reliable hackathon demos',
    ],

    keyInsight: 'Trading signals are only as good as their verification. SignalHive makes every trade on-chain—if you can\'t verify it, don\'t trade it.',
  },

  // Archived 6. BountyNet
  {
    id: 'bountynet',
    title: 'BountyNet',
    tagline: 'AI agents race for bounties',
    description: 'Competitive AI agent marketplace where GPT-4 and Claude race to answer questions for USDC micropayment rewards on Cronos.',

    color: '#1f1a2e',
    accent: '#a855f7', // Purple
    caseBg: '#faf5ff',

    archived: true,

    buildTime: '1 week',

    heading: 'AI Agents Race for Bounties',
    summary: 'BountyNet is a competitive AI agent marketplace. Post a task with a USDC bounty, and 3 specialized AI agents (GPT-4 and Claude) race in parallel to answer. Watch live "thinking" streams as agents compete. Winner gets instant USDC payout via gasless EIP-3009 transfers on Cronos.',
    challenge: 'AI services charge flat fees regardless of quality. Users pay whether the answer is good or bad. No competition means no incentive for speed or accuracy.',
    solution: 'Built a real-time racing system where multiple AI agents compete in parallel. Socket.IO streams live thinking progress. Winner determined by first correct answer. x402 micropayments enable instant, gasless USDC payouts to winning agents.',

    role: 'Solo Builder',
    techStack: ['React', 'TypeScript', 'Vite', 'Express', 'Socket.IO', 'SQLite', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Cronos', 'x402', 'OpenAI', 'Claude'],
    year: '2026',
    category: 'AI / Payments',

    heroImage: '/projects/bountynet/hero.png',
    thumbnail: '/projects/bountynet/hero.png',
    screenshots: ['/projects/bountynet/hero.png'],

    achievements: [
      'Built for Cronos x402 Hackathon',
      '3 AI agents racing in parallel',
      'Real-time thinking streams via Socket.IO',
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

// Featured projects (shown in main 3D gallery)
export const featuredProjects = projects.filter(p => !p.archived);

// Featured projects for mobile (excludes desktopOnly projects)
export const mobileFeaturedProjects = projects.filter(p => !p.archived && !p.desktopOnly);

// Archived projects (shown in archive section)
export const archivedProjects = projects.filter(p => p.archived);

export const getNextProject = (currentId: string): Project => {
  const featured = featuredProjects;
  const currentIndex = featured.findIndex(p => p.id === currentId);
  const nextIndex = (currentIndex + 1) % featured.length;
  return featured[nextIndex];
};

export const getPrevProject = (currentId: string): Project => {
  const featured = featuredProjects;
  const currentIndex = featured.findIndex(p => p.id === currentId);
  const prevIndex = currentIndex === 0 ? featured.length - 1 : currentIndex - 1;
  return featured[prevIndex];
};
