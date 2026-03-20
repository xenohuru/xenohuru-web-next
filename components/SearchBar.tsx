'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search attractions...",
  debounceMs = 300 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearch]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[#6b7280]" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-10 pr-3 py-3 border border-[#c8903a]/20 rounded-lg bg-[#111827] text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#c8903a] focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
}
