import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../schemas/login';

const useLoginForm = () => {
	const res = useForm({
		resolver: yupResolver(loginSchema),
	});

	return res;
};

export default useLoginForm;
