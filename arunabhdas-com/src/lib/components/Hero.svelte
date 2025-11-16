<script lang="ts">
	/**
	 * Hero Section Component
	 * Landing section with animated introduction and call-to-action
	 * Features gradient text and floating particle effects
	 */
	
	/**
	 * Scroll to contact section
	 */
	function scrollToContact() {
		const contact = document.getElementById('contact');
		if (contact) {
			contact.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- Hero Section with full viewport height -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Animated background particles/stars -->
	<div class="absolute inset-0 opacity-30">
		{#each Array(20) as _, i}
			<div
				class="absolute w-1 h-1 bg-neural-blue rounded-full animate-pulse"
				style="
					top: {Math.random() * 100}%;
					left: {Math.random() * 100}%;
					animation-delay: {Math.random() * 2}s;
					animation-duration: {2 + Math.random() * 2}s;
				"
			/>
		{/each}
	</div>
	
	<!-- Hero Content -->
	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<!-- Main Heading with animation -->
		<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
			<span class="text-gradient">Hi, I'm Arunabh Das</span>
		</h1>
		
		<!-- Subheading -->
		<p class="text-xl sm:text-2xl text-gray-400 mb-4 animate-slide-up" style="animation-delay: 0.1s;">
			Software Engineer
		</p>
		
		<!-- Description -->
		<p class="text-lg text-gray-500 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
			Building innovative solutions with modern technologies. Passionate about creating 
			elegant, efficient, and scalable applications.
		</p>
		
		<!-- Call-to-Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style="animation-delay: 0.3s;">
			<button
				onclick={scrollToContact}
				class="px-8 py-3 bg-neural-blue text-white rounded-lg hover:bg-neural-blue-light transition-colors duration-200 font-medium card-glow"
			>
				Get In Touch
			</button>
			
			<a
				href="#projects"
				class="px-8 py-3 border-2 border-neural-blue text-neural-blue rounded-lg hover:bg-neural-blue hover:text-white transition-all duration-200 font-medium"
			>
				View Projects
			</a>
		</div>
		
		<!-- Scroll Indicator -->
		<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
			<svg
				class="w-6 h-6 text-neural-blue"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				/>
			</svg>
		</div>
	</div>
</section>
