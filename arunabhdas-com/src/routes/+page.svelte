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
	import Expertise from '$lib/components/Expertise.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Achievements from '$lib/components/Achievements.svelte';
	import OpenSource from '$lib/components/OpenSource.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<!--
	SEO and Meta Tags
	These help with search engine optimization and social sharing
-->
<svelte:head>
	<title>Arunabh Das - Senior AI/ML Engineer & Mobile Architect | Tabler Maintainer</title>
	<meta name="description" content="Senior Software Engineer & AI/ML Architect specializing in enterprise-scale AI solutions, cross-platform mobile development (Kotlin Multiplatform, Swift), and cloud infrastructure. Official Tabler maintainer with 827+ GitHub repositories." />
	<meta name="keywords" content="AI Engineer, Machine Learning, ML Engineer, Kotlin Multiplatform, iOS Development, Swift, SwiftUI, Android Development, Cloud Architecture, Enterprise Software, AI Agent Framework, Tabler Maintainer, Arunabh Das, Full Stack Developer, DevOps, Kubernetes, TensorFlow, PyTorch" />

	<!-- Open Graph / Social Media Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Arunabh Das - Senior AI/ML & Mobile Engineer" />
	<meta property="og:description" content="Building enterprise-grade AI solutions and cross-platform mobile applications at scale. Official maintainer of Tabler with 827+ open-source contributions." />
	<meta property="og:url" content="https://arunabhdas.vercel.app" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Arunabh Das - Senior AI/ML & Mobile Engineer" />
	<meta name="twitter:description" content="Building enterprise AI/ML solutions, Kotlin Multiplatform apps, and cloud infrastructure. Tabler maintainer." />

	<!-- Additional SEO -->
	<meta name="author" content="Arunabh Das" />
	<link rel="canonical" href="https://arunabhdas.vercel.app" />
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

		<!-- Expertise Highlights -->
		<Expertise />

		<!-- Skills Section -->
		<Skills />

		<!-- Projects Section -->
		<Projects />

		<!-- Key Achievements -->
		<Achievements />

		<!-- Open Source Impact -->
		<OpenSource />

		<!-- Contact Section -->
		<Contact />
	</main>

	<!-- Footer -->
	<Footer />
</div>
