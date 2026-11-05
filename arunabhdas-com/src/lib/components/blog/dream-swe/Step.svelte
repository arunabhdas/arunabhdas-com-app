<script lang="ts">
	/**
	 * One step of the guide. Its title is drawn as a two-line shell prompt.
	 */
	import { getContext, type Snippet } from 'svelte';
	import { PROGRESS_KEY, type GuideProgress } from './progress.svelte';

	const {
		n,
		slug,
		leg,
		seg,
		title,
		children
	}: {
		n: number;
		slug: string;
		leg: string;
		seg: string;
		title: string;
		children: Snippet;
	} = $props();

	const progress = getContext<GuideProgress>(PROGRESS_KEY);
</script>

<article class="step" class:is-done={progress.has(n)} id={`s${n}`} style={`--leg:var(--${leg})`}>
	<header class="prompt">
		<p class="pl" aria-hidden="true">
			<span>~/dream/{String(n).padStart(2, '0')}-{slug}</span>
			<span class="br">{seg}</span>
			<span class="fill"></span>
			<span class="ok">✓</span>
		</p>
		<h3>{n}. {title}</h3>
	</header>

	{@render children()}

	<label class="mark">
		<input
			type="checkbox"
			checked={progress.has(n)}
			onchange={(event) => progress.set(n, event.currentTarget.checked)}
		/>
		Mark step {n} done
	</label>
</article>
