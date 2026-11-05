<script lang="ts">
	/**
	 * The rule tier, running in this page. The clock is pinned, so a request
	 * gets the same hash here as it does from `act plan` on a Mac.
	 */
	import { canonicalJSON, fingerprint, planFromRules, refuse } from './engine';

	const samples = [
		'remind me to send the invoice friday at 3pm',
		'schedule design review tomorrow at 10am for 45 minutes',
		'save a note called Standup: TODO: ship the beta then extract tasks from Standup',
		'remind me to call Sam at 3',
		'nudge me about the invoice on monday'
	];

	/** One real run from the Mac, because this page has no model to ask. */
	const recorded: Record<string, string[]> = {
		'nudge me about the invoice on monday': [
			'route   gemma-3-4b-it-Q4_K_M',
			'tokens  358 local, 0 cloud',
			'time    1493.50 ms',
			's1      {"addTask":{"due":"2026-11-09T09:00:00Z","title":"about the invoice"}}',
			'hash    e6dacc33cd54'
		]
	};

	let request = $state(samples[0]);
	let hash = $state('');

	const plan = $derived(planFromRules(request));
	const refusal = $derived(plan ? refuse(plan) : null);

	$effect(() => {
		const current = plan;
		if (!current || refusal) return;
		fingerprint(current).then(
			(value) => (hash = value),
			() => (hash = 'needs https')
		);
	});
</script>

<figure class="plate wide">
	<div class="demo">
		<label for="engine-request">Type a request</label>
		<div class="ask">
			<span aria-hidden="true">act plan</span>
			<input
				id="engine-request"
				type="text"
				bind:value={request}
				maxlength="200"
				autocomplete="off"
				spellcheck="false"
			/>
		</div>
		<div class="chips">
			{#each samples as sample}
				<button type="button" aria-pressed={request === sample} onclick={() => (request = sample)}>
					{sample}
				</button>
			{/each}
		</div>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre class="result" tabindex="0" aria-live="polite">{#if recorded[request]}{recorded[request].join('\n')}

<span class="note-line">Recorded on the Mac. This page has no model, so nothing ran here.</span>{:else if !plan}route   local model
<span class="stop">stopped</span> No rule matched. On a Mac, the local model takes it from here.
        This page has no model, so it stops.{:else if refusal}route   rules
<span class="stop">stopped</span> {refusal}{:else}route   rules
tokens  <span class="zero">0 local, 0 cloud</span>
{#each plan.steps as step}{step.id}      {canonicalJSON(step.action)}
{/each}hash    <span class="hash">{hash}</span>{/if}</pre>
	</div>
	<figcaption>
		This is the same logic, ported to run here. The clock is pinned to 5 November 2026 at 09:00 UTC, so
		every reader gets the same hash, and so does the Swift build.
	</figcaption>
</figure>
