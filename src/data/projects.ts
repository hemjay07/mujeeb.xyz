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
  docsUrl?: string;

  // Images (using placeholders for now)
  heroImage: string;
  thumbnail: string;
  screenshots: string[];
  demoVideo?: string;

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
    year: '2024',
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
    demoVideo: '/projects/predictkit/demo.mp4',

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
  {
    id: 'truthbounty',
    title: 'TruthBounty',
    tagline: 'Cross-platform reputation for prediction markets',
    description: 'The first protocol that aggregates prediction market performance into a unified, soulbound NFT-based identity with Wilson Score anti-gaming.',

    color: '#2d1f3d',
    accent: '#c084fc',
    caseBg: '#faf5ff',

    buildTime: '3 months',

    heading: 'Turn Prediction Accuracy Into Verifiable On-Chain Reputation',
    summary: 'TruthBounty aggregates trading performance across 6+ prediction market platforms (Polymarket, PancakeSwap, Limitless, Overtime, Azuro, SX Bet) into a unified TruthScore. Traders mint soulbound reputation NFTs that evolve with their performance, enabling copy trading with verified track records instead of Twitter followers.',
    challenge: 'Prediction market traders have no portable way to prove their track record. A winning streak on Polymarket means nothing on PancakeSwap. Every platform is an isolated island—170+ prediction tools exist but no cross-platform reputation infrastructure. No way to distinguish skill from luck.',
    solution: 'Built a Wilson Score-based reputation system that statistically separates skill from luck. 3/3 wins = 43.8% confidence score (not 100%). Soulbound NFTs with on-chain SVG generation create portable identity. Copy trading vault lets followers mirror top traders with customizable allocation and risk limits.',

    role: 'Lead Engineer',
    techStack: ['Solidity', 'Foundry', 'Next.js', 'The Graph', 'wagmi', 'Supabase', 'BNB Chain'],
    year: '2024',
    category: 'DeFi / Reputation',

    liveUrl: 'https://truth-bounty-4r9b.vercel.app',
    githubUrl: 'https://github.com/Leihyn/TruthBounty',

    heroImage: '/images/projects/truthbounty/hero.png',
    thumbnail: '/images/projects/truthbounty/thumb.png',
    screenshots: [
      '/images/projects/truthbounty/screen-1.png',
      '/images/projects/truthbounty/screen-2.png',
    ],

    achievements: [
      'Seedify IMO Accepted ($500K structured funding)',
      '6 prediction platforms integrated',
      '2,792 lines of battle-tested smart contracts',
    ],

    features: [
      {
        title: 'Wilson Score Algorithm',
        description: 'Statistical confidence intervals that account for sample size. Minimum 10 bets to rank, full score requires 50+ bets. New accounts capped at 50% for 14 days to prevent gaming.',
      },
      {
        title: 'Soulbound Reputation NFTs',
        description: 'Non-transferable ERC-721 tokens with dynamic on-chain SVG metadata. Visual tiers (Bronze → Diamond) that evolve with performance. Your reputation lives on-chain.',
      },
      {
        title: 'Copy Trading Vault',
        description: 'Follow top traders with one click. Customizable allocation percentages and max bet caps. Simulation mode to test strategies before committing capital.',
      },
      {
        title: 'Multi-Platform Aggregation',
        description: 'Consolidates data from Polymarket, PancakeSwap Prediction, Limitless, Overtime Markets, Azuro, and SX Bet via The Graph subgraphs and direct APIs.',
      },
    ],

    technicalHighlights: [
      'Wilson Score lower bound formula ensures 3/3 wins scores 43.8%, not 100%—statistical rigor over raw percentages',
      'Modular platform adapter architecture allows adding new prediction markets without core contract changes',
      'On-chain SVG generation for NFT metadata—no external dependencies, fully verifiable',
      'Real-time indexer service with 60-minute data refresh cycles across 6 platforms',
    ],

    keyInsight: 'Your winning streak means nothing without proof. Wilson Score separates skill from luck—follow traders with verified 65% win rates, not Twitter followers.',
  },
  {
    id: 'foresight',
    title: 'Foresight',
    tagline: 'Fantasy league for Crypto Twitter',
    description: 'Draft teams of CT influencers, compete in daily prediction contests, and earn ETH rewards based on real-time Twitter engagement.',

    color: '#0f2830',
    accent: '#34d399',
    caseBg: '#ecfdf5',

    buildTime: '3 weeks',

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

    heroImage: '/images/projects/foresight/hero.png',
    thumbnail: '/images/projects/foresight/thumb.png',
    screenshots: [
      '/images/projects/foresight/screen-1.png',
      '/images/projects/foresight/screen-2.png',
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
  {
    id: 'idealme',
    title: 'IdealMe',
    tagline: 'Hackathon command center + second brain',
    description: 'Desktop app combining a hackathon opportunity pipeline with an infinite canvas for capturing research, ideas, and inspiration.',

    color: '#3d2314',
    accent: '#fb923c',
    caseBg: '#fff7ed',

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

    heroImage: '/images/projects/idealme/hero.png',
    thumbnail: '/images/projects/idealme/thumb.png',
    screenshots: [
      '/images/projects/idealme/screen-1.png',
      '/images/projects/idealme/screen-2.png',
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
  {
    id: 'signalhive',
    title: 'SignalHive',
    tagline: 'Transparent on-chain strategy marketplace',
    description: 'Watch trading strategies execute in real-time, view live performance metrics, and copy-trade winning strategies—all verifiable on Somnia blockchain.',

    color: '#1a1a2e',
    accent: '#f472b6',
    caseBg: '#fdf2f8',

    buildTime: '2 weeks',

    heading: 'The First Truly Transparent Trading Strategy Marketplace',
    summary: 'SignalHive streams live trading strategies executing on Somnia blockchain. Real-time performance metrics (PnL, Sharpe ratio, win rate, drawdown) update instantly via Somnia Data Streams. Every trade is on-chain and verifiable—no black boxes, no fake track records.',
    challenge: 'Trading signals are black boxes. Sellers claim 90% win rates with no verification. Buyers lose money following unproven strategies. The entire signal selling industry is built on trust that doesn\'t exist.',
    solution: 'Built a marketplace where every trade is on-chain. Three demo strategies (Momentum, Mean Reversion, Grid) deployed as smart contracts. Real-time WebSocket updates via Somnia Data Streams. Subscribers can verify historical performance before copy-trading.',

    role: 'Solo Builder',
    techStack: ['Next.js', 'TypeScript', 'Solidity', 'Foundry', 'Somnia', 'WebSocket', 'wagmi'],
    year: '2025',
    category: 'DeFi / Trading',

    liveUrl: 'https://signalhive.vercel.app',
    githubUrl: 'https://github.com/hemjay07/signalhive',

    heroImage: '/images/projects/signalhive/hero.png',
    thumbnail: '/images/projects/signalhive/thumb.png',
    screenshots: [
      '/images/projects/signalhive/screen-1.png',
      '/images/projects/signalhive/screen-2.png',
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
  {
    id: 'veilpass',
    title: 'VeilPass',
    tagline: 'Privacy that passes compliance',
    description: 'Prove KYC, AML, and accredited investor status without revealing personal data—cryptographic attestations with selective disclosure for RWA tokenization.',

    color: '#1f1f2e',
    accent: '#8b5cf6',
    caseBg: '#f5f3ff',

    buildTime: '2 weeks',

    heading: 'Privacy-Preserving Compliance for Real World Assets',
    summary: 'VeilPass enables users to prove compliance (KYC verified, AML passed, accredited investor) without exposing personal information. Cryptographic attestations with salt-based hashing, selective disclosure to auditors, and time-limited access links. Built for tokenizing real-world assets on Solana.',
    challenge: 'Tokenizing real-world assets requires compliance verification, but traditional KYC exposes sensitive personal data on public blockchains. Users face a choice: privacy or compliance. RWA platforms can\'t scale without solving this.',
    solution: 'Implemented cryptographic commitments where personal data never leaves the user\'s device. Attestations prove compliance claims without revealing underlying data. Selective disclosure lets users share only specific claims with auditors via time-limited links.',

    role: 'Solo Builder',
    techStack: ['Next.js', 'TypeScript', 'Solana', 'Helius', 'Vercel KV', 'Tailwind'],
    year: '2026',
    category: 'Privacy / Compliance',

    liveUrl: 'https://veilpass.vercel.app',

    heroImage: '/images/projects/veilpass/hero.png',
    thumbnail: '/images/projects/veilpass/thumb.png',
    screenshots: [
      '/images/projects/veilpass/screen-1.png',
      '/images/projects/veilpass/screen-2.png',
    ],

    achievements: [
      'Built for Solana Privacy Hack 2026',
      '130/130 features passing verification',
      'Eligible for $30,500 in bounties',
    ],

    features: [
      {
        title: 'Cryptographic Attestations',
        description: 'Generate compliance attestations with salt-based hashing. Prove claims (KYC_VERIFIED, AML_PASSED, ACCREDITED_INVESTOR) without exposing data.',
      },
      {
        title: 'Selective Disclosure',
        description: 'Choose exactly which compliance claims to share with auditors. Create time-limited links with access count limits. Full control over your data.',
      },
      {
        title: 'Secret File Management',
        description: 'Download attestation secrets for secure local storage. Upload to create disclosures. Your keys, your data, your privacy.',
      },
      {
        title: 'Compliance Claims',
        description: 'Five supported claim types: KYC_VERIFIED, AML_PASSED, ACCREDITED_INVESTOR, JURISDICTION_COMPLIANT, SOURCE_OF_FUNDS_VERIFIED.',
      },
    ],

    technicalHighlights: [
      'Client-side cryptographic commitment generation—personal data never touches servers',
      'Salt-based hashing for claim verification without revealing underlying values',
      'JWT-free signed message authentication using Solana wallet signatures',
      'TTL-based storage expiration with Vercel KV for automatic link invalidation',
    ],

    keyInsight: 'Compliance doesn\'t require surveillance. VeilPass proves you passed the test without showing your answers.',
  },
  {
    id: 'payshield',
    title: 'PayShield',
    tagline: 'Private payroll for Web3',
    description: 'Pay your team without revealing who earns what—dual-layer privacy with ShadowPay pools and Bulletproofs zero-knowledge withdrawals.',

    color: '#0a1628',
    accent: '#22d3ee',
    caseBg: '#ecfeff',

    buildTime: '2 weeks',

    heading: 'Pay Your Team Without Revealing Who Earns What',
    summary: 'PayShield solves on-chain payroll privacy. Employers deposit to a shared privacy pool (breaking deposit links), then distribute claim codes to recipients who withdraw with hidden amounts via Bulletproofs ZK proofs. No on-chain connection between employer and employee salaries.',
    challenge: 'On-chain payroll exposes every employee\'s salary on public blockchains. Competitors can poach talent by seeing compensation. Hackers target wallets with known large balances. DAOs need private payroll.',
    solution: 'Built dual-layer privacy: employer deposits enter ShadowPay privacy pools (mixing with other deposits), recipients claim with Bulletproofs zero-knowledge proofs that hide exact amounts. Claim codes distributed off-chain (email, Slack). 7-day vesting and withdrawal limits prevent exploitation.',

    role: 'Solo Builder',
    techStack: ['Next.js', 'TypeScript', 'Solana', 'ShadowPay', 'Helius', 'Vercel KV', 'Bulletproofs'],
    year: '2026',
    category: 'Privacy / Payments',

    liveUrl: 'https://payshield.vercel.app',

    heroImage: '/images/projects/payshield/hero.png',
    thumbnail: '/images/projects/payshield/thumb.png',
    screenshots: [
      '/images/projects/payshield/screen-1.png',
      '/images/projects/payshield/screen-2.png',
    ],

    achievements: [
      'Built for Solana Privacy Hack 2026',
      '305 verified features across 67 sessions',
      'Eligible for $30,000 in bounties (ShadowPay + Helius + Private Payments)',
    ],

    features: [
      {
        title: 'Privacy Pool Deposits',
        description: 'Employer deposits enter ShadowPay shared pool. Multiple employers\' deposits mix together, breaking the link between depositor and funds.',
      },
      {
        title: 'Bulletproofs Withdrawals',
        description: 'Recipients claim payments with zero-knowledge proofs that hide exact amounts. On-chain observers see a withdrawal happened but not how much.',
      },
      {
        title: 'Claim Code Distribution',
        description: 'Generate unique codes (PAYSHIELD-XXXX-XXXX format) for each recipient. Distribute via email, Slack, Signal—off-chain delivery, on-chain privacy.',
      },
      {
        title: 'Enterprise Features',
        description: 'CSV import for bulk recipients, split equally function, batch templates, search and sort, copy all codes with one click.',
      },
    ],

    technicalHighlights: [
      'Dual-layer privacy architecture: pool mixing (deposits) + Bulletproofs (withdrawals)',
      'Real ShadowPay SDK integration with actual API endpoints—not simulation',
      'Demo mode with transparent API call logging for hackathon judging',
      'Gasless withdrawals via Radr Labs relayer infrastructure',
    ],

    keyInsight: 'Salary transparency is a feature for job seekers, not employers. PayShield gives DAOs the payroll privacy that traditional companies take for granted.',
  },
  {
    id: 'mantlecred',
    title: 'MantleCred',
    tagline: 'Borrow against tokenized real estate',
    description: 'DeFi lending platform on Mantle Network—tokenize property into RWA tokens and borrow mNGN stablecoin without selling your assets.',

    color: '#1a1a1a',
    accent: '#ef4444',
    caseBg: '#fef2f2',

    buildTime: '3 weeks',

    heading: 'Unlock Liquidity From Real Estate Without Selling',
    summary: 'MantleCred bridges traditional real estate with DeFi on Mantle Network. Property owners tokenize real estate into fungible RWA tokens, deposit as collateral, and borrow mNGN stablecoin (pegged to Nigerian Naira). Automated liquidation at 120% health factor maintains platform solvency.',
    challenge: 'Real estate owners in emerging markets (specifically Nigeria) are asset-rich but cash-poor. Traditional banks require months for property loans. Selling means losing the asset. There\'s no way to access liquidity from property quickly.',
    solution: 'Built a lending protocol where property becomes liquid collateral. Submit property for KYC verification, receive RWA tokens representing ownership, deposit tokens to borrow up to 66.67% LTV in mNGN. Oracle service updates prices every 60 minutes. Automated liquidation service monitors health factors.',

    role: 'Lead Engineer',
    techStack: ['Solidity', 'Foundry', 'Next.js', 'Express', 'SQLite', 'wagmi', 'Mantle'],
    year: '2025',
    category: 'DeFi / RWA',

    githubUrl: 'https://github.com/hemjay07/MantleCred',

    heroImage: '/images/projects/mantlecred/hero.png',
    thumbnail: '/images/projects/mantlecred/thumb.png',
    screenshots: [
      '/images/projects/mantlecred/screen-1.png',
      '/images/projects/mantlecred/screen-2.png',
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

    keyInsight: 'In emerging markets, property is the primary store of wealth. MantleCred turns illiquid real estate into DeFi-native collateral.',
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
