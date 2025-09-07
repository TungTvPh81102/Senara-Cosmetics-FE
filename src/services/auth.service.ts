import apiClient from '@/lib/api';
import { LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '@/types/api';

export class AuthService {
  // Login
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  // Register
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    return response.data;
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.clearAuth();
    }
  }

  // Refresh token
  static async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    return response.data;
  }

  // Get current user
  static async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get<AuthResponse['user']>('/auth/me');
    return response.data;
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<ApiResponse> {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response;
  }

  // Reset password
  static async resetPassword(token: string, password: string, passwordConfirmation: string): Promise<ApiResponse> {
    const response = await apiClient.post('/auth/reset-password', {
      token,
      password,
      password_confirmation: passwordConfirmation,
    });
    return response;
  }

  // Verify email
  static async verifyEmail(token: string): Promise<ApiResponse> {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response;
  }

  // Resend verification email
  static async resendVerificationEmail(): Promise<ApiResponse> {
    const response = await apiClient.post('/auth/resend-verification');
    return response;
  }
}