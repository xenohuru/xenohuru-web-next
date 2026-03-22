'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
export default function OperatorsPage() {
  const { data: ops = [] } = useQuery({ queryKey: ['ops'], queryFn: () => api.operators.list() });
  return <div className="min-h-screen bg-[#0a0a0a] py-20 px-4"><h1 className="font-display text-5xl font-bold text-white text-center mb-4">Tour Operators</h1><div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mt-12">{ops.length > 0 ? ops.map(o => <div key={o.id} className="bg-[#111827] p-6 rounded-2xl border border-[#c8903a]/10"><h3 className="text-white font-bold mb-2">{o.name}</h3><p className="text-[#8b949e] text-sm">{o.description}</p></div>) : <p className="text-[#8b949e]">No operators</p>}</div></div>;
}
