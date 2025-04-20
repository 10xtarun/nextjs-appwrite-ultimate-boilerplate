'use client';

import React from 'react';
import { useSession } from '../../../_shared/hooks/use-session';
import { useProfile } from '../hooks/use-profile';
import { ProtectedRoute } from '../../../_shared/components/ProtectedRoute';

/**
 * Profile content component to display user information
 */
export const ProfileContent: React.FC = () => {
  const { user, loading: sessionLoading } = useSession();
  const { loading: profileLoading } = useProfile();

  const loading = sessionLoading || profileLoading;

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow rounded-xl p-8 flex flex-col gap-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-lg text-gray-600 dark:text-gray-400">
              Loading profile...
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {user?.name?.charAt(0).toUpperCase() || '?'}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'User'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {user?.email || 'No email available'}
                </p>
              </div>
            </div>

            <div className="grid gap-6 mt-4">
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                  Account Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      User ID
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium break-all">
                      {user?.$id || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user?.$createdAt
                        ? new Date(user.$createdAt).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Active
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email Verification
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user?.emailVerification ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                  Preferences
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Role
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user?.labels?.includes('admin') ? 'Admin' : 'User'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};
