import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { LoginRequest, RegisterRequest, AuthResponse } from "@/types/api";
import { queryKeys } from "@/lib/query-keys";
import { useCreate, useUpdate } from "./useCrud";
import apiClient from "@/lib/api";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      apiClient.setAuthToken(data.token);

      queryClient.setQueryData(queryKeys.auth.me(), data.user);

      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => AuthService.register(userData),
    onSuccess: (data: AuthResponse) => {
      apiClient.setAuthToken(data.token);

      queryClient.setQueryData(queryKeys.auth.me(), data.user);

      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      apiClient.clearAuth();

      queryClient.clear();

      router.push("/login");
    },
    onError: () => {
      apiClient.clearAuth();
      queryClient.clear();
      router.push("/login");
    },
  });
}

// Get current user hook
export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => AuthService.getCurrentUser(),
    retry: (failureCount, error) => {
      // @ts-ignore
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.refreshToken(),
    onSuccess: (data: AuthResponse) => {
      apiClient.setAuthToken(data.token);

      queryClient.setQueryData(queryKeys.auth.me(), data.user);
    },
  });
}

export function useForgotPassword() {
  return useCreate((email: string) => AuthService.forgotPassword(email), {
    successMessage: "Email khôi phục mật khẩu đã được gửi!",
  });
}

export function useResetPassword() {
  return useCreate(
    ({
      token,
      password,
      passwordConfirmation,
    }: {
      token: string;
      password: string;
      passwordConfirmation: string;
    }) => AuthService.resetPassword(token, password, passwordConfirmation),
    {
      successMessage: "Mật khẩu đã được đặt lại thành công!",
    },
  );
}

export function useVerifyEmail() {
  return useCreate((token: string) => AuthService.verifyEmail(token), {
    successMessage: "Email đã được xác thực thành công!",
  });
}

export function useResendVerificationEmail() {
  return useCreate(() => AuthService.resendVerificationEmail(), {
    successMessage: "Email xác thực đã được gửi lại!",
  });
}
