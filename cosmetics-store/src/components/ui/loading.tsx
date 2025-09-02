import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loading({ className, size = 'md', text }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-2">
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-gray-300 border-t-primary',
            sizeClasses[size]
          )}
        />
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    </div>
  );
}

export function LoadingPage({ text = 'Đang tải...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loading size="lg" text={text} />
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-primary w-4 h-4',
        className
      )}
    />
  );
}