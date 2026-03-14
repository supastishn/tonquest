<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import Confetti from '$lib/components/Confetti.svelte';
	import XPToast from '$lib/components/XPToast.svelte';
	import AchievementPopup from '$lib/components/AchievementPopup.svelte';
	import { getQuestById } from '$lib/data/quests';
	import { getProgress, completeQuest } from '$lib/stores/progress.svelte';
	import type { Achievement } from '$lib/stores/progress.svelte';

	let questId = $derived($page.params.id);
	let quest = $derived(getQuestById(questId));
	let progress = $derived(getProgress());
	let alreadyDone = $derived(quest ? progress.completedQuests.includes(quest.id) : false);

	let phase = $state<'lesson'|'quiz'|'handson'|'complete'>('lesson');
	let slide = $state(0);
	let qIdx = $state(0);
	let sel = $state<number|null>(null);
	let revealed = $state(false);
	let correct = $state(0);
	let hoAns = $state('');
	let hoResult = $state<'pending'|'correct'|'wrong'>('pending');
	let showHint = $state(false);
	let confetti = $state(false);
	let xpToast = $state(false);
	let xpAmt = $state(0);
	let achShow = $state(false);
	let achData = $state<Achievement|null>(null);

	function nextSlide() { if (!quest) return; if (slide < quest.content.length - 1) slide++; else phase = 'quiz'; }
	function prevSlide() { if (slide > 0) slide--; }
	function pick(i: number) { if (!revealed) sel = i; }
	function check() { if (sel === null || !quest) return; revealed = true; if (sel === quest.quiz[qIdx].correct) correct++; }
	function nextQ() { if (!quest) return; if (qIdx < quest.quiz.length - 1) { qIdx++; sel = null; revealed = false; } else phase = 'handson'; }
	function checkHo() { if (!quest) return; if (hoAns.toLowerCase().trim() === quest.handsonTask.expectedAnswer.toLowerCase().trim()) { hoResult = 'correct'; finish(); } else hoResult = 'wrong'; }
	function finish() {
		if (!quest) return;
		if (alreadyDone) { phase = 'complete'; return; }
		const qs = quest.quiz.length > 0 ? Math.round((correct / quest.quiz.length) * 100) : 100;
		const bonus = hoResult === 'correct' ? 50 : 0;
		xpAmt = quest.xpReward + bonus;
		const r = completeQuest(quest.id, qs, xpAmt);
		confetti = true; xpToast = true; phase = 'complete';
		if (r.newAchievements.length) { setTimeout(() => { achData = r.newAchievements[0]; achShow = true; }, 1500); setTimeout(() => achShow = false, 4500); }
		setTimeout(() => xpToast = false, 3500);
	}
</script>
<Confetti active={confetti} />
<XPToast amount={xpAmt} show={xpToast} message="Quest complete!" />
<AchievementPopup achievement={achData} show={achShow} />
<Navbar />
<main class="page-container">
{#if !quest}
	<div class="nf"><h2>Quest not found</h2><a href="/">Back to quests</a></div>
{:else}
	<div class="qp">
		<a href="/" class="bl">← Back</a>
		<div class="qtr"><span class="qti">{quest.icon}</span><div><h1 class="qtn">{quest.title}</h1><p class="qtd">{quest.description}</p></div></div>
		<div class="pb">
			{#each ['Lesson','Quiz','Hands-on','Done'] as label, i}
				{#if i > 0}<div class="pc" class:done={(['lesson','quiz','handson','complete'].indexOf(phase)) > i - 1}></div>{/if}
				<div class="ps" class:active={['lesson','quiz','handson','complete'][i] === phase} class:done={(['lesson','quiz','handson','complete'].indexOf(phase)) > i}>
					<span class="pn">{i < 3 ? i + 1 : '✓'}</span><span class="pl">{label}</span>
				</div>
			{/each}
		</div>

		{#if phase === 'lesson'}
		<div class="card">
			<div class="lp"><span>Slide {slide+1}/{quest.content.length}</span><div class="lb"><div class="lf" style="width:{((slide+1)/quest.content.length)*100}%"></div></div></div>
			<div class="lc">{@html quest.content[slide]}</div>
			<div class="la">
				{#if slide > 0}<button class="btn bs" onclick={prevSlide}>← Previous</button>{:else}<div></div>{/if}
				<button class="btn bp" onclick={nextSlide}>{slide < quest.content.length - 1 ? 'Next →' : 'Start Quiz →'}</button>
			</div>
		</div>

		{:else if phase === 'quiz'}
		<div class="card">
			<div class="qpr">Question {qIdx+1}/{quest.quiz.length}<span class="qsc">Score: {correct}/{qIdx + (revealed ? 1 : 0)}</span></div>
			<h3 class="qq">{quest.quiz[qIdx].question}</h3>
			<div class="qo">{#each quest.quiz[qIdx].options as opt, i}
				<button class="qob" class:selected={sel===i} class:correct={revealed && i===quest.quiz[qIdx].correct} class:wrong={revealed && sel===i && i!==quest.quiz[qIdx].correct} onclick={()=>pick(i)} disabled={revealed}>
					<span class="ol">{String.fromCharCode(65+i)}</span><span>{opt}</span>
				</button>
			{/each}</div>
			{#if revealed}<div class="qe"><span>{sel===quest.quiz[qIdx].correct ? '✅' : '❌'}</span> {quest.quiz[qIdx].explanation}</div>{/if}
			<div class="qact">
				{#if !revealed}<button class="btn bp" onclick={check} disabled={sel===null}>Check Answer</button>
				{:else}<button class="btn bp" onclick={nextQ}>{qIdx < quest.quiz.length - 1 ? 'Next Question →' : 'Hands-on Challenge →'}</button>{/if}
			</div>
		</div>

		{:else if phase === 'handson'}
		<div class="card tc">
			<div class="hi">🛠️</div>
			<h3 class="htt">Hands-on Challenge</h3>
			<p class="hin">{quest.handsonTask.instruction}</p>
			<div class="hig">
				<input type="text" class="hip" class:correct={hoResult==='correct'} class:wrong={hoResult==='wrong'} placeholder="Your answer..." bind:value={hoAns} onkeydown={e => { if (e.key==='Enter') checkHo(); }} />
				<button class="btn bp" onclick={checkHo}>Submit</button>
			</div>
			{#if hoResult==='wrong'}<p class="hw">Not quite. Try again!</p>{/if}
			<div class="hf">
				{#if !showHint}<button class="hb" onclick={()=>showHint=true}>💡 Show Hint</button>{:else}<p class="htx">💡 {quest.handsonTask.hint}</p>{/if}
				<button class="skb" onclick={finish}>Skip (+0 XP bonus)</button>
			</div>
		</div>

		{:else if phase === 'complete'}
		<div class="card tc">
			<div class="ci2">🎉</div>
			<h2 class="ct2">Quest Complete!</h2>
			<p class="cn2">{quest.icon} {quest.title}</p>
			<div class="cs2">
				<div class="cs2i"><div class="cs2v">⚡ +{xpAmt || quest.xpReward}</div><div class="cs2l">XP Earned</div></div>
				<div class="cs2i"><div class="cs2v">📝 {quest.quiz.length > 0 ? Math.round((correct/quest.quiz.length)*100) : 100}%</div><div class="cs2l">Quiz Score</div></div>
				<div class="cs2i"><div class="cs2v">{hoResult==='correct' ? '✅' : '⏭️'}</div><div class="cs2l">Hands-on</div></div>
			</div>
			{#if alreadyDone}<p class="ad2">Already completed. No extra XP.</p>{/if}
			<a href="/" class="btn bp">← Back to Quests</a>
		</div>
		{/if}
	</div>
{/if}
</main>
<style>
	.nf{text-align:center;padding:4rem 0}.nf h2{font-family:'Orbitron',monospace;margin-bottom:1rem}
	.qp{padding:1.5rem 0 3rem;max-width:800px;margin:0 auto}
	.bl{font-size:.85rem;color:#94a3b8;display:inline-block;margin-bottom:1rem;text-decoration:none}.bl:hover{color:#818cf8}
	.qtr{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem}
	.qti{font-size:3rem;background:rgba(129,140,248,.1);padding:.75rem;border-radius:16px}
	.qtn{font-family:'Orbitron',monospace;font-size:1.5rem;font-weight:700;margin:0 0 .25rem}.qtd{color:#94a3b8;font-size:.95rem;margin:0}
	.pb{display:flex;align-items:center;margin-bottom:2rem;padding:1rem;background:rgba(20,21,45,.6);border-radius:12px;border:1px solid rgba(129,140,248,.08)}
	.ps{display:flex;align-items:center;gap:.5rem;opacity:.4;transition:opacity .3s}.ps.active{opacity:1}.ps.done{opacity:.7}
	.pn{width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(129,140,248,.15);font-family:'Orbitron',monospace;font-size:.7rem;font-weight:700;color:#818cf8}
	.ps.active .pn{background:#818cf8;color:#0a0b1a}.ps.done .pn{background:#34d399;color:#0a0b1a}
	.pl{font-size:.8rem;color:#94a3b8}.ps.active .pl{color:#e8e6f0}
	.pc{flex:1;height:2px;background:rgba(129,140,248,.15);margin:0 .5rem}.pc.done{background:#34d399}
	.card{background:rgba(20,21,45,.7);border:1px solid rgba(129,140,248,.12);border-radius:16px;padding:2rem;animation:fi .4s ease-out}
	.tc{text-align:center}
	.lp{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;font-size:.8rem;color:#64748b}
	.lb{flex:1;height:4px;background:rgba(129,140,248,.1);border-radius:2px;overflow:hidden}.lf{height:100%;background:linear-gradient(90deg,#818cf8,#a78bfa);transition:width .3s;border-radius:2px}
	.lc{font-size:1.05rem;line-height:1.8;color:#c8c5d6;min-height:120px}
	.lc :global(strong){color:#e8e6f0;font-weight:600}
	.lc :global(code){background:rgba(129,140,248,.1);padding:.15rem .4rem;border-radius:4px;font-size:.9em;color:#a78bfa}
	.la{display:flex;justify-content:space-between;margin-top:2rem}
	.btn{padding:.65rem 1.5rem;border-radius:10px;font-size:.9rem;font-weight:600;transition:all .2s;text-decoration:none;display:inline-block}
	.bp{background:linear-gradient(135deg,#818cf8,#6366f1);color:#fff;box-shadow:0 2px 12px rgba(129,140,248,.3)}.bp:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(129,140,248,.5)}.bp:disabled{opacity:.4;cursor:not-allowed;transform:none}
	.bs{background:rgba(129,140,248,.1);color:#94a3b8}.bs:hover{color:#e8e6f0}
	.qpr{display:flex;justify-content:space-between;font-size:.85rem;color:#64748b;margin-bottom:1.5rem}.qsc{color:#818cf8;font-weight:600}
	.qq{font-size:1.2rem;font-weight:600;margin-bottom:1.5rem;line-height:1.5}
	.qo{display:flex;flex-direction:column;gap:.75rem;margin-bottom:1.5rem}
	.qob{display:flex;align-items:center;gap:.75rem;padding:1rem;background:rgba(129,140,248,.05);border:1px solid rgba(129,140,248,.1);border-radius:12px;color:#c8c5d6;font-size:.95rem;text-align:left;transition:all .2s;font-family:'Space Grotesk',system-ui,sans-serif;cursor:pointer}
	.qob:hover:not(:disabled){border-color:rgba(129,140,248,.3);background:rgba(129,140,248,.1)}
	.qob.selected{border-color:#818cf8;background:rgba(129,140,248,.15)}
	.qob.correct{border-color:#34d399;background:rgba(52,211,153,.1)}.qob.wrong{border-color:#ef4444;background:rgba(239,68,68,.1)}
	.ol{width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:rgba(129,140,248,.15);font-weight:600;font-size:.85rem;color:#818cf8;flex-shrink:0}
	.qe{background:rgba(129,140,248,.05);border-left:3px solid #818cf8;padding:1rem;border-radius:0 8px 8px 0;margin-bottom:1.5rem;font-size:.9rem;color:#94a3b8;line-height:1.5}
	.qact{display:flex;justify-content:flex-end}
	.hi{font-size:3rem;margin-bottom:1rem}.htt{font-family:'Orbitron',monospace;font-size:1.3rem;margin-bottom:.5rem}
	.hin{color:#94a3b8;font-size:1rem;line-height:1.6;margin-bottom:1.5rem;max-width:600px;margin-left:auto;margin-right:auto}
	.hig{display:flex;gap:.75rem;max-width:400px;margin:0 auto 1rem}
	.hip{flex:1;padding:.75rem 1rem;background:rgba(10,11,26,.8);border:1px solid rgba(129,140,248,.2);border-radius:10px;color:#e8e6f0;font-size:1rem;outline:none;transition:border-color .2s;font-family:'Space Grotesk',system-ui,sans-serif}
	.hip:focus{border-color:#818cf8}.hip.correct{border-color:#34d399}.hip.wrong{border-color:#ef4444;animation:sh .3s}
	.hw{color:#ef4444;font-size:.85rem;margin-bottom:1rem}
	.hf{display:flex;justify-content:center;gap:1.5rem;margin-top:1.5rem}
	.hb{background:none;color:#fbbf24;font-size:.85rem}.htx{color:#d4a843;font-size:.85rem;background:rgba(251,191,36,.08);padding:.5rem 1rem;border-radius:8px}
	.skb{background:none;color:#64748b;font-size:.85rem}.skb:hover{color:#94a3b8}
	.ci2{font-size:4rem;margin-bottom:1rem;animation:bi .6s cubic-bezier(.34,1.56,.64,1)}
	.ct2{font-family:'Orbitron',monospace;font-size:2rem;font-weight:900;background:linear-gradient(135deg,#818cf8,#a78bfa,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem}
	.cn2{color:#94a3b8;font-size:1.1rem;margin-bottom:2rem}
	.cs2{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem}
	.cs2i{background:rgba(129,140,248,.08);border-radius:12px;padding:1rem}
	.cs2v{font-family:'Orbitron',monospace;font-size:1.25rem;font-weight:700;margin-bottom:.25rem}.cs2l{font-size:.75rem;color:#64748b}
	.ad2{color:#94a3b8;font-size:.85rem;margin-bottom:1.5rem}
	@keyframes fi{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
	@keyframes bi{from{transform:scale(0)}to{transform:scale(1)}}
	@keyframes sh{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
	@media(max-width:600px){.card{padding:1.25rem}.qtn{font-size:1.2rem}.pl{display:none}.hig{flex-direction:column}}
</style>
