'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('Error caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#161b22] rounded-lg border border-red-500/30 p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-[#8b949e] text-sm mb-4 leading-relaxed">
          {error.message || 'An unexpected error occurred while loading this page.'}
        </p>

        {error.digest && (
          <p className="text-[#6b7280] text-xs mb-6 font-mono bg-[#0d1117] p-2 rounded border border-[#30363d]">
            Error ID: {error.digest}
          </p>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1a7a4a] text-white rounded-lg hover:bg-[#1a7a4a]/90 transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <a
            href="/"
            className="w-full flex items-center justify-center px-4 py-3 bg-[#161b22] text-[#8b949e] rounded-lg border border-[#30363d] hover:border-[#1a7a4a] transition-colors font-medium"
          >
            Go Home
          </a>
        </div>

        <p className="text-[#6b7280] text-xs mt-6">
          If the problem persists, please <a href="/contact" className="text-[#1a7a4a] hover:text-[#e8a045]">contact support</a>
        </p>
      </div>
    </div>
  );
}
