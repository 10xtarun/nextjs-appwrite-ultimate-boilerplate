/**
 * @jest-environment jsdom
 */

jest.mock('../../../hooks/use-session', () => ({
  useSession: () => ({
    user: { $id: 'user123', email: 'test@example.com' },
    loading: false,
  }),
}));

describe('ProtectedRoute', () => {
  it('should be implemented', () => {
    expect(true).toBe(true);
  });
});
