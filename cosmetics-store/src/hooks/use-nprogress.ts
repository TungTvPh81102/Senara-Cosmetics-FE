import { useEffect } from 'react';
import NProgress from 'nprogress';

export function useNProgress() {
  const start = () => NProgress.start();
  const done = () => NProgress.done();
  const set = (progress: number) => NProgress.set(progress);

  return { start, done, set };
}

// Hook for automatic progress on route changes
export function useRouteProgress() {
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // Listen to Next.js router events if needed
    // This is handled by the ProgressBar component for App Router
    
    return () => {
      NProgress.done();
    };
  }, []);
}