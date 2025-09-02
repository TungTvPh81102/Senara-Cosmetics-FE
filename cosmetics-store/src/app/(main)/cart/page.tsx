'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/stores/cart-store';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">Giỏ hàng trống</h1>
          <p className="text-gray-600">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Link href="/products">
            <Button>Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.product.id}-${item.selectedVariant}`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-2xl">
                    💄
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.product.name}
                    </h3>
                    {item.selectedVariant && (
                      <p className="text-sm text-gray-600">
                        Phiên bản: {item.selectedVariant}
                      </p>
                    )}
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      ₫{item.product.price.toLocaleString('vi-VN')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₫{(item.product.price * item.quantity).toLocaleString('vi-VN')}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-700 mt-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Link href="/products">
              <Button variant="outline">Tiếp tục mua sắm</Button>
            </Link>
            <Button variant="outline" onClick={clearCart}>
              Xóa tất cả
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>₫{total.toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>₫30,000</span>
              </div>
              <div className="flex justify-between">
                <span>Giảm giá:</span>
                <span className="text-green-600">-₫0</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng:</span>
                <span>₫{(total + 30000).toLocaleString('vi-VN')}</span>
              </div>
              
              <Button className="w-full" size="lg">
                Tiến hành thanh toán
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                <p>Miễn phí vận chuyển cho đơn hàng trên 500k</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}