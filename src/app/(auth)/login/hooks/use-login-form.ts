import { useState } from 'react';
import { getAppwrite } from '../../../_libs/appwrite-service';
import { loginSchema } from '../../../_shared/validation/auth-schema';

/**
 * Login form data type
 */
export type LoginFormData = {
  email: string;
  password: string;
};

/**
 * Custom hook to manage login form state and logic.
 * @returns Login form state, handlers, and status flags.
 */
export type UseLoginFormReturn = {
  form: LoginFormData;
  error: string | null;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
};

/**
 * useLoginForm hook for handling login form state and submission
 */
export const useLoginForm = (): UseLoginFormReturn => {
  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    setError(null);

    // Validate form data
    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || 'Invalid input');
      return false;
    }

    setLoading(true);
    try {
      const { account } = getAppwrite();

      // Try to get the current session
      try {
        // Check for existing session and delete it
        await account.deleteSession('current');
      } catch (sessionError) {
        // Ignore error if no session exists
        console.log(
          'No existing session to delete or error deleting session: ',
          sessionError,
        );
      }

      // Create email/password session
      await account.createEmailPasswordSession(form.email, form.password);

      // Reset form after successful login
      setForm({
        email: '',
        password: '',
      });
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
      } else {
        setError('Login failed');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};
