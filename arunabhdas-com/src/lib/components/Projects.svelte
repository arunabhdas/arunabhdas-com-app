<script lang="ts">
	/**
	 * Case Studies Section Component
	 * Deep dives into major architectural achievements.
	 */
</script>

<section id="projects" class="py-24 px-6 lg:px-12 border-b border-portfolio-border">
	<div class="max-w-6xl mx-auto">
		
		<!-- Section Header -->
		<div class="mb-20">
			<h2 class="text-4xl lg:text-5xl font-serif text-portfolio-text mb-6">Selected Works</h2>
			<div class="w-12 h-[1px] bg-portfolio-text mb-6"></div>
			<p class="text-xl text-portfolio-muted max-w-2xl font-light">
				An overview of large-scale systems I've architected, focusing on geospatial intelligence and open-source infrastructure.
			</p>
		</div>

		<!-- Case Study 1: PolyMatic -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-start">
			<div class="lg:col-span-5 order-2 lg:order-1">
				<h3 class="text-3xl font-serif text-portfolio-text mb-4">PolyMatic</h3>
				<p class="text-sm text-portfolio-accent uppercase tracking-widest font-medium mb-6">Real-Time Geospatial Intelligence</p>
				
				<div class="space-y-4 text-portfolio-muted font-light leading-relaxed mb-8">
					<p>
						A premium macro-geospatial intelligence platform designed to track and cluster real-time OSINT events. 
						PolyMatic processes high-frequency telemetry across aviation, maritime, and conflict domains, 
						overlaying millions of data points onto a 60fps WebGL/ThreeJS globe.
					</p>
					<p>
						Architected the Realtime Semantic Data Ingestion Pipeline (RSDIP) and a sophisticated frontend factory 
						pattern allowing seamless switching between local deterministic mock engines and live websocket streams.
					</p>
				</div>

				<div class="flex flex-wrap gap-2 mb-8">
					{#each ['React 18', 'TypeScript', 'Three.js / R3F', 'Zustand', 'CesiumJS', 'FastAPI', 'PostGIS'] as tech}
						<span class="px-3 py-1 bg-portfolio-surface border border-portfolio-border text-portfolio-text text-xs tracking-wide">
							{tech}
						</span>
					{/each}
				</div>
			</div>
			
			<div class="lg:col-span-7 order-1 lg:order-2 bg-portfolio-surface border border-portfolio-border aspect-video flex relative overflow-hidden group">
				<!-- Placeholder for PolyMatic image -->
				<div class="absolute inset-0 bg-gradient-to-tr from-portfolio-bg to-portfolio-surface opacity-80 mix-blend-overlay"></div>
				<div class="m-auto text-portfolio-muted text-sm font-mono tracking-widest uppercase">PolyMatic_Visual_Data.bin</div>
			</div>
		</div>

		<!-- Case Study 2: Tabler -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
			<div class="lg:col-span-7 bg-portfolio-surface border border-portfolio-border aspect-video flex relative overflow-hidden group">
				<div class="absolute inset-0 bg-gradient-to-tr from-portfolio-bg to-portfolio-surface opacity-80 mix-blend-overlay"></div>
				<div class="m-auto text-portfolio-muted text-sm font-mono tracking-widest uppercase">Tabler_Framework.bin</div>
			</div>

			<div class="lg:col-span-5">
				<h3 class="text-3xl font-serif text-portfolio-text mb-4">Tabler Framework</h3>
				<p class="text-sm text-portfolio-accent uppercase tracking-widest font-medium mb-6">Open Source Infrastructure</p>
				
				<div class="space-y-4 text-portfolio-muted font-light leading-relaxed mb-8">
					<p>
						Official core maintainer of Tabler, one of the world's most popular open-source UI frameworks, 
						powering thousands of enterprise applications and internal dashboards globally.
					</p>
					<p>
						Orchestrated major architectural migrations, optimized component rendering pipelines, and maintained 
						strict accessibility and design system standards across a massive community-driven codebase with over 37,000 GitHub stars.
					</p>
				</div>

				<div class="flex flex-wrap gap-2 mb-8">
					{#each ['HTML/CSS', 'TypeScript', 'Sass', 'Open Source', 'Design Systems'] as tech}
						<span class="px-3 py-1 bg-portfolio-surface border border-portfolio-border text-portfolio-text text-xs tracking-wide">
							{tech}
						</span>
					{/each}
				</div>

				<a
					href="https://github.com/tabler/tabler"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-portfolio-text border-b border-portfolio-border hover:border-portfolio-text transition-colors pb-1 text-sm font-medium tracking-wide uppercase"
				>
					View Repository
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</a>
			</div>
		</div>

		<!-- View GitHub Footer -->
		<div class="pt-16 border-t border-portfolio-border text-center">
			<a
				href="https://github.com/arunabhdas"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-3 px-8 py-4 bg-portfolio-surface border border-portfolio-border text-portfolio-text hover:bg-portfolio-text hover:text-portfolio-bg transition-colors duration-200 font-medium tracking-wide text-sm"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
					<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
				</svg>
				Explore 827+ Open Source Repositories
			</a>
		</div>
	</div>
</section>

