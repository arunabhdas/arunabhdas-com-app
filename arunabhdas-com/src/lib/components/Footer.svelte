<script lang="ts">
	/**
	 * Footer Component
	 * Site footer with copyright and quick links
	 * Simple, clean design that complements the overall theme
	 */
	
	// Get current year for copyright
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-neural-dark border-t border-neural-blue/20 py-8 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col md:flex-row justify-between items-center gap-4">
			<!-- Copyright -->
			<p class="text-gray-400 text-sm">
				© {currentYear} Arunabh Das. All rights reserved.
			</p>
			
			<!-- Quick Links -->
			<div class="flex gap-6">
				<a
					href="#about"
					class="text-gray-400 hover:text-neural-blue transition-colors text-sm"
				>
					About
				</a>
				<a
					href="#skills"
					class="text-gray-400 hover:text-neural-blue transition-colors text-sm"
				>
					Skills
				</a>
				<a
					href="#projects"
					class="text-gray-400 hover:text-neural-blue transition-colors text-sm"
				>
					Projects
				</a>
				<a
					href="#contact"
					class="text-gray-400 hover:text-neural-blue transition-colors text-sm"
				>
					Contact
				</a>
			</div>
			
			<!-- Built With -->
			<p class="text-gray-500 text-sm">
				Built with <span class="text-neural-blue">Svelte 5</span> & <span class="text-neural-blue">Tailwind</span>
			</p>
		</div>
	</div>
</footer>
