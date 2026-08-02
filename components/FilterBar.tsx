'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
  categories: string[];
  sources: string[];
  onFilterChange: (filters: { category?: string; source?: string; time?: string }) => void;
}

const TIME_OPTIONS = [
  { value: '', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'latest', label: 'Latest' },
];

export default function FilterBar({ categories, sources, onFilterChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const activeCount = [selectedCategory, selectedSource, selectedTime].filter(Boolean).length;

  const handleApply = () => {
    onFilterChange({
      category: selectedCategory || undefined,
      source: selectedSource || undefined,
      time: selectedTime || undefined,
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedCategory('');
    setSelectedSource('');
    setSelectedTime('');
    onFilterChange({});
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-full glass border transition-all duration-200 text-sm font-medium',
          activeCount > 0
            ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
            : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-cyan-500/20'
        )}
      >
        <SlidersHorizontal size={15} />
        Filters
        {activeCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-white text-xs font-bold">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute top-full right-0 mt-2 w-80 glass-card border border-[var(--border-color)] z-50 p-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-cyan-400" />
                  <h3 className="font-semibold text-[var(--text-primary)]">Filters</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-5">
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/30 bg-transparent transition-all"
                  >
                    <option value="" className="bg-slate-900">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Source */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Source
                  </label>
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl glass border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/30 bg-transparent transition-all"
                  >
                    <option value="" className="bg-slate-900">All Sources</option>
                    {sources.map((source) => (
                      <option key={source} value={source} className="bg-slate-900">{source}</option>
                    ))}
                  </select>
                </div>

                {/* Time Period — pill buttons */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Time Period
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIME_OPTIONS.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setSelectedTime(value)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
                          selectedTime === value
                            ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                            : 'glass border-[var(--border-color)] text-[var(--text-secondary)] hover:border-cyan-500/20 hover:text-[var(--text-primary)]'
                        )}
                      >
                        {selectedTime === value && <Check size={11} />}
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleApply}
                    className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all duration-200"
                  >
                    Apply Filters
                  </button>
                  {activeCount > 0 && (
                    <button
                      onClick={handleClear}
                      className="px-4 py-2.5 glass border border-[var(--border-color)] text-[var(--text-secondary)] rounded-xl text-sm hover:text-[var(--text-primary)] hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
