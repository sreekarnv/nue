import React from 'react';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

interface FormInputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label: string;
	error?:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
	(props, ref) => {
		const { label, name, error, ...rest } = props;

		return (
			<>
				<div className='mb-2'>
					<label htmlFor={name} className='label'>
						{label} *
					</label>
					<input
						className='input w-full ring-2 !outline-offset-0 ring-gray-300'
						ref={ref}
						name={name}
						id={name}
						{...rest}
					/>
					{error && (
						<small className='text-red-500 font-semibold'>
							{error.toString()}
						</small>
					)}
				</div>
			</>
		);
	}
);

FormInput.displayName = 'FormInput';

export default FormInput;
