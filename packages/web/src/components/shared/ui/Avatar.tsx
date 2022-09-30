import React from 'react';
import * as R from '@radix-ui/react-avatar';
import clsx from 'clsx';

interface AvatarProps {
	src: string;
	alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
	return (
		<>
			<R.Avatar
				className={clsx([
					'shadow cursor-pointer inline-flex items-center justify-center align-middle overflow-hidden select-none w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-full',
					src ? 'bg-transparent' : 'bg-blue-600',
				])}>
				<R.AvatarImage src={src} alt={alt} />
				<R.AvatarFallback className='text-black' delayMs={600}>
					{alt?.[0]}
				</R.AvatarFallback>
			</R.Avatar>
		</>
	);
};

export default Avatar;
