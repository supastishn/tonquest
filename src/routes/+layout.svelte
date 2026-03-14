<script lang="ts">
	import { onMount } from 'svelte';
	import { initStore } from '$lib/stores/progress.svelte';
	let { children } = $props();
	let mounted = $state(false);
	onMount(() => { initStore(); mounted = true; });
</script>
<svelte:head>
	<title>TonQuest — Learn TON, Earn Rewards</title>
	<meta name="description" content="Gamified learn-to-earn platform for the TON blockchain ecosystem" />
</svelte:head>
{#if mounted}{@render children()}{:else}<div class="ls"><div class="lsi">💎</div><div class="lst">Loading TonQuest...</div></div>{/if}
<style>
	:global(*){margin:0;padding:0;box-sizing:border-box}
	:global(body){font-family:'Space Grotesk',system-ui,sans-serif;background:#0a0b1a;color:#e8e6f0;min-height:100vh;overflow-x:hidden}
	:global(body::before){content:'';position:fixed;inset:0;background:radial-gradient(ellipse 80% 50% at 20% 20%,rgba(88,80,236,.12) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 80%,rgba(14,165,233,.08) 0%,transparent 60%),radial-gradient(ellipse 40% 30% at 50% 50%,rgba(168,85,247,.06) 0%,transparent 60%);pointer-events:none;z-index:0}
	:global(body::after){content:'';position:fixed;inset:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:0}
	:global(a){color:#818cf8;text-decoration:none;transition:color .2s}:global(a:hover){color:#a78bfa}
	:global(.page-container){position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 1rem}
	:global(button){font-family:'Space Grotesk',system-ui,sans-serif;cursor:pointer;border:none;outline:none}
	:global(::-webkit-scrollbar){width:6px}:global(::-webkit-scrollbar-track){background:#12132a}:global(::-webkit-scrollbar-thumb){background:#3730a3;border-radius:3px}
	.ls{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:1rem}
	.lsi{font-size:3rem;animation:pg 1.5s ease-in-out infinite}
	.lst{font-family:'Orbitron',monospace;color:#818cf8;font-size:1.1rem;letter-spacing:2px}
	@keyframes pg{0%,100%{filter:drop-shadow(0 0 8px rgba(129,140,248,.4))}50%{filter:drop-shadow(0 0 20px rgba(129,140,248,.7))}}
</style>
