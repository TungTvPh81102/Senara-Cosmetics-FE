'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Star, ShoppingCart, Heart, Search, Filter, Grid, List } from 'lucide-react';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock products data
  const products = [
    {
      id: '1',
      name: 'Kem dưỡng ẩm La Roche-Posay Toleriane Ultra',
      price: 299000,
      originalPrice: 399000,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviewCount: 234,
      category: 'Chăm sóc da',
      brand: 'La Roche-Posay',
      inStock: true,
    },
    {
      id: '2',
      name: 'Son môi YSL Rouge Pur Couture',
      price: 1200000,
      originalPrice: null,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviewCount: 156,
      category: 'Trang điểm',
      brand: 'YSL',
      inStock: true,
    },
    {
      id: '3',
      name: 'Nước hoa Chanel No.5 EDT',
      price: 2500000,
      originalPrice: null,
      image: '/placeholder-product.jpg',
      rating: 4.7,
      reviewCount: 89,
      category: 'Nước hoa',
      brand: 'Chanel',
      inStock: false,
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
      brand: 'The Ordinary',
      inStock: true,
    },
    {
      id: '5',
      name: 'Phấn nền Estée Lauder Double Wear',
      price: 1500000,
      originalPrice: null,
      image: '/placeholder-product.jpg',
      rating: 4.5,
      reviewCount: 198,
      category: 'Trang điểm',
      brand: 'Estée Lauder',
      inStock: true,
    },
    {
      id: '6',
      name: 'Dầu gội Kerastase Nutritive',
      price: 650000,
      originalPrice: 750000,
      image: '/placeholder-product.jpg',
      rating: 4.4,
      reviewCount: 145,
      category: 'Chăm sóc tóc',
      brand: 'Kerastase',
      inStock: true,
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
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
          {!product.inStock && (
            <Badge className="absolute top-2 left-2 bg-gray-500">
              Hết hàng
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
            <p className="text-sm text-gray-600">{product.brand}</p>
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
            <Button size="sm" disabled={!product.inStock}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              {product.inStock ? 'Mua' : 'Hết hàng'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sản phẩm</h1>
        <p className="text-gray-600">
          Khám phá bộ sưu tập mỹ phẩm chính hãng của chúng tôi
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Lọc
          </Button>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Xem thêm sản phẩm
        </Button>
      </div>
    </div>
  );
}