import Head from 'next/head';
import React from 'react';

interface SeoProps {
	title?: string;
}

const Seo: React.FC<SeoProps> = ({ title }) => {
	const fullTitle = title ? `${title} | Neu` : 'Neu';

	return (
		<>
			<Head>
				<title>{fullTitle}</title>
			</Head>
		</>
	);
};

export default Seo;
