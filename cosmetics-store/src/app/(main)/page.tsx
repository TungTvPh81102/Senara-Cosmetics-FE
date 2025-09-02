import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = [
    {
      id: '1',
      name: 'Kem dưỡng ẩm La Roche-Posay',
      price: 299000,
      originalPrice: 399000,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviewCount: 234,
      category: 'Chăm sóc da',
    },
    {
      id: '2',
      name: 'Son môi YSL Rouge Pur',
      price: 1200000,
      originalPrice: null,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviewCount: 156,
      category: 'Trang điểm',
    },
    {
      id: '3',
      name: 'Nước hoa Chanel No.5',
      price: 2500000,
      originalPrice: null,
      image: '/placeholder-product.jpg',
      rating: 4.7,
      reviewCount: 89,
      category: 'Nước hoa',
    },
    {
      id: '4',
      name: 'Serum Vitamin C The Ordinary',
      price: 199000,
      originalPrice: 249000,
      image: '/placeholder-product.jpg',
      rating: 4.6,
      reviewCount: 312,
      category: 'Chăm sóc da',
    },
  ];

  const categories = [
    {
      name: 'Chăm sóc da',
      image: '/placeholder-category.jpg',
      href: '/categories/skincare',
      productCount: 234,
    },
    {
      name: 'Trang điểm',
      image: '/placeholder-category.jpg',
      href: '/categories/makeup',
      productCount: 156,
    },
    {
      name: 'Nước hoa',
      image: '/placeholder-category.jpg',
      href: '/categories/fragrance',
      productCount: 89,
    },
    {
      name: 'Chăm sóc tóc',
      image: '/placeholder-category.jpg',
      href: '/categories/haircare',
      productCount: 67,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Khám phá vẻ đẹp
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  {' '}tự nhiên
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Những sản phẩm mỹ phẩm chính hãng từ các thương hiệu hàng đầu thế giới, 
                giúp bạn tỏa sáng với vẻ đẹp tự nhiên nhất.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Mua sắm ngay
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Khám phá thương hiệu
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                <span className="text-6xl">💄</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Danh mục sản phẩm
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá các danh mục sản phẩm đa dạng của chúng tôi
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center text-4xl">
                    🧴
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.productCount} sản phẩm
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sản phẩm nổi bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những sản phẩm được yêu thích nhất từ khách hàng
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
                    💄
                  </div>
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <Badge variant="secondary" className="text-xs mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₫{product.price.toLocaleString('vi-VN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₫{product.originalPrice.toLocaleString('vi-VN')}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button size="sm">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Mua
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Xem tất cả sản phẩm
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Đăng ký nhận tin khuyến mãi
          </h2>
          <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
            Nhận thông tin về các sản phẩm mới và ưu đãi đặc biệt qua email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
            />
            <Button variant="secondary" size="lg">
              Đăng ký
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}