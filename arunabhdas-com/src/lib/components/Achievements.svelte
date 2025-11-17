<script lang="ts">
	/**
	 * Key Achievements Section
	 * Highlights major accomplishments and career milestones
	 */

	const achievements = [
		{
			icon: '🏆',
			title: 'Official Maintainer - Tabler UI Framework',
			description: 'Maintaining one of the most popular open-source dashboard frameworks with 37,000+ GitHub stars used by thousands of developers worldwide.',
			impact: '37k+ stars, 1k+ forks',
			link: 'https://github.com/tabler/tabler'
		},
		{
			icon: '🤖',
			title: 'AI Agent Framework - AgentZero',
			description: 'Architected and developed autonomous AI agent system enabling workflow automation for enterprise clients with intelligent task orchestration.',
			impact: 'Enterprise adoption',
			link: 'https://github.com/arunabhdas/AgentZero'
		},
		{
			icon: '📱',
			title: 'Kotlin Multiplatform Excellence',
			description: 'Delivered production cross-platform mobile applications with 85%+ code sharing across iOS, Android, and web, demonstrating modern mobile architecture.',
			impact: '85%+ code reuse',
			link: 'https://github.com/arunabhdas/UnicornCRM'
		},
		{
			icon: '🔐',
			title: 'Enterprise ERP Platform - Paradigm',
			description: 'Built privacy-focused agentic ERP platform handling multi-tenant architectures at scale with advanced AI workflow automation.',
			impact: 'Production scale',
			link: 'https://github.com/arunabhdas/Paradigm'
		},
		{
			icon: '🧠',
			title: 'Open Source AI - OpenLibreAI',
			description: 'Created accessible AI platform democratizing machine learning with tools for model fine-tuning, deployment, and inference optimization.',
			impact: 'Community impact',
			link: 'https://github.com/arunabhdas/OpenLibreAI'
		},
		{
			icon: '⚛️',
			title: 'ML Pipeline Orchestration - TokamakAI',
			description: 'Engineered production ML pipeline system handling model training, versioning, and A/B testing for high-throughput enterprise workloads.',
			impact: 'Enterprise ML ops',
			link: 'https://github.com/arunabhdas/TokamakAI'
		}
	];
</script>

<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold text-gradient mb-4">Key Achievements</h2>
			<div class="w-20 h-1 bg-neural-blue mx-auto rounded-full"></div>
			<p class="mt-4 text-gray-400 max-w-2xl mx-auto">
				Notable accomplishments and contributions to the software engineering community
			</p>
		</div>

		<!-- Achievements Grid -->
		<div class="grid md:grid-cols-2 gap-6">
			{#each achievements as achievement, index}
				<div
					class="bg-neural-dark rounded-xl p-6 border border-neural-blue/20 card-glow animate-slide-up"
					style="animation-delay: {index * 0.1}s;"
				>
					<div class="flex items-start gap-4">
						<!-- Icon -->
						<div class="text-5xl flex-shrink-0">
							{achievement.icon}
						</div>

						<!-- Content -->
						<div class="flex-1">
							<h3 class="text-xl font-semibold text-gray-200 mb-2">
								{achievement.title}
							</h3>
							<p class="text-gray-400 text-sm mb-3 leading-relaxed">
								{achievement.description}
							</p>

							<!-- Impact Badge -->
							<div class="flex items-center gap-3">
								<span class="px-3 py-1 bg-neural-blue/20 border border-neural-blue/40 rounded-full text-neural-blue-light text-xs font-medium">
									{achievement.impact}
								</span>
								{#if achievement.link}
									<a
										href={achievement.link}
										target="_blank"
										rel="noopener noreferrer"
										class="text-neural-blue hover:text-neural-blue-light transition-colors text-sm flex items-center gap-1"
									>
										View Project
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</a>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Bottom CTA -->
		<div class="mt-12 text-center">
			<p class="text-gray-400 mb-6">
				Interested in collaborating or learning more about these projects?
			</p>
			<a
				href="#contact"
				class="inline-flex items-center gap-2 px-6 py-3 bg-neural-blue text-white rounded-lg hover:bg-neural-blue-light transition-colors duration-200 font-medium"
			>
				Get In Touch
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
		</div>
	</div>
</section>

