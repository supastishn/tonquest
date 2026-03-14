<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import QuestCard from '$lib/components/QuestCard.svelte';
	import { quests, categories } from '$lib/data/quests';
	import { getProgress, getXPProgress, getXPForNextLevel } from '$lib/stores/progress.svelte';
	let progress = $derived(getProgress());
	let xpPct = $derived(getXPProgress(progress.xp, progress.level));
	let xpNext = $derived(getXPForNextLevel(progress.level));
	let activeCat = $state('all');
	let filtered = $derived(activeCat === 'all' ? quests : quests.filter(q => q.category === activeCat));
	const tips = ['TON processes millions of TPS through dynamic sharding.','Telegram Mini Apps reach 900M+ users instantly.','Each NFT on TON is its own smart contract.','TON transaction fees are fractions of a cent.','Tact is the modern language for TON smart contracts.'];
	const tip = tips[Math.floor(Math.random() * tips.length)];
</script>
<Navbar />
<main class="page-container">
	<section class="hero">
		<div class="hc">
			<div class="ht">🚀 Learn-to-Earn on TON</div>
			<h1 class="h1">Master the <span class="gt">TON Blockchain</span></h1>
			<p class="hs">Complete quests. Earn XP. Level up. Become a TON expert through interactive challenges.</p>
			<div class="sg">
				<div class="sc"><div class="si">⚡</div><div class="sv">{progress.xp}</div><div class="sl">Total XP</div></div>
				<div class="sc"><div class="si">🏆</div><div class="sv">{progress.level}</div><div class="sl">Level</div></div>
				<div class="sc"><div class="si">📜</div><div class="sv">{progress.completedQuests.length}/{quests.length}</div><div class="sl">Quests</div></div>
				<div class="sc"><div class="si">🔥</div><div class="sv">{progress.streak}</div><div class="sl">Streak</div></div>
			</div>
			<div class="xps">
				<div class="xph"><span>Level {progress.level}</span><span>{progress.xp} / {xpNext} XP</span><span>Level {progress.level + 1}</span></div>
				<div class="xpb"><div class="xpf" style="width:{xpPct}%"><div class="xpg"></div></div></div>
			</div>
		</div>
		<div class="hv"><div class="hd">💎</div><div class="o1"></div><div class="o2"></div><div class="o3"></div></div>
	</section>
	<div class="dt2"><span>💡</span><span>Did you know? {tip}</span></div>
	<section class="qs">
		<div class="sh"><h2 class="stt">Quest Board</h2>
			<div class="cf">
				<button class="fb" class:active={activeCat==='all'} onclick={()=>activeCat='all'}>All</button>
				{#each categories as c}<button class="fb" class:active={activeCat===c} onclick={()=>activeCat=c}>{c}</button>{/each}
			</div>
		</div>
		<div class="ql">{#each filtered as q, i (q.id)}<QuestCard quest={q} index={i} />{/each}</div>
	</section>
</main>
<style>
	.hero{display:flex;align-items:center;justify-content:space-between;padding:3rem 0 2rem;gap:2rem}
	.hc{flex:1;max-width:650px}
	.ht{display:inline-block;background:rgba(129,140,248,.12);border:1px solid rgba(129,140,248,.2);padding:.35rem 1rem;border-radius:20px;font-size:.85rem;color:#a78bfa;margin-bottom:1rem;animation:fi .5s ease-out}
	.h1{font-family:'Orbitron',monospace;font-size:2.5rem;font-weight:900;line-height:1.2;margin-bottom:1rem;animation:fi .5s ease-out .1s both}
	.gt{background:linear-gradient(135deg,#818cf8,#a78bfa,#c084fc,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
	.hs{color:#94a3b8;font-size:1.1rem;line-height:1.6;margin-bottom:2rem;animation:fi .5s ease-out .2s both}
	.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;margin-bottom:1.5rem;animation:fi .5s ease-out .3s both}
	.sc{background:rgba(20,21,45,.8);border:1px solid rgba(129,140,248,.12);border-radius:12px;padding:.75rem;text-align:center;transition:border-color .2s}.sc:hover{border-color:rgba(129,140,248,.3)}
	.si{font-size:1.25rem;margin-bottom:.25rem}.sv{font-family:'Orbitron',monospace;font-size:1.25rem;font-weight:700}.sl{font-size:.7rem;color:#64748b;text-transform:uppercase;letter-spacing:1px}
	.xps{animation:fi .5s ease-out .4s both}.xph{display:flex;justify-content:space-between;font-size:.75rem;color:#64748b;margin-bottom:.5rem}
	.xpb{height:8px;background:rgba(129,140,248,.1);border-radius:4px;overflow:hidden}.xpf{height:100%;background:linear-gradient(90deg,#818cf8,#a78bfa,#c084fc);border-radius:4px;transition:width 1s;position:relative}
	.xpg{position:absolute;right:0;top:-4px;bottom:-4px;width:20px;background:rgba(167,139,250,.6);border-radius:50%;filter:blur(6px);animation:pu 2s ease-in-out infinite}
	.hv{position:relative;width:250px;height:250px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
	.hd{font-size:5rem;z-index:2;animation:fl 3s ease-in-out infinite;filter:drop-shadow(0 0 30px rgba(129,140,248,.5))}
	.o1,.o2,.o3{position:absolute;border:1px solid rgba(129,140,248,.15);border-radius:50%;animation:os linear infinite}
	.o1,.o2,.o3{&::before{content:'';position:absolute;width:8px;height:8px;background:#818cf8;border-radius:50%;top:-4px;left:50%;box-shadow:0 0 10px rgba(129,140,248,.6)}}
	.o1{width:150px;height:150px;animation-duration:6s}.o2{width:200px;height:200px;animation-duration:9s;animation-direction:reverse}.o3{width:240px;height:240px;animation-duration:12s}
	.dt2{display:flex;align-items:center;gap:.75rem;background:linear-gradient(90deg,rgba(251,191,36,.08),rgba(251,191,36,.03));border:1px solid rgba(251,191,36,.15);border-radius:12px;padding:.75rem 1.25rem;margin-bottom:2rem;animation:fi .5s ease-out .5s both;font-size:.9rem;color:#d4a843}
	.qs{padding-bottom:3rem}.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem}
	.stt{font-family:'Orbitron',monospace;font-size:1.5rem;font-weight:700}
	.cf{display:flex;gap:.5rem;flex-wrap:wrap}
	.fb{background:rgba(129,140,248,.08);color:#94a3b8;padding:.4rem 1rem;border-radius:20px;font-size:.8rem;font-weight:500;transition:all .2s}.fb:hover{background:rgba(129,140,248,.15);color:#e8e6f0}.fb.active{background:rgba(129,140,248,.25);color:#818cf8;border:1px solid rgba(129,140,248,.3)}
	.ql{display:flex;flex-direction:column;gap:.75rem}
	@keyframes fi{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
	@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
	@keyframes os{from{transform:rotate(0)}to{transform:rotate(360deg)}}
	@keyframes pu{0%,100%{opacity:.5}50%{opacity:1}}
	@media(max-width:768px){.hero{flex-direction:column;text-align:center;padding:2rem 0}.h1{font-size:1.8rem}.sg{grid-template-columns:repeat(2,1fr)}.hv{width:180px;height:180px}.hd{font-size:3.5rem}.sh{flex-direction:column;align-items:flex-start}}
</style>
