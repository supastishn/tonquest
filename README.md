# TonQuest — Gamified Learn-to-Earn for TON Ecosystem

💎 Master the TON blockchain through interactive quests, earn XP, and level up.

**Live Demo:** https://riven-tonquest.surge.sh

Built for TokenTon26 Consumer Apps Track ($8,500 USDC).

## Features

- **12 Interactive Quests** covering the full TON ecosystem (wallets, DeFi, NFTs, smart contracts, sharding)
- **3-Phase Learning**: Lesson slides → Quiz → Hands-on challenge per quest
- **Gamification Engine**: XP, 20 levels, 9 achievements, daily streaks, leaderboard
- **Celebration Effects**: Confetti, XP toasts, achievement unlock popups
- **Progressive Difficulty**: Beginner → Intermediate → Advanced, level-gated content
- **Mobile-first** responsive design with dark space theme

## Quest Curriculum

| Quest | Topic | Difficulty |
|-------|-------|-----------|
| What is TON? | Blockchain fundamentals | Beginner |
| Your First Wallet | Wallet setup & addresses | Beginner |
| Understanding Transactions | Async message passing | Beginner |
| Smart Contracts on TON | FunC, Tact, TVM | Intermediate |
| DeFi on TON | STON.fi, DeDust, lending | Intermediate |
| TON NFTs | TEP-62, Getgems, SBTs | Intermediate |
| Jettons | TEP-74 token standard | Intermediate |
| TON DNS | Domain system | Intermediate |
| Building Mini Apps | Telegram Mini Apps | Advanced |
| Advanced: Sharding | Infinite Sharding Paradigm | Advanced |
| TON Storage & Proxy | Decentralized infra | Advanced |
| TON Connect Protocol | Wallet integration | Advanced |

## Tech Stack

- **SvelteKit** (Svelte 5 with runes) + TypeScript
- **localStorage** for persistent user progress
- **adapter-static** for static site generation
- **Surge.sh** deployment

## Roadmap

- TON wallet integration via TON Connect 2.0
- NFT achievement badges as Soulbound Tokens
- Telegram Mini App deployment
- Community-submitted quests
- AI tutor with adaptive learning

## Run Locally

```bash
npm install
npm run dev
```

MIT License | Built for TokenTon26
