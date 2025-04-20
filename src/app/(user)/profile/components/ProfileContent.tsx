'use client';

import React from 'react';
import { useSession } from '../../../_shared/hooks/use-session';
import { useProfile } from '../hooks/use-profile';
import { ProtectedRoute } from '../../../_shared/components/ProtectedRoute';

/**
 * Profile content component to display user information
 */
export const ProfileContent: React.FC = () => {
  // eslint-disable-next-line
  const { user, loading: sessionLoading } = useSession();
  const { profile, loading: profileLoading } = useProfile();

  const loading = sessionLoading || profileLoading;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow rounded-xl p-8 flex flex-col gap-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile
          </h2>
        </div>
        <div>
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="text-gray-500">{profile.email}</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};
