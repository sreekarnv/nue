import { hooks } from '@modules/graphql';
import { Text } from '@rneui/themed';
import React from 'react';
import { ChatScreenProp } from '../../navigation/ChatNavigator';

interface ChatViewScreenProps extends ChatScreenProp<'View'> {}

const ChatViewScreen: React.FC<ChatViewScreenProps> = ({
	route,
	navigation,
}) => {
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

	return (
		<>
			<Text>{JSON.stringify(data, null, 2)}</Text>
		</>
	);
};

export default ChatViewScreen;
