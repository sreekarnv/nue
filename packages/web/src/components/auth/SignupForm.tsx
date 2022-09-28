import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useSignupUserMutation } from '../../graphql';
import FormInput from '../shared/FormInput';

interface SignupFormProps {}

const signupSchema = Yup.object()
	.shape({
		name: Yup.string().required('User must provide their name').trim(),
		email: Yup.string()
			.required('User must provide their email')
			.email('Please provide a valid email')
			.trim(),
		password: Yup.string()
			.required('User must provide a password')
			.min(6, 'Password must contain atleast 6 characters'),
		passwordConfirm: Yup.string()
			.required('Users must confirm their password')
			.when('password', {
				is: (val: string) => (val && val.length > 0 ? true : false),
				then: Yup.string().oneOf(
					[Yup.ref('password')],
					'Passwords do not match'
				),
			}),
	})
	.required();

const SignupForm: React.FC<SignupFormProps> = ({}) => {
	const {
		register: registerSignup,
		handleSubmit: handleSignupFormSubmit,
		reset: resetSignupForm,
		formState: formSignupState,
	} = useForm({
		resolver: yupResolver(signupSchema),
	});

	const [{ fetching: fetchingSignup }, signupUser] = useSignupUserMutation();

	return (
		<>
			<form
				autoComplete='off'
				onSubmit={handleSignupFormSubmit(async (data) => {
					await signupUser({ input: data as any });
					resetSignupForm();
				})}
				className='pt-10'>
				<FormInput
					label='Name'
					type='text'
					error={formSignupState.errors.name?.message}
					{...registerSignup('name')}
				/>
				<FormInput
					label='Email Address'
					type='email'
					error={formSignupState.errors.email?.message}
					{...registerSignup('email')}
				/>
				<FormInput
					label='Password'
					type='password'
					error={formSignupState.errors.password?.message}
					{...registerSignup('password')}
				/>
				<FormInput
					label='Password Confirm'
					type='password'
					error={formSignupState.errors.passwordConfirm?.message}
					{...registerSignup('passwordConfirm')}
				/>
				<button
					className={`btn btn-primary mt-4 ${fetchingSignup ? 'loading' : ''}`}>
					Sign Up
				</button>
			</form>
		</>
	);
};

export default SignupForm;
