'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useArticles } from '@/hooks/useArticles';
import NewsCard from '@/components/NewsCard';
import { SkeletonGrid } from '@/components/LoadingSkeleton';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, SearchX, Sparkles } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

export default function SearchPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<SearchLoadingState />}>
        <SearchPageContent />
      </Suspense>
    </QueryClientProvider>
  );
}

function SearchLoadingState() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <SkeletonGrid count={6} />
      </div>
    </div>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);

  const { data, isLoading } = useArticles({ search: query, page, limit: 12 });

  // Highlight matching text in title
  const highlight = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, `<mark class="bg-cyan-500/25 text-cyan-300 rounded px-0.5">$1</mark>`);
  };

  const POPULAR_SEARCHES = ['Cardiology', 'Cancer Treatment', 'Neurology', 'COVID-19', 'Clinical Trials', 'Oncology'];

  return (
    <div className="min-h-screen pt-16">
      {/* Search Header */}
      <div className="border-b border-[var(--border-color)] glass py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-6">
              <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[var(--text-primary)]">Search</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500">
                <Search size={18} className="text-white" />
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)]">
                {query ? (
                  <>
                    Results for{' '}
                    <span className="gradient-text">&quot;{query}&quot;</span>
                  </>
                ) : (
                  'Search Articles'
                )}
              </h1>
            </div>

            <SearchBar initialQuery={query} />

            {query && data && !isLoading && (
              <p className="mt-4 text-sm text-[var(--text-secondary)]">
                Found{' '}
                <span className="text-[var(--text-primary)] font-semibold">
                  {data.total.toLocaleString()} articles
                </span>
                {' '}matching your search
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {isLoading ? (
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
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
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
        ) : !query ? (
          /* Empty — no query */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              What are you looking for?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-md">
              Search across thousands of curated medical articles from trusted sources worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="px-4 py-2 rounded-full glass border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                >
                  {s}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : (
          /* No results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-500/10 to-slate-600/10 border border-slate-500/20 flex items-center justify-center mb-6">
              <SearchX size={32} className="text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              No results found
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-md">
              We couldn&apos;t find any articles for{' '}
              <span className="text-[var(--text-primary)] font-medium">&quot;{query}&quot;</span>.
              Try a different search term.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <p className="w-full text-xs text-[var(--text-secondary)] mb-1">Try searching for:</p>
              {POPULAR_SEARCHES.map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="px-4 py-2 rounded-full glass border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                >
                  {s}
                </Link>
              ))}
            </div>
            <Link
              href="/"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
