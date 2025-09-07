// This file exports the service methods that use React Query hooks
// Import the hooks and re-export them with service-like interface

export {
  useLogin,
  useRegister,
  useLogout,
  useMe,
  useRefreshToken,
  useForgotPassword,
  useResetPassword,
  useVerifyEmail,
  useResendVerificationEmail,
} from "@/hooks/useAuth";

// You can also create service-like functions that use the hooks internally
// This provides a consistent API while leveraging React Query

import { useLogin as useLoginHook } from "@/hooks/useAuth";
import { useCallback } from "react";

// Example of a service function that uses hooks internally
export const useAuthService = () => {
  const loginMutation = useLoginHook();

  const login = useCallback(
    (credentials: { email: string; password: string }) => {
      return loginMutation.mutateAsync(credentials);
    },
    [loginMutation],
  );

  return {
    login,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
  };
};
