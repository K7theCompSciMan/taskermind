/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
	content: ['./src/**/*.{svelte, html, js, ts}'],
	theme: {
		extend: {
			colors: {
				indigo: '#08415C',
				'persian-red': '#CC2936',
				'comsic-latte': '#F8F4E3',
				'ash-gray': '#A2A392',
				wisteria: '#BDADEA',
				general: '3B82F6'
			}
		}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.content-auto': {
					'content-visibility': 'auto'
				},
				'.content-hidden': {
					'content-visibility': 'hidden'
				},
				'.content-visible': {
					'content-visibility': 'visible'
				},
			});
		})
	]
};
