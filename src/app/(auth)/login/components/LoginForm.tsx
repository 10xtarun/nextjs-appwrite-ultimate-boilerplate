'use client';

import React from 'react';
import { useLoginForm } from '../hooks/use-login-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Login form component for user authentication
 */
export const LoginForm: React.FC = () => {
  const { form, error, loading, handleChange, handleSubmit } = useLoginForm();
  const router = useRouter();

  // On submit, redirect to profile if login is successful
  const wrappedHandleSubmit = async (e: React.FormEvent) => {
    const result = await handleSubmit(e);
    if (result) {
      router.replace('/profile');
    }
  };

  return (
    <form
      onSubmit={wrappedHandleSubmit}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow rounded-xl p-10 flex flex-col gap-6 border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium mb-1 text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-lg font-medium mb-1 text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
            required
          />
        </div>
      </div>
      {error && (
        <div className="text-red-600 dark:text-red-400 text-center mt-2">
          {error}
        </div>
      )}
      <button
        type="submit"
        className="w-full mt-6 py-3 px-6 rounded-lg bg-primary-600 text-white text-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className="text-center mt-4">
        <span className="text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
        </span>
        <Link
          href="/signup"
          className="text-primary-600 dark:text-primary-400 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};
