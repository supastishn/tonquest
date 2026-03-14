<script lang="ts">
	import type { Achievement } from '$lib/stores/progress.svelte';
	let { achievement = null as Achievement | null, show = false } = $props();
</script>
{#if show && achievement}
<div class="ao" onclick={() => show = false}>
	<div class="ap">
		<div class="ag"></div>
		<div class="ai">{achievement.icon}</div>
		<div class="ab">ACHIEVEMENT UNLOCKED</div>
		<h3 class="an">{achievement.name}</h3>
		<p class="ad">{achievement.description}</p>
	</div>
</div>
{/if}
<style>.ao{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:300;animation:oi .3s ease-out}.ap{position:relative;background:linear-gradient(180deg,#1a1b3a,#0f1024);border:1px solid rgba(129,140,248,.4);border-radius:20px;padding:2.5rem 3rem;text-align:center;animation:pb .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 0 60px rgba(129,140,248,.3);overflow:hidden}.ag{position:absolute;inset:-50%;background:conic-gradient(from 0deg,transparent,rgba(129,140,248,.1),transparent,rgba(167,139,250,.1),transparent);animation:gs 4s linear infinite}.ai{font-size:4rem;margin-bottom:1rem;position:relative;z-index:1;animation:ip .6s cubic-bezier(.34,1.56,.64,1) .2s both}.ab{font-family:'Orbitron',monospace;font-size:.7rem;font-weight:700;letter-spacing:3px;color:#fbbf24;margin-bottom:.5rem;position:relative;z-index:1}.an{font-family:'Orbitron',monospace;font-size:1.5rem;font-weight:700;color:#e8e6f0;margin-bottom:.5rem;position:relative;z-index:1}.ad{color:#94a3b8;font-size:.95rem;position:relative;z-index:1}@keyframes oi{from{opacity:0}to{opacity:1}}@keyframes pb{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}@keyframes ip{from{transform:scale(0)}to{transform:scale(1)}}@keyframes gs{from{transform:rotate(0)}to{transform:rotate(360deg)}}</style>
