'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Activity, TrendingUp, BookOpen, Globe } from 'lucide-react';

const stats = [
  { icon: TrendingUp, label: 'Articles Today', value: '2,400+' },
  { icon: BookOpen, label: 'Categories', value: '12' },
  { icon: Globe, label: 'Trusted Sources', value: '50+' },
];

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const suggestions = ['Cardiology', 'Oncology', 'Neurology', 'Vaccines', 'Clinical Trials'];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* ── Animated Background ───────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050b18] via-[#0a1628] to-[#071520]" />
      
      {/* Animated blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #0ea5e9, transparent)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #14b8a6, transparent)',
          animation: 'float 10s ease-in-out 2s infinite',
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full opacity-10 blur-[60px]"
        style={{
          background: 'radial-gradient(circle, #8b5cf6, transparent)',
          animation: 'float 12s ease-in-out 4s infinite',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ───────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8"
        >
          <Activity size={14} className="animate-pulse" />
          Real-time Medical Intelligence
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-7xl text-white mb-6 leading-tight tracking-tight"
        >
          Stay Ahead of{' '}
          <span className="gradient-text">Medical Science</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Curated, real-time medical news from the world&apos;s most trusted journals
          and healthcare organizations — all in one place.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <form
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto"
          >
            <div className="glass-dark border border-white/10 rounded-2xl p-1.5 flex items-center gap-2 focus-within:border-cyan-500/40 focus-within:shadow-[0_0_0_1px_rgba(6,182,212,0.3)] transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex-shrink-0 ml-1">
                <Search size={18} className="text-white" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cardiology, oncology, vaccines..."
                className="flex-1 bg-transparent text-white placeholder:text-slate-500 text-base py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all duration-200 flex-shrink-0 mr-1"
              >
                Search
              </button>
            </div>
          </form>
        </motion.div>

        {/* Quick Suggestion Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          <span className="text-slate-500 text-sm py-1">Popular:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => router.push(`/search?q=${encodeURIComponent(s)}`)}
              className="px-3 py-1 rounded-full text-sm glass-dark border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="glass-dark border border-white/8 rounded-2xl p-4 flex flex-col items-center gap-1"
            >
              <Icon size={18} className="text-cyan-400 mb-1" />
              <span className="font-display font-bold text-xl text-white">{value}</span>
              <span className="text-slate-500 text-xs text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
    </section>
  );
}
