import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';
import React from 'react';
import { hooks } from '@modules/graphql';

interface ChatListItemProps {
	user: Partial<hooks.User>;
	onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ user, onClick }) => {
	return (
		<Link href={`/chat/${user._id}`}>
			<li role='button' onClick={onClick}>
				<div className='flex items-start justify-between p-3 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 transition-all duration-300 ease-out'>
					<div className='flex items-center gap-x-2'>
						<Avatar className='bg-blue-600 cursor-pointer inline-flex items-center justify-center align-middle overflow-hidden select-none w-[45px] h-[45px] rounded-full'>
							<AvatarImage src={user.photo || ''} alt={user.name} />
							<AvatarFallback className='text-black' delayMs={600}>
								{user.name
									?.split(' ')
									.map((el, i) => {
										if (i > 1) return;
										else return el.split('')[0];
									})
									.join('')}
							</AvatarFallback>
						</Avatar>

						<h3 className='font-semibold'>
							{user.name
								?.split(' ')
								.map((el, i) => {
									if (i > 0) return;
									else return el;
								})
								.join('')}
						</h3>
					</div>

					<span className='text-sm'>8:40 PM</span>
				</div>
			</li>
		</Link>
	);
};

export default ChatListItem;
