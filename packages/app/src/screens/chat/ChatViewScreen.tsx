import { hooks } from '@modules/graphql';
import React from 'react';
import { FlatList } from 'react-native';
import MessageItem from '../../components/MessageItem';
import { ChatScreenProp } from '../../navigation/ChatNavigator';

interface ChatViewScreenProps extends ChatScreenProp<'View'> {}

const ChatViewScreen: React.FC<ChatViewScreenProps> = ({
	route,
	navigation,
}) => {
	const chatRef = React.useRef<FlatList>(null);

	const [{ data }] = hooks.useMessagesQuery({
		variables: { user: route.params._id },
	});

	React.useLayoutEffect(() => {
		if (data?.receiver.name) {
			navigation.setOptions({
				title: data?.receiver.name.split(' ')[0],
			});
		}
	}, [data, navigation]);

	React.useEffect(() => {
		if (data?.messages) {
			const index = data?.messages.length === 0 ? 0 : data?.messages.length - 1;
			chatRef.current?.scrollToIndex({ index });
		}
	}, []);

	return (
		<>
			<FlatList
				getItemLayout={(data, index) => {
					return {
						length: 100,
						offset: 100 * index,
						index,
					};
				}}
				ref={chatRef}
				data={data?.messages}
				renderItem={({ item }) => (
					<MessageItem
						item={item as hooks.Message}
						receiver={data?.receiver as hooks.User}
					/>
				)}
			/>
		</>
	);
};

export default ChatViewScreen;
