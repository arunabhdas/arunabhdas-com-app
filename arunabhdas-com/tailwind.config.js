/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// Custom color palette inspired by the neural interface
			colors: {
				neural: {
					dark: '#0a0e27',
					darker: '#050812',
					blue: '#6b9bd1',
					'blue-light': '#8fb5e0',
					accent: '#4a90e2'
				}
			},
			// Custom animations
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in',
				'slide-up': 'slideUp 0.6s ease-out',
				'glow': 'glow 2s ease-in-out infinite alternate'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				glow: {
					'0%': { 'box-shadow': '0 0 5px rgba(107, 155, 209, 0.5)' },
					'100%': { 'box-shadow': '0 0 20px rgba(107, 155, 209, 0.8)' }
				}
			}
		}
	},
	plugins: []
};
