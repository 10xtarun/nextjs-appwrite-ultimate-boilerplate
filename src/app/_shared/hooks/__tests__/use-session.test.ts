/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { useSession } from '../use-session';

// Mock Appwrite service
jest.mock('../../../_libs/appwrite-service', () => {
  const sessionMock = {
    get: jest.fn(() =>
      Promise.resolve({
        $id: 'user123',
        email: 'test@example.com',
        labels: ['user'],
        $createdAt: '2024-01-01T00:00:00Z',
        emailVerification: true,
      }),
    ),
    listSessions: jest.fn(() =>
      Promise.resolve({ sessions: [{ $id: 'sess1' }, { $id: 'sess2' }] }),
    ),
    deleteSession: jest.fn(() => Promise.resolve()),
  };
  return {
    getAppwrite: () => ({ account: sessionMock }),
    __esModule: true,
    sessionMock,
  };
});

describe('useSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading true and user null', () => {
    const { result } = renderHook(() => useSession());
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  it('should fetch user on mount', async () => {
    const { result } = renderHook(() => useSession());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.user).toMatchObject({
      $id: 'user123',
      email: 'test@example.com',
    });
    expect(result.current.loading).toBe(false);
  });

  it('should handle fetch error and set user null', async () => {
    // eslint-disable-next-line
    const { sessionMock } = require('../../../_libs/appwrite-service');
    sessionMock.get.mockImplementationOnce(() =>
      Promise.reject(new Error('Not authenticated')),
    );
    const { result } = renderHook(() => useSession());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle logout and clear user', async () => {
    const { result } = renderHook(() => useSession());
    await act(async () => {
      await Promise.resolve();
      await result.current.logout();
    });
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
