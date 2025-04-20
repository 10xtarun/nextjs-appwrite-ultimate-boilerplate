/**
 * @jest-environment jsdom
 */

// Mock Appwrite service
jest.mock('../../../../_libs/appwrite-service', () => {
  const sessionMock = {
    create: jest.fn(() => Promise.resolve({})),
    deleteSession: jest.fn(() => Promise.resolve()),
  };
  return {
    getAppwrite: () => ({ account: sessionMock }),
    __esModule: true,
    sessionMock,
  };
});

// Mock signup schema
jest.mock('../../../../_shared/validation/auth-schema', () => ({
  signupSchema: {
    safeParse: jest.fn((data) => {
      if (
        !data.email ||
        !data.password ||
        !data.name ||
        !data.confirmPassword
      ) {
        return {
          success: false,
          error: { errors: [{ message: 'Invalid input' }] },
        };
      }
      if (data.password !== data.confirmPassword) {
        return {
          success: false,
          error: { errors: [{ message: 'Passwords do not match' }] },
        };
      }
      return { success: true, data };
    }),
  },
}));

describe('useSignupForm', () => {
  it('should be implemented', () => {
    expect(true).toBe(true);
  });
});
