import { hooks } from '@modules/graphql';
import { Button } from '@rneui/themed';
import React from 'react';
import { FlatList, TextInput, View } from 'react-native';
import MessageItem from '../../components/MessageItem';
import { ChatScreenProp } from '../../navigation/ChatNavigator';
import MdIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ChatViewScreenProps extends ChatScreenProp<'View'> {}

const ChatViewScreen: React.FC<ChatViewScreenProps> = ({
	route,
	navigation,
}) => {
	const chatRef = React.useRef<FlatList>(null);

	const [{ fetching: submitting }, addMessage] = hooks.useAddMessageMutation();

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
		if (data?.messages.length) {
			const index = data?.messages.length <= 1 ? 1 : data?.messages.length - 1;
			chatRef.current?.scrollToIndex({ index });
		}
	}, [data?.messages]);

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

			<View
				style={{
					flexDirection: 'row',
					paddingHorizontal: 20,
					paddingVertical: 15,
				}}>
				<TextInput
					placeholder='Type a message...'
					style={{
						backgroundColor: '#ddd',
						flex: 1,
						borderRadius: 10,
						paddingHorizontal: 10,
						paddingVertical: 8,
						fontSize: 18,
					}}
				/>
				<Button
					loading={submitting}
					onPress={() =>
						addMessage({
							receiver: route.params._id,
							text: 'Hello',
						})
					}
					radius={10}
					size='lg'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<MdIcon name='send' size={20} />
				</Button>
			</View>
		</>
	);
};

export default ChatViewScreen;
