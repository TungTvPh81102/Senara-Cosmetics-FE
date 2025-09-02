import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingBag, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Tổng người dùng',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Sản phẩm',
      value: '567',
      change: '+5%',
      icon: Package,
      color: 'text-green-600',
    },
    {
      title: 'Đơn hàng',
      value: '89',
      change: '+23%',
      icon: ShoppingBag,
      color: 'text-purple-600',
    },
    {
      title: 'Doanh thu',
      value: '₫12,345,678',
      change: '+18%',
      icon: TrendingUp,
      color: 'text-pink-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Tổng quan về hoạt động của hệ thống
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Người dùng mới đăng ký</p>
                  <p className="text-xs text-muted-foreground">2 phút trước</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Đơn hàng mới</p>
                  <p className="text-xs text-muted-foreground">5 phút trước</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sản phẩm được cập nhật</p>
                  <p className="text-xs text-muted-foreground">10 phút trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Kem dưỡng ẩm</p>
                  <p className="text-xs text-muted-foreground">123 đã bán</p>
                </div>
                <span className="text-sm font-medium">₫299,000</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Son môi matte</p>
                  <p className="text-xs text-muted-foreground">98 đã bán</p>
                </div>
                <span className="text-sm font-medium">₫199,000</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Serum vitamin C</p>
                  <p className="text-xs text-muted-foreground">87 đã bán</p>
                </div>
                <span className="text-sm font-medium">₫599,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}