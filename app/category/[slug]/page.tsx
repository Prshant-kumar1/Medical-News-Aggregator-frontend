'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCategoryArticles, useCategories } from '@/hooks/useArticles';
import { resolveCategoryFromSlug } from '@/lib/utils';
import NewsCard from '@/components/NewsCard';
import { SkeletonGrid } from '@/components/LoadingSkeleton';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

export default function CategoryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CategoryPageContent />
    </QueryClientProvider>
  );
}

const CATEGORY_THEMES: Record<string, { gradient: string; glow: string; badge: string }> = {
  cardiology:   { gradient: 'from-rose-600 via-pink-600 to-rose-800',    glow: 'shadow-[0_0_80px_rgba(244,63,94,0.15)]',   badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  oncology:     { gradient: 'from-violet-600 via-purple-600 to-violet-800', glow: 'shadow-[0_0_80px_rgba(139,92,246,0.15)]', badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  neurology:    { gradient: 'from-cyan-600 via-sky-600 to-cyan-800',     glow: 'shadow-[0_0_80px_rgba(6,182,212,0.15)]',   badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  immunology:   { gradient: 'from-emerald-600 via-teal-600 to-emerald-800', glow: 'shadow-[0_0_80px_rgba(16,185,129,0.15)]', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  pharmacology: { gradient: 'from-amber-600 via-orange-600 to-amber-800', glow: 'shadow-[0_0_80px_rgba(245,158,11,0.15)]', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  genetics:     { gradient: 'from-lime-600 via-green-600 to-lime-800',   glow: 'shadow-[0_0_80px_rgba(132,204,22,0.15)]', badge: 'bg-lime-500/20 text-lime-300 border-lime-500/30' },
  surgery:      { gradient: 'from-red-600 via-orange-600 to-red-800',    glow: 'shadow-[0_0_80px_rgba(239,68,68,0.15)]',  badge: 'bg-red-500/20 text-red-300 border-red-500/30' },
  pediatrics:   { gradient: 'from-pink-600 via-fuchsia-600 to-pink-800', glow: 'shadow-[0_0_80px_rgba(236,72,153,0.15)]', badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
};
const DEFAULT_THEME = { gradient: 'from-cyan-600 via-teal-600 to-cyan-800', glow: 'shadow-[0_0_80px_rgba(6,182,212,0.15)]', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };

function getCategoryTheme(name: string) {
  const key = name.toLowerCase().replace(/\s+/g, '');
  return CATEGORY_THEMES[key] || DEFAULT_THEME;
}

function CategoryPageContent() {
  const params = useParams();
  const slug = params.slug as string;
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useCategories();
  const categoryNames = categoriesData?.categories.map((c) => c.name) ?? [];
  const categoryName = resolveCategoryFromSlug(slug, categoryNames);

  const { data, isLoading } = useCategoryArticles(categoryName ?? '', page, 12);
  const theme = getCategoryTheme(categoryName || slug);

  const displayName = categoryName ?? slug.replace(/-/g, ' ');

  return (
    <div className="min-h-screen pt-16">
      {/* Category Hero Banner */}
      <div className={cn('relative overflow-hidden py-16 px-4', theme.glow)}>
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
        
        {/* Decorative orb */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br ${theme.gradient} opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2`}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-6">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] capitalize">{displayName}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Layers size={24} className="text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-2 capitalize">
                  {displayName}
                </h1>
                {data && (
                  <span className={cn(
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
                    theme.badge
                  )}>
                    {data.total.toLocaleString()} articles
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {!categoryName && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <AlertCircle size={48} className="text-slate-400 mb-4" />
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Category not found</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              We couldn&apos;t find a category matching &quot;{slug.replace(/-/g, ' ')}&quot;.
            </p>
            <Link
              href="/"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        ) : isLoading ? (
          <SkeletonGrid count={12} />
        ) : data?.articles && data.articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {data.articles.map((article, i) => (
                <NewsCard key={article.id} article={article} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {data.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass border border-[var(--border-color)] text-[var(--text-secondary)] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--text-primary)] hover:border-cyan-500/30 transition-all duration-200"
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(data.pages, 7) }, (_, i) => {
                    let pageNum: number;
                    if (data.pages <= 7) {
                      pageNum = i + 1;
                    } else if (page <= 4) {
                      pageNum = i + 1;
                    } else if (page >= data.pages - 3) {
                      pageNum = data.pages - 6 + i;
                    } else {
                      pageNum = page - 3 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={cn(
                          'w-9 h-9 rounded-full text-sm font-medium transition-all duration-200',
                          page === pageNum
                            ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
                            : 'glass border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-cyan-500/30'
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                  disabled={page === data.pages}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass border border-[var(--border-color)] text-[var(--text-secondary)] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--text-primary)] hover:border-cyan-500/30 transition-all duration-200"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className={cn('w-16 h-16 rounded-2xl bg-gradient-to-br opacity-20 mb-6', theme.gradient)} />
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No articles yet</h2>
            <p className="text-[var(--text-secondary)]">
              No articles found in {displayName}. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
