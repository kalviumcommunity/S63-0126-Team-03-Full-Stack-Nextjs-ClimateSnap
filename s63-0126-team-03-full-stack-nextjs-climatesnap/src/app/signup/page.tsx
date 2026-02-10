'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '@/lib/schemas/signupSchema';
import FormInput from '@/components/FormInput'; // Ensure this path is correct

export default function SignupPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        // Simulate API call
        console.log('Form Data:', data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert('Signup Successful!');
        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormInput
                        label="Name"
                        name="name"
                        type="text"
                        register={register}
                        error={errors.name?.message}
                        placeholder="Enter your name"
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        register={register}
                        error={errors.email?.message}
                        placeholder="Enter your email"
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        register={register}
                        error={errors.password?.message}
                        placeholder="Enter your password"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 rounded text-white font-medium transition-colors ${isSubmitting
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}
