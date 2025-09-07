import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError, ApiResponse, PaginatedResponse } from "@/types/api";
import { queryKeys } from "@/lib/query-keys";

export interface UseGetOptions<T>
  extends Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn"> {
  enabled?: boolean;
  showErrorToast?: boolean;
}

export interface UseCreateOptions<TData, TVariables>
  extends Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn"> {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  invalidateQueries?: readonly (readonly unknown[])[];
}

export interface UseUpdateOptions<TData, TVariables>
  extends Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn"> {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  invalidateQueries?: readonly (readonly unknown[])[];
}

export interface UseDeleteOptions<TData, TVariables>
  extends Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn"> {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  invalidateQueries?: readonly (readonly unknown[])[];
}

export function useGet<T = any>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>,
  options: UseGetOptions<T> = {},
) {
  const { showErrorToast = true, ...queryOptions } = options;

  return useQuery({
    queryKey,
    queryFn,
    ...queryOptions,
  });
}

export function useGetPaginated<T = any>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<PaginatedResponse<T>>,
  options: UseGetOptions<PaginatedResponse<T>> = {},
) {
  return useGet(queryKey, queryFn, options);
}

export function useCreate<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseCreateOptions<TData, TVariables> = {},
) {
  const queryClient = useQueryClient();
  const {
    showSuccessToast = true,
    showErrorToast = true,
    successMessage = "Tạo thành công!",
    invalidateQueries = [],
    ...mutationOptions
  } = options;

  return useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (showSuccessToast) {
        toast.success(successMessage);
      }

      // Invalidate related queries
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      mutationOptions.onSuccess?.(data, variables, context);
    },
    onError: (error: ApiError, variables, context) => {
      if (showErrorToast) {
        if (error.errors && Object.keys(error.errors).length > 0) {
          // Handle validation errors
          Object.entries(error.errors).forEach(([field, messages]) => {
            messages.forEach((message) => {
              toast.error(`${field}: ${message}`);
            });
          });
        } else {
          toast.error(error.message);
        }
      }
      mutationOptions.onError?.(error, variables, context);
    },
  });
}

export function useUpdate<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseUpdateOptions<TData, TVariables> = {},
) {
  const queryClient = useQueryClient();
  const {
    showSuccessToast = true,
    showErrorToast = true,
    successMessage = "Cập nhật thành công!",
    invalidateQueries = [],
    ...mutationOptions
  } = options;

  return useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (showSuccessToast) {
        toast.success(successMessage);
      }

      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      mutationOptions.onSuccess?.(data, variables, context);
    },
    onError: (error: ApiError, variables, context) => {
      if (showErrorToast) {
        if (error.errors && Object.keys(error.errors).length > 0) {
          // Handle validation errors
          Object.entries(error.errors).forEach(([field, messages]) => {
            messages.forEach((message) => {
              toast.error(`${field}: ${message}`);
            });
          });
        } else {
          toast.error(error.message);
        }
      }
      mutationOptions.onError?.(error, variables, context);
    },
  });
}

export function useDelete<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseDeleteOptions<TData, TVariables> = {},
) {
  const queryClient = useQueryClient();
  const {
    showSuccessToast = true,
    showErrorToast = true,
    successMessage = "Xóa thành công!",
    invalidateQueries = [],
    ...mutationOptions
  } = options;

  return useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (showSuccessToast) {
        toast.success(successMessage);
      }

      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      mutationOptions.onSuccess?.(data, variables, context);
    },
    onError: (error: ApiError, variables, context) => {
      if (showErrorToast) {
        toast.error(error.message);
      }
      mutationOptions.onError?.(error, variables, context);
    },
  });
}

export function useOptimisticUpdate<TData = any, TVariables = any>(
  queryKey: readonly string[],
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseUpdateOptions<TData, TVariables> & {
    optimisticUpdateFn: (oldData: TData | undefined, variables: TVariables) => TData;
  } = {} as any,
) {
  const queryClient = useQueryClient();
  const { optimisticUpdateFn, ...mutationOptions } = options;

  return useMutation({
    mutationFn,
    ...mutationOptions,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<TData>(queryKey);

      if (previousData) {
        const optimisticData = optimisticUpdateFn(previousData, variables);
        queryClient.setQueryData(queryKey, optimisticData);
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      mutationOptions.onError?.(error, variables, context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
