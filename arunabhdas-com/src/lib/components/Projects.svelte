<script lang="ts">
	/**
	 * Projects Section Component
	 * Showcases portfolio projects with descriptions and links
	 * Features responsive card grid with hover effects
	 */

	// Project data structure
	interface Project {
		title: string;
		description: string;
		technologies: string[];
		github?: string;
		demo?: string;
		image?: string;
	}

	const projects: Project[] = [
		{
			title: 'Tabler - UI Framework',
			description: 'Official maintainer of Tabler, one of the most popular open-source dashboard UI frameworks with 37,000+ GitHub stars. Used by thousands of developers worldwide for building admin dashboards and web applications.',
			technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Gulp'],
			github: 'https://github.com/tabler/tabler',
			image: '🏆'
		},
		{
			title: 'AgentZero - AI Agent Framework',
			description: 'Production-ready AI agent framework enabling autonomous task execution with LLM orchestration. Used by enterprises for workflow automation and intelligent process management.',
			technologies: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'Vector DB'],
			github: 'https://github.com/arunabhdas/AgentZero',
			image: '🤖'
		},
		{
			title: 'Paradigm - Privacy-Focused ERP',
			description: 'Enterprise Resource Planning platform with built-in AI agents for workflow automation. Handles multi-tenant architectures at scale with privacy-first design principles.',
			technologies: ['Kotlin', 'PostgreSQL', 'Kubernetes', 'React', 'AI Agents'],
			github: 'https://github.com/arunabhdas/Paradigm',
			image: '🔐'
		},
		{
			title: 'UnicornCRM - Kotlin Multiplatform',
			description: 'Cross-platform CRM application built with Kotlin Multiplatform, sharing 85% codebase between Android, iOS, and web. Demonstrates enterprise-scale mobile architecture.',
			technologies: ['Kotlin Multiplatform', 'Compose', 'SwiftUI', 'Cloud Sync'],
			github: 'https://github.com/arunabhdas/UnicornCRM',
			image: '📱'
		},
		{
			title: 'OpenLibreAI - Open Source AI',
			description: 'Democratizing AI access with open-source tools for model fine-tuning, deployment, and inference optimization. Focused on making AI accessible to all developers.',
			technologies: ['Python', 'PyTorch', 'Docker', 'REST API', 'WebUI'],
			github: 'https://github.com/arunabhdas/OpenLibreAI',
			image: '🧠'
		},
		{
			title: 'TokamakAI - ML Orchestration',
			description: 'Production ML pipeline orchestration system handling model training, versioning, and A/B testing at enterprise scale. Built for high-throughput ML workloads.',
			technologies: ['Python', 'MLflow', 'Kubernetes', 'PostgreSQL', 'Redis'],
			github: 'https://github.com/arunabhdas/TokamakAI',
			image: '⚛️'
		},
		{
			title: 'SwiftUI-SideMenu',
			description: 'Native SwiftUI side menu component with smooth animations and gesture support. Used by 100+ iOS apps in production with comprehensive customization options.',
			technologies: ['Swift', 'SwiftUI', 'iOS', 'Animations'],
			github: 'https://github.com/arunabhdas/SwiftUI-SideMenu',
			image: '📲'
		},
		{
			title: 'E2EStack - Full-Stack Platform',
			description: 'Production-ready full-stack boilerplate with authentication, payments, and deployment automation. Accelerates enterprise application development.',
			technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
			github: 'https://github.com/arunabhdas/E2EStack',
			image: '🚀'
		},
		{
			title: 'AndroidGPT - AI Chat Interface',
			description: 'Native Android application integrating GPT models with optimized on-device processing and streaming responses. Features offline capabilities and context management.',
			technologies: ['Kotlin', 'Jetpack Compose', 'OpenAI API', 'Room DB'],
			github: 'https://github.com/arunabhdas/AndroidGPT',
			image: '💬'
		}
	];
</script>

<section id="projects" class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold text-gradient mb-4">Featured Projects</h2>
			<div class="w-20 h-1 bg-neural-blue mx-auto rounded-full"></div>
			<p class="mt-4 text-gray-400 max-w-2xl mx-auto">
				A selection of projects that showcase my skills and experience
			</p>
		</div>

		<!-- Projects Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each projects as project, index}
				<div
					class="bg-neural-dark rounded-xl overflow-hidden border border-neural-blue/20 card-glow animate-slide-up"
					style="animation-delay: {index * 0.05}s;"
				>
			<!-- Project Image/Icon -->
			<div class="h-48 bg-gradient-to-br from-neural-blue/20 to-neural-blue-light/20 flex items-center justify-center">
				{#if project.image}
					<span class="text-8xl">{project.image}</span>
				{:else}
					<svg class="w-16 h-16 text-neural-blue/50" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
					</svg>
				{/if}
			</div>

					<!-- Project Content -->
					<div class="p-6">
						<!-- Project Title -->
						<h3 class="text-xl font-semibold text-gray-200 mb-2">
							{project.title}
						</h3>

						<!-- Project Description -->
						<p class="text-gray-400 text-sm mb-4 line-clamp-3">
							{project.description}
						</p>

						<!-- Technologies -->
						<div class="flex flex-wrap gap-2 mb-4">
							{#each project.technologies as tech}
								<span class="px-2 py-1 bg-neural-darker border border-neural-blue/30 rounded text-neural-blue-light text-xs">
									{tech}
								</span>
							{/each}
						</div>

						<!-- Project Links -->
						<div class="flex gap-3">
							{#if project.github}
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-1 text-gray-400 hover:text-neural-blue transition-colors text-sm"
								>
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
									</svg>
									Code
								</a>
							{/if}

							{#if project.demo}
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-1 text-gray-400 hover:text-neural-blue transition-colors text-sm"
								>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
									Demo
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

	<!-- View More Button -->
	<div class="text-center mt-12">
		<a
			href="https://github.com/arunabhdas"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 px-6 py-3 bg-neural-dark border-2 border-neural-blue text-neural-blue rounded-lg hover:bg-neural-blue hover:text-white transition-all duration-200 font-medium"
		>
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
				<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
			</svg>
			View All 827+ Repositories on GitHub
		</a>
	</div>
	</div>
</section>
