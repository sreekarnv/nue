import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { AuthScreenProp } from '../../navigation/AuthNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignupScreenProps extends AuthScreenProp<'Signup'> {}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
	return (
		<SafeAreaView>
			<View style={{ paddingHorizontal: 10 }}>
				<Input label='Name' />
				<Input label='Email Address' keyboardType='email-address' />
				<Input label='Password' secureTextEntry />
				<Input label='Confirm' secureTextEntry />
				<View style={{ padding: 6, marginBottom: 20 }}>
					<Button>Sign Up</Button>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
					<TouchableOpacity onPress={() => navigation.push('Login')}>
						<Text>Already have an account ? Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SignupScreen;
