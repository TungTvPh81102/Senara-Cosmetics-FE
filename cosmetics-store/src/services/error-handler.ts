import { toast } from 'sonner';
import { ApiError } from '@/types/api';

export class ErrorHandler {
  static handle(error: ApiError | Error | unknown, options?: {
    showToast?: boolean;
    customMessage?: string;
    onError?: (error: ApiError) => void;
  }) {
    const { showToast = true, customMessage, onError } = options || {};
    
    let apiError: ApiError;

    // Convert error to ApiError format
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

    // Show appropriate toast notification
    if (showToast) {
      const message = customMessage || apiError.message;
      
      if (apiError.status >= 500) {
        toast.error('Lỗi server', {
          description: message,
          duration: 5000,
        });
      } else if (apiError.status === 401) {
        toast.error('Phiên đăng nhập hết hạn', {
          description: 'Vui lòng đăng nhập lại',
          duration: 5000,
        });
      } else if (apiError.status === 403) {
        toast.error('Không có quyền truy cập', {
          description: 'Bạn không có quyền thực hiện hành động này',
          duration: 5000,
        });
      } else if (apiError.status === 404) {
        toast.error('Không tìm thấy', {
          description: message,
          duration: 4000,
        });
      } else if (apiError.status === 422) {
        toast.error('Dữ liệu không hợp lệ', {
          description: message,
          duration: 4000,
        });
      } else if (apiError.status === 429) {
        toast.error('Quá nhiều yêu cầu', {
          description: 'Vui lòng thử lại sau',
          duration: 5000,
        });
      } else if (apiError.status === 0) {
        toast.error('Lỗi kết nối', {
          description: 'Vui lòng kiểm tra kết nối internet',
          duration: 5000,
        });
      } else {
        toast.error('Có lỗi xảy ra', {
          description: message,
          duration: 4000,
        });
      }
    }

    // Call custom error handler if provided
    if (onError) {
      onError(apiError);
    }

    return apiError;
  }

  static success(message: string, description?: string) {
    toast.success(message, {
      description,
      duration: 3000,
    });
  }

  static info(message: string, description?: string) {
    toast.info(message, {
      description,
      duration: 3000,
    });
  }

  static warning(message: string, description?: string) {
    toast.warning(message, {
      description,
      duration: 4000,
    });
  }

  static loading(message: string, description?: string) {
    return toast.loading(message, {
      description,
    });
  }

  static dismiss(toastId?: string | number) {
    toast.dismiss(toastId);
  }
}