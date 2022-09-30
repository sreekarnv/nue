import type { NextPage } from 'next';
import ChatLayout from '../../layouts/ChatLayout';
import { withUrql } from '../../lib/urql';
import Seo from '../../components/shared/Seo';

const ChatIndexPage: NextPage = ({}) => {
	return (
		<>
			<Seo title={'Chat'} />
			<ChatLayout showSidebar={true} sidebarWidth={'w-[100%]'}>
				<div className='flex flex-col items-center justify-center py-20'>
					<h1 className='font-semibold text-xl'>Start Chatting With Friends</h1>
				</div>
			</ChatLayout>
		</>
	);
};

export default withUrql({})(ChatIndexPage);
