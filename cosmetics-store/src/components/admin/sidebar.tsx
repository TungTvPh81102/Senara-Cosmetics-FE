'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  Shield,
  Key,
  Package,
  Tag,
  BarChart3,
  Settings,
  Home,
  ShoppingBag,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    name: 'Quản lý người dùng',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Quản lý vai trò',
    href: '/admin/roles',
    icon: Shield,
  },
  {
    name: 'Quản lý quyền',
    href: '/admin/permissions',
    icon: Key,
  },
  {
    name: 'Quản lý sản phẩm',
    href: '/admin/products',
    icon: Package,
  },
  {
    name: 'Quản lý danh mục',
    href: '/admin/categories',
    icon: Tag,
  },
  {
    name: 'Đơn hàng',
    href: '/admin/orders',
    icon: ShoppingBag,
  },
  {
    name: 'Báo cáo',
    href: '/admin/reports',
    icon: BarChart3,
  },
  {
    name: 'Cài đặt',
    href: '/admin/settings',
    icon: Settings,
  },
];

interface AdminSidebarProps {
  className?: string;
}

export default function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn('pb-12 w-64', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
            <span className="text-lg font-bold">Admin Panel</span>
          </div>
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}