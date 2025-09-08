"use client";
import { useState } from "react";
import {
  Save,
  ArrowLeft,
  Shield,
  Users,
  Settings,
  FileText,
  Database,
  CheckSquare,
  Square,
  Minus,
  ChevronDown,
  ChevronRight,
  Search,
  RotateCcw,
  X,
} from "lucide-react";

const CreateRole = () => {
  const [formData, setFormData] = useState({
    name: "",
    guard_name: "web",
    description: "",
    is_active: true,
    is_system_group: false,
    alow_level: 1,
  });

  const [selectedPermissions, setSelectedPermissions] = useState(new Set());
  const [errors, setErrors] = useState({});
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  // Dữ liệu permissions được nhóm theo module
  const permissionGroups = {
    users: {
      label: "Quản lý người dùng",
      icon: <Users className="w-4 h-4" />,
      permissions: [
        { id: "users.view", name: "Xem danh sách người dùng" },
        { id: "users.create", name: "Thêm người dùng" },
        { id: "users.edit", name: "Chỉnh sửa người dùng" },
        { id: "users.delete", name: "Xóa người dùng" },
        { id: "users.export", name: "Xuất dữ liệu người dùng" },
        { id: "users.import", name: "Nhập dữ liệu người dùng" },
        { id: "users.profile", name: "Xem profile người dùng" },
        { id: "users.status", name: "Thay đổi trạng thái người dùng" },
      ],
    },
    roles: {
      label: "Quản lý vai trò",
      icon: <Shield className="w-4 h-4" />,
      permissions: [
        { id: "roles.view", name: "Xem danh sách vai trò" },
        { id: "roles.create", name: "Thêm vai trò" },
        { id: "roles.edit", name: "Chỉnh sửa vai trò" },
        { id: "roles.delete", name: "Xóa vai trò" },
        { id: "roles.assign", name: "Gán vai trò cho người dùng" },
        { id: "roles.permissions", name: "Quản lý quyền vai trò" },
      ],
    },
    content: {
      label: "Quản lý nội dung",
      icon: <FileText className="w-4 h-4" />,
      permissions: [
        { id: "content.view", name: "Xem nội dung" },
        { id: "content.create", name: "Tạo nội dung" },
        { id: "content.edit", name: "Chỉnh sửa nội dung" },
        { id: "content.delete", name: "Xóa nội dung" },
        { id: "content.publish", name: "Xuất bản nội dung" },
        { id: "content.draft", name: "Lưu bản nháp" },
        { id: "content.archive", name: "Lưu trữ nội dung" },
        { id: "content.categories", name: "Quản lý danh mục" },
        { id: "content.tags", name: "Quản lý thẻ" },
        { id: "content.media", name: "Quản lý media" },
      ],
    },
    system: {
      label: "Cài đặt hệ thống",
      icon: <Settings className="w-4 h-4" />,
      permissions: [
        { id: "system.config", name: "Cấu hình hệ thống" },
        { id: "system.logs", name: "Xem nhật ký hệ thống" },
        { id: "system.backup", name: "Sao lưu dữ liệu" },
        { id: "system.maintenance", name: "Bảo trì hệ thống" },
        { id: "system.updates", name: "Cập nhật hệ thống" },
        { id: "system.security", name: "Cài đặt bảo mật" },
        { id: "system.monitoring", name: "Giám sát hệ thống" },
      ],
    },
    reports: {
      label: "Báo cáo",
      icon: <Database className="w-4 h-4" />,
      permissions: [
        { id: "reports.view", name: "Xem báo cáo" },
        { id: "reports.create", name: "Tạo báo cáo" },
        { id: "reports.export", name: "Xuất báo cáo" },
        { id: "reports.share", name: "Chia sẻ báo cáo" },
        { id: "reports.schedule", name: "Lên lịch báo cáo" },
        { id: "reports.analytics", name: "Phân tích dữ liệu" },
      ],
    },
  };

  // Filter permissions based on search and selected filter
  const getFilteredGroups = () => {
    const filtered = {};

    Object.entries(permissionGroups).forEach(([key, group]) => {
      const filteredPermissions = group.permissions.filter((permission) => {
        const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !showOnlySelected || selectedPermissions.has(permission.id);
        return matchesSearch && matchesFilter;
      });

      if (filteredPermissions.length > 0) {
        filtered[key] = {
          ...group,
          permissions: filteredPermissions,
        };
      }
    });

    return filtered;
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên vai trò là bắt buộc";
    } else if (formData.name.length < 3) {
      newErrors.name = "Tên vai trò phải có ít nhất 3 ký tự";
    }

    if (formData.alow_level < 1 || formData.alow_level > 10) {
      newErrors.alow_level = "Cấp độ quyền phải từ 1 đến 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Kiểm tra trạng thái của group (all, some, none)
  const getGroupStatus = (groupKey) => {
    const groupPermissions = permissionGroups[groupKey].permissions;
    const selectedCount = groupPermissions.filter((p) => selectedPermissions.has(p.id)).length;

    if (selectedCount === 0) return "none";
    if (selectedCount === groupPermissions.length) return "all";
    return "some";
  };

  // Xử lý click vào group checkbox
  const handleGroupToggle = (groupKey) => {
    const groupPermissions = permissionGroups[groupKey].permissions;
    const status = getGroupStatus(groupKey);

    const newSelected = new Set(selectedPermissions);

    if (status === "all") {
      // Bỏ chọn tất cả
      groupPermissions.forEach((p) => newSelected.delete(p.id));
    } else {
      // Chọn tất cả
      groupPermissions.forEach((p) => newSelected.add(p.id));
    }

    setSelectedPermissions(newSelected);
  };

  // Toggle expand/collapse group
  const toggleGroupExpand = (groupKey) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  // Xử lý click vào permission checkbox
  const handlePermissionToggle = (permissionId) => {
    const newSelected = new Set(selectedPermissions);

    if (newSelected.has(permissionId)) {
      newSelected.delete(permissionId);
    } else {
      newSelected.add(permissionId);
    }

    setSelectedPermissions(newSelected);
  };

  // Xử lý thay đổi input
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error khi user nhập lại
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: "",
      guard_name: "web",
      description: "",
      is_active: true,
      is_system_group: false,
      alow_level: 1,
    });
    setSelectedPermissions(new Set());
    setErrors({});
    setSearchTerm("");
    setShowOnlySelected(false);
    setExpandedGroups(new Set());
  };

  // Xử lý submit
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const roleData = {
      ...formData,
      permissions: Array.from(selectedPermissions),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log("Role Data:", roleData);
    alert("Vai trò đã được tạo thành công!");
  };

  // Render group checkbox icon
  const renderGroupIcon = (status) => {
    switch (status) {
      case "all":
        return <CheckSquare className="w-4 h-4 text-blue-600 cursor-pointer" />;
      case "some":
        return (
          <div className="w-4 h-4 border-2 border-blue-600 rounded-sm bg-blue-100 flex items-center justify-center cursor-pointer">
            <Minus className="w-3 h-3 text-blue-600" />
          </div>
        );
      default:
        return <Square className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />;
    }
  };

  const filteredGroups = getFilteredGroups();

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Form thông tin vai trò */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Thông tin vai trò</h2>

            <div className="space-y-5">
              {/* Tên vai trò */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Tên vai trò <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.name ? "border-red-300 focus-visible:ring-red-500" : ""
                  }`}
                  placeholder="Nhập tên vai trò"
                />
                {errors.name && (
                  <p className="text-sm font-medium text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Guard Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">Guard Name</label>
                <select
                  value={formData.guard_name}
                  onChange={(e) => handleInputChange("guard_name", e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="web">Web</option>
                  <option value="api">API</option>
                </select>
              </div>

              {/* Mô tả */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Mô tả chi tiết về vai trò này..."
                />
              </div>

              {/* Cấp độ quyền */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Cấp độ quyền <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.alow_level}
                  onChange={(e) => handleInputChange("alow_level", parseInt(e.target.value) || 1)}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.alow_level ? "border-red-300 focus-visible:ring-red-500" : ""
                  }`}
                />
                {errors.alow_level && (
                  <p className="text-sm font-medium text-destructive">{errors.alow_level}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Cấp độ từ 1-10, số càng cao quyền càng lớn
                </p>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange("is_active", e.target.checked)}
                    className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <label
                    htmlFor="is_active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Kích hoạt vai trò
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_system_group"
                    checked={formData.is_system_group}
                    onChange={(e) => handleInputChange("is_system_group", e.target.checked)}
                    className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <label
                    htmlFor="is_system_group"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Vai trò hệ thống
                  </label>
                </div>
              </div>
            </div>

            {/* Nút Lưu vai trò */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <Save className="w-4 h-4 mr-2" />
              Lưu vai trò
            </button>
          </div>

          {/* Thống kê quyền */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng kết quyền</h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-blue-600 mb-1">
                {selectedPermissions.size}
              </div>
              <div className="text-sm text-gray-600">quyền đã chọn</div>
            </div>

            <div className="space-y-3">
              {Object.entries(permissionGroups).map(([key, group]) => {
                const selectedCount = group.permissions.filter((p) =>
                  selectedPermissions.has(p.id),
                ).length;
                const totalCount = group.permissions.length;
                const percentage = Math.round((selectedCount / totalCount) * 100);

                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        {group.icon}
                        <span className="text-gray-700">{group.label}</span>
                      </div>
                      <span className="font-medium text-blue-600">
                        {selectedCount}/{totalCount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Danh sách quyền */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Header với search và filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Phân quyền chi tiết</h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {selectedPermissions.size} /{" "}
                  {Object.values(permissionGroups).reduce(
                    (acc, group) => acc + group.permissions.length,
                    0,
                  )}{" "}
                  quyền
                </div>
              </div>

              {/* Search và filters */}
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm quyền..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowOnlySelected(!showOnlySelected)}
                  className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                    showOnlySelected
                      ? "bg-blue-100 text-blue-700 border-blue-300"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {showOnlySelected ? "Hiện tất cả" : "Chỉ đã chọn"}
                </button>
              </div>
            </div>

            {/* Permissions accordion */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Object.entries(filteredGroups).map(([groupKey, group]) => {
                const status = getGroupStatus(groupKey);
                const selectedCount = group.permissions.filter((p) =>
                  selectedPermissions.has(p.id),
                ).length;
                const isExpanded = expandedGroups.has(groupKey);

                return (
                  <div key={groupKey} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Group header - always visible */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleGroupExpand(groupKey)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          )}
                        </button>

                        <div onClick={() => handleGroupToggle(groupKey)}>
                          {renderGroupIcon(status)}
                        </div>

                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-white rounded-lg shadow-sm">{group.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{group.label}</h3>
                            <p className="text-sm text-gray-600">
                              {selectedCount > 0
                                ? `${selectedCount}/${group.permissions.length} quyền được chọn`
                                : "Chưa chọn quyền nào"}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            status === "all"
                              ? "bg-green-100 text-green-800"
                              : status === "some"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {status === "all"
                            ? "Tất cả"
                            : status === "some"
                              ? "Một phần"
                              : "Chưa chọn"}
                        </div>
                      </div>
                    </div>

                    {/* Collapsible permissions */}
                    {isExpanded && (
                      <div className="p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          {group.permissions.map((permission) => {
                            const isSelected = selectedPermissions.has(permission.id);

                            return (
                              <div
                                key={permission.id}
                                className={`flex items-center p-3 rounded-md border cursor-pointer transition-all hover:shadow-sm ${
                                  isSelected
                                    ? "border-blue-200 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => handlePermissionToggle(permission.id)}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handlePermissionToggle(permission.id)}
                                  className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                <label className="ml-3 text-sm text-gray-700 cursor-pointer font-medium">
                                  {permission.name}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick actions */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Hành động nhanh:</div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const allPermissions = Object.values(permissionGroups).flatMap((group) =>
                        group.permissions.map((p) => p.id),
                      );
                      setSelectedPermissions(new Set(allPermissions));
                    }}
                    className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Chọn tất cả
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPermissions(new Set())}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Bỏ chọn tất cả
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-1.5 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Tạo lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRole;
