<script lang="ts">
	let { active = false } = $props();
	let particles = $state<{id:number;x:number;d:number;c:string;s:number;r:number}[]>([]);
	$effect(() => {
		if (active) {
			const cl = ['#818cf8','#a78bfa','#c084fc','#38bdf8','#34d399','#fbbf24','#f472b6','#fb923c'];
			particles = Array.from({length:60},(_,i)=>({id:i,x:Math.random()*100,d:Math.random()*.5,c:cl[Math.floor(Math.random()*cl.length)],s:Math.random()*8+4,r:Math.random()*360}));
			setTimeout(()=>{particles=[]},3000);
		}
	});
</script>
{#if particles.length}
<div class="cc">{#each particles as p (p.id)}<div class="cp" style="left:{p.x}%;animation-delay:{p.d}s;background:{p.c};width:{p.s}px;height:{p.s*.6}px;transform:rotate({p.r}deg)"></div>{/each}</div>
{/if}
<style>.cc{position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden}.cp{position:absolute;top:-10px;border-radius:2px;animation:cf 2.5s ease-in forwards}@keyframes cf{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}</style>
