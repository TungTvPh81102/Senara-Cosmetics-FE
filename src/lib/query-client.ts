import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/types/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        const apiError = error as unknown as ApiError;
        if (apiError.status >= 400 && apiError.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: (failureCount, error) => {
        const apiError = error as unknown as ApiError;
        if (apiError.status >= 400 && apiError.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

queryClient.setMutationDefaults(["*"], {
  onError: (error: unknown) => {
    const apiError = error as unknown as ApiError;
    console.error("Mutation error:", apiError);
  },
});
