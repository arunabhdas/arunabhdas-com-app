<script lang="ts">
	/**
	 * Blog Layout
	 * Keeps the site header and footer around every blog page
	 */
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const { children } = $props();
</script>

<div class="relative">
	<Header />
	{@render children()}
	<!-- Raised so the guide's fixed wallpaper cannot paint over it -->
	<div class="relative z-10">
		<Footer />
	</div>
</div>
