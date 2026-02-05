// frontend/components/auth/withAuth.tsx
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import "./auth.css"

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading || !user) {
      // You can return a loading spinner here
      return <p className='loader'>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
  return WithAuthComponent;
};

export default withAuth;