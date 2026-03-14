<script lang="ts">
	let { amount = 0, show = false, message = '' } = $props();
</script>
{#if show}
<div class="xt"><div class="xi">✨</div><div><div class="xa">+{amount} XP</div>{#if message}<div class="xm">{message}</div>{/if}</div></div>
{/if}
<style>.xt{position:fixed;top:80px;right:20px;display:flex;align-items:center;gap:.75rem;background:linear-gradient(135deg,rgba(129,140,248,.2),rgba(167,139,250,.2));border:1px solid rgba(129,140,248,.4);backdrop-filter:blur(12px);padding:.75rem 1.25rem;border-radius:12px;z-index:200;animation:ti .4s ease-out,to .4s ease-in 2.5s forwards;box-shadow:0 4px 20px rgba(129,140,248,.3)}.xi{font-size:1.5rem;animation:sp .6s ease-in-out}.xa{font-family:'Orbitron',monospace;font-weight:700;font-size:1.1rem;color:#a78bfa}.xm{font-size:.8rem;color:#94a3b8}@keyframes ti{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes to{from{opacity:1}to{transform:translateX(100px);opacity:0}}@keyframes sp{0%,100%{transform:scale(1)}50%{transform:scale(1.4) rotate(15deg)}}</style>
