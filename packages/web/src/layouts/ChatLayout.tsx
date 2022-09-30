import { useRouter } from 'next/router';
import React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdSend } from 'react-icons/md';
import ChatListItem from '../components/chat/ChatListItem';
import Avatar from '../components/shared/ui/Avatar';
import {
	Message,
	useAddMessageMutation,
	useAllUsersQuery,
	useLoggedInUserQuery,
	useLogoutUserMutation,
	useNewMessageSubscription,
} from '../graphql';

interface ChatLayoutProps {
	children: React.ReactNode;
	header?: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
	children,
	header = <></>,
}) => {
	const router = useRouter();
	const audioRef = React.useRef<HTMLAudioElement>(null);

	const [currentMessage, setCurrentMessage] = React.useState<Message | null>(
		null
	);

	const playSound = () => {
		audioRef.current?.play();
	};

	const [{ data: subData }] = useNewMessageSubscription({});

	React.useEffect(() => {
		if ((subData as any)?.message) {
			if (subData?.message._id !== currentMessage?._id) {
				playSound();
				setCurrentMessage(subData?.message as any);
			}
		}
	}, [subData, currentMessage]);

	const [{}, logout] = useLogoutUserMutation();
	const [{ data: usersData }] = useAllUsersQuery();
	const [{}, addMessage] = useAddMessageMutation();
	const [{ data }] = useLoggedInUserQuery();

	const messageRef = React.useRef<HTMLInputElement>(null);
	const [message, setMessage] = React.useState('');

	return (
		<>
			<audio ref={audioRef} src={'/notification.wav'} />
			<div className='h-screen  bg-gray-100 flex items-center justify-center'>
				<div className='bg-white rounded overflow-hidden w-[80vw] h-[80vh] flex shadow-lg'>
					<div className='basis-[20%]'>
						<header className='border-b-2 py-4 px-3 flex items-center justify-between'>
							<div className='flex items-center gap-x-3'>
								<Avatar />
								<span className='font-semibold line-3'>{data?.user?.name}</span>
							</div>
							<button
								onClick={() => logout({})}
								className='bg-gray-50 rounded-full p-2 hover:bg-gray-100 focus-visible:bg-gray-100'>
								<HiOutlineLogout className='h-6 w-6 text-red-400' />
							</button>
						</header>

						<ul className='overflow-auto h-[80vh]'>
							{usersData?.users.map((user) => (
								<ChatListItem key={user._id} user={user} onClick={() => {}} />
							))}
						</ul>
					</div>
					<div className='basis-[80%] flex flex-col justify-between border-l-2'>
						{router.query.id && (
							<header className='border-b-2 py-4 px-4'>
								<>{header}</>
							</header>
						)}
						{true && <>{children}</>}
						{router.query.id && (
							<footer>
								<form
									className='flex items-center'
									onSubmit={async (e) => {
										e.preventDefault();

										if (router.query.id) {
											await addMessage({
												receiver: router.query.id as string,
												text: message,
											});
										}

										setMessage('');
										messageRef.current?.blur();
									}}>
									<input
										ref={messageRef}
										onChange={(e) => setMessage(e.target.value)}
										value={message}
										placeholder='Message'
										type='text'
										className='input m-0 p-0 w-full outline-none focus:outline-none px-3'
									/>
									<button className='btn btn-primary'>
										Send
										<MdSend className='ml-3 h-5 w-5' />
									</button>
								</form>
							</footer>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatLayout;
