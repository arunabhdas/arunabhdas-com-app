<script lang="ts">
	/**
	 * Main Page Component
	 * Assembles all sections to create the complete portfolio website
	 * Uses Svelte 5's modern component composition
	 */
	
	// Import all components
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<!-- 
	SEO and Meta Tags
	These help with search engine optimization and social sharing
-->
<svelte:head>
	<title>Arunabh Das - Software Engineer Portfolio</title>
	<meta name="description" content="Portfolio of Arunabh Das, a passionate software engineer specializing in modern web development, full-stack applications, and innovative solutions." />
	<meta name="keywords" content="software engineer, web developer, full-stack, portfolio, Svelte, React, Node.js" />
	
	<!-- Open Graph / Social Media Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Arunabh Das - Software Engineer Portfolio" />
	<meta property="og:description" content="Explore my portfolio of innovative software projects and technical expertise" />
	<meta property="og:url" content="https://arunabhdas.com" />
	
	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Arunabh Das - Software Engineer Portfolio" />
	<meta name="twitter:description" content="Explore my portfolio of innovative software projects and technical expertise" />
</svelte:head>

<!-- Main Content -->
<div class="relative">
	<!-- Navigation Header -->
	<Header />
	
	<!-- Main Content Sections -->
	<main>
		<!-- Hero/Landing Section -->
		<Hero />
		
		<!-- About Section -->
		<About />
		
		<!-- Skills Section -->
		<Skills />
		
		<!-- Projects Section -->
		<Projects />
		
		<!-- Contact Section -->
		<Contact />
	</main>
	
	<!-- Footer -->
	<Footer />
</div>
