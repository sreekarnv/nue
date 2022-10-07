import Head from 'next/head';
import React from 'react';

interface SeoProps {
	title?: string;
}

const Seo: React.FC<SeoProps> = ({ title }) => {
	const fullTitle = title ? `${title} | Nue` : 'Nue';
	const description = 'Web messaging app for communicating with your friends';

	return (
		<>
			<Head>
				<title>{fullTitle}</title>
				<meta name='description' content={description} />

				<meta property='og:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='og:type' content={'website'} />
				<meta
					property='og:url'
					content={`${process.env.NEXT_PUBLIC_VERCEL_URL}`}
				/>
				<meta
					property='og:image'
					content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/og-image.png`}
				/>
				<meta
					property='og:image:secure_url'
					content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/og-image.png`}
				/>

				<meta name='twitter:card' content='summary' />
				<meta name='twitter:title' content={title} />
				<meta name='twitter:description' content={description} />

				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				<meta name='msapplication-TileColor' content='#00aba9' />
				<meta name='theme-color' content='#ffffff' />
			</Head>
		</>
	);
};

export default Seo;
