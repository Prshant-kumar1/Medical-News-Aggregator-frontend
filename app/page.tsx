'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import CategoryChips from '@/components/CategoryChips';
import { SkeletonRow } from '@/components/LoadingSkeleton';
import { useTrendingArticles, useLatestArticles, useCategories, useCategoryArticles } from '@/hooks/useArticles';
import { categoryToSlug } from '@/lib/utils';
import { motion } from 'framer-motion';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContent />
    </QueryClientProvider>
  );
}

// Per-category section — fetches its own data
function CategoryRow({ name }: { name: string }) {
  const slug = categoryToSlug(name);
  const { data, isLoading } = useCategoryArticles(name, 1, 8);

  if (isLoading) return <SkeletonRow count={3} />;
  if (!data?.articles?.length) return null;

  return (
    <CategorySection
      title={name}
      articles={data.articles}
      categorySlug={slug}
      variant="horizontal"
    />
  );
}

function HomeContent() {
  const { data: trendingData, isLoading: trendingLoading } = useTrendingArticles(10);
  const { data: latestData, isLoading: latestLoading } = useLatestArticles(10);
  const { data: categoriesData } = useCategories();

  const categories = categoriesData?.categories || [];
  // Show top 6 categories below trending/latest
  const featuredCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20">

        {/* Category chips */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <CategoryChips categories={categories} />
          </motion.div>
        )}

        {/* Trending */}
        {trendingLoading ? (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-7 rounded-full skeleton" />
              <div className="h-7 w-36 skeleton rounded-md" />
            </div>
            <SkeletonRow count={4} />
          </div>
        ) : (
          <CategorySection
            title="Trending"
            articles={trendingData?.articles || []}
            variant="horizontal"
          />
        )}

        {/* Latest */}
        {latestLoading ? (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-7 rounded-full skeleton" />
              <div className="h-7 w-28 skeleton rounded-md" />
            </div>
            <SkeletonRow count={4} />
          </div>
        ) : (
          <CategorySection
            title="Latest"
            articles={latestData?.articles || []}
            variant="horizontal"
          />
        )}

        {/* Category sections */}
        {featuredCategories.map((category) => (
          <CategoryRow key={category.name} name={category.name} />
        ))}

        {/* Bottom CTA */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-[var(--text-secondary)] text-sm">
              Explore{' '}
              <span className="gradient-text font-semibold">{categories.length} specialties</span>
              {' '}— fresh updates every hour.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
