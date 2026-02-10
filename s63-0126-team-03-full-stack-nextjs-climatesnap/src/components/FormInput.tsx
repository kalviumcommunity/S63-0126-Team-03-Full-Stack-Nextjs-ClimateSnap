import React from 'react';
import { UseFormRegister, Path, FieldValues, FieldError } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    type?: string;
    register: UseFormRegister<T>;
    error?: string;
    placeholder?: string;
    className?: string; // Allow custom classes
}

const FormInput = <T extends FieldValues>({
    label,
    name,
    type = 'text',
    register,
    error,
    placeholder,
    className = '',
}: FormInputProps<T>) => {
    return (
        <div className={`flex flex-col gap-1 mb-4 ${className}`}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                aria-invalid={error ? 'true' : 'false'}
            />
            {error && (
                <span className="text-xs text-red-500 mt-1" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormInput;
