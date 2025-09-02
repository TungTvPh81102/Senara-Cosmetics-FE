'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
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
const products = [
  {
    id: '1',
    name: 'Kem dưỡng ẩm La Roche-Posay Toleriane Ultra',
    price: 299000,
    originalPrice: 399000,
    category: 'Chăm sóc da',
    brand: 'La Roche-Posay',
    stock: 45,
    status: 'active',
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Son môi YSL Rouge Pur Couture',
    price: 1200000,
    originalPrice: null,
    category: 'Trang điểm',
    brand: 'YSL',
    stock: 23,
    status: 'active',
    featured: false,
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    name: 'Nước hoa Chanel No.5 EDT',
    price: 2500000,
    originalPrice: null,
    category: 'Nước hoa',
    brand: 'Chanel',
    stock: 0,
    status: 'inactive',
    featured: false,
    createdAt: '2024-01-13',
  },
];

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Hết hàng', variant: 'destructive' as const };
    if (stock < 10) return { label: 'Sắp hết', variant: 'secondary' as const };
    return { label: 'Còn hàng', variant: 'default' as const };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả sản phẩm trong cửa hàng
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
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
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Thương hiệu</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Kho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Nổi bật</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-xl">
                          💄
                        </div>
                        <div>
                          <div className="font-medium line-clamp-1">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">
                          ₫{product.price.toLocaleString('vi-VN')}
                        </div>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ₫{product.originalPrice.toLocaleString('vi-VN')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.label}
                        </Badge>
                        <div className="text-sm text-gray-500">
                          {product.stock} sản phẩm
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(product.status)}>
                        {product.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.featured ? (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Nổi bật
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
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
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}