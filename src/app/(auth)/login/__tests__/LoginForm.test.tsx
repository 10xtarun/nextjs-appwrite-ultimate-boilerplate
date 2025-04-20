/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from '../components/LoginForm';
import { useLoginForm as mockUseLoginForm } from '../hooks/use-login-form';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('../hooks/use-login-form');

const mockReplace = jest.fn();

const defaultForm = {
  email: '',
  password: '',
};

describe('LoginForm', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    jest.clearAllMocks();
  });

  it('renders all fields and login button', () => {
    (mockUseLoginForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: null,
      loading: false,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
    }));
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation error', () => {
    (mockUseLoginForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: 'Invalid input',
      loading: false,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
    }));
    render(<LoginForm />);
    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
  });

  it('redirects to /profile after login success', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(true);
    (mockUseLoginForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: null,
      loading: false,
      handleChange: jest.fn(),
      handleSubmit,
    }));
    render(<LoginForm />);
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith('/profile');
    });
  });

  it('does not redirect if login fails', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(false);
    (mockUseLoginForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: null,
      loading: false,
      handleChange: jest.fn(),
      handleSubmit,
    }));
    render(<LoginForm />);
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  it('disables button and shows loading during submission', () => {
    (mockUseLoginForm as jest.Mock).mockImplementation(() => ({
      form: defaultForm,
      error: null,
      loading: true,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
    }));
    render(<LoginForm />);
    const button = screen.getByRole('button', { name: /logging in/i });
    expect(button).toBeDisabled();
    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
  });
});
