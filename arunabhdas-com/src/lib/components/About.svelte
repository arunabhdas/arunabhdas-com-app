<script lang="ts">
	/**
	 * About Section Component
	 * Displays personal introduction and professional background
	 * Responsive layout with image and text content
	 */
</script>

<section id="about" class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold text-gradient mb-4">About Me</h2>
			<div class="w-20 h-1 bg-neural-blue mx-auto rounded-full"></div>
		</div>

		<!-- About Content Grid -->
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<!-- Profile Image/Visual Element -->
			<div class="order-2 md:order-1">
				<div class="relative">
					<!-- Placeholder for profile image - replace with actual image -->
					<img
					src="/arunabhdas.jpg"
					alt="Arunabh Das"
					class="aspect-square rounded-2xl object-cover w-full shadow-2xl card-glow"
					/>
					<!-- Decorative floating element -->
					<div class="absolute -top-4 -right-4 w-24 h-24 bg-neural-blue/10 rounded-full blur-xl"></div>
					<div class="absolute -bottom-4 -left-4 w-32 h-32 bg-neural-blue-light/10 rounded-full blur-xl"></div>
				</div>
			</div>

		<!-- About Text Content -->
		<div class="order-1 md:order-2 space-y-6">
			<p class="text-gray-300 text-lg leading-relaxed">
				I'm a senior software engineer specializing in enterprise-scale mobile and AI applications,
				cross-platform mobile development, and fullstack software development. As the official
				maintainer of <a href="https://github.com/tabler/tabler" target="_blank" rel="noopener noreferrer" class="text-neural-blue hover:text-neural-blue-light transition-colors">Tabler</a> and lead developer of multiple AI frameworks including
				AgentZero and OpenLibreAI, I architect solutions that scale to millions of users.
			</p>

			<p class="text-gray-400 leading-relaxed">
				My expertise spans building Kotlin Multiplatform mobile applications with 85%+ code
				sharing, AI-powered SaaS platforms, and enterprise CRM systems deployed across
				Fortune 500 companies. I bridge the gap between cutting-edge AI research
				and production-ready applications.
			</p>

			<p class="text-gray-400 leading-relaxed">
				With a proven track record in delivering mission-critical software at scale, I focus on
				building robust, maintainable systems that solve real business problems. My work
				combines deep technical expertise with a pragmatic approach to software architecture.
			</p>

			<!-- Key Highlights -->
			<div class="grid grid-cols-3 gap-4 pt-6">
				<div class="p-4 bg-neural-dark rounded-lg border border-neural-blue/20">
					<p class="text-3xl font-bold text-neural-blue mb-1">827+</p>
					<p class="text-gray-400 text-sm">Repositories</p>
				</div>
				<div class="p-4 bg-neural-dark rounded-lg border border-neural-blue/20">
					<p class="text-3xl font-bold text-neural-blue mb-1">15+</p>
					<p class="text-gray-400 text-sm">Production Apps</p>
				</div>
				<div class="p-4 bg-neural-dark rounded-lg border border-neural-blue/20">
					<p class="text-3xl font-bold text-neural-blue mb-1">OSS</p>
					<p class="text-gray-400 text-sm">Maintainer</p>
				</div>
			</div>
		</div>
		</div>
	</div>
</section>
