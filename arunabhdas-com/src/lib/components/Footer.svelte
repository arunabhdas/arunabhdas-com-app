<script lang="ts">
	/**
	 * Footer Component
	 * Site footer with copyright and quick links
	 * Simple, clean design that complements the overall theme
	 */
	
	// Get current year for copyright
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-portfolio-bg border-t border-portfolio-border py-12 px-6 lg:px-12">
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col md:flex-row justify-between items-center gap-6">
			<!-- Copyright -->
			<p class="text-portfolio-muted text-sm tracking-wide">
				© {currentYear} Arunabh Das. All rights reserved.
			</p>
			
			<!-- Quick Links -->
			<div class="flex gap-8">
				<a
					href="#about"
					class="text-portfolio-text hover:text-portfolio-accent transition-colors text-xs tracking-widest uppercase font-medium"
				>
					About
				</a>
				<a
					href="#skills"
					class="text-portfolio-text hover:text-portfolio-accent transition-colors text-xs tracking-widest uppercase font-medium"
				>
					Domains
				</a>
				<a
					href="#projects"
					class="text-portfolio-text hover:text-portfolio-accent transition-colors text-xs tracking-widest uppercase font-medium"
				>
					Case Studies
				</a>
				<a
					href="#contact"
					class="text-portfolio-text hover:text-portfolio-accent transition-colors text-xs tracking-widest uppercase font-medium"
				>
					Contact
				</a>
			</div>
			
			<!-- Built With -->
			<p class="text-portfolio-muted text-xs tracking-widest uppercase">
				<span class="text-portfolio-text">New York City</span>
			</p>
		</div>
	</div>
</footer>
