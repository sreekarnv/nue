import * as Yup from 'yup';

export const signupSchema = Yup.object()
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
