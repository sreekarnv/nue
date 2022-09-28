import React from 'react';
import * as R from '@radix-ui/react-avatar';

interface AvatarProps {}

const Avatar: React.FC<AvatarProps> = ({}) => {
	return (
		<>
			<R.Avatar className='bg-blue-600 cursor-pointer inline-flex items-center justify-center align-middle overflow-hidden select-none w-[45px] h-[45px] rounded-full'>
				<R.AvatarImage
					src='https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'
					alt='Pedro Duarte'
				/>
				<R.AvatarFallback className='text-black' delayMs={600}>
					JD
				</R.AvatarFallback>
			</R.Avatar>
		</>
	);
};

export default Avatar;
