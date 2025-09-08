"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Plus, Trash2, User, MapPin, X } from "lucide-react";

const roles = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Toàn quyền quản trị hệ thống",
    color: "bg-red-50 border-red-200 text-red-800",
  },
  {
    id: "manager",
    name: "Manager",
    description: "Quản lý sản phẩm, đơn hàng và khách hàng",
    color: "bg-blue-50 border-blue-200 text-blue-800",
  },
  {
    id: "staff",
    name: "Staff",
    description: "Xử lý đơn hàng và hỗ trợ khách hàng",
    color: "bg-green-50 border-green-200 text-green-800",
  },
  {
    id: "content_editor",
    name: "Content Editor",
    description: "Quản lý nội dung và sản phẩm",
    color: "bg-purple-50 border-purple-200 text-purple-800",
  },
  {
    id: "customer_support",
    name: "Customer Support",
    description: "Hỗ trợ và chăm sóc khách hàng",
    color: "bg-orange-50 border-orange-200 text-orange-800",
  },
];

const cities = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];
const addressTypes = [
  { value: "home", label: "Nhà riêng" },
  { value: "office", label: "Văn phòng" },
  { value: "other", label: "Khác" },
];

export default function CreateUserForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    role: "",
    status: "active",
    sendWelcomeEmail: true,
  });

  const [addresses, setAddresses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [includeAddress, setIncludeAddress] = useState(false);
  const [errors, setErrors] = useState({});

  const selectedRole = roles.find((r) => r.id === userData.role);

  const addAddress = () => {
    if (addresses.length < 3) {
      const newAddress = {
        id: Date.now(),
        name: userData.full_name || "",
        phone: userData.phone || "",
        type: "home",
        address_line1: "",
        address_line2: "",
        ward: "",
        district: "",
        city: "",
        postal_code: "",
        country: "Vietnam",
        is_default: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
    }
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const updateAddress = (id, field, value) => {
    setAddresses(addresses.map((addr) => (addr.id === id ? { ...addr, [field]: value } : addr)));
  };

  const toggleIncludeAddress = (checked) => {
    setIncludeAddress(checked);
    if (checked && addresses.length === 0) {
      addAddress();
    } else if (!checked) {
      setAddresses([]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.full_name.trim()) {
      newErrors.full_name = "Họ và tên là bắt buộc";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!userData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (userData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!userData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    } else if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!userData.role) {
      newErrors.role = "Vai trò là bắt buộc";
    }

    // Validate addresses
    addresses.forEach((addr, index) => {
      if (!addr.name.trim()) {
        newErrors[`address_${index}_name`] = "Tên địa chỉ là bắt buộc";
      }
      if (!addr.phone.trim()) {
        newErrors[`address_${index}_phone`] = "Số điện thoại là bắt buộc";
      }
      if (!addr.address_line1.trim()) {
        newErrors[`address_${index}_address_line1`] = "Địa chỉ chi tiết là bắt buộc";
      }
      if (!addr.ward.trim()) {
        newErrors[`address_${index}_ward`] = "Phường/Xã là bắt buộc";
      }
      if (!addr.district.trim()) {
        newErrors[`address_${index}_district`] = "Quận/Huyện là bắt buộc";
      }
      if (!addr.city.trim()) {
        newErrors[`address_${index}_city`] = "Tỉnh/Thành phố là bắt buộc";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("User Data:", userData);
      console.log("Addresses:", addresses);
    }
  };

  const resetForm = () => {
    setUserData({
      email: "",
      password: "",
      confirmPassword: "",
      full_name: "",
      phone: "",
      date_of_birth: "",
      gender: "",
      role: "",
      status: "active",
      sendWelcomeEmail: true,
    });
    setAddresses([]);
    setIncludeAddress(false);
    setErrors({});
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 " />
              <CardTitle>Thông tin cơ bản</CardTitle>
            </div>
            <CardDescription>Nhập thông tin cá nhân của người dùng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">Họ và tên *</Label>
                <Input
                  id="full_name"
                  placeholder="Nguyễn Văn A"
                  value={userData.full_name}
                  onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                  className={errors.full_name ? "border-red-500" : ""}
                />
                {errors.full_name && <p className="text-sm text-red-500">{errors.full_name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="0123456789"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@beautybox.com"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Ngày sinh</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={userData.date_of_birth}
                  onChange={(e) => setUserData({ ...userData, date_of_birth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  value={userData.gender}
                  onValueChange={(value) => setUserData({ ...userData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={userData.confirmPassword}
                    onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                    className={`pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <div>
                  <CardTitle>Thông tin địa chỉ</CardTitle>
                  <CardDescription>Thêm địa chỉ cho người dùng (tối đa 3 địa chỉ)</CardDescription>
                </div>
              </div>
              <Switch checked={includeAddress} onCheckedChange={toggleIncludeAddress} />
            </div>
          </CardHeader>

          {includeAddress && (
            <CardContent className="space-y-6">
              {addresses.map((address, index) => (
                <div key={address.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Địa chỉ {index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAddress(address.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Tên địa chỉ *</Label>
                      <Input
                        placeholder="Nhà riêng"
                        value={address.name}
                        onChange={(e) => updateAddress(address.id, "name", e.target.value)}
                        className={errors[`address_${index}_name`] ? "border-red-500" : ""}
                      />
                      {errors[`address_${index}_name`] && (
                        <p className="text-sm text-red-500">{errors[`address_${index}_name`]}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Số điện thoại *</Label>
                      <Input
                        placeholder="0123456789"
                        value={address.phone}
                        onChange={(e) => updateAddress(address.id, "phone", e.target.value)}
                        className={errors[`address_${index}_phone`] ? "border-red-500" : ""}
                      />
                      {errors[`address_${index}_phone`] && (
                        <p className="text-sm text-red-500">{errors[`address_${index}_phone`]}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Loại địa chỉ</Label>
                      <Select
                        value={address.type}
                        onValueChange={(value) => updateAddress(address.id, "type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {addressTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Địa chỉ chi tiết *</Label>
                    <Input
                      placeholder="Số nhà, tên đường"
                      value={address.address_line1}
                      onChange={(e) => updateAddress(address.id, "address_line1", e.target.value)}
                      className={errors[`address_${index}_address_line1`] ? "border-red-500" : ""}
                    />
                    {errors[`address_${index}_address_line1`] && (
                      <p className="text-sm text-red-500">
                        {errors[`address_${index}_address_line1`]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Địa chỉ phụ</Label>
                    <Input
                      placeholder="Tòa nhà, chung cư (không bắt buộc)"
                      value={address.address_line2}
                      onChange={(e) => updateAddress(address.id, "address_line2", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Phường/Xã *</Label>
                      <Input
                        placeholder="Phường 1"
                        value={address.ward}
                        onChange={(e) => updateAddress(address.id, "ward", e.target.value)}
                        className={errors[`address_${index}_ward`] ? "border-red-500" : ""}
                      />
                      {errors[`address_${index}_ward`] && (
                        <p className="text-sm text-red-500">{errors[`address_${index}_ward`]}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Quận/Huyện *</Label>
                      <Input
                        placeholder="Quận 1"
                        value={address.district}
                        onChange={(e) => updateAddress(address.id, "district", e.target.value)}
                        className={errors[`address_${index}_district`] ? "border-red-500" : ""}
                      />
                      {errors[`address_${index}_district`] && (
                        <p className="text-sm text-red-500">
                          {errors[`address_${index}_district`]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Tỉnh/Thành phố *</Label>
                      <Select
                        value={address.city}
                        onValueChange={(value) => updateAddress(address.id, "city", value)}
                      >
                        <SelectTrigger
                          className={errors[`address_${index}_city`] ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Chọn tỉnh/thành" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[`address_${index}_city`] && (
                        <p className="text-sm text-red-500">{errors[`address_${index}_city`]}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Mã bưu điện</Label>
                      <Input
                        placeholder="70000"
                        value={address.postal_code}
                        onChange={(e) => updateAddress(address.id, "postal_code", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      checked={address.is_default}
                      onCheckedChange={(checked) =>
                        updateAddress(address.id, "is_default", checked)
                      }
                    />
                    <Label className="text-sm">Đặt làm địa chỉ mặc định</Label>
                  </div>
                </div>
              ))}

              {addresses.length < 3 && (
                <Button type="button" variant="outline" onClick={addAddress} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm địa chỉ ({addresses.length}/3)
                </Button>
              )}
            </CardContent>
          )}
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Role Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Vai trò hệ thống</CardTitle>
            <CardDescription>Chọn vai trò để tự động cấp quyền</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                    userData.role === role.id
                      ? role.color
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserData({ ...userData, role: role.id })}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="role"
                      value={role.id}
                      checked={userData.role === role.id}
                      onChange={() => setUserData({ ...userData, role: role.id })}
                      className="text-blue-600"
                    />
                    <div>
                      <div className="font-medium text-sm">{role.name}</div>
                      <div className="text-xs text-gray-600">{role.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt tài khoản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái tài khoản</Label>
              <Select
                value={userData.status}
                onValueChange={(value) => setUserData({ ...userData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Hoạt động
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Không hoạt động
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                checked={userData.sendWelcomeEmail}
                onCheckedChange={(checked) =>
                  setUserData({ ...userData, sendWelcomeEmail: checked })
                }
              />
              <Label className="text-sm">Gửi email chào mừng</Label>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Tóm tắt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Vai trò:</span>
                <span className="font-medium">{selectedRole?.name || "Chưa chọn"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái:</span>
                <span
                  className={`font-medium ${userData.status === "active" ? "text-green-600" : "text-gray-600"}`}
                >
                  {userData.status === "active" ? "Hoạt động" : "Không hoạt động"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Địa chỉ:</span>
                <span className="font-medium">{addresses.length} địa chỉ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email chào mừng:</span>
                <span className="font-medium">{userData.sendWelcomeEmail ? "Có" : "Không"}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmit} className="flex-1">
                Tạo người dùng
              </Button>
              <Button variant="outline" size="icon" onClick={resetForm}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
