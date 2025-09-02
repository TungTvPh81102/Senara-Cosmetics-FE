import api from './api';
import { User, ApiResponse, PaginatedResponse } from '@/types/api';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  roleId?: string;
  status?: 'active' | 'inactive';
}

export interface UsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  roleId?: string;
  status?: 'active' | 'inactive';
}

export const usersService = {
  // Get all users with pagination and filters
  getUsers: async (params: UsersQuery = {}): Promise<PaginatedResponse<User>> => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData: CreateUserData): Promise<ApiResponse<User>> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, userData: UpdateUserData): Promise<ApiResponse<User>> => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Bulk operations
  bulkDeleteUsers: async (ids: string[]): Promise<ApiResponse<void>> => {
    const response = await api.post('/users/bulk-delete', { ids });
    return response.data;
  },

  // Update user status
  updateUserStatus: async (id: string, status: 'active' | 'inactive'): Promise<ApiResponse<User>> => {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  },
};