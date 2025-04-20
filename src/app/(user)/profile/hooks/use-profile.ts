import { useState, useEffect } from 'react';
import { useSession } from '../../../_shared/hooks/use-session';
import type { UserSession } from '../../../_shared/types/session';

/**
 * useProfile hook return type
 */
export type UseProfileReturn = {
  profile: UserSession;
  loading: boolean;
  error: string | null;
};

/**
 * useProfile hook for handling profile data
 * Currently leverages the session hook for user data
 * Can be extended to fetch additional profile data from Appwrite
 */
export const useProfile = (): UseProfileReturn => {
  const { user, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<UserSession>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionLoading) {
      return;
    }
    if (!user) {
      setProfile(null);
      setError('User not found');
      return;
    }
    setProfile(user);
    setError(null);
  }, [user, sessionLoading]);

  return {
    profile,
    loading: sessionLoading,
    error,
  };
};
