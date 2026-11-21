<script lang="ts">
	/**
	 * Two ways to choose an Xcode, and who each one reaches. DEVELOPER_DIR is read by
	 * xcodebuild, xcrun, and xcode-select themselves, so it reaches a process only if
	 * that process inherited it from the terminal that set it.
	 */
	type Mode = 'env' | 'system';

	const rows = [
		{ who: 'This terminal', hint: 'Every build command you type here', inherits: true },
		{ who: 'The editor, started from this terminal', hint: 'It inherits what the terminal has', inherits: true },
		{ who: 'A new terminal window', hint: 'Unless the export line is in ~/.zshrc', inherits: false },
		{ who: 'The editor, started from the Launcher', hint: 'The Launcher never saw your terminal', inherits: false },
		{ who: 'Every other build on this Mac', hint: 'Your iOS and macOS projects', inherits: false }
	];

	let mode = $state<Mode>('env');
</script>

<div class="scope">
	<div class="scope-tabs" role="group" aria-label="How the Xcode is chosen">
		<button type="button" aria-pressed={mode === 'env'} onclick={() => (mode = 'env')}>
			export DEVELOPER_DIR
		</button>
		<button type="button" aria-pressed={mode === 'system'} onclick={() => (mode = 'system')}>
			sudo xcode-select -s
		</button>
	</div>
	<dl aria-live="polite">
		{#each rows as row}
			{@const pinned = mode === 'system' || row.inherits}
			<div class="scope-row" class:pinned>
				<dt>{row.who}<small>{row.hint}</small></dt>
				<dd>{pinned ? 'Xcode 26.1.1' : 'Your default Xcode'}</dd>
			</div>
		{/each}
	</dl>
	<p class="scope-note">
		{#if mode === 'env'}
			One terminal gets 26.1.1. Everything else on the Mac stays exactly as it was.
		{:else}
			Everything gets 26.1.1, including work that wanted the newer Xcode. Run it again with the
			other path to switch back.
		{/if}
	</p>
</div>
