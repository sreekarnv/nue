import clsx from 'clsx';
import React from 'react';
import {
	ToastViewport,
	ToastTitle,
	ToastDescription,
} from '@radix-ui/react-toast';
import { HiOutlineXCircle, HiOutlineCheckCircle } from 'react-icons/hi';

const variants = {
	success: {
		className: 'alert-success',
		icon: <HiOutlineCheckCircle size={20} />,
		title: 'Success',
		description: 'Task finished successfully.',
	},
	error: {
		className: 'alert-error',
		icon: <HiOutlineXCircle size={20} />,
		title: 'Error',
		description: 'Task failed successfully.',
	},
};

interface ToastProps {
	variant?: keyof typeof variants;
	message?: string;
}

const Toast: React.FC<ToastProps> = ({
	variant = 'success',
	message = variants[variant].description,
}) => {
	return (
		<>
			<ToastViewport className='absolute top-0 left-0 w-full transition-all duration-300 ease-out'>
				<div
					className={clsx(
						'alert shadow-lg rounded-none',
						variants[variant].className
					)}>
					<div className='flex flex-col items-start'>
						<ToastTitle className='flex items-center gap-x-2'>
							{variants[variant].icon}
							<span className='font-semibold'>{variants[variant].title}</span>
						</ToastTitle>
						<ToastDescription>
							<span>{message}</span>
						</ToastDescription>
					</div>
				</div>
			</ToastViewport>
		</>
	);
};

export default Toast;
