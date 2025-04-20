// Moved from _features/signup/hooks/use-signup-form.ts
import { useState } from 'react';
import type { SignupFormData, UserRole } from '../../../_shared/types/auth';
import { signupSchema } from '../../../_shared/validation/auth-schema';
import { getAppwrite } from '../../../_libs/appwrite-service';
import { ID } from 'appwrite';

/**
 * Custom hook to manage signup form state and logic.
 * @returns Signup form state, handlers, and status flags.
 */
export type UseSignupFormReturn = {
  form: SignupFormData;
  error: string | null;
  success: boolean;
  loading: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  roles: readonly UserRole[];
};

export const useSignupForm = (): UseSignupFormReturn => {
  const roles: readonly UserRole[] = ['user', 'admin'] as const;
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
      // Try to delete any existing sessions before creating a new account
      try {
        await account.deleteSession('current');
      } catch (sessionError) {
        // Ignore error if no session exists
        console.log(
          'No existing session to delete or error deleting session',
          sessionError,
        );
      }
      const userId = ID.unique();
      await account.create(userId, form.email, form.password, form.name);
      // Do NOT create a session after signup
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

  return {
    form,
    error,
    success,
    loading,
    handleChange,
    handleSubmit,
    roles,
  };
};
