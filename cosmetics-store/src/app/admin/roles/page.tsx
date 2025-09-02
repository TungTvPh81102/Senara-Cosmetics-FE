'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const roles = [
  {
    id: '1',
    name: 'admin',
    description: 'Quản trị viên hệ thống với quyền truy cập đầy đủ',
    permissions: [
      { name: 'users.read', resource: 'users', action: 'read' },
      { name: 'users.write', resource: 'users', action: 'write' },
      { name: 'products.read', resource: 'products', action: 'read' },
      { name: 'products.write', resource: 'products', action: 'write' },
    ],
    createdAt: '2024-01-01',
    userCount: 5,
  },
  {
    id: '2',
    name: 'manager',
    description: 'Quản lý với quyền hạn trung gian',
    permissions: [
      { name: 'products.read', resource: 'products', action: 'read' },
      { name: 'products.write', resource: 'products', action: 'write' },
      { name: 'orders.read', resource: 'orders', action: 'read' },
    ],
    createdAt: '2024-01-01',
    userCount: 12,
  },
  {
    id: '3',
    name: 'user',
    description: 'Người dùng thông thường',
    permissions: [
      { name: 'products.read', resource: 'products', action: 'read' },
      { name: 'orders.read', resource: 'orders', action: 'read' },
    ],
    createdAt: '2024-01-01',
    userCount: 1234,
  },
];

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý vai trò</h1>
          <p className="text-muted-foreground">
            Quản lý các vai trò và quyền hạn trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm vai trò
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách vai trò</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm vai trò..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Lọc
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên vai trò</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Số quyền</TableHead>
                <TableHead>Số người dùng</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium capitalize">{role.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">{role.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{role.permissions.length}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{role.userCount}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(role.createdAt).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Quản lý quyền
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}