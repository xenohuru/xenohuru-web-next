import { useCallback, useState } from 'react';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

interface UseWithRetryOptions<T> extends UseQueryOptions<T> {
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * Hook for data fetching with automatic retry logic
 * Provides exponential backoff for failed requests
 */
export function useWithRetry<T>(
  options: UseWithRetryOptions<T>
): UseQueryResult<T> & {
  retryCount: number;
  manualRetry: () => void;
} {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = options.maxRetries || 3;
  const retryDelay = options.retryDelay || 1000;

  const query = useQuery<T>({
    ...options,
    retry: (failureCount) => {
      if (failureCount >= maxRetries) return false;
      // Exponential backoff: 1s, 2s, 4s
      setTimeout(() => {
        setRetryCount(failureCount + 1);
      }, retryDelay * Math.pow(2, failureCount));
      return true;
    },
  });

  const manualRetry = useCallback(() => {
    setRetryCount(0);
    query.refetch();
  }, [query]);

  return {
    ...query,
    retryCount,
    manualRetry,
  };
}
