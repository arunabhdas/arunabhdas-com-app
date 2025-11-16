<script lang="ts">
	/**
	 * Skills Section Component
	 * Displays technical skills organized by category
	 * Features animated skill cards with visual progress indicators
	 */
	
	// Skills data structure with categories
	const skillCategories = [
		{
			title: 'Frontend',
			skills: [
				{ name: 'React', level: 90 },
				{ name: 'Svelte', level: 85 },
				{ name: 'TypeScript', level: 88 },
				{ name: 'Tailwind CSS', level: 92 }
			]
		},
		{
			title: 'Backend',
			skills: [
				{ name: 'Node.js', level: 87 },
				{ name: 'Python', level: 85 },
				{ name: 'PostgreSQL', level: 80 },
				{ name: 'MongoDB', level: 82 }
			]
		},
		{
			title: 'DevOps & Tools',
			skills: [
				{ name: 'Docker', level: 83 },
				{ name: 'Git', level: 90 },
				{ name: 'CI/CD', level: 78 },
				{ name: 'AWS', level: 75 }
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
		<div class="grid md:grid-cols-3 gap-8">
			{#each skillCategories as category, categoryIndex}
				<div
					class="bg-neural-dark rounded-xl p-6 border border-neural-blue/20 card-glow animate-slide-up"
					style="animation-delay: {categoryIndex * 0.1}s;"
				>
					<!-- Category Title -->
					<h3 class="text-xl font-semibold text-neural-blue-light mb-6">
						{category.title}
					</h3>
					
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
				{#each ['GraphQL', 'Redis', 'Next.js', 'Vue.js', 'Rust', 'Go', 'Kubernetes', 'Firebase'] as tech}
					<span class="px-4 py-2 bg-neural-dark border border-neural-blue/30 rounded-full text-gray-400 text-sm hover:border-neural-blue hover:text-neural-blue-light transition-colors duration-200">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>
