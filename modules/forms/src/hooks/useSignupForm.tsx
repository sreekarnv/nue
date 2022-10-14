import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signupSchema } from '../schemas/signup';

const useSignupForm = () => {
	const res = useForm({
		resolver: yupResolver(signupSchema),
	});

	return res;
};

export default useSignupForm;
