'use client';

import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from 'nextjs-progressbar';

import StyledComponentsRegistry from '@/libs/registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import handleError from '@/utils/handleToast';
import AuthProvider from '@/hooks/useAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: handleError,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NextNProgress options={{ easing: 'ease', speed: 500 }} />
          {children}
        </AuthProvider>
        <ToastContainer
          style={{
            zIndex: 999999,
          }}
        />
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
