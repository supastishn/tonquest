<script lang="ts">
	import { getProgress, getXPProgress } from '$lib/stores/progress.svelte';
	let progress = $derived(getProgress());
	let xpPct = $derived(getXPProgress(progress.xp, progress.level));
	let open = $state(false);
</script>
<nav class="nb">
	<a href="/" class="logo"><span class="li">💎</span><span class="lt">Ton<span class="la">Quest</span></span></a>
	<div class="nl" class:open>
		<a href="/" onclick={() => open=false}>Quests</a>
		<a href="/leaderboard" onclick={() => open=false}>Leaderboard</a>
		<a href="/profile" onclick={() => open=false}>Profile</a>
	</div>
	<div class="ns">
		<div class="sb" title="Streak">🔥 {progress.streak}</div>
		<div class="xb">
			<span class="xt">Lv.{progress.level}</span>
			<div class="xbm"><div class="xbf" style="width:{xpPct}%"></div></div>
			<span class="xa">{progress.xp} XP</span>
		</div>
	</div>
	<button class="mt" onclick={() => open=!open}>{open ? '✕' : '☰'}</button>
</nav>
<style>
	.nb{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1.5rem;background:rgba(15,16,36,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(129,140,248,.15);position:sticky;top:0;z-index:100}
	.logo{display:flex;align-items:center;gap:.5rem;text-decoration:none}
	.li{font-size:1.5rem;filter:drop-shadow(0 0 8px rgba(129,140,248,.5))}
	.lt{font-family:'Orbitron',monospace;font-size:1.25rem;font-weight:700;color:#e8e6f0;letter-spacing:1px}
	.la{color:#818cf8}
	.nl{display:flex;gap:2rem}
	.nl a{color:#94a3b8;font-weight:500;font-size:.95rem;transition:color .2s;text-decoration:none;position:relative}
	.nl a:hover{color:#e8e6f0}
	.nl a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:linear-gradient(90deg,#818cf8,#a78bfa);border-radius:1px;transition:width .2s}
	.nl a:hover::after{width:100%}
	.ns{display:flex;align-items:center;gap:1rem}
	.sb{background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);padding:.3rem .6rem;border-radius:20px;font-size:.85rem;font-weight:600}
	.xb{display:flex;align-items:center;gap:.5rem;background:rgba(129,140,248,.1);border:1px solid rgba(129,140,248,.2);padding:.3rem .75rem;border-radius:20px}
	.xt{font-family:'Orbitron',monospace;font-size:.75rem;font-weight:700;color:#818cf8}
	.xbm{width:50px;height:4px;background:rgba(129,140,248,.15);border-radius:2px;overflow:hidden}
	.xbf{height:100%;background:linear-gradient(90deg,#818cf8,#a78bfa);border-radius:2px;transition:width .5s}
	.xa{font-size:.75rem;color:#94a3b8;font-weight:500}
	.mt{display:none;background:none;color:#e8e6f0;font-size:1.5rem;padding:.25rem}
	@media(max-width:768px){.nl{display:none;position:absolute;top:100%;left:0;right:0;background:rgba(15,16,36,.98);flex-direction:column;padding:1rem 1.5rem;gap:1rem;border-bottom:1px solid rgba(129,140,248,.15)}.nl.open{display:flex}.mt{display:block}.ns{display:none}}
</style>
