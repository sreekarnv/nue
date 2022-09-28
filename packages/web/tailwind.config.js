/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['var(--font-family)'],
		},
		extend: {},
	},
	plugins: [require('daisyui')],
};
