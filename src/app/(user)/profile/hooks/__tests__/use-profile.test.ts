/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { useProfile } from '../use-profile';

// Mock Appwrite service
jest.mock('../../../../_libs/appwrite-service', () => {
  const sessionMock = {
    get: jest.fn(() =>
      Promise.resolve({
        $id: 'user123',
        email: 'test@example.com',
        name: 'Test User',
        labels: ['user'],
        $createdAt: '2024-01-01T00:00:00Z',
        emailVerification: true,
      }),
    ),
  };
  return {
    getAppwrite: () => ({ account: sessionMock }),
    __esModule: true,
    sessionMock,
  };
});

describe('useProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading true and profile null', () => {
    const { result } = renderHook(() => useProfile());
    expect(
      result.current.profile === null || result.current.profile === undefined,
    ).toBe(true);
    expect(result.current.loading).toBe(true);
  });

  it('should fetch profile on mount', async () => {
    const { result } = renderHook(() => useProfile());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.profile).toMatchObject({
      $id: 'user123',
      email: 'test@example.com',
      name: 'Test User',
    });
    expect(result.current.loading).toBe(false);
  });

  it('should handle fetch error and set profile null', async () => {
    // eslint-disable-next-line
    const { sessionMock } = require('../../../../_libs/appwrite-service');
    sessionMock.get.mockImplementationOnce(() =>
      Promise.reject(new Error('Not authenticated')),
    );
    const { result } = renderHook(() => useProfile());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.profile).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
