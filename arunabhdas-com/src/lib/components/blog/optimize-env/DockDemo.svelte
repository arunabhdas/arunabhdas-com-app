<script lang="ts">
	/**
	 * A Dock at the two ends of its sliders: the smallest size, the largest magnification.
	 * Move across it and the icons grow from 16 points toward 128, as they do in macOS.
	 */
	const apps = [
		{ name: 'Finder', color: '#0FC5ED' },
		{ name: 'Terminal', color: '#47FF9C' },
		{ name: 'Editor', color: '#A277FF' },
		{ name: 'Browser', color: '#FFE073' },
		{ name: 'Agents', color: '#FF8A65' },
		{ name: 'Containers', color: '#24EAF7' },
		{ name: 'Database', color: '#CBE0F0' },
		{ name: 'Simulator', color: '#7FB6FF' },
		{ name: 'Chat', color: '#44FFB1' },
		{ name: 'Notes', color: '#FFD08F' },
		{ name: 'Settings', color: '#8FB3CB' }
	];

	const REST = 16;
	const LARGEST = 128;
	/** How many icons either side of the pointer grow with it. */
	const REACH = 3.2;

	let dock: HTMLDivElement;
	let stage: HTMLDivElement;
	let at = $state<number | null>(null);
	let pinned = $state(false);
	let stageWidth = $state(680);

	/** On a narrow screen the largest icon shrinks to fit. */
	const largest = $derived(Math.min(LARGEST, Math.max(48, Math.floor(stageWidth / 5.2))));
	const focus = $derived(at ?? (pinned ? apps.length / 2 : null));
	const sizes = $derived(
		apps.map((_, index) => {
			if (focus === null) return REST;
			const distance = Math.abs(focus - (index + 0.5));
			if (distance >= REACH) return REST;
			const lift = Math.cos((distance / REACH) * (Math.PI / 2));
			return REST + (largest - REST) * lift * lift;
		})
	);
	const tallest = $derived(Math.round(Math.max(...sizes)));
	const under = $derived(focus === null ? null : apps[Math.min(apps.length - 1, Math.floor(focus))]);

	function track(event: PointerEvent) {
		const box = dock.getBoundingClientRect();
		const position = ((event.clientX - box.left) / box.width) * apps.length;
		at = Math.min(apps.length - 0.01, Math.max(0, position));
	}

	function release() {
		at = null;
	}

	$effect(() => {
		const observer = new ResizeObserver(([entry]) => (stageWidth = entry.contentRect.width));
		observer.observe(stage);
		return () => observer.disconnect();
	});
</script>

<div class="dockdemo">
	<div class="desk" bind:this={stage}>
		<p class="readout-line" aria-live="polite">
			{#if under}
				<b>{under.name}</b> at {tallest} points
			{:else}
				At rest: {REST} points
			{/if}
		</p>
		<div
			class="shelf"
			bind:this={dock}
			role="img"
			aria-label={`A Dock with ${apps.length} icons, ${REST} points tall at rest, growing to ${largest} points under the pointer`}
			onpointermove={track}
			onpointerdown={track}
			onpointerleave={release}
			onpointercancel={release}
		>
			{#each apps as app, index}
				<span
					class="app"
					style:width={`${sizes[index]}px`}
					style:height={`${sizes[index]}px`}
					style:background={app.color}
				></span>
			{/each}
		</div>
	</div>
	<button class="dockbtn" type="button" aria-pressed={pinned} onclick={() => (pinned = !pinned)}>
		{pinned ? 'Let it rest' : 'No pointer? Magnify the middle'}
	</button>
</div>
