import React from 'react';
import { useLoginForm } from '@modules/form';
import { hooks } from '@modules/graphql';
import FormInput from '../shared/FormInput';
import { ToastProvider } from '@radix-ui/react-toast';
import Toast from '../shared/ui/Toast';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
	const {
		register: registerLogin,
		handleSubmit: handleLoginFormSubmit,
		reset: resetLoginForm,
		formState: formLoginState,
	} = useLoginForm();

	const [{ fetching: fetchingLogin, error }, loginUser] =
		hooks.useLoginUserMutation();

	return (
		<>
			{error && (
				<ToastProvider swipeDirection='up'>
					<Toast variant='error' message={error.graphQLErrors[0].message} />
				</ToastProvider>
			)}
			<form
				autoComplete='off'
				className='pt-10'
				onSubmit={handleLoginFormSubmit(async (data) => {
					await loginUser({ input: data as any });
					resetLoginForm();
				})}>
				<FormInput
					label='Email Address'
					type='email'
					error={formLoginState.errors.email?.message}
					{...registerLogin('email')}
				/>
				<FormInput
					label='Password'
					type='password'
					error={formLoginState.errors.password?.message}
					{...registerLogin('password')}
				/>
				<button
					className={`btn btn-primary mt-4 ${fetchingLogin ? 'loading' : ''}`}>
					Log in
				</button>
			</form>
		</>
	);
};

export default LoginForm;
