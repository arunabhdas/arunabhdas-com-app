<script lang="ts">
	/**
	 * Epic's Xcode range for Unreal Engine 5.8, as a row of versions you can press.
	 * Each verdict restates Epic's requirements page and adds nothing to it.
	 */
	type Verdict = 'best' | 'ok' | 'unlisted' | 'bad';

	const versions: { v: string; verdict: Verdict; head: string; says: string; mine?: boolean }[] = [
		{
			v: '16.4',
			verdict: 'bad',
			head: 'Too old',
			says: "Epic's minimum for Unreal Engine 5.8 is Xcode 26.0. Anything from the Xcode 16 line is below it."
		},
		{
			v: '26.0',
			verdict: 'ok',
			head: 'On the list',
			says: "The minimum Epic accepts for 5.8. It will do, but a recommended version sits just above it."
		},
		{
			v: '26.1.1',
			verdict: 'best',
			head: 'Recommended',
			says: "The version Epic recommends for 5.8. This is the one step 6 installs."
		},
		{
			v: '26.2',
			verdict: 'unlisted',
			head: 'Not named',
			says: "Newer than the recommended version. Epic's page says nothing about it either way, so you would be the test."
		},
		{
			v: '26.3',
			verdict: 'unlisted',
			head: 'Not named',
			says: "Newer than the recommended version. Epic's page says nothing about it either way, so you would be the test."
		},
		{
			v: '26.4',
			verdict: 'bad',
			head: 'Named as broken',
			says: 'Epic\'s page gives it one line: "Xcode 26.4 is not compatible with Unreal Engine."'
		},
		{
			v: '26.5',
			verdict: 'unlisted',
			head: 'Not named',
			says: "Newer than anything on Epic's page. One of the two I had installed.",
			mine: true
		},
		{
			v: '27.0',
			verdict: 'unlisted',
			head: 'Not named',
			says: "A whole major version past the list. The other one I had installed, and my default.",
			mine: true
		}
	];

	const marks: Record<Verdict, string> = { best: '✓', ok: '✓', unlisted: '!', bad: '✗' };

	let picked = $state('27.0');
	const current = $derived(versions.find((version) => version.v === picked)!);
</script>

<div class="xc">
	<div class="xc-row" role="group" aria-label="Xcode versions">
		{#each versions as version}
			<button
				type="button"
				class={version.verdict}
				aria-pressed={picked === version.v}
				onclick={() => (picked = version.v)}
			>
				<span class="mk" aria-hidden="true">{marks[version.verdict]}</span>
				{version.v}
				{#if version.mine}<em>mine</em>{/if}
			</button>
		{/each}
	</div>
	<p class={`xc-says ${current.verdict}`} aria-live="polite">
		<b>Xcode {current.v}: {current.head}.</b>
		{current.says}
	</p>
</div>
