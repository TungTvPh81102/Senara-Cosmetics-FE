'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ApiError } from '@/types/api';
import { ErrorHandler } from '@/services/error-handler';

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 10 * 60 * 1000, // 10 minutes
            retry: (failureCount, error) => {
              const apiError = error as ApiError;
              // Don't retry on 4xx errors (client errors)
              if (apiError.status >= 400 && apiError.status < 500) {
                return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            retry: (failureCount, error) => {
              const apiError = error as ApiError;
              // Don't retry mutations on 4xx errors
              if (apiError.status >= 400 && apiError.status < 500) {
                return false;
              }
              // Retry once for network errors
              return failureCount < 1;
            },
            onError: (error) => {
              ErrorHandler.handle(error, {
                showToast: true,
              });
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}