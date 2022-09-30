const siteMap = require('nextjs-sitemap-generator');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

siteMap({
	baseUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
	pagesDirectory: path.join(__dirname, '../src/pages'),
	targetDirectory: path.join(__dirname, '../public'),
	ignoredPaths: ['index', '404'],
	extraPaths: ['/'],
});
