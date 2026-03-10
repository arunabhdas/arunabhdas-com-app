<script lang="ts">
	/**
	 * Contact Section Component
	 * Provides contact form and social media links
	 */

	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let formStatus = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: Event) {
		event.preventDefault();
		formStatus = 'submitting';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to send message');
			}

			formStatus = 'success';

			setTimeout(() => {
				formData = { name: '', email: '', message: '' };
				formStatus = 'idle';
			}, 3000);
		} catch (error) {
			console.error('Error sending message:', error);
			formStatus = 'error';
			errorMessage = error instanceof Error
				? error.message
				: 'Failed to send message. Please try again or email me directly at arunabhdas@gmail.com';

			setTimeout(() => {
				formStatus = 'idle';
				errorMessage = '';
			}, 5000);
		}
	}

	const socialLinks = [
		{ name: 'GitHub', url: 'https://github.com/arunabhdas' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/arunabhdas' },
		{ name: 'Medium', url: 'http://medium.com/@arunabhdas' }
	];
</script>

<section id="contact" class="py-24 px-6 lg:px-12 border-b border-portfolio-border bg-portfolio-bg">
	<div class="max-w-6xl mx-auto">
		
		<!-- Section Header -->
		<div class="mb-20">
			<h2 class="text-4xl lg:text-5xl font-serif text-portfolio-text mb-6">Inquiries</h2>
			<div class="w-12 h-[1px] bg-portfolio-text mb-6"></div>
			<p class="text-xl text-portfolio-muted max-w-2xl font-light">
				Available for select consulting engagements and systems architecture roles.
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-24">
			
			<!-- Contact Form -->
			<div>
				<form on:submit={handleSubmit} class="space-y-12">
					<div class="space-y-6">
						<div>
							<label for="name" class="block text-portfolio-text mb-2 text-sm tracking-widest uppercase">Name</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								required
								class="w-full bg-transparent border-b border-portfolio-border py-4 focus:outline-none focus:border-portfolio-text text-portfolio-text transition-colors"
								placeholder="Jane Doe"
								disabled={formStatus === 'submitting'}
							/>
						</div>

						<div>
							<label for="email" class="block text-portfolio-text mb-2 text-sm tracking-widest uppercase">Email</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								required
								class="w-full bg-transparent border-b border-portfolio-border py-4 focus:outline-none focus:border-portfolio-text text-portfolio-text transition-colors"
								placeholder="jane@example.com"
								disabled={formStatus === 'submitting'}
							/>
						</div>

						<div>
							<label for="message" class="block text-portfolio-text mb-2 text-sm tracking-widest uppercase">Message</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								rows="1"
								class="w-full bg-transparent border-b border-portfolio-border py-4 focus:outline-none focus:border-portfolio-text text-portfolio-text transition-colors resize-none"
								placeholder="How can we collaborate?"
								disabled={formStatus === 'submitting'}
							></textarea>
						</div>
					</div>

					<button
						type="submit"
						disabled={formStatus === 'submitting' || formStatus === 'success'}
						class="px-8 py-4 bg-portfolio-text text-portfolio-bg hover:bg-portfolio-muted transition-colors duration-200 font-medium tracking-wide text-sm disabled:opacity-50 inline-flex items-center gap-4"
					>
						{#if formStatus === 'submitting'}
							Transmitting Database Entry...
						{:else if formStatus === 'success'}
							Message Sent
						{:else}
							Initiate Contact
						{/if}
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</button>

					{#if formStatus === 'success'}
						<p class="text-portfolio-muted text-sm tracking-wide">Signal received. I will respond to your endpoint.</p>
					{/if}
					{#if formStatus === 'error'}
						<p class="text-red-400 text-sm">{errorMessage}</p>
					{/if}
				</form>
			</div>

			<!-- Alternative Contact & Networks -->
			<div class="space-y-16 pt-4 border-l border-portfolio-border pl-12">
				<div>
					<h3 class="text-xl font-serif text-portfolio-text mb-6">Direct Line</h3>
					<a href="mailto:arunabhdas@gmail.com" class="text-portfolio-muted hover:text-portfolio-text transition-colors text-lg tracking-wide border-b border-portfolio-border pb-1 pr-4 inline-block">
						arunabhdas@gmail.com
					</a>
				</div>
				
				<div>
					<h3 class="text-xl font-serif text-portfolio-text mb-6">Global Networks</h3>
					<div class="flex flex-col gap-4">
						{#each socialLinks as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-portfolio-muted hover:text-portfolio-text transition-colors flex items-center gap-4 text-sm tracking-widest uppercase font-medium"
							>
								{social.name}
								<svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
						{/each}
					</div>
				</div>

				<div class="pt-12 text-xs text-portfolio-muted font-mono uppercase tracking-widest">
					<p>Location: New York City (EST)</p>
					<p>Status: Accepting Inquiries</p>
				</div>
			</div>
			
		</div>
	</div>
</section>

