import apiClient from '@/lib/api';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  avatar?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: File;
}

export interface ChangePasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export class UserService {
  static async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/user/profile');
    return response.data;
  }

  static async updateProfile(userData: UpdateUserRequest): Promise<User> {
    const formData = new FormData();
    
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await apiClient.upload<User>('/user/profile', formData);
    return response.data;
  }

  static async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResponse> {
    const response = await apiClient.post('/user/change-password', passwordData);
    return response;
  }

  // Get all users (admin only)
  static async getUsers(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }
    const url = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<PaginatedResponse<User>>(url);
    return response.data;
  }

  // Get user by ID (admin only)
  static async getUserById(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  }

  // Update user by ID (admin only)
  static async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    const formData = new FormData();
    
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await apiClient.upload<User>(`/users/${id}`, formData);
    return response.data;
  }

  // Delete user (admin only)
  static async deleteUser(id: number): Promise<ApiResponse> {
    const response = await apiClient.delete(`/users/${id}`);
    return response;
  }

  // Upload avatar
  static async uploadAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await apiClient.upload<{ url: string }>('/user/avatar', formData);
    return response.data;
  }
}
