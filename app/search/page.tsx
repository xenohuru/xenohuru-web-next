'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { AttractionCard } from '@/components/AttractionCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const { data: attractions = [] } = useQuery({
    queryKey: ['attractions-search'],
    queryFn: () => api.attractions.list(),
  });

  const filtered = attractions.filter(a => {
    const matchQuery = a.name.toLowerCase().includes(query.toLowerCase());
    const matchCat = !category || a.category === category;
    return matchQuery && matchCat;
  });

  const categories = [...new Set(attractions.map(a => a.category))];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-16 px-4 bg-gradient-to-br from-[#1a4731] to-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-white mb-8 text-center">Search</h1>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3 w-5 h-5 text-[#8b949e]" />
            <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-[#111827] border border-[#c8903a]/20 rounded-lg text-white" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 bg-[#111827] border border-[#c8903a]/20 rounded-lg text-white">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </section>
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <p className="text-[#8b949e] mb-8">{filtered.length} results</p>
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(a => <AttractionCard key={a.id} attraction={a} />)}
        </div>
      </section>
    </div>
  );
}
