import * as Yup from 'yup';

export const loginSchema = Yup.object()
	.shape({
		email: Yup.string()
			.required('User must provide their email')
			.email('Please provide a valid email')
			.trim(),
		password: Yup.string()
			.required('User must provide a password')
			.min(6, 'Password must contain atleast 6 characters'),
	})
	.required();
