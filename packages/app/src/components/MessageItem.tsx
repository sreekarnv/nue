import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import formatDistance from 'date-fns/formatDistance';
import { hooks } from '@modules/graphql';

interface MessageItemProps {
	item: hooks.Message;
	receiver: Partial<hooks.User>;
}

const MessageItem: React.FC<MessageItemProps> = ({ item, receiver }) => {
	return (
		<>
			<View
				style={{
					borderRadius: 10,
					paddingVertical: 15,
					paddingHorizontal: 20,
					backgroundColor: item.sender._id === receiver._id ? '#ccc' : 'green',
					margin: 15,
					alignSelf:
						item.sender._id === receiver._id ? 'flex-start' : 'flex-end',
				}}>
				<Text h4Style={{ fontSize: 18, marginBottom: 5, fontWeight: '400' }} h4>
					{item.text}
				</Text>
				<Text style={{ fontSize: 12 }}>
					{formatDistance(new Date(item.createdAt), new Date(), {
						addSuffix: true,
					})}
				</Text>
			</View>
		</>
	);
};

export default MessageItem;
