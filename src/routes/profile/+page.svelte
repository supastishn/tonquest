<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { getProgress, setUsername, getXPProgress, getXPForNextLevel, resetProgress } from '$lib/stores/progress.svelte';
	import { quests } from '$lib/data/quests';
	let p = $derived(getProgress());
	let xpPct = $derived(getXPProgress(p.xp, p.level));
	let xpNext = $derived(getXPForNextLevel(p.level));
	let avg = $derived(p.totalQuizzes > 0 ? Math.round(p.totalQuizScore / p.totalQuizzes) : 0);
	let editing = $state(false);
	let nameIn = $state('');
	let resetC = $state(false);
	function startEdit() { nameIn = p.username; editing = true; }
	function saveName() { if (nameIn.trim()) setUsername(nameIn.trim()); editing = false; }
	function doReset() { if (resetC) { resetProgress(); resetC = false; } else { resetC = true; setTimeout(() => resetC = false, 5000); } }
</script>
<Navbar />
<main class="page-container">
	<section class="pp">
		<div class="ph">
			<div class="pav"><span class="pal">{p.username ? p.username[0].toUpperCase() : '?'}</span><div class="par"></div><div class="plb">Lv.{p.level}</div></div>
			<div class="pi">
				{#if editing}<div class="ne"><input type="text" class="ni" bind:value={nameIn} placeholder="Username" maxlength="20" onkeydown={e=>{if(e.key==='Enter')saveName()}} /><button class="btn bp" onclick={saveName}>Save</button></div>
				{:else}<div class="nr"><h1 class="pnm">{p.username || 'Anonymous Explorer'}</h1><button class="eb" onclick={startEdit}>✏️</button></div>{/if}
				<p class="pj">Joined {p.joinedDate || 'today'}</p>
			</div>
		</div>
		<div class="xps"><div class="xph"><span>Lv {p.level}</span><span>{p.xp}/{xpNext} XP</span><span>Lv {p.level+1}</span></div><div class="xpb"><div class="xpf" style="width:{xpPct}%"></div></div></div>
		<div class="sg">
			<div class="sc2"><div class="si2">⚡</div><div class="sv2">{p.xp.toLocaleString()}</div><div class="sl2">Total XP</div></div>
			<div class="sc2"><div class="si2">📜</div><div class="sv2">{p.completedQuests.length}/{quests.length}</div><div class="sl2">Quests</div></div>
			<div class="sc2"><div class="si2">📝</div><div class="sv2">{avg}%</div><div class="sl2">Avg Score</div></div>
			<div class="sc2"><div class="si2">🔥</div><div class="sv2">{p.streak}</div><div class="sl2">Streak</div></div>
			<div class="sc2"><div class="si2">🏅</div><div class="sv2">{p.achievements.length}</div><div class="sl2">Badges</div></div>
			<div class="sc2"><div class="si2">🏆</div><div class="sv2">{p.level}</div><div class="sl2">Level</div></div>
		</div>
		<h2 class="stt">🏅 Achievements</h2>
		{#if p.achievements.length}<div class="ag">{#each p.achievements as a}<div class="ac"><div class="aci">{a.icon}</div><div class="acn">{a.name}</div><div class="acd">{a.description}</div></div>{/each}</div>
		{:else}<p class="emp">Complete quests to unlock achievements!</p>{/if}
		<h2 class="stt" style="margin-top:2rem">📜 Completed Quests</h2>
		{#if p.completedQuests.length}<div class="cl">{#each p.completedQuests as qid}{@const q = quests.find(x=>x.id===qid)}{#if q}<div class="ci"><span>{q.icon}</span><span class="cn">{q.title}</span><span class="cs">{p.questScores[qid]??0}%</span><span class="cx">+{q.xpReward} XP</span></div>{/if}{/each}</div>
		{:else}<p class="emp">No quests completed yet.</p>{/if}
		<div class="dz"><button class="rb" onclick={doReset}>{resetC ? '⚠️ Click again to confirm' : '🗑️ Reset All Progress'}</button></div>
	</section>
</main>
<style>
	.pp{padding:2rem 0 3rem;max-width:800px;margin:0 auto}
	.ph{display:flex;align-items:center;gap:1.5rem;margin-bottom:2rem;animation:fi .5s ease-out}
	.pav{position:relative;width:80px;height:80px;flex-shrink:0}
	.pal{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;background:linear-gradient(135deg,#818cf8,#a78bfa);border-radius:50%;z-index:1}
	.par{position:absolute;inset:-4px;border:2px solid rgba(129,140,248,.3);border-radius:50%;animation:rp 3s ease-in-out infinite}
	.plb{position:absolute;bottom:-4px;right:-4px;background:#6366f1;color:#fff;font-family:'Orbitron',monospace;font-size:.55rem;font-weight:700;padding:.2rem .4rem;border-radius:6px;z-index:2}
	.pnm{font-family:'Orbitron',monospace;font-size:1.5rem;font-weight:700;margin:0}
	.nr{display:flex;align-items:center;gap:.75rem}.eb{background:none;font-size:1rem;opacity:.5;transition:opacity .2s}.eb:hover{opacity:1}
	.ne{display:flex;gap:.5rem}.ni{padding:.5rem .75rem;background:rgba(10,11,26,.8);border:1px solid rgba(129,140,248,.3);border-radius:8px;color:#e8e6f0;font-size:1rem;outline:none;font-family:'Space Grotesk',system-ui,sans-serif}.ni:focus{border-color:#818cf8}
	.pj{color:#64748b;font-size:.85rem;margin-top:.25rem}
	.xps{margin-bottom:2rem;animation:fi .5s ease-out .1s both}.xph{display:flex;justify-content:space-between;font-size:.75rem;color:#64748b;margin-bottom:.5rem}
	.xpb{height:10px;background:rgba(129,140,248,.1);border-radius:5px;overflow:hidden}.xpf{height:100%;background:linear-gradient(90deg,#818cf8,#a78bfa,#c084fc);border-radius:5px;transition:width 1s}
	.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:2.5rem;animation:fi .5s ease-out .2s both}
	.sc2{background:rgba(20,21,45,.7);border:1px solid rgba(129,140,248,.1);border-radius:14px;padding:1rem;text-align:center;transition:border-color .2s,transform .2s}.sc2:hover{transform:translateY(-2px);border-color:rgba(129,140,248,.3)}
	.si2{font-size:1.5rem;margin-bottom:.25rem}.sv2{font-family:'Orbitron',monospace;font-size:1.5rem;font-weight:700}.sl2{font-size:.7rem;color:#64748b;text-transform:uppercase;letter-spacing:1px}
	.stt{font-family:'Orbitron',monospace;font-size:1.2rem;margin-bottom:1rem}
	.ag{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:.75rem;margin-bottom:2rem}
	.ac{background:rgba(20,21,45,.7);border:1px solid rgba(251,191,36,.2);border-radius:12px;padding:1rem;text-align:center;transition:border-color .2s}.ac:hover{border-color:rgba(251,191,36,.4)}
	.aci{font-size:2rem;margin-bottom:.5rem}.acn{font-weight:600;font-size:.85rem;margin-bottom:.25rem}.acd{font-size:.7rem;color:#64748b}
	.emp{color:#64748b;font-size:.9rem;margin-bottom:2rem}
	.cl{display:flex;flex-direction:column;gap:.5rem;margin-bottom:2rem}
	.ci{display:flex;align-items:center;gap:.75rem;padding:.6rem 1rem;background:rgba(52,211,153,.04);border:1px solid rgba(52,211,153,.1);border-radius:10px}
	.cn{flex:1;font-size:.9rem}.cs{font-size:.8rem;color:#34d399;font-weight:600}.cx{font-family:'Orbitron',monospace;font-size:.7rem;color:#fbbf24}
	.dz{border-top:1px solid rgba(239,68,68,.15);padding-top:1.5rem;text-align:center}
	.rb{background:rgba(239,68,68,.1);color:#ef4444;padding:.6rem 1.25rem;border-radius:10px;font-size:.85rem;transition:background .2s}.rb:hover{background:rgba(239,68,68,.2)}
	.btn{padding:.65rem 1.5rem;border-radius:10px;font-size:.9rem;font-weight:600;transition:all .2s}
	.bp{background:linear-gradient(135deg,#818cf8,#6366f1);color:#fff;border-radius:8px}
	@keyframes fi{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
	@keyframes rp{0%,100%{border-color:rgba(129,140,248,.2)}50%{border-color:rgba(129,140,248,.5)}}
	@media(max-width:600px){.sg{grid-template-columns:repeat(2,1fr)}.ag{grid-template-columns:repeat(2,1fr)}.ph{flex-direction:column;text-align:center}}
</style>
