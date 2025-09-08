import { useQuery } from "@tanstack/react-query";
import { roleApi } from "@/services/system-console/roles/role-api";
import { RoleFilters } from "@/types/role";

export const useGetRoles = (params?: RoleFilters) => {
  return useQuery({
    queryKey: ["roles", params],
    queryFn: () => roleApi.getRoles(),
  });
};
