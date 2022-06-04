import { getCookie } from 'cookies-next';
import api from 'lib/api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export const useAuth = () => {
  const router = useRouter();
  const token = getCookie('token');

  const { data: user, error, mutate } = useSWR('/user', api.auth.user);

  useEffect(() => {
    if (!token && !user && !error) {
      router.replace('/login');
    }
  }, [user]);

  return {
      user,
      error,
      mutate,
  };
};
