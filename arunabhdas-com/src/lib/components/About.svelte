<script lang="ts">
	/**
	 * About Section Component
	 * Displays personal introduction and professional background
	 * Responsive layout with image and text content
	 */
</script>

<section id="about" class="py-24 px-6 lg:px-12 border-b border-portfolio-border bg-portfolio-bg">
	<div class="max-w-6xl mx-auto">
		
		<div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
			
			<!-- Profile Image/Visual Element -->
			<div class="order-2 lg:order-1 relative aspect-[4/5] bg-portfolio-surface border border-portfolio-border p-4 flex">
				<img
					src="/arunabhdas.jpg"
					alt="Arunabh Das"
					class="w-full h-full object-cover grayscale opacity-90 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 transition-all duration-700"
				/>
				<div class="absolute bottom-6 left-8 text-portfolio-text font-serif text-2xl rotate-180" style="writing-mode: vertical-rl;">
					Arunabh Das
				</div>
			</div>

			<!-- About Text Content -->
			<div class="order-1 lg:order-2 space-y-8 pt-4">
				<div>
					<h2 class="text-4xl lg:text-5xl font-serif text-portfolio-text mb-6">About Me</h2>
					<div class="w-12 h-[1px] bg-portfolio-text mb-8"></div>
				</div>

				<div class="space-y-6 text-portfolio-muted font-light leading-relaxed text-lg">
					<p>
						I am a Senior Software Engineer specializing in enterprise-scale mobile architecture, 
						high-throughput AI infrastructure, and systems design. As the official core maintainer 
						of <a href="https://github.com/tabler/tabler" target="_blank" rel="noopener noreferrer" class="text-portfolio-text border-b border-portfolio-border hover:border-portfolio-text transition-colors pb-1">Tabler</a>, 
						I've orchestrated the frontend architecture utilized by thousands of global enterprises.
					</p>

					<p>
						My expertise bridges strict native mobile performance (Kotlin Multiplatform) with bleeding-edge 
						backend AI orchestration. I architect platforms that guarantee deterministic reliability across 
						volatile network boundaries and massive data scales.
					</p>

					<p>
						With a proven track record delivering mission-critical infrastructure, my approach focuses 
						on rigorous systems engineering, privacy-first design patterns, and uncompromised scalability.
					</p>
				</div>

				<!-- Key Highlights -->
				<div class="grid grid-cols-3 gap-6 pt-12 border-t border-portfolio-border mt-12">
					<div>
						<p class="text-4xl font-serif text-portfolio-text mb-2">827<span class="text-portfolio-accent">+</span></p>
						<p class="text-portfolio-muted text-xs tracking-widest uppercase font-medium">Repositories</p>
					</div>
					<div>
						<p class="text-4xl font-serif text-portfolio-text mb-2">15<span class="text-portfolio-accent">+</span></p>
						<p class="text-portfolio-muted text-xs tracking-widest uppercase font-medium">Production Apps</p>
					</div>
					<div>
						<p class="text-4xl font-serif text-portfolio-text mb-2">OSS</p>
						<p class="text-portfolio-muted text-xs tracking-widest uppercase font-medium">Maintainer</p>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>
