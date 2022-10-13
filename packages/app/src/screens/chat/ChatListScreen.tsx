import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

interface ChatListScreenProps {}

const ChatListScreen: React.FC<ChatListScreenProps> = ({}) => {
	return (
		<>
			<View>
				<Text>Chat List Screen</Text>
			</View>
		</>
	);
};

export default ChatListScreen;
