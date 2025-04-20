/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignupForm } from '../components/SignupForm';
import { useSignupForm as mockUseSignupForm } from '../hooks/use-signup-form';
import { useSession as mockUseSession } from '../../../_shared/hooks/use-session';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('../hooks/use-signup-form');
jest.mock('../../../_shared/hooks/use-session');

const mockPush = jest.fn();

const defaultForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user',
};

const roles = ['user', 'admin'] as const;

describe('SignupForm', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockPush });
    jest.clearAllMocks();
  });

  it('renders all fields and signup button', () => {
    (mockUseSignupForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: null,
      success: false,
      loading: false,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      roles,
    }));
    (mockUseSession as jest.Mock).mockImplementation(() => ({
      user: null,
      loading: false,
    }));
    render(<SignupForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  it('shows validation error', async () => {
    (mockUseSignupForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: 'Invalid input',
      success: false,
      loading: false,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      roles,
    }));
    (mockUseSession as jest.Mock).mockImplementation(() => ({
      user: null,
      loading: false,
    }));
    render(<SignupForm />);
    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
  });

  it('redirects to /login after signup success', async () => {
    (mockUseSignupForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: null,
      success: true,
      loading: false,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      roles,
    }));
    (mockUseSession as jest.Mock).mockImplementation(() => ({
      user: null,
      loading: false,
    }));
    render(<SignupForm />);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('redirects to /profile if session is already active', async () => {
    (mockUseSignupForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: null,
      success: false,
      loading: false,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      roles,
    }));
    (mockUseSession as jest.Mock).mockImplementation(() => ({
      user: { $id: 'mock' },
      loading: false,
    }));
    render(<SignupForm />);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/profile');
    });
  });

  it('displays error if signup fails', () => {
    (mockUseSignupForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: 'Signup failed',
      success: false,
      loading: false,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      roles,
    }));
    (mockUseSession as jest.Mock).mockImplementation(() => ({
      user: null,
      loading: false,
    }));
    render(<SignupForm />);
    expect(screen.getByText(/signup failed/i)).toBeInTheDocument();
  });
});
