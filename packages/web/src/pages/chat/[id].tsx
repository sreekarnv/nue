import { useRouter } from 'next/router';
import React from 'react';
import MessageItem from '../../components/chat/MessageItem';
import Avatar from '../../components/shared/ui/Avatar';
import { useMessagesQuery, useNewMessageSubscription } from '../../graphql';
import ChatLayout from '../../layouts/ChatLayout';
import { withUrql } from '../../lib/urql';

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = ({}) => {
	const router = useRouter();

	const [{ fetching: messagesFetching, data: messagesData }] = useMessagesQuery(
		{
			variables: {
				user: router.query.id as string,
			},
		}
	);

	return (
		<>
			<ChatLayout
				header={
					<>
						<div className='flex items-center gap-x-5'>
							<Avatar />
							<h3 className='text-xl font-bold'>
								{messagesData?.receiver.name}
							</h3>
						</div>
					</>
				}>
				{messagesFetching && <p className='text-center py-4'>Loading...</p>}

				<ul>
					{messagesData?.messages?.map((message) => (
						<MessageItem key={message._id} message={message as any} />
					))}
				</ul>
			</ChatLayout>
		</>
	);
};

export default withUrql({})(ChatPage);
