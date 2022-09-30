import { useRouter } from 'next/router';
import React from 'react';
import MessageItem from '../../components/chat/MessageItem';
import Seo from '../../components/shared/Seo';
import Avatar from '../../components/shared/ui/Avatar';
import { useMessagesQuery } from '../../graphql';
import ChatLayout from '../../layouts/ChatLayout';
import { withUrql } from '../../lib/urql';
import { MdMenu } from 'react-icons/md';
import Loader from '../../components/shared/ui/Loader';

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = ({}) => {
	const [showSidebar, setShowSidebar] = React.useState(false);

	const chatRef = React.useRef<HTMLDivElement>(null);
	const router = useRouter();

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const [{ fetching: messagesFetching, data: messagesData }] = useMessagesQuery(
		{
			variables: {
				user: router.query.id as string,
			},
		}
	);

	const scrollToNewMessages = () => {
		if (chatRef.current)
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
	};

	React.useEffect(() => {
		scrollToNewMessages();
	}, [messagesData]);

	return (
		<>
			<Seo title={`${messagesData?.receiver.name} | Chat`} />
			<ChatLayout
				toggleSidebar={toggleSidebar}
				showSidebar={showSidebar}
				header={
					<>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-x-2 md:gap-x-5'>
								<Avatar
									src={messagesData?.receiver.photo || ''}
									alt={messagesData?.receiver.name || ''}
								/>
								<h3 className='text-lg md:text-xl font-bold'>
									<span className='hidden md:block'>
										{messagesData?.receiver.name}
									</span>
									<span className='md:hidden'>
										{messagesData?.receiver.name.split(' ')[0]}
									</span>
								</h3>
							</div>

							<button
								onClick={() => setShowSidebar(!showSidebar)}
								className='md:hidden'>
								<MdMenu size={30} />
							</button>
						</div>
					</>
				}>
				<main
					ref={chatRef}
					className='bg-gray-50 flex-grow border-b-2 py-4 px-3 overflow-auto min-h-[20vh] w-full'>
					{messagesFetching && (
						<div className='text-center py-4'>
							<Loader />
						</div>
					)}

					<ul>
						{messagesData?.messages?.map((message) => (
							<MessageItem key={message._id} message={message as any} />
						))}
					</ul>
				</main>
			</ChatLayout>
		</>
	);
};

export default withUrql({ ssr: true })(ChatPage);
