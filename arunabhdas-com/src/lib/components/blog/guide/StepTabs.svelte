<script lang="ts">
	/**
	 * WezTerm's tab bar, doing the job of a table of contents.
	 * It follows the step in view and keeps count of finished steps.
	 */
	import { onMount } from 'svelte';
	import type { GuideProgress } from './progress.svelte';

	const { progress, tabs }: { progress: GuideProgress; tabs: string[] } = $props();

	let current = $state('');
	let list: HTMLOListElement;

	function setCurrent(id: string) {
		current = id;
		const link = list.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`);
		if (link) {
			const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
			list.scrollTo({ left, behavior: 'auto' });
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setCurrent(entry.target.id);
				}
			},
			{ rootMargin: '-25% 0px -65% 0px' }
		);
		document.querySelectorAll('.blog-guide .step').forEach((step) => observer.observe(step));
		return () => observer.disconnect();
	});
</script>

<nav class="tabs" aria-label="Steps in this guide">
	<ol bind:this={list}>
		{#each tabs as tab, index}
			{@const n = index + 1}
			<li>
				<a
					href={`#s${n}`}
					class:done={progress.has(n)}
					aria-current={current === `s${n}` ? 'true' : undefined}
				>
					<span class="n">{n}</span>{tab}
				</a>
			</li>
		{/each}
	</ol>
	<div class="tally" aria-live="polite"><span><b>{progress.done.length}</b>/{tabs.length} done</span></div>
</nav>
