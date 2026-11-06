/**
 * Blog post registry.
 * To add a post, create its route at src/routes/blog/<slug>/ and add an entry here.
 */
export const SITE_URL = 'https://arunabhdas.vercel.app';

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	/** ISO date, for example 2026-11-05 */
	date: string;
	readingMinutes: number;
	tags: string[];
	cover: string;
	coverAlt: string;
};

const allPosts: BlogPost[] = [
	{
		slug: 'how-to-build-an-open-harness-for-agentic-engineering',
		title: 'How to Build an Open Harness for Agentic Engineering',
		description:
			'Fifteen steps from stock Pi to OpenHarness, a package that will not let an agent finish until the checks pass and a second agent signs off.',
		date: '2026-11-05',
		readingMinutes: 30,
		tags: ['Agentic Engineering', 'Pi', 'OhMyPi', 'TypeScript', 'AI Agents'],
		cover: '/blog/covers/how-to-build-an-open-harness-for-agentic-engineering.jpg',
		coverAlt: 'A roped climbing route with lit anchors up a mountain face at night, with the post title.'
	},
	{
		slug: 'agentic-ai-without-the-token-tax',
		title: 'Agentic AI Without the Token Tax: Building a Deterministic, On-Device Action Engine',
		description:
			'Fifteen steps to a Swift engine that answers known requests with rules, sends the rest to a local model, and checks every plan before it runs.',
		date: '2026-11-05',
		readingMinutes: 25,
		tags: ['Agentic AI', 'On-Device AI', 'Swift', 'llama.cpp', 'Gemma'],
		cover: '/blog/covers/agentic-ai-without-the-token-tax.jpg',
		coverAlt: 'Rail tracks converging under a signal gantry at night, with the post title.'
	},
	{
		slug: 'how-to-setup-dream-swe-dev-environment-on-macos',
		title: 'How to Setup Dream SWE Dev Environment on macOS',
		description:
			'Thirteen steps from a factory-fresh Mac to a terminal, editor, and agent setup you will want to live in.',
		date: '2026-11-05',
		readingMinutes: 14,
		tags: ['macOS', 'WezTerm', 'Neovim', 'Herdr', 'AI Agents'],
		cover: '/blog/covers/how-to-setup-dream-swe-dev-environment-on-macos.jpg',
		coverAlt: 'The guide title over a foggy teal forest at night, below a terminal prompt.'
	}
];

/** Newest first. */
export const posts = [...allPosts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
	const post = allPosts.find((candidate) => candidate.slug === slug);
	if (!post) throw new Error(`Unknown blog post: ${slug}`);
	return post;
}

export function formatDate(date: string) {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(date));
}
