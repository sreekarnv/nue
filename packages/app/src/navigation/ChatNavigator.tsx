import { hooks } from '@modules/graphql';
import { RouteProp } from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import MdIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatListScreen from '../screens/chat/ChatListScreen';

export type ChatNavigatorParamList = {
	List: undefined;
};

export type ChatStackNavigationProp<T extends keyof ChatNavigatorParamList> =
	NativeStackNavigationProp<ChatNavigatorParamList, T>;

export type ChatStackRouteProp<T extends keyof ChatNavigatorParamList> =
	RouteProp<ChatNavigatorParamList, T>;

export type ChatScreenProp<T extends keyof ChatNavigatorParamList> = {
	navigation: ChatStackNavigationProp<T>;
	route: ChatStackRouteProp<T>;
};

const ChatStack = createNativeStackNavigator<ChatNavigatorParamList>();

interface ChatNavigatorProps {}

const ChatNavigator: React.FC<ChatNavigatorProps> = ({}) => {
	return (
		<>
			<ChatStack.Navigator
				screenOptions={{
					headerRight() {
						const [, logout] = hooks.useLogoutUserMutation();

						return (
							<>
								<TouchableOpacity
									onPress={() => logout({})}
									style={{
										padding: 10,
										borderRadius: 200,
									}}>
									<MdIcon color='red' name='logout' size={20} />
								</TouchableOpacity>
							</>
						);
					},
				}}>
				<ChatStack.Screen
					options={{ title: 'Contacts' }}
					name='List'
					component={ChatListScreen}
				/>
			</ChatStack.Navigator>
		</>
	);
};

export default ChatNavigator;
