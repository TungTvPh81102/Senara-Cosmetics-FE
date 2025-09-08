import { Permission } from "@/types/permission";

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  status: boolean;
  created_at: string;
  updated_at: string;
  users_count?: number;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  permission_ids: string[];
  status?: "active" | "inactive";
}

export interface UpdateRoleRequest extends Partial<CreateRoleRequest> {
  id: string;
}

export interface RoleFilters {
  search?: string;
  status?: "active" | "inactive";
  created_from?: string;
  created_to?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}
