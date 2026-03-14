<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { getLeaderboard, getProgress } from '$lib/stores/progress.svelte';
	let lb = $derived(getLeaderboard());
	let p = $derived(getProgress());
	const isMe = (u: string) => u === p.username;
	const re: Record<number,string> = {1:'🥇',2:'🥈',3:'🥉'};
</script>
<Navbar />
<main class="page-container">
	<section class="lp">
		<div class="lh"><h1 class="lt">🏆 Leaderboard</h1><p class="ls">Top TON learners worldwide</p></div>
		<div class="pd">{#each lb.slice(0,3) as e, i}
			<div class="pc2" class:first={i===0} class:me={isMe(e.username)} style="animation-delay:{i*.15}s">
				<div class="pr">{re[i+1]}</div>
				<div class="pa">{e.username.slice(0,2).toUpperCase()}</div>
				<div class="pn2">{e.username}</div>
				<div class="px">{e.xp.toLocaleString()} XP</div>
				<div class="pl2">Level {e.level}</div>
			</div>
		{/each}</div>
		<div class="tb">{#each lb as e, i (e.username)}
			<div class="tr" class:me={isMe(e.username)} class:t3={i<3} style="animation-delay:{i*.04}s">
				<div class="rk">{#if i < 3}{re[i+1]}{:else}<span class="rn">#{e.rank}</span>{/if}</div>
				<div class="tu">
					<div class="tav" style="background:{i<3?'linear-gradient(135deg,#818cf8,#a78bfa)':'rgba(129,140,248,.15)'}">{e.username.slice(0,1).toUpperCase()}</div>
					<div class="tun">{e.username}{#if isMe(e.username)}<span class="yb">YOU</span>{/if}</div>
				</div>
				<div class="ts"><span class="txp">⚡ {e.xp.toLocaleString()}</span><span class="tlv">Lv.{e.level}</span><span class="tqs">📜 {e.quests}</span></div>
			</div>
		{/each}</div>
	</section>
</main>
<style>
	.lp{padding:2rem 0 3rem}
	.lh{text-align:center;margin-bottom:2.5rem}.lt{font-family:'Orbitron',monospace;font-size:2rem;font-weight:900;margin-bottom:.5rem;animation:fi .5s ease-out}.ls{color:#94a3b8;animation:fi .5s ease-out .1s both}
	.pd{display:flex;justify-content:center;align-items:flex-end;gap:1rem;margin-bottom:3rem}
	.pc2{display:flex;flex-direction:column;align-items:center;padding:1.5rem 1.25rem;background:rgba(20,21,45,.8);border:1px solid rgba(129,140,248,.15);border-radius:16px;animation:su .5s ease-out both;width:160px;transition:border-color .2s}
	.pc2:hover{border-color:rgba(129,140,248,.3)}
	.pc2.first{border-color:rgba(251,191,36,.3);background:linear-gradient(180deg,rgba(251,191,36,.08),rgba(20,21,45,.8));transform:scale(1.05);padding-bottom:2rem}
	.pc2.me{border-color:rgba(52,211,153,.4);box-shadow:0 0 20px rgba(52,211,153,.15)}
	.pr{font-size:2rem;margin-bottom:.5rem}
	.pa{width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#818cf8,#a78bfa);border-radius:50%;font-weight:700;margin-bottom:.5rem}
	.pn2{font-weight:600;font-size:.9rem;margin-bottom:.25rem}.px{font-family:'Orbitron',monospace;font-size:.8rem;color:#fbbf24;font-weight:700}.pl2{font-size:.7rem;color:#64748b}
	.tb{display:flex;flex-direction:column;gap:.5rem}
	.tr{display:flex;align-items:center;gap:1rem;padding:.75rem 1rem;background:rgba(20,21,45,.5);border:1px solid rgba(129,140,248,.06);border-radius:12px;transition:all .2s;animation:fi .4s ease-out both}
	.tr:hover{background:rgba(25,26,55,.7);border-color:rgba(129,140,248,.15)}.tr.t3{background:rgba(129,140,248,.04)}.tr.me{border-color:rgba(52,211,153,.3);background:rgba(52,211,153,.05)}
	.rk{width:40px;text-align:center;flex-shrink:0}.rn{font-family:'Orbitron',monospace;font-size:.8rem;color:#64748b}
	.tu{display:flex;align-items:center;gap:.75rem;flex:1}
	.tav{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-weight:600;font-size:.75rem;flex-shrink:0}
	.tun{font-weight:500;display:flex;align-items:center;gap:.5rem}
	.yb{font-size:.6rem;font-weight:700;color:#34d399;background:rgba(52,211,153,.15);padding:.1rem .4rem;border-radius:4px;letter-spacing:1px}
	.ts{display:flex;gap:1rem;align-items:center}.txp{font-family:'Orbitron',monospace;font-size:.75rem;color:#fbbf24;font-weight:700}.tlv{font-size:.75rem;color:#818cf8;font-weight:600}.tqs{font-size:.75rem;color:#64748b}
	@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
	@keyframes su{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
	@media(max-width:600px){.pd{flex-direction:column;align-items:center}.pc2{width:100%;max-width:280px}.pc2.first{transform:none}.tqs{display:none}}
</style>
