import React from 'react';
import { Controller } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { AuthScreenProp } from '../../navigation/AuthNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignupForm } from '@modules/form';
import { hooks } from '@modules/graphql';

interface SignupScreenProps extends AuthScreenProp<'Signup'> {}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useSignupForm();
	const [{ fetching }, signup] = hooks.useSignupUserMutation();

	const onSubmit = (data: any) =>
		signup({
			input: data,
		});

	return (
		<SafeAreaView>
			<View style={{ paddingHorizontal: 10 }}>
				<Controller
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<Input
							label='Name'
							errorMessage={errors['name']?.message as string}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name='name'
				/>
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
				<Controller
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<Input
							label='Confirm'
							errorMessage={errors['passwordConfirm']?.message as string}
							secureTextEntry
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name='passwordConfirm'
				/>
				<View style={{ padding: 6, marginBottom: 20 }}>
					<Button loading={fetching} onPress={handleSubmit(onSubmit)}>
						Sign Up
					</Button>
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
