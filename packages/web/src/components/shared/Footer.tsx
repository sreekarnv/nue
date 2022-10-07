import React from 'react';
import clsx from 'clsx';

interface FooterProps {
	className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
	return (
		<>
			<footer className={clsx(['py-6', className])}>
				<div className='max-w-xl mx-auto px-4 md:px-0'>
					<p className='text-center text-gray-500 text-sm'>
						Copyright &copy; {new Date(Date.now()).getFullYear()} by
						<a
							className='hover:underline transition-all duration-300 ease-out hover:text-primary focus-visible:text-primary'
							href='https://github.com/sreekarnv'>
							{' '}
							Sreekar Venkata Nutulapati
						</a>
					</p>
				</div>
			</footer>
		</>
	);
};

export default Footer;
