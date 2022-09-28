import type { NextPage } from 'next';
import React from 'react';
import { Message, useNewMessageSubscription } from '../../graphql';
import ChatLayout from '../../layouts/ChatLayout';
import { withUrql } from '../../lib/urql';
import { useRouter } from 'next/router';

const ChatIndexPage: NextPage = ({}) => {
	return (
		<>
			<ChatLayout>
				<div className='flex flex-col items-center justify-center py-20'>
					<h1 className='font-semibold text-xl'>Start Chatting With Friends</h1>
				</div>
			</ChatLayout>
		</>
	);
};

export default withUrql({})(ChatIndexPage);
