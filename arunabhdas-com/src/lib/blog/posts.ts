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
