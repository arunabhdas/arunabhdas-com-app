<script lang="ts">
	/**
	 * A code block with a copy button. Code lives in code-blocks.json, keyed by id,
	 * so the commands stay separate from the page markup.
	 */
	import blocks from './code-blocks.json';
	import { highlight } from './highlight';

	const { id }: { id: keyof typeof blocks } = $props();

	const block = $derived(blocks[id]);
	const html = $derived(highlight(block.code, block.lang));

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	function showCopied() {
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1400);
	}

	function copyWithSelection() {
		const area = document.createElement('textarea');
		area.value = block.code;
		area.style.position = 'fixed';
		area.style.opacity = '0';
		document.body.appendChild(area);
		area.select();
		try {
			document.execCommand('copy');
		} finally {
			area.remove();
		}
		showCopied();
	}

	function copy() {
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(block.code).then(showCopied, copyWithSelection);
		} else {
			copyWithSelection();
		}
	}
</script>

<div class="code has-copy" class:has-file={block.file}>
	{#if block.file}
		<span class="file">{block.file}</span>
	{/if}
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre tabindex="0"><code>{@html html}</code></pre>
	<button class="copy" class:ok={copied} type="button" aria-label="Copy this code" onclick={copy}>
		{copied ? 'Copied' : 'Copy'}
	</button>
</div>
