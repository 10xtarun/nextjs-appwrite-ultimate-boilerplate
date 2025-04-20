/**
 * useSession hook for Appwrite authentication session management.
 * Handles user session state, loading, and logout.
 */
import { useState, useEffect, useCallback } from 'react';
import { getAppwrite } from '../../_libs/appwrite-service';
import type { Models } from 'appwrite';

/**
 * UserSession type for Appwrite account.get() result.
 */
export type UserSession = Models.User<Models.Preferences> | null;

/**
 * useSession return type.
 */
export type UseSessionReturn = {
  user: UserSession;
  loading: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

/**
 * useSession hook to manage Appwrite session state.
 * @returns user, loading, logout, refresh
 */
export function useSession(): UseSessionReturn {
  const [user, setUser] = useState<UserSession>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    try {
      const { account } = getAppwrite();
      const user = await account.get();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const { account } = getAppwrite();
      await account.deleteSession('current');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return { user, loading, logout, refresh: fetchSession };
}
