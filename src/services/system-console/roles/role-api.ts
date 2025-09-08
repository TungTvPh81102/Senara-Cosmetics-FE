import { PaginatedResponse } from "@/types/api";
import { Role, RoleFilters } from "@/types/role";
import { Permission } from "@/types/permission";
import { ApiResponse } from "@/types/api";
import { CreateRoleRequest, UpdateRoleRequest } from "@/types/role";
import api from "@/lib/api";

const BASE_URL = "v2/roles";

export const roleApi = {
  getRoles: async (filters: RoleFilters = {}): Promise<PaginatedResponse<Role>> => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<PaginatedResponse<Role>>(`/${BASE_URL}?${params.toString()}`);
    return response.data;
  },

  getRoleById: async (id: string): Promise<ApiResponse<Role>> => {
    const response = await api.get<ApiResponse<Role>>(`/${BASE_URL}/${id}`);
    return response.data;
  },

  createRole: async (data: CreateRoleRequest): Promise<ApiResponse<Role>> => {
    const response = await api.post<ApiResponse<Role>>("/${BASE_URL}", data);
    return response.data;
  },

  updateRole: async (data: UpdateRoleRequest): Promise<ApiResponse<Role>> => {
    const { id, ...updateData } = data;
    const response = await api.put<ApiResponse<Role>>(`/${BASE_URL}/${id}`, updateData);
    return response.data;
  },

  deleteRole: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`/${BASE_URL}/${id}`);
    return response.data;
  },

  getPermissions: async (): Promise<ApiResponse<Permission[]>> => {
    const response = await api.get<ApiResponse<Permission[]>>("/permissions");
    return response.data;
  },

  updateRoleStatus: async (
    id: string,
    status: "active" | "inactive",
  ): Promise<ApiResponse<Role>> => {
    const response = await api.patch<ApiResponse<Role>>(`/${BASE_URL}/${id}/status`, { status });
    return response.data;
  },

  duplicateRole: async (id: string, name: string): Promise<ApiResponse<Role>> => {
    const response = await api.post<ApiResponse<Role>>(`/${BASE_URL}/${id}/duplicate`, { name });
    return response.data;
  },
};
