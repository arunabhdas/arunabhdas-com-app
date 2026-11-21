<script lang="ts" module>
	type Base = { label: string; hint?: string; key?: boolean };
	export type Row =
		| (Base & { kind: 'toggle'; on: boolean })
		| (Base & { kind: 'slider'; at: number; ends: [string, string]; says: string })
		| (Base & { kind: 'value'; value: string });
</script>

<script lang="ts">
	/**
	 * One System Settings pane, redrawn as text so it can be read, searched, and printed.
	 * Rows marked `key` are the ones the step changes or leans on.
	 */
	const { title, rows }: { title: string; rows: Row[] } = $props();
</script>

<div class="pane">
	<p class="ptitle"><span aria-hidden="true"><i></i><i></i><i></i></span>{title}</p>
	<dl>
		{#each rows as row}
			<div class="prow" class:key={row.key}>
				<dt>
					{row.label}
					{#if row.hint}<small>{row.hint}</small>{/if}
				</dt>
				<dd>
					{#if row.kind === 'toggle'}
						<span class="tog" class:on={row.on} aria-hidden="true"></span>
						<span class="st">{row.on ? 'On' : 'Off'}</span>
					{:else if row.kind === 'slider'}
						<span class="sl" aria-hidden="true">
							<span>{row.ends[0]}</span>
							<span class="track" style:--at={row.at}></span>
							<span>{row.ends[1]}</span>
						</span>
						<span class="st">{row.says}</span>
					{:else}
						<span class="val">{row.value}</span>
					{/if}
				</dd>
			</div>
		{/each}
	</dl>
</div>
