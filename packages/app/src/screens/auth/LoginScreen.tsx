import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { AuthScreenProp } from '../../navigation/AuthNavigator';
import { hooks } from '@modules/graphql';
import LoginWithGithub from '../../components/auth/LoginWithGithub';

interface LoginScreenProps extends AuthScreenProp<'Login'> {}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
	const [, login] = hooks.useLoginUserMutation();

	return (
		<>
			<View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
				<Input label='Email Address' keyboardType='email-address' />
				<Input label='Password' secureTextEntry />
				<View style={{ padding: 6, marginBottom: 20 }}>
					<Button
						onPress={async () => {
							await login({
								input: {
									email: 'shanmukh@email.com',
									password: 'Pass123#',
								},
							});
						}}>
						Log In
					</Button>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
					<TouchableOpacity
						onPress={() => {
							navigation.push('Signup');
						}}>
						<Text>Don't have an account ? Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>

			<LoginWithGithub />
		</>
	);
};

export default LoginScreen;
