'use client';

import { useEffect, useState } from 'react';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-hide after 2 seconds or when page loads
    const timer = setTimeout(() => setLoading(false), 2000);
    
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', () => setLoading(false));
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', () => setLoading(false));
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0d1117] flex flex-col items-center justify-center">
      {/* Spinner with Tanzania flag colors */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-transparent border-t-[#1a7a4a] border-r-[#e8a045] border-b-[#1e6fa8] rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-t-[#e8a045] border-r-[#1e6fa8] border-b-[#1a7a4a] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
      </div>
      
      {/* Text */}
      <p className="mt-6 font-display text-2xl text-white animate-pulse">
        Xenohuru
      </p>
      <p className="mt-2 text-[#8b949e] text-sm">
        Loading Tanzania...
      </p>
    </div>
  );
}
