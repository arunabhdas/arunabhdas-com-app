<script lang="ts">
	/**
	 * Expertise Domains Component
	 * Editorial layout showcasing high-level technical focus areas.
	 */

	const domains = [
		{
			title: 'Artificial Intelligence & Machine Learning',
			description: 'Architecting inference pipelines, orchestrating LLM agent frameworks (AgentZero), and optimizing enterprise-scale vector search and RAG workloads.',
			tech: ['PyTorch', 'TensorFlow', 'CUDA', 'LangChain', 'FastAPI']
		},
		{
			title: 'Distributed Systems & Infrastructure',
			description: 'Designing high-throughput, low-latency microservices with robust event-driven architectures. Building custom multi-tenant environments with strict data boundaries.',
			tech: ['Kubernetes', 'Kafka', 'PostgreSQL', 'Redis', 'AWS/GCP']
		},
		{
			title: 'Mobile & Front-End Architecture',
			description: 'Pioneering cross-platform mobile development using Kotlin Multiplatform while maintaining strict native-level performance guarantees on large-scale applications.',
			tech: ['Kotlin Multiplatform', 'SwiftUI', 'React/Next.js', 'WebSockets', 'WebGL']
		}
	];
</script>

<section id="skills" class="py-24 px-6 lg:px-12 border-b border-portfolio-border bg-portfolio-bg">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="mb-20">
			<h2 class="text-4xl lg:text-5xl font-serif text-portfolio-text mb-6">Core Domains</h2>
			<div class="w-12 h-[1px] bg-portfolio-text mb-6"></div>
			<p class="text-xl text-portfolio-muted max-w-2xl font-light">
				My engineering focus spans the entire stack, optimizing for scale, performance, and deterministic reliability.
			</p>
		</div>

		<!-- Domains List -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			{#each domains as domain, index}
				<div class="flex flex-col border-t border-portfolio-border pt-8">
					<h3 class="text-2xl font-serif text-portfolio-text mb-4">
						{domain.title}
					</h3>
					
					<p class="text-portfolio-muted font-light leading-relaxed mb-8 flex-grow">
						{domain.description}
					</p>

					<div class="flex flex-wrap gap-2">
						{#each domain.tech as tech}
							<span class="px-2 py-1 bg-portfolio-surface border border-portfolio-border text-portfolio-text text-[10px] uppercase tracking-wider font-medium">
								{tech}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Additional Technologies list -->
		<div class="mt-20 pt-12 border-t border-portfolio-border">
			<p class="text-sm text-portfolio-accent uppercase tracking-widest font-medium mb-6">Technologies & Languages</p>
			<div class="flex flex-wrap gap-x-6 gap-y-3">
				{#each ['Kotlin', 'Swift', 'Python', 'TypeScript', 'Rust', 'Go', 'Docker', 'GraphQL', 'Firebase', 'Supabase', 'WebRTC'] as tech}
					<span class="text-portfolio-text font-serif text-lg tracking-wide">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>

