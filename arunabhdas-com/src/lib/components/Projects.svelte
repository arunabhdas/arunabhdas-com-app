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
	
	// Sample projects - replace with actual projects
	const projects: Project[] = [
		{
			title: 'E-Commerce Platform',
			description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
			technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
			github: 'https://github.com/yourusername/ecommerce',
			demo: 'https://demo.example.com'
		},
		{
			title: 'Neural Network Visualizer',
			description: 'Interactive visualization tool for understanding neural network architectures and training processes.',
			technologies: ['Svelte', 'D3.js', 'TensorFlow.js'],
			github: 'https://github.com/yourusername/nn-visualizer',
			demo: 'https://demo.example.com'
		},
		{
			title: 'Real-time Collaboration Tool',
			description: 'A collaborative workspace with real-time editing, video conferencing, and project management features.',
			technologies: ['Next.js', 'WebRTC', 'Socket.io', 'MongoDB'],
			github: 'https://github.com/yourusername/collab-tool'
		},
		{
			title: 'AI Content Generator',
			description: 'Machine learning powered content generation tool with customizable templates and multi-language support.',
			technologies: ['Python', 'FastAPI', 'OpenAI API', 'React'],
			demo: 'https://demo.example.com'
		},
		{
			title: 'DevOps Dashboard',
			description: 'Comprehensive monitoring dashboard for tracking deployments, server health, and application metrics.',
			technologies: ['Vue.js', 'Go', 'Prometheus', 'Grafana'],
			github: 'https://github.com/yourusername/devops-dashboard'
		},
		{
			title: 'Mobile Fitness App',
			description: 'Cross-platform fitness tracking app with workout plans, progress analytics, and social features.',
			technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
			github: 'https://github.com/yourusername/fitness-app'
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
					<!-- Project Image Placeholder -->
					<div class="h-48 bg-gradient-to-br from-neural-blue/20 to-neural-blue-light/20 flex items-center justify-center">
						<svg class="w-16 h-16 text-neural-blue/50" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
						</svg>
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
				href="https://github.com/yourusername"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 px-6 py-3 bg-neural-dark border-2 border-neural-blue text-neural-blue rounded-lg hover:bg-neural-blue hover:text-white transition-all duration-200 font-medium"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
					<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
				</svg>
				View More on GitHub
			</a>
		</div>
	</div>
</section>
