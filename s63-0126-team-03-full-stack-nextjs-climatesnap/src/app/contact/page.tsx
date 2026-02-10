'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/schemas/contactSchema';
import FormInput from '@/components/FormInput'; // Ensure this path is correct

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        // Simulate API call
        console.log('Contact Form Data:', data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert('Message Sent Successfully!');
        reset();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>

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

                    <div className="flex flex-col gap-1 mb-4">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            {...register('message')}
                            rows={4}
                            placeholder="Enter your message"
                            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.message ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.message && (
                            <span className="text-xs text-red-500 mt-1" role="alert">
                                {errors.message.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 rounded text-white font-medium transition-colors ${isSubmitting
                                ? 'bg-green-300 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
