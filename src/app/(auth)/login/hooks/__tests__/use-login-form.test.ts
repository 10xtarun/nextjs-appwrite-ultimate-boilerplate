/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { useLoginForm } from '../use-login-form';

// Correctly mock Appwrite service
jest.mock('../../../../_libs/appwrite-service', () => {
  const sessionMock = {
    createEmailPasswordSession: jest.fn(() => Promise.resolve({})),
    deleteSession: jest.fn(() => Promise.resolve()),
  };
  return {
    getAppwrite: () => ({ account: sessionMock }),
    __esModule: true,
    sessionMock,
  };
});

// Correctly mock login schema
jest.mock('../../../../_shared/validation/auth-schema', () => ({
  loginSchema: {
    safeParse: jest.fn((data) => {
      if (!data.email || !data.password) {
        return {
          success: false,
          error: { errors: [{ message: 'Invalid input' }] },
        };
      }
      return { success: true, data };
    }),
  },
}));

describe('useLoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty form and no error', () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.form).toEqual({ email: '', password: '' });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should update form state on handleChange', () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.form.email).toBe('test@example.com');
  });

  it('should show validation error if fields are empty', async () => {
    const { result } = renderHook(() => useLoginForm());
    let success = false;
    await act(async () => {
      success = await result.current.handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent);
    });
    expect(success).toBe(false);
    expect(result.current.error).toBe('Invalid input');
  });

  it('should call Appwrite and reset form on successful login', async () => {
    const { result } = renderHook(() => useLoginForm());
    // Fill in valid data
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'password', value: 'password123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    let success = false;
    await act(async () => {
      success = await result.current.handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent);
    });
    expect(success).toBe(true);
    expect(result.current.form).toEqual({ email: '', password: '' });
    expect(result.current.error).toBeNull();
  });

  it('should handle Appwrite errors gracefully', async () => {
    // Arrange: set up the mock to reject
    // eslint-disable-next-line
    const { sessionMock } = require('../../../../_libs/appwrite-service');
    sessionMock.createEmailPasswordSession.mockImplementationOnce(() =>
      Promise.reject(new Error('Login failed')),
    );
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'password', value: 'password123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    let success = true;
    await act(async () => {
      success = await result.current.handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent);
    });
    // Flush microtasks, then assert
    await new Promise((res) => setTimeout(res, 0));
    expect(success).toBe(false);
    expect(result.current.error).toBe('Login failed');
  });
});
