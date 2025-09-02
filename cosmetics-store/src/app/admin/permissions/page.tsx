'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Key } from 'lucide-react';
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
const permissions = [
  {
    id: '1',
    name: 'users.read',
    description: 'Xem danh sách người dùng',
    resource: 'users',
    action: 'read',
    createdAt: '2024-01-01',
    roleCount: 2,
  },
  {
    id: '2',
    name: 'users.write',
    description: 'Tạo và chỉnh sửa người dùng',
    resource: 'users',
    action: 'write',
    createdAt: '2024-01-01',
    roleCount: 1,
  },
  {
    id: '3',
    name: 'products.read',
    description: 'Xem danh sách sản phẩm',
    resource: 'products',
    action: 'read',
    createdAt: '2024-01-01',
    roleCount: 3,
  },
  {
    id: '4',
    name: 'products.write',
    description: 'Tạo và chỉnh sửa sản phẩm',
    resource: 'products',
    action: 'write',
    createdAt: '2024-01-01',
    roleCount: 2,
  },
  {
    id: '5',
    name: 'orders.read',
    description: 'Xem danh sách đơn hàng',
    resource: 'orders',
    action: 'read',
    createdAt: '2024-01-01',
    roleCount: 3,
  },
  {
    id: '6',
    name: 'orders.write',
    description: 'Tạo và chỉnh sửa đơn hàng',
    resource: 'orders',
    action: 'write',
    createdAt: '2024-01-01',
    roleCount: 1,
  },
];

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResource, setFilterResource] = useState('all');

  const resources = ['all', ...Array.from(new Set(permissions.map(p => p.resource)))];

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch = 
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesResource = filterResource === 'all' || permission.resource === filterResource;
    
    return matchesSearch && matchesResource;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'write':
        return 'bg-green-100 text-green-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceColor = (resource: string) => {
    switch (resource) {
      case 'users':
        return 'bg-purple-100 text-purple-800';
      case 'products':
        return 'bg-orange-100 text-orange-800';
      case 'orders':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý quyền</h1>
          <p className="text-muted-foreground">
            Quản lý các quyền hạn trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm quyền
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách quyền</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm quyền..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <select
              value={filterResource}
              onChange={(e) => setFilterResource(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              {resources.map((resource) => (
                <option key={resource} value={resource}>
                  {resource === 'all' ? 'Tất cả tài nguyên' : resource}
                </option>
              ))}
            </select>
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
                <TableHead>Tên quyền</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Tài nguyên</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead>Số vai trò</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium font-mono text-sm">
                        {permission.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate">{permission.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={getResourceColor(permission.resource)}
                    >
                      {permission.resource}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={getActionColor(permission.action)}
                    >
                      {permission.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{permission.roleCount}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(permission.createdAt).toLocaleDateString('vi-VN')}
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