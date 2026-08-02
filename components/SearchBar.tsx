'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  initialQuery?: string;
}

export default function SearchBar({ variant = 'compact', initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <div className="glass-dark border border-white/10 rounded-2xl p-1.5 flex items-center gap-2 focus-within:border-cyan-500/40 focus-within:shadow-[0_0_0_1px_rgba(6,182,212,0.3)] transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex-shrink-0 ml-1">
            <Search size={18} className="text-white" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cardiology, oncology, vaccines..."
            className="flex-1 bg-transparent text-white placeholder:text-slate-500 text-base py-2 focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-slate-500 hover:text-slate-300 transition-colors">
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all duration-200 flex-shrink-0 mr-1"
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  // Compact (default) variant
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <Search
          size={16}
          className="absolute left-4 text-[var(--text-secondary)] pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medical news..."
          className="w-full pl-11 pr-10 py-2.5 rounded-full glass border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/30 transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </form>
  );
}
