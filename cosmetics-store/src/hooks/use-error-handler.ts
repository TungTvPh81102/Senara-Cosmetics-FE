import { useCallback } from 'react';
import { ApiError } from '@/types/api';

interface UseErrorHandlerOptions {
  onError?: (error: ApiError) => void;
  showToast?: boolean;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const { onError, showToast = true } = options;

  const handleError = useCallback(
    (error: ApiError | Error | unknown) => {
      let apiError: ApiError;

      if (error instanceof Error) {
        apiError = {
          message: error.message,
          status: 500,
        };
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        apiError = error as ApiError;
      } else {
        apiError = {
          message: 'An unexpected error occurred',
          status: 500,
        };
      }

      // Log error for debugging
      console.error('Error handled:', apiError);

      // Call custom error handler if provided
      if (onError) {
        onError(apiError);
      }

      // Show toast notification if enabled
      if (showToast) {
        // You can integrate with your preferred toast library here
        // For now, we'll use console.error
        console.error('Toast:', apiError.message);
      }

      return apiError;
    },
    [onError, showToast]
  );

  const getErrorMessage = useCallback((error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return (error as ApiError).message;
    }
    return 'An unexpected error occurred';
  }, []);

  const isNetworkError = useCallback((error: ApiError): boolean => {
    return error.status === 0 || !error.status;
  }, []);

  const isServerError = useCallback((error: ApiError): boolean => {
    return error.status >= 500;
  }, []);

  const isClientError = useCallback((error: ApiError): boolean => {
    return error.status >= 400 && error.status < 500;
  }, []);

  const isAuthError = useCallback((error: ApiError): boolean => {
    return error.status === 401 || error.status === 403;
  }, []);

  const isValidationError = useCallback((error: ApiError): boolean => {
    return error.status === 422 && !!error.errors;
  }, []);

  return {
    handleError,
    getErrorMessage,
    isNetworkError,
    isServerError,
    isClientError,
    isAuthError,
    isValidationError,
  };
}