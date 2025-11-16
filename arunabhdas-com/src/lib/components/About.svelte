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
					<div class="aspect-square rounded-2xl bg-gradient-to-br from-neural-blue to-neural-blue-light opacity-20 card-glow flex items-center justify-center">
						<img
						src="/arunabhdas.jpg"
						alt="Arunabh Das"
						class="aspect-square rounded-2xl object-cover w-full shadow-2xl card-glow"
						/>
					</div>

					<!-- Decorative floating element -->
					<div class="absolute -top-4 -right-4 w-24 h-24 bg-neural-blue/10 rounded-full blur-xl"></div>
					<div class="absolute -bottom-4 -left-4 w-32 h-32 bg-neural-blue-light/10 rounded-full blur-xl"></div>
				</div>
			</div>

			<!-- About Text Content -->
			<div class="order-1 md:order-2 space-y-6">
				<p class="text-gray-300 text-lg leading-relaxed">
					I'm a passionate software engineer with expertise in building modern web applications
					and scalable systems. With a strong foundation in full-stack development, I love
					turning complex problems into elegant solutions.
				</p>

				<p class="text-gray-400 leading-relaxed">
					My journey in software development has been driven by curiosity and a constant desire
					to learn. I specialize in creating user-friendly applications that not only look great
					but also perform exceptionally well.
				</p>

				<p class="text-gray-400 leading-relaxed">
					When I'm not coding, you'll find me exploring new technologies, contributing to
					open-source projects, or sharing knowledge with the developer community.
				</p>

				<!-- Key Highlights -->
				<div class="grid grid-cols-2 gap-4 pt-6">
					<div class="p-4 bg-neural-dark rounded-lg border border-neural-blue/20">
						<p class="text-3xl font-bold text-neural-blue mb-1">5+</p>
						<p class="text-gray-400 text-sm">Years Experience</p>
					</div>
					<div class="p-4 bg-neural-dark rounded-lg border border-neural-blue/20">
						<p class="text-3xl font-bold text-neural-blue mb-1">50+</p>
						<p class="text-gray-400 text-sm">Projects Completed</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
