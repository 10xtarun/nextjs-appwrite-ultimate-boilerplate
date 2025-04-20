// Moved from _features/signup/components/SignupForm.tsx
'use client';

import React from 'react';
import { useSignupForm } from '../hooks/use-signup-form';
import { useRouter } from 'next/navigation';
import { useSession } from '../../../_shared/hooks/use-session';

export const SignupForm: React.FC = () => {
  const { form, error, success, loading, handleChange, handleSubmit, roles } =
    useSignupForm();
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();

  // Redirect if already logged in
  React.useEffect(() => {
    if (!sessionLoading && user) {
      router.replace('/profile');
    }
  }, [user, sessionLoading, router]);

  // Redirect after successful signup
  React.useEffect(() => {
    if (success) {
      router.replace('/profile');
    }
  }, [success, router]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow rounded-xl p-10 flex flex-col gap-6 border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium mb-1 text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
            required
          />
        </div>
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
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-lg font-medium mb-1 text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-lg font-medium mb-1 text-gray-900 dark:text-white"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && (
        <div className="text-red-600 dark:text-red-400 text-center mt-2">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600 dark:text-green-400 text-center mt-2">
          Signup successful!
        </div>
      )}
      <button
        type="submit"
        className="w-full mt-6 py-3 px-6 rounded-lg bg-primary-600 text-white text-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};
