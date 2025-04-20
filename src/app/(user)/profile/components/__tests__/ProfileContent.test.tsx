/**
 * @jest-environment jsdom
 */

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

jest.mock('../../hooks/use-profile', () => ({
  useProfile: () => ({
    profile: { $id: 'user123', name: 'Test User', email: 'test@example.com' },
    loading: false,
  }),
}));

describe('ProfileContent', () => {
  it('should be implemented', () => {
    expect(true).toBe(true);
  });
});
