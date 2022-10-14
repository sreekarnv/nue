import { hooks } from '@modules/graphql';
import { Text } from '@rneui/themed';
import React from 'react';
import { FlatList } from 'react-native';
import ChatListItem from '../../components/chat/ChatListItem';
import { ChatScreenProp } from '../../navigation/ChatNavigator';

interface ChatListScreenProps extends ChatScreenProp<'List'> {}

const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
	const [{ fetching, data }] = hooks.useAllUsersQuery();

	if (fetching) return <Text>Loading...</Text>;

	const keyExtractor = (item: hooks.User) => item._id;

	return (
		<>
			<FlatList
				keyExtractor={keyExtractor}
				data={data?.users as hooks.User[]}
				renderItem={({ item }) => (
					<ChatListItem
						item={item}
						onPress={() => navigation.navigate('View', { _id: item._id })}
					/>
				)}
			/>
		</>
	);
};

export default ChatListScreen;
