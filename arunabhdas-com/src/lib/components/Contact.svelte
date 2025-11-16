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
			url: 'https://github.com/yourusername',
			icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/yourusername',
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/yourusername',
			icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
		},
		{
			name: 'Email',
			url: 'mailto:your.email@example.com',
			icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
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
