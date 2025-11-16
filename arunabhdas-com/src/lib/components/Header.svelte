<script lang="ts">
	/**
	 * Header/Navigation Component
	 * Provides site navigation with smooth scrolling to sections
	 * Features a modern, minimal design with hover effects
	 */
	
	// Navigation items configuration
	const navItems = [
		{ label: 'About', href: '#about' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Contact', href: '#contact' }
	];
	
	// State for mobile menu (using Svelte 5 runes)
	let mobileMenuOpen = $state(false);
	
	/**
	 * Toggle mobile menu visibility
	 */
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	/**
	 * Handle navigation clicks with smooth scrolling
	 * @param event - Click event
	 * @param href - Target section ID
	 */
	function handleNavClick(event: MouseEvent, href: string) {
		event.preventDefault();
		mobileMenuOpen = false;
		
		const targetId = href.substring(1);
		const target = document.getElementById(targetId);
		
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<!-- Header with sticky positioning -->
<header class="sticky top-0 z-50 bg-neural-dark/95 backdrop-blur-sm border-b border-neural-blue/20">
	<nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo/Brand -->
			<a href="/" class="text-xl font-bold text-gradient hover:opacity-80 transition-opacity">
				Arunabh Das
			</a>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={(e) => handleNavClick(e, item.href)}
						class="text-gray-300 hover:text-neural-blue-light transition-colors duration-200 font-medium"
					>
						{item.label}
					</a>
				{/each}
			</div>
			
			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMobileMenu}
				class="md:hidden p-2 rounded-lg hover:bg-neural-blue/10 transition-colors"
				aria-label="Toggle menu"
			>
				<svg
					class="w-6 h-6 text-gray-300"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					{#if mobileMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>
		</div>
		
		<!-- Mobile Navigation Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden py-4 animate-fade-in">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={(e) => handleNavClick(e, item.href)}
						class="block py-2 text-gray-300 hover:text-neural-blue-light transition-colors duration-200"
					>
						{item.label}
					</a>
				{/each}
			</div>
		{/if}
	</nav>
</header>
