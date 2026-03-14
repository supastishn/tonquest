<script lang="ts">
	import type { Quest } from '$lib/data/quests';
	import { getProgress } from '$lib/stores/progress.svelte';
	let { quest, index = 0 } = $props<{ quest: Quest; index?: number }>();
	let progress = $derived(getProgress());
	let done = $derived(progress.completedQuests.includes(quest.id));
	let locked = $derived(progress.level < quest.requiredLevel);
	let score = $derived(progress.questScores[quest.id] ?? null);
	const dc: Record<string,string> = { beginner: '#34d399', intermediate: '#fbbf24', advanced: '#f472b6' };
</script>
<a href={locked ? undefined : `/quest/${quest.id}`} class="qc" class:done class:locked style="animation-delay:{index*.06}s">
	{#if done}<div class="cb">✓</div>{/if}
	{#if locked}<div class="lo"><span>🔒</span><span class="lt2">Lv {quest.requiredLevel}</span></div>{/if}
	<div class="qi">{quest.icon}</div>
	<div class="qf">
		<div class="qh"><h3 class="qt">{quest.title}</h3><span class="dt" style="color:{dc[quest.difficulty]};border-color:{dc[quest.difficulty]}40">{quest.difficulty}</span></div>
		<p class="qd">{quest.description}</p>
		<div class="qm"><span class="xr">⚡ {quest.xpReward} XP</span><span class="ct">{quest.category}</span>{#if score !== null}<span class="st">{score}%</span>{/if}</div>
	</div>
	<div class="qa">→</div>
</a>
<style>
	.qc{display:flex;align-items:center;gap:1rem;padding:1.25rem;background:rgba(20,21,45,.7);border:1px solid rgba(129,140,248,.1);border-radius:16px;text-decoration:none;color:inherit;transition:all .3s;position:relative;overflow:hidden;animation:ci .5s ease-out both}
	.qc:hover:not(.locked){border-color:rgba(129,140,248,.3);transform:translateX(4px);background:rgba(25,26,55,.9)}
	.done{border-color:rgba(52,211,153,.3);background:rgba(52,211,153,.05)}
	.cb{position:absolute;top:8px;right:8px;width:24px;height:24px;background:#34d399;color:#0a0b1a;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700}
	.locked{opacity:.5;cursor:not-allowed;pointer-events:none}
	.lo{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,11,26,.7);border-radius:16px;z-index:2;gap:.25rem}
	.lt2{font-family:'Orbitron',monospace;font-size:.7rem;color:#94a3b8;letter-spacing:1px}
	.qi{font-size:2.5rem;flex-shrink:0;width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:rgba(129,140,248,.08);border-radius:14px}
	.qf{flex:1;min-width:0}
	.qh{display:flex;align-items:center;gap:.75rem;margin-bottom:.35rem;flex-wrap:wrap}
	.qt{font-size:1.05rem;font-weight:600;color:#e8e6f0;margin:0}
	.dt{font-size:.65rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:.15rem .5rem;border:1px solid;border-radius:8px;white-space:nowrap}
	.qd{font-size:.85rem;color:#94a3b8;margin:0 0 .5rem;line-height:1.4}
	.qm{display:flex;gap:.75rem;align-items:center;flex-wrap:wrap}
	.xr{font-family:'Orbitron',monospace;font-size:.7rem;font-weight:700;color:#fbbf24}
	.ct{font-size:.7rem;color:#64748b;background:rgba(100,116,139,.15);padding:.15rem .5rem;border-radius:6px}
	.st{font-size:.7rem;color:#34d399;background:rgba(52,211,153,.1);padding:.15rem .5rem;border-radius:6px;font-weight:600}
	.qa{font-size:1.25rem;color:#4b5563;transition:transform .2s,color .2s;flex-shrink:0}
	.qc:hover .qa{transform:translateX(4px);color:#818cf8}
	@keyframes ci{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
	@media(max-width:600px){.qc{padding:1rem;gap:.75rem}.qi{font-size:2rem;width:48px;height:48px}.qa{display:none}}
</style>
