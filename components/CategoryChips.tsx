'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { categoryToSlug } from '@/lib/utils';

interface CategoryChipsProps {
  categories: Array<{ name: string; count: number }>;
  activeCategory?: string;
  onSelect?: (name: string) => void;
}

const CHIP_COLORS: Record<string, string> = {
  cardiology:   'hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 data-[active]:bg-rose-500/20 data-[active]:text-rose-400 data-[active]:border-rose-500/30',
  oncology:     'hover:bg-violet-500/20 hover:text-violet-400 hover:border-violet-500/30 data-[active]:bg-violet-500/20 data-[active]:text-violet-400 data-[active]:border-violet-500/30',
  neurology:    'hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30 data-[active]:bg-cyan-500/20 data-[active]:text-cyan-400 data-[active]:border-cyan-500/30',
  immunology:   'hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 data-[active]:bg-emerald-500/20 data-[active]:text-emerald-400 data-[active]:border-emerald-500/30',
  pharmacology: 'hover:bg-amber-500/20 hover:text-amber-400 hover:border-amber-500/30 data-[active]:bg-amber-500/20 data-[active]:text-amber-400 data-[active]:border-amber-500/30',
  genetics:     'hover:bg-lime-500/20 hover:text-lime-400 hover:border-lime-500/30 data-[active]:bg-lime-500/20 data-[active]:text-lime-400 data-[active]:border-lime-500/30',
  surgery:      'hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 data-[active]:bg-red-500/20 data-[active]:text-red-400 data-[active]:border-red-500/30',
  pediatrics:   'hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30 data-[active]:bg-pink-500/20 data-[active]:text-pink-400 data-[active]:border-pink-500/30',
};

const DEFAULT_CHIP = 'hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30 data-[active]:bg-cyan-500/20 data-[active]:text-cyan-400 data-[active]:border-cyan-500/30';

export default function CategoryChips({ categories, activeCategory, onSelect }: CategoryChipsProps) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-1">
      {/* All pill */}
      <Link
        href="/"
        data-active={pathname === '/' && !activeCategory ? '' : undefined}
        className={cn(
          'flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium',
          'glass border border-[var(--border-color)] text-[var(--text-secondary)]',
          'hover:bg-white/10 hover:text-[var(--text-primary)] hover:border-white/20',
          'data-[active]:bg-white/10 data-[active]:text-[var(--text-primary)] data-[active]:border-white/20',
          'transition-all duration-200 whitespace-nowrap'
        )}
      >
        All
      </Link>

      {categories.map(({ name, count }) => {
        const slug = categoryToSlug(name);
        const colorClass = CHIP_COLORS[name.toLowerCase().replace(/\s+/g, '')] || DEFAULT_CHIP;
        const isActive = activeCategory === name || pathname === `/category/${slug}`;

        const chipContent = (
          <>
            {name}
            <span className="px-1.5 py-0.5 text-xs rounded-full bg-white/8 font-normal">
              {count}
            </span>
          </>
        );

        if (onSelect) {
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              data-active={isActive ? '' : undefined}
              className={cn(
                'flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium',
                'glass border border-[var(--border-color)] text-[var(--text-secondary)]',
                colorClass,
                'transition-all duration-200 whitespace-nowrap'
              )}
            >
              {chipContent}
            </button>
          );
        }

        return (
          <Link
            key={name}
            href={`/category/${slug}`}
            data-active={isActive ? '' : undefined}
            className={cn(
              'flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium',
              'glass border border-[var(--border-color)] text-[var(--text-secondary)]',
              colorClass,
              'transition-all duration-200 whitespace-nowrap'
            )}
          >
            {chipContent}
          </Link>
        );
      })}
    </div>
  );
}
