<script lang="ts">
	/**
	 * Key repeat, at real speed. Holding the button runs stock macOS timings
	 * next to the tuned ones, so the difference can be felt.
	 */
	import { onDestroy } from 'svelte';

	type Lane = {
		name: string;
		timing: string;
		delay: number;
		rate: number;
		fast: boolean;
		count: number;
		timeout?: ReturnType<typeof setTimeout>;
		interval?: ReturnType<typeof setInterval>;
	};

	const lanes = $state<Lane[]>([
		{ name: 'Stock macOS', timing: '375 ms, then 90 ms', delay: 375, rate: 90, fast: false, count: 0 },
		{ name: 'After this step', timing: '225 ms, then 30 ms', delay: 225, rate: 30, fast: true, count: 0 }
	]);

	let held = $state(false);
	let button: HTMLButtonElement;

	function press() {
		if (held) return;
		held = true;
		for (const lane of lanes) {
			lane.count = 1;
			lane.timeout = setTimeout(() => {
				lane.count++;
				lane.interval = setInterval(() => lane.count++, lane.rate);
			}, lane.delay);
		}
	}

	function stopTimers() {
		for (const lane of lanes) {
			clearTimeout(lane.timeout);
			clearInterval(lane.interval);
		}
	}

	function release() {
		if (!held) return;
		held = false;
		stopTimers();
	}

	function onPointerDown(event: PointerEvent) {
		event.preventDefault();
		button.focus();
		try {
			button.setPointerCapture(event.pointerId);
		} catch {
			// Capture is a nicety. Release still fires on pointerup.
		}
		press();
	}

	function isActivationKey(event: KeyboardEvent) {
		return event.key === ' ' || event.key === 'Enter';
	}

	function onKeyDown(event: KeyboardEvent) {
		if (!isActivationKey(event)) return;
		event.preventDefault();
		if (!event.repeat) press();
	}

	function onKeyUp(event: KeyboardEvent) {
		if (!isActivationKey(event)) return;
		event.preventDefault();
		release();
	}

	onDestroy(stopTimers);
</script>

<div class="hold">
	{#each lanes as lane}
		<div class="lane" class:fast={lane.fast}>
			<div class="nm">{lane.name}<small>{lane.timing}</small></div>
			<div class="run" aria-hidden="true">{'j'.repeat(Math.min(lane.count, 90))}</div>
			<div class="ct">{lane.count}</div>
		</div>
	{/each}
	<button
		bind:this={button}
		class="holdbtn"
		class:down={held}
		type="button"
		onpointerdown={onPointerDown}
		onpointerup={release}
		onpointercancel={release}
		onlostpointercapture={release}
		onkeydown={onKeyDown}
		onkeyup={onKeyUp}
		onblur={release}
	>
		Press and hold to repeat j
	</button>
</div>
