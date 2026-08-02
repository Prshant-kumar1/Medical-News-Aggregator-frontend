'use client';

import { useRef } from 'react';
import { Article } from '@/types';
import NewsCard from './NewsCard';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  articles: Article[];
  categorySlug?: string;
  variant?: 'horizontal' | 'grid';
}

const SECTION_COLORS: Record<string, string> = {
  Trending: 'from-cyan-500 to-teal-400',
  Latest: 'from-violet-500 to-purple-400',
  Cardiology: 'from-rose-500 to-pink-400',
  Oncology: 'from-violet-500 to-purple-400',
  Neurology: 'from-cyan-500 to-sky-400',
  Immunology: 'from-emerald-500 to-teal-400',
  Pharmacology: 'from-amber-500 to-orange-400',
  Genetics: 'from-lime-500 to-green-400',
};

export default function CategorySection({
  title,
  articles,
  categorySlug,
  variant = 'horizontal',
}: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!articles || articles.length === 0) return null;

  const gradientClass = SECTION_COLORS[title] || 'from-cyan-500 to-teal-400';

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-7 rounded-full bg-gradient-to-b ${gradientClass}`} />
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
            {title}
          </h2>
          <span className="ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium glass border border-[var(--border-color)] text-[var(--text-secondary)]">
            {articles.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Scroll arrows (horizontal only) */}
          {variant === 'horizontal' && (
            <>
              <button
                onClick={() => scroll('left')}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-cyan-500/30 transition-all duration-200"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-cyan-500/30 transition-all duration-200"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
          {categorySlug && (
            <Link
              href={`/category/${categorySlug}`}
              className={cn(
                'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium',
                `bg-gradient-to-r ${gradientClass} text-white`,
                'hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-200'
              )}
            >
              View All
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Cards */}
      {variant === 'horizontal' ? (
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {articles.map((article, i) => (
            <div
              key={article.id}
              className="flex-shrink-0 w-80 snap-start"
            >
              <NewsCard article={article} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  );
}
