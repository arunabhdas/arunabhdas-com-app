<script lang="ts">
	/**
	 * Root Layout Component
	 * This wraps all pages and provides global styles
	 */
	import '../app.css';
	
	// Import child content using Svelte 5 snippet syntax
	const { children } = $props();
</script>

<!-- 
	Root layout wrapper
	All pages will be rendered within this structure
-->
<div class="min-h-screen bg-neural-darker">
	{@render children()}
</div>
