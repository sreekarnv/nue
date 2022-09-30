const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config();

const robotsTxt = `User-agent: *\nAllow: / \n\nSitemap: ${process.env.NEXT_PUBLIC_VERCEL_URL}/sitemap.xml`;

(function generateRobotsTxt() {
	fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsTxt);
})();
