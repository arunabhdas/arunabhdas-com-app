<script lang="ts">
	/**
	 * Hand the validator a bad plan and watch it refuse, with the real message.
	 */
	import { canonicalJSON, refuse, type Plan } from './engine';

	const when = '2026-11-06T15:00:00Z';
	const cases: { label: string; plan: unknown }[] = [
		{
			label: 'Good plan',
			plan: { steps: [{ id: 's1', action: { addTask: { title: 'Pay rent', due: when } }, after: [] }] }
		},
		{
			label: 'Invented action',
			plan: { steps: [{ id: 's1', action: { deleteFiles: { path: '~' } }, after: [] }] }
		},
		{
			label: 'Date in the past',
			plan: {
				steps: [
					{ id: 's1', action: { addTask: { title: 'Pay rent', due: '2019-01-01T09:00:00Z' } }, after: [] }
				]
			}
		},
		{
			label: 'Steps in a loop',
			plan: {
				steps: [
					{ id: 'a', action: { saveNote: { title: 'A', body: 'x' } }, after: ['b'] },
					{ id: 'b', action: { saveNote: { title: 'B', body: 'x' } }, after: ['a'] }
				]
			}
		},
		{
			label: 'Missing step',
			plan: { steps: [{ id: 's1', action: { extractTasks: { note: 'Retro' } }, after: ['s9'] }] }
		},
		{
			label: 'Three-day meeting',
			plan: {
				steps: [
					{
						id: 's1',
						action: { scheduleEvent: { title: 'Sync', start: when, minutes: 4320 } },
						after: []
					}
				]
			}
		}
	];

	let selected = $state(1);
	const chosen = $derived(cases[selected]);
	const verdict = $derived(refuse(chosen.plan as Plan));
</script>

<figure class="plate wide">
	<div class="demo gate">
		<div class="chips" role="group" aria-label="Plans to try">
			{#each cases as item, index}
				<button type="button" aria-pressed={selected === index} onclick={() => (selected = index)}>
					{item.label}
				</button>
			{/each}
		</div>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre class="result" tabindex="0">{canonicalJSON(chosen.plan)}</pre>
		<p class="verdict" class:pass={!verdict} aria-live="polite">
			{verdict ? `Refused. ${verdict}` : 'Accepted. It can go to you for approval.'}
		</p>
	</div>
</figure>
