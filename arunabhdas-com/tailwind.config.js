/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Newsreader', 'serif'],
			},
			colors: {
				portfolio: {
					bg: '#09090b', // zinc-950
					surface: '#18181b', // zinc-900
					border: '#27272a', // zinc-800
					text: '#fafafa', // zinc-50
					muted: '#a1a1aa', // zinc-400
					accent: '#d97706', // amber-600
				}
			}
		}
	},
	plugins: []
};
