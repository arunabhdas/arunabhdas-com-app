<script lang="ts">
	/**
	 * Blog Index
	 * Lists every post, newest first, in the site's own style
	 */
	import { SITE_URL, formatDate, posts } from '$lib/blog/posts';

	const description = 'Long-form guides and field notes on software engineering by Arunabh Das.';
</script>

<svelte:head>
	<title>Blog - Arunabh Das</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blog - Arunabh Das" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={`${SITE_URL}/blog`} />
	<link rel="canonical" href={`${SITE_URL}/blog`} />
</svelte:head>

<main class="py-24 px-6 lg:px-12 border-b border-portfolio-border">
	<div class="max-w-6xl mx-auto">
		<!-- Page Header -->
		<div class="mb-20">
			<h1 class="text-4xl lg:text-5xl font-serif text-portfolio-text mb-6">Blog</h1>
			<div class="w-12 h-[1px] bg-portfolio-text mb-6"></div>
			<p class="text-xl text-portfolio-muted max-w-2xl font-light">
				Long-form guides and field notes on software engineering.
			</p>
		</div>

		<!-- Post List -->
		<div class="space-y-20">
			{#each posts as post (post.slug)}
				<article class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
					<a
						href={`/blog/${post.slug}`}
						class="lg:col-span-7 block bg-portfolio-surface border border-portfolio-border aspect-video overflow-hidden group"
						tabindex="-1"
						aria-hidden="true"
					>
						<img
							src={post.cover}
							alt=""
							width="2000"
							height="1125"
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
						/>
					</a>

					<div class="lg:col-span-5">
						<p class="text-sm text-portfolio-accent uppercase tracking-widest font-medium mb-4">
							<time datetime={post.date}>{formatDate(post.date)}</time>
						</p>
						<h2 class="text-3xl font-serif text-portfolio-text mb-4">
							<a href={`/blog/${post.slug}`} class="hover:text-portfolio-accent transition-colors">
								{post.title}
							</a>
						</h2>
						<p class="text-portfolio-muted font-light leading-relaxed mb-6">{post.description}</p>
						<p class="text-sm text-portfolio-muted mb-6">{post.readingMinutes} min read</p>
						<div class="flex flex-wrap gap-2">
							{#each post.tags as tag}
								<span
									class="px-3 py-1 bg-portfolio-surface border border-portfolio-border text-portfolio-text text-xs tracking-wide"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</main>
