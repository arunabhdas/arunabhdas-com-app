<script lang="ts">
	/**
	 * Blog post: How to Optimize Dev Env for Maximum Dev Productivity
	 */
	import OptimizeEnvGuide from '$lib/components/blog/optimize-env/OptimizeEnvGuide.svelte';
	import { SITE_URL, getPost } from '$lib/blog/posts';

	const post = getPost('how-to-optimize-dev-env-for-maximum-dev-productivity');
	const url = `${SITE_URL}/blog/${post.slug}`;
	const image = `${SITE_URL}${post.cover}`;
</script>

<svelte:head>
	<title>{post.title} - Arunabh Das</title>
	<meta name="description" content={post.description} />
	<meta name="author" content="Arunabh Das" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="article:published_time" content={post.date} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.description} />
	<meta name="twitter:image" content={image} />
	<link rel="canonical" href={url} />
</svelte:head>

<OptimizeEnvGuide />
