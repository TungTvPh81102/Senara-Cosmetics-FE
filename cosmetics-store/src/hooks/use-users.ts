import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService, CreateUserData, UpdateUserData, UsersQuery } from '@/services/users';
import { ApiError } from '@/types/api';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UsersQuery) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Get users with pagination and filters
export function useUsers(params: UsersQuery = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => usersService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get user by ID
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersService.getUserById(id),
    enabled: !!id,
  });
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserData) => usersService.createUser(data),
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: ApiError) => {
      console.error('Failed to create user:', error.message);
    },
  });
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      usersService.updateUser(id, data),
    onSuccess: (response, { id }) => {
      // Update the user in cache
      queryClient.setQueryData(userKeys.detail(id), response);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: ApiError) => {
      console.error('Failed to update user:', error.message);
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.deleteUser(id),
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: ApiError) => {
      console.error('Failed to delete user:', error.message);
    },
  });
}

// Update user status mutation
export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'active' | 'inactive' }) =>
      usersService.updateUserStatus(id, status),
    onSuccess: (response, { id }) => {
      // Update the user in cache
      queryClient.setQueryData(userKeys.detail(id), response);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: ApiError) => {
      console.error('Failed to update user status:', error.message);
    },
  });
}

// Bulk delete users mutation
export function useBulkDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => usersService.bulkDeleteUsers(ids),
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: ApiError) => {
      console.error('Failed to bulk delete users:', error.message);
    },
  });
}