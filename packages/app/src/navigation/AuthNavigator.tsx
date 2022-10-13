import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from '../screens/auth/LoginScreen';

interface AuthNavigatorProps {}

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import SignupScreen from '../screens/auth/SignupScreen';

export type AuthNavigatorParamList = {
	Login: undefined;
	Signup: undefined;
};

export type AuthStackNavigationProp<T extends keyof AuthNavigatorParamList> =
	NativeStackNavigationProp<AuthNavigatorParamList, T>;

export type AuthStackRouteProp<T extends keyof AuthNavigatorParamList> =
	RouteProp<AuthNavigatorParamList, T>;

export type AuthScreenProp<T extends keyof AuthNavigatorParamList> = {
	navigation: AuthStackNavigationProp<T>;
	route: AuthStackRouteProp<T>;
};

const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();

const AuthNavigator: React.FC<AuthNavigatorProps> = ({}) => {
	return (
		<SafeAreaProvider>
			<AuthStack.Navigator>
				<AuthStack.Screen name='Login' component={LoginScreen} />
				<AuthStack.Screen name='Signup' component={SignupScreen} />
			</AuthStack.Navigator>
		</SafeAreaProvider>
	);
};

export default AuthNavigator;
