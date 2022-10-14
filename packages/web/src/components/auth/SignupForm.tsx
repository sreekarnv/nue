import { ToastProvider } from '@radix-ui/react-toast';
import React from 'react';
import { hooks } from '@modules/graphql';
import FormInput from '../shared/FormInput';
import Toast from '../shared/ui/Toast';
import { useSignupForm } from '@modules/form';

interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = ({}) => {
	const {
		register: registerSignup,
		handleSubmit: handleSignupFormSubmit,
		reset: resetSignupForm,
		formState: formSignupState,
	} = useSignupForm();

	const [{ fetching: fetchingSignup, error }, signupUser] =
		hooks.useSignupUserMutation();

	return (
		<>
			{error && (
				<ToastProvider swipeDirection='up'>
					<Toast variant='error' message={error.graphQLErrors[0].message} />
				</ToastProvider>
			)}
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

				<div className='grid grid-cols-2 gap-x-3'>
					<FormInput
						label='Password'
						type='password'
						error={formSignupState.errors.password?.message}
						{...registerSignup('password')}
					/>
					<FormInput
						label='Confirm'
						type='password'
						error={formSignupState.errors.passwordConfirm?.message}
						{...registerSignup('passwordConfirm')}
					/>
				</div>

				<button
					className={`btn btn-primary mt-4 ${fetchingSignup ? 'loading' : ''}`}>
					Sign Up
				</button>
			</form>
		</>
	);
};

export default SignupForm;
