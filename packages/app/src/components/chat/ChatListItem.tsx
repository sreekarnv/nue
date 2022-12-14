import React from 'react';
import { hooks } from '@modules/graphql';
import { Text, ListItem, Avatar, useTheme } from '@rneui/themed';
import { FlatList, Pressable } from 'react-native';

interface ChatListItemProps {
	onPress: () => void;
	item: hooks.User;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ onPress, item }) => {
	const { theme } = useTheme();

	return (
		<>
			<Pressable onPress={onPress}>
				<ListItem bottomDivider>
					{item.photo ? (
						<Avatar
							rounded
							source={{ uri: item.photo }}
							title={item.name[0]}
							titleStyle={{ color: 'black' }}
						/>
					) : (
						<Avatar
							rounded
							title={item.name[0]}
							titleStyle={{ color: 'black' }}
							containerStyle={{ backgroundColor: theme.colors.secondary }}
						/>
					)}

					<ListItem.Content>
						<ListItem.Title>{item.name}</ListItem.Title>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
			</Pressable>
		</>
	);
};

export default ChatListItem;
