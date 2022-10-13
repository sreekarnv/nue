import { hooks } from '@modules/graphql';
import { Text, ListItem, Avatar } from '@rneui/themed';
import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { ChatScreenProp } from '../../navigation/ChatNavigator';

interface ChatListScreenProps extends ChatScreenProp<'List'> {}

const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
	const [{ fetching, data }] = hooks.useAllUsersQuery();

	const keyExtractor = (item: hooks.User) => item._id;

	const renderItem = ({ item }: { item: hooks.User }) => {
		return (
			<>
				<Pressable
					onPress={() => navigation.navigate('View', { _id: item._id })}>
					<ListItem bottomDivider>
						<Avatar
							rounded
							source={{ uri: item.photo || '' }}
							// @ts-ignore
							icon='account-circle-outline'
						/>
						<ListItem.Content>
							<ListItem.Title>{item.name}</ListItem.Title>
						</ListItem.Content>
						<ListItem.Chevron />
					</ListItem>
				</Pressable>
			</>
		);
	};

	if (fetching && !data?.users) return <Text>Loading...</Text>;

	return (
		<>
			<FlatList
				keyExtractor={keyExtractor}
				data={data?.users as any}
				renderItem={renderItem}
			/>
		</>
	);
};

export default ChatListScreen;
