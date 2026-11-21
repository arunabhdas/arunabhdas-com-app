<script lang="ts">
	/**
	 * The resolution lists from Displays, with the arithmetic Settings leaves out.
	 * The glass stays one size. Picking a resolution changes how much fits on it.
	 */
	type Size = [number, number];
	type Display = {
		id: string;
		name: string;
		tab: string;
		panel: Size;
		standard: Size;
		mine: Size;
		modes: Size[];
	};

	const displays: Display[] = [
		{
			id: 'builtin',
			name: 'built-in 16-inch',
			tab: 'Built-in',
			panel: [3456, 2234],
			standard: [1728, 1117],
			mine: [2056, 1329],
			modes: [
				[2056, 1329],
				[1728, 1117],
				[1496, 967],
				[1312, 848],
				[1168, 755]
			]
		},
		{
			id: 'external',
			name: 'external 4K',
			tab: 'External 4K',
			panel: [3840, 2160],
			standard: [1920, 1080],
			mine: [2880, 1620],
			modes: [
				[3840, 2160],
				[3200, 1800],
				[2880, 1620],
				[2560, 1440],
				[2048, 1152],
				[1920, 1080],
				[1600, 900],
				[1440, 810],
				[1280, 720]
			]
		}
	];

	/** A character of 15-point JetBrains Mono is 9 points wide. */
	const COLUMN = 9;
	const PANE_COLUMNS = 100;
	const LINE = 19;

	let which = $state('builtin');
	let picked = $state<Record<string, string>>({ builtin: '2056x1329', external: '2880x1620' });

	const key = (size: Size) => `${size[0]}x${size[1]}`;
	const same = (a: Size, b: Size) => a[0] === b[0] && a[1] === b[1];

	const display = $derived(displays.find((candidate) => candidate.id === which)!);
	const mode = $derived(display.modes.find((size) => key(size) === picked[which])!);
	const room = $derived((mode[0] * mode[1]) / (display.standard[0] * display.standard[1]));
	const density = $derived(display.panel[0] / mode[0]);
	const columns = $derived(Math.floor(mode[0] / COLUMN));
	const panes = $derived(Math.floor(columns / PANE_COLUMNS));
	const textSize = $derived(Math.round((display.standard[0] / mode[0]) * 100));
	const verdict = $derived(
		density === 2
			? 'Exactly two pixels per point. This is the sharpest the panel gets.'
			: density === 1
				? 'One pixel per point. The most room, with no Retina smoothing at all.'
				: density > 2
					? 'Larger than the default. Everything grows and nothing gets sharper.'
					: 'Scaled. macOS draws a bigger picture and fits it to the panel.'
	);
</script>

<div class="res">
	<div class="res-pick">
		<div class="res-tabs">
			{#each displays as candidate}
				<button
					type="button"
					aria-pressed={which === candidate.id}
					onclick={() => (which = candidate.id)}
				>
					{candidate.tab}
				</button>
			{/each}
		</div>
		<fieldset>
			<legend class="sr">Resolution for the {display.name} display</legend>
			{#each display.modes as size (key(size))}
				<label class:on={key(size) === picked[which]}>
					<input type="radio" name={`res-${which}`} value={key(size)} bind:group={picked[which]} />
					<span>{size[0]} × {size[1]}</span>
					{#if same(size, display.standard)}<em>Default</em>{/if}
					{#if same(size, display.mine)}<em class="mine">Mine</em>{/if}
				</label>
			{/each}
		</fieldset>
	</div>

	<div class="res-show">
		<div
			class="glass"
			style:aspect-ratio={`${display.panel[0]} / ${display.panel[1]}`}
			style:--pw={`${((PANE_COLUMNS * COLUMN) / mode[0]) * 100}%`}
			style:--lh={`${(LINE / mode[1]) * 100}%`}
			aria-hidden="true"
		>
			{#each { length: panes + 1 } as _, index}
				<div class="tpane" class:spill={index === panes}></div>
			{/each}
		</div>
		<dl class="res-stats" aria-live="polite">
			<div><dt>Desktop</dt><dd>{mode[0]} × {mode[1]}<small>points</small></dd></div>
			<div><dt>Room</dt><dd>{room.toFixed(2)}×<small>the default</small></dd></div>
			<div><dt>Text</dt><dd>{textSize}%<small>of default size</small></dd></div>
			<div><dt>Terminal</dt><dd>{columns}<small>columns, {panes} full {panes === 1 ? 'pane' : 'panes'}</small></dd></div>
		</dl>
		<p class="res-note">{density.toFixed(2)} pixels per point. {verdict}</p>
	</div>
</div>
