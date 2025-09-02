import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiError, ApiResponse } from '@/types/api';

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      status: 500,
    };

    if (error.response) {
      // Server responded with error status
      apiError.status = error.response.status;
      apiError.message = error.response.data?.message || getErrorMessage(error.response.status);
      apiError.code = error.response.data?.code;
      apiError.errors = error.response.data?.errors;

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('access_token');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden
          apiError.message = 'You do not have permission to perform this action';
          break;
        case 404:
          apiError.message = 'The requested resource was not found';
          break;
        case 422:
          apiError.message = 'Validation failed';
          break;
        case 429:
          apiError.message = 'Too many requests. Please try again later';
          break;
        case 500:
          apiError.message = 'Internal server error. Please try again later';
          break;
        case 503:
          apiError.message = 'Service unavailable. Please try again later';
          break;
      }
    } else if (error.request) {
      // Network error
      apiError.message = 'Network error. Please check your connection';
      apiError.status = 0;
    } else {
      // Something else happened
      apiError.message = error.message || 'An unexpected error occurred';
    }

    return Promise.reject(apiError);
  }
);

function getErrorMessage(status: number): string {
  const errorMessages: Record<number, string> = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    422: 'Validation failed',
    429: 'Too many requests',
    500: 'Internal server error',
    502: 'Bad gateway',
    503: 'Service unavailable',
    504: 'Gateway timeout',
  };

  return errorMessages[status] || 'An error occurred';
}

export default api;