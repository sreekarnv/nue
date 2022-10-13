import { hooks } from '@modules/graphql';
import { Text } from '@rneui/themed';
import React from 'react';
import AuthNavigator from './AuthNavigator';
import ChatNavigator from './ChatNavigator';

interface NavigatorProps {}

const Navigator: React.FC<NavigatorProps> = ({}) => {
	const [{ data, fetching }] = hooks.useLoggedInUserQuery();

	if (fetching) {
		return <Text>Loading...</Text>;
	}

	return <>{data?.user?._id ? <ChatNavigator /> : <AuthNavigator />}</>;
};

export default Navigator;
