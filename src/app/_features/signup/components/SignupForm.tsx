'use client';

import React, { useState } from 'react';
import type { SignupFormData, UserRole } from '../../../_shared/types/auth';
import { signupSchema } from '../../../_shared/validation/auth-schema';
import { getAppwrite } from '../../../_libs/appwrite-service';
import { ID } from 'appwrite';

const roles: readonly UserRole[] = ['user', 'admin'] as const;

export const SignupForm: React.FC = () => {
  const [form, setForm] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    debugger;
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || 'Invalid input');
      return;
    }
    setLoading(true);
    try {
      const { account } = getAppwrite();
      const userId = ID.unique();
      console.log('Generated Appwrite userId:', userId);
      const createdUser = await account.create(
        userId,
        form.email,
        form.password,
        form.name,
      );
      await account.createEmailPasswordSession(
        createdUser.email,
        form.password,
      );
      setSuccess(true);
      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Signup failed');
      } else {
        setError('Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

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
      {error && <div className="text-red-500 text-base mt-2">{error}</div>}
      {success && (
        <div className="text-green-600 text-base mt-2">Signup successful!</div>
      )}
      <button
        type="submit"
        className="w-full py-3 mt-2 text-lg font-semibold rounded-lg bg-primary-600 hover:bg-primary-700 text-white dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};
