<script lang="ts">
	/**
	 * Hero Section Component
	 * Editorial minimalist landing section.
	 */
	function scrollToContact() {
		const contact = document.getElementById('contact');
		if (contact) {
			contact.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<section class="relative min-h-[90vh] flex flex-col justify-center overflow-hidden border-b border-portfolio-border pt-20 pb-12">
	<div class="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col items-start text-left">
		
		<!-- Subheading / Eyebrow -->
		<div class="flex items-center gap-3 mb-8">
			<div class="w-10 h-[1px] bg-portfolio-accent"></div>
			<p class="text-sm tracking-[0.2em] text-portfolio-accent uppercase font-medium">
				Arunabh Das
			</p>
		</div>

		<!-- Main Heading with Editorial Serif -->
		<h1 class="text-6xl sm:text-7xl lg:text-8xl font-serif text-portfolio-text leading-tight mb-8">
			Architecting<br />
			<span class="text-portfolio-muted">AI-native mobile applications</span><br />
			and Machine Learning at scale
		</h1>

		<!-- Description -->
		<p class="text-xl sm:text-2xl text-portfolio-muted mb-12 max-w-2xl font-light leading-relaxed">
			Senior Software Engineer. Building enterprise-grade AI solutions and cross-platform mobile architecture at scale. Official maintainer of <a href="https://github.com/tabler/tabler" target="_blank" rel="noopener noreferrer" class="text-portfolio-text border-b border-portfolio-border hover:border-portfolio-text transition-colors">Tabler</a>.
		</p>

		<!-- Call-to-Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-6 mt-4">
			<button
				on:click={scrollToContact}
				class="px-8 py-4 bg-portfolio-text text-portfolio-bg hover:bg-portfolio-muted transition-colors duration-200 font-medium tracking-wide text-sm"
			>
				Contact Me
			</button>

			<a
				href="#projects"
				class="px-8 py-4 border border-portfolio-border text-portfolio-text hover:border-portfolio-text transition-colors duration-200 font-medium tracking-wide text-sm flex items-center gap-2"
			>
				View Case Studies
			</a>
		</div>

	</div>
</section>
