<script lang="ts">
	/**
	 * Header/Navigation Component
	 * Provides site navigation with smooth scrolling to sections
	 * Features a modern, minimal design with hover effects
	 */

	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

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
			class="md:hidden p-2 rounded-lg hover:bg-neural-blue/10 transition-colors relative"
			aria-label="Toggle menu"
			aria-expanded={mobileMenuOpen}
		>
			<div class="w-6 h-6 relative flex items-center justify-center">
				<svg
					class="w-6 h-6 text-gray-300 absolute transition-all duration-300 ease-out"
					class:opacity-0={mobileMenuOpen}
					class:rotate-90={mobileMenuOpen}
					class:scale-0={mobileMenuOpen}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
				<svg
					class="w-6 h-6 text-gray-300 absolute transition-all duration-300 ease-out"
					class:opacity-0={!mobileMenuOpen}
					class:rotate-90={!mobileMenuOpen}
					class:scale-0={!mobileMenuOpen}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
		</button>
		</div>

	<!-- Mobile Navigation Menu -->
	{#if mobileMenuOpen}
		<div
			class="md:hidden py-4 overflow-hidden"
			transition:slide={{ duration: 300, easing: quintOut }}
		>
			{#each navItems as item, i}
				<a
					href={item.href}
					onclick={(e) => handleNavClick(e, item.href)}
					class="block py-2 text-gray-300 hover:text-neural-blue-light transition-colors duration-200"
					style="animation: slideInFade 0.3s ease-out forwards; animation-delay: {i * 50}ms; opacity: 0;"
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
	</nav>
</header>
