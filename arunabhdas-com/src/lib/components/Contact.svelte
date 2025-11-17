<script lang="ts">
	/**
	 * Contact Section Component
	 * Provides contact form and social media links
	 * Features form validation and submission handling
	 */

	// Form state using Svelte 5 runes
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let formStatus = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	/**
	 * Handle form submission
	 * @param event - Form submit event
	 */
	async function handleSubmit(event: Event) {
		event.preventDefault();
		formStatus = 'submitting';

		try {
			// Replace with actual form submission logic (e.g., API call, email service)
			// For now, simulate submission
			await new Promise(resolve => setTimeout(resolve, 1500));

			// Simulate success
			formStatus = 'success';

			// Reset form after 3 seconds
			setTimeout(() => {
				formData = { name: '', email: '', message: '' };
				formStatus = 'idle';
			}, 3000);
		} catch (error) {
			formStatus = 'error';
			errorMessage = 'Failed to send message. Please try again.';

			// Reset error after 5 seconds
			setTimeout(() => {
				formStatus = 'idle';
				errorMessage = '';
			}, 5000);
		}
	}

	// Social links
	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/arunabhdas',
			icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
		},
		{
			name: 'Medium Blog',
			url: 'http://medium.com/@arunabhdas',
			icon: 'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z'
		},
		{
			name: 'Stack Overflow',
			url: 'https://stackoverflow.com/users/303347/arunabh-das',
			icon: 'M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z'
		},
		{
			name: 'Bluesky',
			url: 'https://bsky.app/profile/arunabhdas.bsky.social',
			icon: 'M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 01-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z'
		}
	];
</script>

<section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 bg-neural-dark/30">
	<div class="max-w-4xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold text-gradient mb-4">Get In Touch</h2>
			<div class="w-20 h-1 bg-neural-blue mx-auto rounded-full"></div>
			<p class="mt-4 text-gray-400">
				Have a question or want to work together? Feel free to reach out!
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-12">
			<!-- Contact Form -->
			<div>
				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- Name Input -->
					<div>
						<label for="name" class="block text-gray-300 mb-2 font-medium">
							Name
						</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="w-full px-4 py-3 bg-neural-dark border border-neural-blue/30 rounded-lg focus:outline-none focus:border-neural-blue text-gray-200 transition-colors"
							placeholder="Your name"
							disabled={formStatus === 'submitting'}
						/>
					</div>

					<!-- Email Input -->
					<div>
						<label for="email" class="block text-gray-300 mb-2 font-medium">
							Email
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full px-4 py-3 bg-neural-dark border border-neural-blue/30 rounded-lg focus:outline-none focus:border-neural-blue text-gray-200 transition-colors"
							placeholder="your.email@example.com"
							disabled={formStatus === 'submitting'}
						/>
					</div>

					<!-- Message Textarea -->
					<div>
						<label for="message" class="block text-gray-300 mb-2 font-medium">
							Message
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="5"
							class="w-full px-4 py-3 bg-neural-dark border border-neural-blue/30 rounded-lg focus:outline-none focus:border-neural-blue text-gray-200 transition-colors resize-none"
							placeholder="Your message..."
							disabled={formStatus === 'submitting'}
						></textarea>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={formStatus === 'submitting' || formStatus === 'success'}
						class="w-full px-6 py-3 bg-neural-blue text-white rounded-lg hover:bg-neural-blue-light transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed card-glow"
					>
						{#if formStatus === 'submitting'}
							Sending...
						{:else if formStatus === 'success'}
							Message Sent!
						{:else}
							Send Message
						{/if}
					</button>

					<!-- Status Messages -->
					{#if formStatus === 'success'}
						<p class="text-green-400 text-center text-sm">
							Thank you for your message! I'll get back to you soon.
						</p>
					{/if}

					{#if formStatus === 'error'}
						<p class="text-red-400 text-center text-sm">
							{errorMessage}
						</p>
					{/if}
				</form>
			</div>

			<!-- Contact Info & Social Links -->
			<div class="space-y-8">
				<!-- Social Links -->
				<div>
					<h3 class="text-xl font-semibold text-gray-200 mb-4">Connect With Me</h3>
					<div class="space-y-3">
						{#each socialLinks as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-3 p-3 bg-neural-dark border border-neural-blue/20 rounded-lg hover:border-neural-blue hover:bg-neural-dark/50 transition-all duration-200 group"
							>
								<svg class="w-6 h-6 text-neural-blue group-hover:text-neural-blue-light transition-colors" fill="currentColor" viewBox="0 0 24 24">
									<path fill-rule="evenodd" d={social.icon} clip-rule="evenodd" />
								</svg>
								<span class="text-gray-300 group-hover:text-neural-blue-light transition-colors">
									{social.name}
								</span>
							</a>
						{/each}
					</div>
				</div>

				<!-- Additional Info -->
				<div class="p-6 bg-neural-dark border border-neural-blue/20 rounded-lg">
					<h3 class="text-xl font-semibold text-gray-200 mb-3">Let's Build Something</h3>
					<p class="text-gray-400 mb-4">
						I'm always interested in hearing about new projects and opportunities.
						Whether you have a question or just want to say hi, I'll try my best to get back to you!
					</p>
					<div class="flex items-center gap-2 text-neural-blue">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span class="text-gray-400">Based in [Your Location]</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
