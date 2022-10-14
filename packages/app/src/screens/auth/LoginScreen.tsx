import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { AuthScreenProp } from '../../navigation/AuthNavigator';
import { hooks } from '@modules/graphql';
import { Controller } from 'react-hook-form';
import { useLoginForm } from '@modules/form';

interface LoginScreenProps extends AuthScreenProp<'Login'> {}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useLoginForm();

	const [{ fetching }, login] = hooks.useLoginUserMutation();

	const onSubmit = async (data: any) => {
		await login({
			input: {
				...data,
			},
		});
	};

	return (
		<>
			<View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
				<Controller
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<Input
							label='Email Address'
							errorMessage={errors['email']?.message as string}
							keyboardType='email-address'
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name='email'
				/>
				<Controller
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<Input
							label='Password'
							errorMessage={errors['password']?.message as string}
							secureTextEntry
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name='password'
				/>
				<View style={{ padding: 6, marginBottom: 20 }}>
					<Button loading={fetching} onPress={handleSubmit(onSubmit)}>
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
		</>
	);
};

export default LoginScreen;
