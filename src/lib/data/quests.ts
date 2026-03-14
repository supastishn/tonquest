export interface QuizQuestion {
	question: string;
	options: string[];
	correct: number;
	explanation: string;
}

export interface Quest {
	id: string;
	title: string;
	description: string;
	icon: string;
	xpReward: number;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	category: string;
	requiredLevel: number;
	content: string[];
	quiz: QuizQuestion[];
	handsonTask: {
		instruction: string;
		expectedAnswer: string;
		hint: string;
	};
}

export const quests: Quest[] = [
	{
		id: 'what-is-ton',
		title: 'What is TON?',
		description: 'Discover the TON blockchain and what makes it unique',
		icon: '💎',
		xpReward: 100,
		difficulty: 'beginner',
		category: 'Fundamentals',
		requiredLevel: 0,
		content: [
			'<strong>The Open Network (TON)</strong> was originally designed by the Telegram team and is now maintained by an open-source community. It is a Layer 1 blockchain built for speed, scalability, and mass adoption.',
			'TON uses a unique <strong>multi-blockchain architecture</strong> with a masterchain and up to 2^60 workchains. This allows it to process millions of transactions per second through dynamic sharding.',
			'Unlike Ethereum which processes ~15 TPS, TON can theoretically handle <strong>millions of TPS</strong> by splitting the load across multiple shardchains that process transactions in parallel.',
			'TON is deeply integrated with <strong>Telegram</strong>, giving it access to 900M+ users. Telegram Mini Apps (TMAs) run inside the Telegram messenger, making crypto accessible to everyday users.',
			'The native currency is <strong>Toncoin (TON)</strong>, used for transaction fees, staking, and governance. Validators stake TON to secure the network through Proof-of-Stake consensus.'
		],
		quiz: [
			{ question: 'Who originally designed the TON blockchain?', options: ['Vitalik Buterin', 'The Telegram team', 'Satoshi Nakamoto', 'Gavin Wood'], correct: 1, explanation: 'TON was originally designed by Nikolai and Pavel Durov (the Telegram founders) and their team.' },
			{ question: 'What consensus mechanism does TON use?', options: ['Proof-of-Work', 'Delegated PoS', 'Proof-of-Stake', 'Proof-of-Authority'], correct: 2, explanation: 'TON uses Proof-of-Stake where validators stake Toncoin to secure the network.' },
			{ question: 'How does TON achieve high throughput?', options: ['Bigger blocks', 'Dynamic sharding across workchains', 'Centralized validators', 'Off-chain only'], correct: 1, explanation: 'TON uses dynamic sharding, splitting transaction processing across multiple parallel shardchains.' }
		],
		handsonTask: { instruction: 'TON can support up to 2^60 workchains. How many is that? (Enter like 1.15e18)', expectedAnswer: '1.15e18', hint: '2^60 is approximately 1.15 x 10^18' }
	},
	{
		id: 'your-first-wallet',
		title: 'Your First Wallet',
		description: 'Learn how to set up and use a TON wallet',
		icon: '👛',
		xpReward: 120,
		difficulty: 'beginner',
		category: 'Fundamentals',
		requiredLevel: 0,
		content: [
			'A <strong>TON wallet</strong> is your gateway to the TON ecosystem. It stores your private keys and lets you send, receive, and manage Toncoin and other assets.',
			'Popular TON wallets include <strong>Tonkeeper</strong> (mobile-first, most popular), <strong>MyTonWallet</strong> (browser extension), <strong>OpenMask</strong> (MetaMask-like), and <strong>TON Space</strong> (built into Telegram).',
			'TON uses a unique address format. Addresses are <strong>48 characters</strong> long and start with "EQ" (mainnet bounceable) or "UQ" (mainnet non-bounceable).',
			'<strong>Bounceable vs Non-bounceable</strong>: Bounceable addresses (EQ) return funds if the recipient contract fails. Non-bounceable (UQ) addresses send funds that won\'t bounce back.',
			'Your wallet uses a <strong>24-word seed phrase</strong> (mnemonic). This is the master key to your funds. Never share it. Never screenshot it. Write it on paper and store it safely.'
		],
		quiz: [
			{ question: 'Which prefix indicates a bounceable mainnet TON address?', options: ['UQ', 'EQ', '0x', 'ton1'], correct: 1, explanation: 'EQ is the prefix for mainnet bounceable addresses on TON.' },
			{ question: 'Which wallet is built directly into Telegram?', options: ['Tonkeeper', 'MyTonWallet', 'TON Space', 'OpenMask'], correct: 2, explanation: 'TON Space is integrated directly into the Telegram messenger.' },
			{ question: 'How many words are in a standard TON seed phrase?', options: ['12', '18', '24', '32'], correct: 2, explanation: 'TON wallets use a 24-word mnemonic seed phrase for key generation.' }
		],
		handsonTask: { instruction: 'A TON address starts with "EQ". What does a non-bounceable mainnet address start with?', expectedAnswer: 'UQ', hint: 'Think "U" for "un-bounceable".' }
	},
	{
		id: 'understanding-transactions',
		title: 'Understanding Transactions',
		description: 'Decode the anatomy of a TON transaction',
		icon: '🔄',
		xpReward: 150,
		difficulty: 'beginner',
		category: 'Fundamentals',
		requiredLevel: 1,
		content: [
			'Every TON transaction consists of <strong>messages</strong> between accounts. Unlike Ethereum, TON uses an <strong>asynchronous message-passing</strong> model.',
			'A transaction has: <strong>in_msg</strong> (incoming message that triggered it), <strong>out_msgs</strong> (messages sent as a result), <strong>fees</strong>, and <strong>state changes</strong>.',
			'TON transactions are <strong>asynchronous</strong>. When contract A sends a message to contract B, the message is processed in a separate transaction.',
			'Transaction fees on TON are incredibly low, typically <strong>0.005-0.05 TON</strong> (fractions of a cent).',
			'You can explore transactions on <strong>tonscan.org</strong> or <strong>tonviewer.com</strong>. Each transaction has a unique hash.'
		],
		quiz: [
			{ question: 'How does TON process smart contract interactions?', options: ['Synchronous calls', 'Asynchronous message passing', 'REST API calls', 'Direct memory access'], correct: 1, explanation: 'TON uses asynchronous message passing between contracts.' },
			{ question: 'What is the typical transaction fee on TON?', options: ['$5-10', '$1-2', '$0.01-0.05', 'Free'], correct: 2, explanation: 'TON fees are typically fractions of a cent.' },
			{ question: 'Which component is the incoming trigger?', options: ['out_msg', 'in_msg', 'state_init', 'action_list'], correct: 1, explanation: 'in_msg is the incoming message that triggers a transaction.' }
		],
		handsonTask: { instruction: 'What is the asynchronous communication model called? (two words)', expectedAnswer: 'message passing', hint: 'Each contract communicates by sending these.' }
	},
	{
		id: 'smart-contracts-ton',
		title: 'Smart Contracts on TON',
		description: 'Learn about FunC, Tact, and TON smart contract development',
		icon: '📜',
		xpReward: 200,
		difficulty: 'intermediate',
		category: 'Development',
		requiredLevel: 2,
		content: [
			'Smart contracts on TON run on the <strong>TON Virtual Machine (TVM)</strong>. TVM processes stack-based instructions and supports complex data structures via <strong>cells</strong>.',
			'<strong>FunC</strong> is the original low-level language for TON contracts. It compiles to Fift, then to TVM bytecode.',
			'<strong>Tact</strong> is the modern, high-level language for TON. It is TypeScript-like and recommended for most developers.',
			'TON contracts are <strong>actor-based</strong>. Each contract is an independent actor with its own storage and balance. Contracts communicate ONLY through messages.',
			'<strong>Blueprint</strong> is the official development framework. Install with <code>npm create ton@latest</code>.'
		],
		quiz: [
			{ question: 'What is the recommended modern language for TON contracts?', options: ['Solidity', 'FunC', 'Tact', 'Rust'], correct: 2, explanation: 'Tact is the modern, TypeScript-like language recommended for TON development.' },
			{ question: 'How do TON smart contracts communicate?', options: ['Shared memory', 'Direct function calls', 'Message passing', 'Event listeners'], correct: 2, explanation: 'TON contracts are actor-based and communicate exclusively through messages.' },
			{ question: 'What is the basic data unit in TVM?', options: ['Block', 'Cell', 'Word', 'Frame'], correct: 1, explanation: 'Cells hold up to 1023 bits and 4 references to other cells.' }
		],
		handsonTask: { instruction: 'In Tact, what keyword defines a message handler? (from receive("increment"))', expectedAnswer: 'receive', hint: 'Contracts "receive" messages.' }
	},
	{
		id: 'defi-on-ton',
		title: 'DeFi on TON',
		description: 'Explore decentralized finance protocols on TON',
		icon: '🏦',
		xpReward: 200,
		difficulty: 'intermediate',
		category: 'Ecosystem',
		requiredLevel: 2,
		content: [
			'<strong>DeFi on TON</strong> is growing rapidly with over $300M TVL. The two major DEXes are <strong>STON.fi</strong> and <strong>DeDust.io</strong>.',
			'<strong>STON.fi</strong> is the largest DEX on TON by volume. It uses a constant product formula (x*y=k) similar to Uniswap.',
			'<strong>DeDust</strong> differentiates with vault-based architecture and support for both volatile and stable swap pools.',
			'<strong>Lending protocols</strong> like EVAA Protocol allow users to supply assets and earn yield, or borrow against collateral.',
			'<strong>Liquid staking</strong> through Tonstakers and bemo lets users stake TON while keeping liquidity via tokens like tsTON.'
		],
		quiz: [
			{ question: 'What are the two largest DEXes on TON?', options: ['Uniswap and SushiSwap', 'STON.fi and DeDust', 'PancakeSwap and Jupiter', 'Raydium and Orca'], correct: 1, explanation: 'STON.fi and DeDust are the dominant DEXes on TON.' },
			{ question: 'What formula does STON.fi use?', options: ['x+y=k', 'x*y=k', 'x^2+y^2=k', 'x/y=k'], correct: 1, explanation: 'STON.fi uses the constant product formula x*y=k.' },
			{ question: 'What do you receive when liquid staking through Tonstakers?', options: ['stTON', 'tsTON', 'wTON', 'lTON'], correct: 1, explanation: 'Tonstakers issues tsTON, a liquid staking token.' }
		],
		handsonTask: { instruction: 'If a pool has 1000 TON and 5000 USDT, what is k? (number)', expectedAnswer: '5000000', hint: 'k = x * y = 1000 x 5000' }
	},
	{
		id: 'ton-nfts',
		title: 'TON NFTs',
		description: 'Understand NFT standards and marketplaces on TON',
		icon: '🖼️',
		xpReward: 180,
		difficulty: 'intermediate',
		category: 'Ecosystem',
		requiredLevel: 3,
		content: [
			'NFTs on TON follow the <strong>TEP-62</strong> standard. Unlike Ethereum, TON deploys <strong>each NFT as its own smart contract</strong>.',
			'A <strong>Collection contract</strong> manages metadata and mints individual NFT item contracts.',
			'<strong>Getgems</strong> (getgems.io) is the largest NFT marketplace on TON, handling over 90% of trading volume.',
			'<strong>SBT (Soulbound Tokens)</strong> are non-transferable NFTs on TON (TEP-85). Perfect for achievements and credentials.',
			'NFT metadata typically uses <strong>IPFS</strong> or <strong>TON Storage</strong> for decentralized content hosting.'
		],
		quiz: [
			{ question: 'How are NFTs structured on TON?', options: ['One contract holds all', 'Each NFT is its own contract', 'NFTs on masterchain', 'Off-chain only'], correct: 1, explanation: 'Due to sharding, each NFT is its own smart contract.' },
			{ question: 'Largest NFT marketplace on TON?', options: ['OpenSea', 'Getgems', 'Magic Eden', 'Rarible'], correct: 1, explanation: 'Getgems handles over 90% of TON NFT volume.' },
			{ question: 'What are SBTs (TEP-85)?', options: ['Super Big Tokens', 'Soulbound Tokens (non-transferable)', 'Standard Base Tokens', 'Staked Bonded Tokens'], correct: 1, explanation: 'Soulbound Tokens are non-transferable NFTs for achievements.' }
		],
		handsonTask: { instruction: 'What TEP standard defines TON NFTs? (number only)', expectedAnswer: '62', hint: 'TEP-__' }
	},
	{
		id: 'jettons',
		title: 'Jettons',
		description: 'Master the TON token standard',
		icon: '🪙',
		xpReward: 180,
		difficulty: 'intermediate',
		category: 'Development',
		requiredLevel: 3,
		content: [
			'<strong>Jettons</strong> are fungible tokens on TON, defined in <strong>TEP-74</strong>. Equivalent to ERC-20 on Ethereum.',
			'Jettons use a <strong>distributed architecture</strong>: a Jetton Master contract + individual Jetton Wallet contracts per holder.',
			'Transfer flow: Your Wallet -> Your Jetton Wallet -> Recipient Jetton Wallet -> Notification to Recipient.',
			'Popular jettons: <strong>USDT</strong> (most used stablecoin), <strong>STON</strong>, <strong>SCALE</strong>, <strong>BOLT</strong>.',
			'Create your own jetton using Minter tools or by deploying Tact/FunC contracts.'
		],
		quiz: [
			{ question: 'What TEP standard defines jettons?', options: ['TEP-62', 'TEP-74', 'TEP-85', 'TEP-20'], correct: 1, explanation: 'TEP-74 is the fungible token standard on TON.' },
			{ question: 'Why does each holder have their own Jetton Wallet?', options: ['Security', 'Sharded parallel processing', 'Gas optimization', 'Privacy'], correct: 1, explanation: 'Distributed wallets enable parallel processing across shards.' },
			{ question: 'Most used stablecoin on TON?', options: ['USDC', 'DAI', 'USDT', 'BUSD'], correct: 2, explanation: 'USDT is the most widely used stablecoin on TON.' }
		],
		handsonTask: { instruction: 'How many contracts involved in a jetton transfer chain?', expectedAnswer: '4', hint: 'Count: sender wallet, sender jetton wallet, recipient jetton wallet, recipient notification' }
	},
	{
		id: 'ton-dns',
		title: 'TON DNS',
		description: 'Explore the TON domain name system',
		icon: '🌐',
		xpReward: 150,
		difficulty: 'intermediate',
		category: 'Ecosystem',
		requiredLevel: 4,
		content: [
			'<strong>TON DNS</strong> maps human-readable names (like "alice.ton") to wallet addresses, contracts, and websites.',
			'TON domains are <strong>NFTs</strong> (TEP-81). When you buy a domain, you own an NFT you can transfer or sell.',
			'Domains resolve to: wallet addresses, <strong>ADNL addresses</strong> (for TON Sites), smart contracts, and storage bags.',
			'Register .ton domains through <strong>DNS.ton.org</strong> or <strong>Getgems</strong>. Prices vary by length.',
			'<strong>TON Sites</strong> use TON DNS + TON Proxy for censorship-resistant websites via ADNL addresses.'
		],
		quiz: [
			{ question: 'What are TON domains technically?', options: ['Database entries', 'NFTs', 'Smart contracts only', 'DNS records'], correct: 1, explanation: 'TON domains are NFTs following TEP-81.' },
			{ question: 'What can a TON domain resolve to?', options: ['Only wallets', 'Only websites', 'Wallets, ADNL, contracts, storage', 'Only contracts'], correct: 2, explanation: 'TON domains resolve to multiple types of resources.' },
			{ question: 'What protocol enables TON Sites?', options: ['HTTP', 'ADNL', 'IPFS', 'WebRTC'], correct: 1, explanation: 'ADNL (Abstract Datagram Network Layer) enables TON Sites.' }
		],
		handsonTask: { instruction: 'TON domains follow which TEP standard? (number)', expectedAnswer: '81', hint: 'TEP-__' }
	},
	{
		id: 'telegram-mini-apps',
		title: 'Building Mini Apps',
		description: 'Create Telegram Mini Apps powered by TON',
		icon: '📱',
		xpReward: 250,
		difficulty: 'advanced',
		category: 'Development',
		requiredLevel: 4,
		content: [
			'<strong>Telegram Mini Apps (TMAs)</strong> are web apps that run inside Telegram. They access user data, handle payments, and interact with TON.',
			'TMAs are built with standard <strong>HTML/CSS/JavaScript</strong>. They communicate with Telegram via <strong>@telegram-apps/sdk</strong>.',
			'<strong>TON Connect</strong> is the protocol for connecting wallets to TMAs. Users approve transactions via a wallet popup.',
			'TMAs launch from: bot menus, inline mode, direct links (<code>t.me/botname/appname</code>), and attachment menus.',
			'Viral TMAs: <strong>Notcoin</strong> (50M+ users), <strong>Hamster Kombat</strong> (300M+), <strong>Catizen</strong>. Key: Telegram social features.'
		],
		quiz: [
			{ question: 'What technology are TMAs built with?', options: ['Native apps', 'Standard web tech (HTML/CSS/JS)', 'Flutter', 'Telegram-specific lang'], correct: 1, explanation: 'TMAs are web apps in Telegram WebView.' },
			{ question: 'What connects TON wallets to Mini Apps?', options: ['WalletConnect', 'TON Connect', 'MetaMask SDK', 'Telegram Auth'], correct: 1, explanation: 'TON Connect is the official wallet connection protocol.' },
			{ question: 'Which TMA had 300M+ users?', options: ['Notcoin', 'Catizen', 'Hamster Kombat', 'TON Space'], correct: 2, explanation: 'Hamster Kombat reached over 300 million users.' }
		],
		handsonTask: { instruction: 'Notcoin gained 50M+ users through what mechanic? (hyphenated)', expectedAnswer: 'tap-to-earn', hint: 'Users ___ to earn coins.' }
	},
	{
		id: 'advanced-sharding',
		title: 'Advanced: Sharding',
		description: "Deep dive into TON's infinite sharding paradigm",
		icon: '⚡',
		xpReward: 300,
		difficulty: 'advanced',
		category: 'Deep Dives',
		requiredLevel: 5,
		content: [
			'TON implements the <strong>Infinite Sharding Paradigm (ISP)</strong>. In theory, every account could be its own shardchain.',
			'Architecture: <strong>Masterchain</strong> (coordinates), <strong>Workchains</strong> (up to 2^32), and <strong>Shardchains</strong> (subdivisions).',
			'<strong>Dynamic sharding</strong>: overloaded shardchains auto-split into two. When load drops, they merge back.',
			'<strong>Hypercube routing</strong> delivers cross-shard messages in O(log N) hops.',
			'<strong>IHR (Instant Hypercube Routing)</strong> allows direct delivery between any two shardchains without intermediate hops.'
		],
		quiz: [
			{ question: 'What happens when a shardchain gets overloaded?', options: ['Txs queue up', 'It auto-splits into two', 'Validators increase gas', 'Masterchain takes over'], correct: 1, explanation: 'Dynamic sharding auto-splits overloaded shardchains.' },
			{ question: 'Cross-shard routing algorithm?', options: ['Round-robin', 'Hypercube routing', 'Flooding', "Dijkstra's"], correct: 1, explanation: 'Hypercube routing delivers in O(log N) hops.' },
			{ question: 'What does ISP stand for?', options: ['Internet Service Provider', 'Infinite Sharding Paradigm', 'Internal State Protocol', 'Instant Settlement Process'], correct: 1, explanation: "ISP is TON's approach to infinite scalability." }
		],
		handsonTask: { instruction: 'Max workchains TON supports? (like 2^X)', expectedAnswer: '2^32', hint: 'The lesson mentions 2^__ workchains.' }
	},
	{
		id: 'ton-storage',
		title: 'TON Storage & Proxy',
		description: 'Decentralized storage and network infrastructure',
		icon: '💾',
		xpReward: 200,
		difficulty: 'advanced',
		category: 'Deep Dives',
		requiredLevel: 5,
		content: [
			'<strong>TON Storage</strong> is decentralized file storage. Providers earn TON for hosting files, enforced by smart contracts.',
			'Files are split into <strong>bags of cells</strong> (BoC). Each bag has a unique hash identifier.',
			'<strong>TON Proxy</strong> is a decentralized VPN/proxy via ADNL protocol for censorship-resistant web apps.',
			'<strong>ADNL</strong> provides encrypted, authenticated communication. Every participant has a 256-bit ADNL address.',
			'TON DNS + Proxy + Storage + Sites = a <strong>complete decentralized internet stack</strong>.'
		],
		quiz: [
			{ question: 'Incentive for storage providers?', options: ['Reputation', 'TON cryptocurrency', 'Free storage', 'Validator status'], correct: 1, explanation: 'Providers earn TON for hosting files.' },
			{ question: 'What is an ADNL address?', options: ['An IP address', 'A 256-bit identifier', 'A domain name', 'A wallet address'], correct: 1, explanation: 'ADNL addresses are 256-bit network identifiers.' },
			{ question: 'The four components of TON decentralized web?', options: ['DNS,HTTP,FTP,SMTP', 'DNS,Proxy,Storage,Sites', 'Blockchain,Wallet,DEX,NFT', 'IPFS,ENS,Tor,WebRTC'], correct: 1, explanation: 'DNS + Proxy + Storage + Sites = complete stack.' }
		],
		handsonTask: { instruction: 'Files in TON Storage are split into what? (three words)', expectedAnswer: 'bags of cells', hint: 'BoC = B___ of C___' }
	},
	{
		id: 'ton-connect-deep',
		title: 'TON Connect Protocol',
		description: 'Implement wallet connections in your dApp',
		icon: '🔗',
		xpReward: 250,
		difficulty: 'advanced',
		category: 'Development',
		requiredLevel: 6,
		content: [
			'<strong>TON Connect 2.0</strong> is the open protocol for connecting wallets to dApps. Standardized auth, signatures, and transactions.',
			'Flow: dApp generates request with manifest URL -> Wallet shows request -> User approves -> Encrypted bridge session established.',
			'The <strong>manifest.json</strong> describes your dApp (name, URL, icon) to wallets during connection prompts.',
			'Once connected: get wallet address, send transactions, and sign data for proof of ownership.',
			'<strong>Security</strong>: Always verify proof signatures server-side. Use TON Proof for replay-resistant authentication.'
		],
		quiz: [
			{ question: 'What file describes your dApp to wallets?', options: ['package.json', 'manifest.json', 'config.json', 'wallet.json'], correct: 1, explanation: 'manifest.json contains dApp info for wallet prompts.' },
			{ question: 'How is dApp-wallet connection maintained?', options: ['Direct WebSocket', 'Encrypted bridge session', 'Bluetooth', 'QR polling'], correct: 1, explanation: 'TON Connect uses an encrypted bridge session.' },
			{ question: 'TON Proof is used for?', options: ['Mining', 'Replay-resistant auth', 'NFT minting', 'Staking'], correct: 1, explanation: 'TON Proof provides secure wallet ownership verification.' }
		],
		handsonTask: { instruction: 'Current TON Connect version? (like X.X)', expectedAnswer: '2.0', hint: 'TON Connect _._' }
	}
];

export const categories = [...new Set(quests.map(q => q.category))];
export function getQuestById(id: string): Quest | undefined { return quests.find(q => q.id === id); }
export function getQuestsByCategory(cat: string): Quest[] { return quests.filter(q => q.category === cat); }
