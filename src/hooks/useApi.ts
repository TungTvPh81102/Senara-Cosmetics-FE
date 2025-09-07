import { useState, useCallback } from 'react';
import { ApiError } from '@/types/api';
import { useApiError } from './useApiError';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export const useApi = <T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
    showErrorToast?: boolean;
    showSuccessToast?: boolean;
    successMessage?: string;
  }
): UseApiReturn<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { handleError, handleSuccess } = useApiError();

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState(prev => ({ ...prev, data: result, loading: false }));

        if (options?.onSuccess) {
          options.onSuccess(result);
        }

        if (options?.showSuccessToast && options?.successMessage) {
          handleSuccess(options.successMessage);
        }

        return result;
      } catch (error) {
        const apiError = error as ApiError;
        setState(prev => ({ ...prev, error: apiError, loading: false }));

        if (options?.onError) {
          options.onError(apiError);
        }

        if (options?.showErrorToast !== false) {
          handleError(apiError);
        }

        return null;
      }
    },
    [apiFunction, options, handleError, handleSuccess]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
