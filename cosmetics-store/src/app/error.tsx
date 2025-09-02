'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl">Có lỗi xảy ra</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Đã xảy ra lỗi không mong muốn. Chúng tôi đang khắc phục vấn đề này.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground">
                Chi tiết lỗi (Development)
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Thử lại
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Về trang chủ
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}