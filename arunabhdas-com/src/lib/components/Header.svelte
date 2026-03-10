<script lang="ts">
	/**
	 * Navigation Component
	 * Provides site navigation with smooth scrolling to sections
	 */

	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Navigation items configuration
	const navItems = [
		{ label: 'About', href: '#about' },
		{ label: 'Expertise', href: '#skills' },
		{ label: 'Case Studies', href: '#projects' },
		{ label: 'Contact', href: '#contact' }
	];

	// State for mobile menu
	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

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

<header class="sticky top-0 z-50 bg-portfolio-bg/95 backdrop-blur-sm border-b border-portfolio-border">
	<nav class="max-w-6xl mx-auto px-6 lg:px-12">
		<div class="flex items-center justify-between h-20">
			<!-- Logo/Brand -->
			<a href="/" class="text-xl font-serif tracking-widest uppercase text-portfolio-text hover:text-portfolio-accent transition-colors">
				A. Das
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-12">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={(e) => handleNavClick(e, item.href)}
						class="text-portfolio-muted hover:text-portfolio-text transition-colors duration-200 text-sm tracking-widest uppercase font-medium"
					>
						{item.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMobileMenu}
				class="md:hidden p-2 text-portfolio-text hover:text-portfolio-accent transition-colors"
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
				</svg>
			</button>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden py-6 border-t border-portfolio-border" transition:slide={{ duration: 300, easing: quintOut }}>
				{#each navItems as item}
					<a
						href={item.href}
						onclick={(e) => handleNavClick(e, item.href)}
						class="block py-4 text-portfolio-text tracking-widest uppercase text-sm"
					>
						{item.label}
					</a>
				{/each}
			</div>
		{/if}
	</nav>
</header>

