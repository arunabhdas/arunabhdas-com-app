<script lang="ts">
	/**
	 * What a stale edit looks like. The model reads the file and plans an edit by anchor.
	 * If the file moves on before the edit lands, every anchor is checked and nothing changes.
	 */
	import { applyEdits, lineHash, render, StaleAnchor } from './core/hashline';

	const ORIGINAL = [
		'export function total(items) {',
		'  let sum = 1;',
		'  for (const item of items) sum += item;',
		'  return sum;',
		'}',
		''
	].join('\n');
	const TARGET = '  let sum = 1;';

	let file = $state(ORIGINAL);
	let outcome = $state('');
	let ok = $state(false);

	const anchor = `2#${lineHash(TARGET)}`;
	const shown = $derived(render(file));

	function change(next: string) {
		file = next;
		outcome = '';
	}

	function apply() {
		try {
			file = applyEdits(file, [{ from: anchor, lines: ['  let sum = 0;'] }]);
			ok = true;
			outcome = 'Applied. The anchor still matched, so the edit landed on the right line.';
		} catch (error) {
			if (!(error instanceof StaleAnchor)) throw error;
			ok = false;
			outcome = `Refused. ${error.message} The file was not touched.`;
		}
	}
</script>

<figure class="plate wide">
	<div class="demo">
		<p class="plan">The model read this file and wants to replace line <code>{anchor}</code> with <code>let sum = 0;</code></p>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre class="result" tabindex="0">{shown}</pre>
		<div class="chips" role="group" aria-label="Change the file first">
			<button type="button" onclick={() => change(file.replace('let sum = 1', 'let sum = 10'))}>A teammate changes line 2</button>
			<button type="button" onclick={() => change(`// totals\n${file}`)}>A formatter adds a line at the top</button>
			<button type="button" onclick={() => change(ORIGINAL)}>Reset the file</button>
		</div>
		<button class="go" type="button" onclick={apply}>Apply the model's edit</button>
		<p class="verdict" class:pass={ok} aria-live="polite">{outcome}</p>
	</div>
	<figcaption>This is <code>src/hashline.ts</code> itself, running in your browser.</figcaption>
</figure>
