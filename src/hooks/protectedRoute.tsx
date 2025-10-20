'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

const protectedRoute = (Component: React.FC) => {
  return (props: any) => {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
      if (!isAuthenticated || !user?.isReadTerms) {
        router.push('/');
      }
    }, [isAuthenticated]);

    if (!isAuthenticated || !user?.isReadTerms) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default protectedRoute;
