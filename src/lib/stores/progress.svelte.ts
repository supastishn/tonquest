import { quests } from '$lib/data/quests';

export interface Achievement { id: string; name: string; description: string; icon: string; unlockedAt: string; }

export interface UserProgress {
	username: string; xp: number; level: number;
	completedQuests: string[]; questScores: Record<string, number>;
	achievements: Achievement[]; streak: number; lastLoginDate: string;
	totalQuizScore: number; totalQuizzes: number; joinedDate: string;
}

const STORAGE_KEY = 'tonquest_progress';
const LEVELS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800, 4700, 5700, 6800, 8000, 9500, 11000, 13000, 15000, 17500, 20000];

export function getLevelFromXP(xp: number): number { for (let i = LEVELS.length - 1; i >= 0; i--) { if (xp >= LEVELS[i]) return i; } return 0; }
export function getXPForLevel(l: number): number { return LEVELS[l] ?? LEVELS[LEVELS.length - 1]; }
export function getXPForNextLevel(l: number): number { return LEVELS[l + 1] ?? LEVELS[LEVELS.length - 1]; }
export function getXPProgress(xp: number, level: number): number {
	const cur = getXPForLevel(level), next = getXPForNextLevel(level);
	return next === cur ? 100 : ((xp - cur) / (next - cur)) * 100;
}

function defaultProgress(): UserProgress {
	return { username: '', xp: 0, level: 0, completedQuests: [], questScores: {}, achievements: [], streak: 0, lastLoginDate: '', totalQuizScore: 0, totalQuizzes: 0, joinedDate: new Date().toISOString().split('T')[0] };
}

function load(): UserProgress {
	if (typeof window === 'undefined') return defaultProgress();
	try { const s = localStorage.getItem(STORAGE_KEY); if (s) return JSON.parse(s); } catch { /* noop */ }
	return defaultProgress();
}

function save(p: UserProgress) { if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

let progress = $state<UserProgress>(defaultProgress());
let ready = $state(false);

export function initStore() {
	if (ready) return;
	progress = load();
	const today = new Date().toISOString().split('T')[0];
	if (progress.lastLoginDate) {
		const diff = Math.floor((new Date(today).getTime() - new Date(progress.lastLoginDate).getTime()) / 86400000);
		if (diff === 1) progress.streak++;
		else if (diff > 1) progress.streak = 1;
	} else { progress.streak = 1; }
	progress.lastLoginDate = today;
	save(progress);
	ready = true;
}

export function getProgress(): UserProgress { return progress; }
export function setUsername(n: string) { progress.username = n; save(progress); }

export function addXP(amount: number): { leveledUp: boolean; newLevel: number } {
	const old = progress.level;
	progress.xp += amount;
	progress.level = getLevelFromXP(progress.xp);
	save(progress);
	return { leveledUp: progress.level > old, newLevel: progress.level };
}

const ACH_DEFS: Omit<Achievement, 'unlockedAt'>[] = [
	{ id: 'first-quest', name: 'First Steps', description: 'Complete your first quest', icon: '🎯' },
	{ id: 'five-quests', name: 'Knowledge Seeker', description: 'Complete 5 quests', icon: '📚' },
	{ id: 'ten-quests', name: 'TON Scholar', description: 'Complete all quests', icon: '🎓' },
	{ id: 'perfect-quiz', name: 'Perfect Score', description: 'Get 100% on any quiz', icon: '💯' },
	{ id: 'streak-3', name: 'Consistent Learner', description: '3-day streak', icon: '🔥' },
	{ id: 'streak-7', name: 'Week Warrior', description: '7-day streak', icon: '⚔️' },
	{ id: 'level-5', name: 'Rising Star', description: 'Reach level 5', icon: '⭐' },
	{ id: 'level-10', name: 'TON Master', description: 'Reach level 10', icon: '👑' },
	{ id: 'xp-1000', name: 'XP Collector', description: 'Earn 1000 XP', icon: '💰' },
];

function checkAchievements(): Achievement[] {
	const ids = new Set(progress.achievements.map(a => a.id));
	const newA: Achievement[] = [];
	function tryU(id: string, cond: boolean) {
		if (!ids.has(id) && cond) { const d = ACH_DEFS.find(a => a.id === id); if (d) { const a = { ...d, unlockedAt: new Date().toISOString() }; progress.achievements.push(a); newA.push(a); } }
	}
	tryU('first-quest', progress.completedQuests.length >= 1);
	tryU('five-quests', progress.completedQuests.length >= 5);
	tryU('ten-quests', progress.completedQuests.length >= 10);
	tryU('perfect-quiz', Object.values(progress.questScores).some(s => s === 100));
	tryU('streak-3', progress.streak >= 3);
	tryU('streak-7', progress.streak >= 7);
	tryU('level-5', progress.level >= 5);
	tryU('level-10', progress.level >= 10);
	tryU('xp-1000', progress.xp >= 1000);
	return newA;
}

export function completeQuest(questId: string, quizScore: number, xpReward: number) {
	if (progress.completedQuests.includes(questId)) return { leveledUp: false, newLevel: progress.level, newAchievements: [] as Achievement[] };
	progress.completedQuests.push(questId);
	progress.questScores[questId] = quizScore;
	progress.totalQuizScore += quizScore;
	progress.totalQuizzes++;
	const r = addXP(xpReward);
	const newA = checkAchievements();
	save(progress);
	return { ...r, newAchievements: newA };
}

export function resetProgress() { progress = defaultProgress(); save(progress); }

export function getLeaderboard() {
	const mock = [
		{ username: 'ton_wizard', xp: 4200, level: 8, quests: 11 },
		{ username: 'crypto_nina', xp: 3800, level: 7, quests: 10 },
		{ username: 'blockchain_dev', xp: 3100, level: 6, quests: 9 },
		{ username: 'defi_hunter', xp: 2700, level: 5, quests: 8 },
		{ username: 'nft_collector', xp: 2200, level: 5, quests: 7 },
		{ username: 'tact_coder', xp: 1800, level: 4, quests: 6 },
		{ username: 'ton_newbie', xp: 1200, level: 3, quests: 5 },
		{ username: 'web3_explorer', xp: 800, level: 2, quests: 4 },
		{ username: 'gem_finder', xp: 500, level: 1, quests: 3 },
		{ username: 'hodl_master', xp: 250, level: 1, quests: 2 },
	];
	const all = [...mock];
	if (progress.username) all.push({ username: progress.username, xp: progress.xp, level: progress.level, quests: progress.completedQuests.length });
	all.sort((a, b) => b.xp - a.xp);
	return all.map((e, i) => ({ rank: i + 1, ...e }));
}
