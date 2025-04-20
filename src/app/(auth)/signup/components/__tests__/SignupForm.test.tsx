/**
 * @jest-environment jsdom
 */

jest.mock('../../../../_libs/appwrite-service', () => ({
  getAppwrite: () => ({
    account: {
      create: jest.fn(() => Promise.resolve({})),
      deleteSession: jest.fn(() => Promise.resolve()),
      listSessions: jest.fn(() => Promise.resolve({ sessions: [] })),
    },
  }),
  __esModule: true,
}));

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

describe('SignupForm', () => {
  it('should be implemented', () => {
    expect(true).toBe(true);
  });
});
