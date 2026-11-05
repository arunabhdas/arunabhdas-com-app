<script lang="ts">
	/**
	 * What an agent loop sends to a cloud model. Each turn resends everything so far,
	 * so input grows with the square of the turns. All inputs are the reader's to change.
	 */
	let base = $state(3000);
	let growth = $state(500);
	let turns = $state(5);
	let tasks = $state(500);
	let inputPrice = $state(3);
	let outputPrice = $state(15);

	const OUTPUT_PER_TURN = 150;

	const sent = $derived(Array.from({ length: turns }, (_, turn) => base + turn * growth));
	const input = $derived(sent.reduce((sum, tokens) => sum + tokens, 0));
	const output = $derived(turns * OUTPUT_PER_TURN);
	const monthly = $derived(((input * inputPrice + output * outputPrice) / 1_000_000) * tasks * 30);
	const largest = $derived(Math.max(...sent));

	const number = new Intl.NumberFormat('en-US');
	const money = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0
	});
</script>

<figure class="plate wide">
	<div class="meter">
		<div class="dials">
			<label>
				<span>System prompt and tools <b>{number.format(base)}</b></span>
				<input type="range" min="500" max="20000" step="100" bind:value={base} />
			</label>
			<label>
				<span>Tokens added each turn <b>{number.format(growth)}</b></span>
				<input type="range" min="50" max="4000" step="50" bind:value={growth} />
			</label>
			<label>
				<span>Turns per task <b>{turns}</b></span>
				<input type="range" min="1" max="20" bind:value={turns} />
			</label>
			<label>
				<span>Tasks a day <b>{number.format(tasks)}</b></span>
				<input type="range" min="10" max="10000" step="10" bind:value={tasks} />
			</label>
			<div class="prices">
				<label>
					<span>$ per 1M input</span>
					<input type="number" min="0" step="0.05" bind:value={inputPrice} />
				</label>
				<label>
					<span>$ per 1M output</span>
					<input type="number" min="0" step="0.05" bind:value={outputPrice} />
				</label>
			</div>
		</div>
		<div class="bill">
			<ol class="turns" aria-label="Input tokens sent on each turn">
				{#each sent as tokens, index}
					<li>
						<span>turn {index + 1}</span>
						<i style:width={`${(tokens / largest) * 100}%`}></i>
						<b>{number.format(tokens)}</b>
					</li>
				{/each}
			</ol>
			<dl>
				<div>
					<dt>One task sends</dt>
					<dd>{number.format(input)} <small>input tokens</small></dd>
				</div>
				<div>
					<dt>A 30-day month costs</dt>
					<dd class="tax">{money.format(monthly)}</dd>
				</div>
				<div>
					<dt>The engine you are about to build</dt>
					<dd class="zero">0 <small>cloud tokens, $0</small></dd>
				</div>
			</dl>
		</div>
	</div>
	<figcaption>
		The defaults are assumptions, not measurements. Each turn also returns {OUTPUT_PER_TURN} output
		tokens. Put in your own traffic and your provider's current prices. Prompt caching cuts the price
		of repeated input, not the number of tokens sent.
	</figcaption>
</figure>
