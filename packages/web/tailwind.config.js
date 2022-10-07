/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['var(--font-family)'],
		},
		extend: {
			colors: {
				'primary-light': '#d4fade',
			},
		},
	},
	plugins: [require('daisyui')],
};
