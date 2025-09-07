// This file exports the service methods that use React Query hooks
// Import the hooks and re-export them with service-like interface

export {
  useUserProfile,
  useUpdateProfile,
  useChangePassword,
  useUsers,
  useUser,
  useUpdateUser,
  useDeleteUser,
  useUploadAvatar,
  usePrefetchUser,
} from '@/hooks/useUser';

import {
  useUserProfile as useUserProfileHook,
  useUpdateProfile as useUpdateProfileHook,
  useUsers as useUsersHook,
} from '@/hooks/useUser';
import { useCallback } from 'react';

export const useUserService = () => {
  const profileQuery = useUserProfileHook();
  const updateProfileMutation = useUpdateProfileHook();
  const usersQuery = useUsersHook();

  const updateProfile = useCallback((userData: any) => {
    return updateProfileMutation.mutateAsync(userData);
  }, [updateProfileMutation]);

  const getUsers = useCallback((filters?: any) => {
    return usersQuery.data;
  }, [usersQuery.data]);

  return {
    profile: profileQuery.data,
    profileLoading: profileQuery.isLoading,
    profileError: profileQuery.error,
    refetchProfile: profileQuery.refetch,
    
    updateProfile,
    updateLoading: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
    updateSuccess: updateProfileMutation.isSuccess,
    
    users: usersQuery.data,
    usersLoading: usersQuery.isLoading,
    usersError: usersQuery.error,
    refetchUsers: usersQuery.refetch,
  };
};
