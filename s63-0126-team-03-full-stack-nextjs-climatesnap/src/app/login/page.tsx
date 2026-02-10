'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/schemas/loginSchema';
import FormInput from '@/components/FormInput';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // TODO: Replace with real login API call
    console.log('Login data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Login request submitted (stub).');
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            className={`w-full rounded bg-blue-600 px-4 py-2 text-white font-medium transition-colors ${
              isSubmitting
                ? 'cursor-not-allowed bg-blue-300'
                : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

