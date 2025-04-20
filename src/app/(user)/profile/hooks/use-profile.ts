import { useState, useEffect } from 'react';
import { useSession } from '../../../_shared/hooks/use-session';

/**
 * useProfile hook return type
 */
export type UseProfileReturn = {
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      // If session is still loading, wait for it
      if (sessionLoading) {
        return;
      }

      // If no user is found, set error
      if (!user) {
        setError('User not found');
        setLoading(false);
        return;
      }

      try {
        // Here you could fetch additional profile data if needed
        // For now, we're just using the user data from the session

        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load profile data');
        }
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, sessionLoading]);

  return {
    loading,
    error,
  };
};
