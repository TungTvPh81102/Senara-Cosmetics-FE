import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UserService, User, UpdateUserRequest, ChangePasswordRequest } from '@/services/user.service';
import { queryKeys } from '@/lib/query-keys';
import { useGet, useGetPaginated, useUpdate, useCreate, useDelete } from './useCrud';

export function useUserProfile() {
  return useGet(
    queryKeys.auth.profile(),
    () => UserService.getProfile(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useUpdate(
    (userData: UpdateUserRequest) => UserService.updateProfile(userData),
    {
      successMessage: 'Cập nhật thông tin thành công!',
      invalidateQueries: [
        queryKeys.auth.profile(),
        queryKeys.auth.me(),
      ],
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
      },
    }
  );
}

export function useChangePassword() {
  return useCreate(
    (passwordData: ChangePasswordRequest) => UserService.changePassword(passwordData),
    {
      successMessage: 'Đổi mật khẩu thành công!',
    }
  );
}

export function useUsers(filters?: {
  page?: number;
  per_page?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}) {
  return useGetPaginated(
    queryKeys.users.list(filters || {}),
    () => UserService.getUsers(filters),
    {
      enabled: !!filters,
    }
  );
}

export function useUser(id: number) {
  return useGet(
    queryKeys.users.detail(id),
    () => UserService.getUserById(id),
    {
      enabled: !!id,
    }
  );
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useUpdate(
    ({ id, userData }: { id: number; userData: UpdateUserRequest }) => 
      UserService.updateUser(id, userData),
    {
      successMessage: 'Cập nhật người dùng thành công!',
      invalidateQueries: [
        queryKeys.users.lists(),
      ],
      onSuccess: (data, { id }) => {
        queryClient.setQueryData(queryKeys.users.detail(id), data);
        queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      },
    }
  );
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useDelete(
    (id: number) => UserService.deleteUser(id),
    {
      successMessage: 'Xóa người dùng thành công!',
      invalidateQueries: [
        queryKeys.users.lists(),
      ],
      onSuccess: (data, id) => {
        queryClient.removeQueries({ queryKey: queryKeys.users.detail(id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      },
    }
  );
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useCreate(
    (file: File) => UserService.uploadAvatar(file),
    {
      successMessage: 'Tải lên avatar thành công!',
      invalidateQueries: [
        queryKeys.auth.profile(),
        queryKeys.auth.me(),
      ],
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });
      },
    }
  );
}

export function usePrefetchUser() {
  const queryClient = useQueryClient();

  const prefetchUser = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.users.detail(id),
      queryFn: () => UserService.getUserById(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchUsers = (filters?: Record<string, any>) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.users.list(filters || {}),
      queryFn: () => UserService.getUsers(filters),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchUser, prefetchUsers };
}
