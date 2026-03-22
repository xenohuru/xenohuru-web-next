'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function PartnersPage() {
  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: () => api.partners.list(),
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <h1 className="font-display text-5xl font-bold text-white text-center mb-4">Partners</h1>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mt-12">
        {partners.length ? (
          partners.map(p => (
            <div key={p.id} className="bg-[#111827] p-6 rounded-2xl border border-[#c8903a]/10">
              <h3 className="text-white font-bold">{p.name}</h3>
            </div>
          ))
        ) : (
          <p className="text-[#8b949e]">No partners</p>
        )}
      </div>
    </div>
  );
}
