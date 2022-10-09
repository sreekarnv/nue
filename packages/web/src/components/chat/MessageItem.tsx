import React from 'react';
import { hooks } from '@modules/graphql';
import formatDistance from 'date-fns/formatDistance';
import clsx from 'clsx';
import Link from 'next/link';

interface MessageItemProps {
	message: Partial<hooks.Message>;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
	const [{ data }] = hooks.useLoggedInUserQuery();
	return (
		<li
			className={clsx([
				'w-max mb-4',
				message.sender?._id === data?.user?._id && 'ml-auto',
			])}>
			<div
				className={clsx([
					'p-4 rounded-xl',
					message.sender?._id === data?.user?._id
						? 'bg-green-400'
						: 'bg-gray-200',
				])}>
				<p className='text-black'>{message.text}</p>
				<small className='text-end block'>
					{formatDistance(new Date(message.createdAt), new Date(), {
						addSuffix: true,
					})}
				</small>
			</div>
		</li>
	);
};

export default MessageItem;
