import { useCallback } from 'react';
import { toast } from 'sonner';
import { ApiError } from '@/types/api';

export const useApiError = () => {
  const handleError = useCallback((error: ApiError) => {
    console.error('API Error:', error);

    if (error.errors && Object.keys(error.errors).length > 0) {
      Object.entries(error.errors).forEach(([field, messages]) => {
        messages.forEach((message) => {
          toast.error(`${field}: ${message}`);
        });
      });
    } else {
      toast.error(error.message);
    }
  }, []);

  const handleSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  const handleInfo = useCallback((message: string) => {
    toast.info(message);
  }, []);

  const handleWarning = useCallback((message: string) => {
    toast.warning(message);
  }, []);

  return {
    handleError,
    handleSuccess,
    handleInfo,
    handleWarning,
  };
};
