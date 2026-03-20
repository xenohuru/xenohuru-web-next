export function LoadingSkeleton({ variant = 'card' }: { variant?: 'card' | 'list' | 'detail' }) {
  if (variant === 'card') {
    return (
      <div className="bg-[#111827] rounded-lg overflow-hidden border border-[#c8903a]/10 animate-pulse">
        <div className="h-48 bg-[#1a4731]/20" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-[#1a4731]/20 rounded w-3/4" />
          <div className="flex gap-2">
            <div className="h-6 bg-[#1a4731]/20 rounded w-20" />
            <div className="h-6 bg-[#1a4731]/20 rounded w-20" />
          </div>
          <div className="h-4 bg-[#1a4731]/20 rounded w-full" />
          <div className="h-4 bg-[#1a4731]/20 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 bg-[#111827] p-4 rounded-lg border border-[#c8903a]/10 animate-pulse">
            <div className="w-24 h-24 bg-[#1a4731]/20 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-[#1a4731]/20 rounded w-1/2" />
              <div className="h-4 bg-[#1a4731]/20 rounded w-full" />
              <div className="h-4 bg-[#1a4731]/20 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Detail variant
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-96 bg-[#1a4731]/20 rounded-lg" />
      <div className="h-8 bg-[#1a4731]/20 rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-4 bg-[#1a4731]/20 rounded w-full" />
        <div className="h-4 bg-[#1a4731]/20 rounded w-full" />
        <div className="h-4 bg-[#1a4731]/20 rounded w-3/4" />
      </div>
    </div>
  );
}

export function CardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} variant="card" />
      ))}
    </div>
  );
}
