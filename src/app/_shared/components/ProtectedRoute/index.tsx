'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../../hooks/use-session';

/**
 * ProtectedRoute props type
 */
export type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

/**
 * ProtectedRoute component for route protection
 * Redirects to login page if user is not authenticated
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const { user, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after loading is complete and user is null
    if (!loading && !user) {
      router.replace(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  // Show loading state while checking authentication
  if (loading) {
    return null;
  }

  // If not loading and user exists, render children
  return user ? <>{children}</> : null;
};
