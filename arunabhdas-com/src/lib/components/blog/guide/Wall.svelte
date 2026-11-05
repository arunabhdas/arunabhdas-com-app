<script lang="ts">
	/**
	 * A fixed wallpaper that turns from night to dawn over the last third of the page.
	 * Each post supplies the two images as --night and --dawn.
	 */
	import { onMount } from 'svelte';

	let dawn = $state('0');
	let ticking = false;

	function updateSky() {
		ticking = false;
		const max = document.documentElement.scrollHeight - window.innerHeight;
		const position = max > 0 ? window.scrollY / max : 0;
		const t = Math.min(1, Math.max(0, (position - 0.62) / 0.33));
		dawn = (t * t * (3 - 2 * t)).toFixed(3);
	}

	function onScroll() {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(updateSky);
		}
	}

	onMount(updateSky);
</script>

<svelte:window onscroll={onScroll} onresize={onScroll} />

<div class="wall" aria-hidden="true"><i style:opacity={dawn}></i></div>
