<script lang="ts">
	/**
	 * Skills Section Component
	 * Displays technical skills organized by category
	 * Features animated skill cards with visual progress indicators
	 */

	// Skills data structure with categories
	const skillCategories = [
		{
			title: 'AI & Machine Learning',
			icon: '🤖',
			skills: [
				{ name: 'TensorFlow/PyTorch', level: 90 },
				{ name: 'LLM Integration (GPT, Claude)', level: 92 },
				{ name: 'AI Agent Frameworks', level: 95 },
				{ name: 'Computer Vision', level: 85 }
			]
		},
		{
			title: 'Mobile Development',
			icon: '📱',
			skills: [
				{ name: 'Kotlin Multiplatform', level: 93 },
				{ name: 'Swift/SwiftUI', level: 90 },
				{ name: 'Android (Kotlin/Java)', level: 95 },
				{ name: 'iOS Development', level: 88 }
			]
		},
		{
			title: 'Cloud & DevOps',
			icon: '☁️',
			skills: [
				{ name: 'AWS/GCP/Azure', level: 87 },
				{ name: 'Kubernetes/Docker', level: 90 },
				{ name: 'CI/CD Pipelines', level: 92 },
				{ name: 'Infrastructure as Code', level: 85 }
			]
		},
		{
			title: 'Backend & APIs',
			icon: '⚡',
			skills: [
				{ name: 'Python (FastAPI/Django)', level: 92 },
				{ name: 'Node.js/TypeScript', level: 88 },
				{ name: 'Microservices Architecture', level: 90 },
				{ name: 'GraphQL/REST APIs', level: 93 }
			]
		},
		{
			title: 'Frontend & Web',
			icon: '🎨',
			skills: [
				{ name: 'React/Next.js', level: 90 },
				{ name: 'Svelte/SvelteKit', level: 92 },
				{ name: 'TypeScript', level: 95 },
				{ name: 'Tailwind CSS', level: 93 }
			]
		},
		{
			title: 'Database & Data',
			icon: '💾',
			skills: [
				{ name: 'PostgreSQL', level: 88 },
				{ name: 'MongoDB/Redis', level: 85 },
				{ name: 'Vector Databases', level: 82 },
				{ name: 'Data Pipeline Design', level: 87 }
			]
		}
	];
</script>

<section id="skills" class="py-20 px-4 sm:px-6 lg:px-8 bg-neural-dark/30">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold text-gradient mb-4">Skills & Expertise</h2>
			<div class="w-20 h-1 bg-neural-blue mx-auto rounded-full"></div>
			<p class="mt-4 text-gray-400 max-w-2xl mx-auto">
				A comprehensive overview of my technical skills and proficiencies
			</p>
		</div>

	<!-- Skills Grid -->
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each skillCategories as category, categoryIndex}
			<div
				class="bg-neural-dark rounded-xl p-6 border border-neural-blue/20 card-glow animate-slide-up"
				style="animation-delay: {categoryIndex * 0.1}s;"
			>
				<!-- Category Title with Icon -->
				<div class="flex items-center gap-3 mb-6">
					<span class="text-3xl">{category.icon}</span>
					<h3 class="text-xl font-semibold text-neural-blue-light">
						{category.title}
					</h3>
				</div>

					<!-- Skills List -->
					<div class="space-y-4">
						{#each category.skills as skill}
							<div>
								<!-- Skill Name and Level -->
								<div class="flex justify-between items-center mb-2">
									<span class="text-gray-300 font-medium">{skill.name}</span>
									<span class="text-neural-blue text-sm">{skill.level}%</span>
								</div>

								<!-- Progress Bar -->
								<div class="h-2 bg-neural-darker rounded-full overflow-hidden">
									<div
										class="h-full bg-gradient-to-r from-neural-blue to-neural-blue-light rounded-full transition-all duration-1000 ease-out"
										style="width: {skill.level}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

	<!-- Additional Technologies -->
	<div class="mt-12 text-center">
		<h3 class="text-lg font-semibold text-gray-300 mb-4">Also Experienced With</h3>
		<div class="flex flex-wrap justify-center gap-3">
			{#each ['Kotlin Multiplatform', 'Swift', 'Dart/Flutter', 'TensorFlow', 'OpenAI API', 'LangChain', 'Vector Databases', 'WebRTC', 'Socket.io', 'GraphQL', 'Redis', 'Firebase', 'Supabase', 'Go', 'Rust'] as tech}
				<span class="px-4 py-2 bg-neural-dark border border-neural-blue/30 rounded-full text-gray-400 text-sm hover:border-neural-blue hover:text-neural-blue-light transition-colors duration-200">
					{tech}
				</span>
			{/each}
		</div>
	</div>
	</div>
</section>
