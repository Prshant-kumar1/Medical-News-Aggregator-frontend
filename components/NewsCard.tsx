'use client';

import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  article: Article;
  index?: number;
}

// Deterministic category → color mapping
const CATEGORY_COLORS: Record<string, { gradient: string; badge: string; glow: string }> = {
  cardiology:   { gradient: 'from-rose-500 to-pink-500',   badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20',   glow: 'hover:shadow-[0_20px_60px_-12px_rgba(244,63,94,0.2)]' },
  oncology:     { gradient: 'from-violet-500 to-purple-500', badge: 'bg-violet-500/15 text-violet-400 border-violet-500/20', glow: 'hover:shadow-[0_20px_60px_-12px_rgba(139,92,246,0.2)]' },
  neurology:    { gradient: 'from-cyan-500 to-sky-500',     badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',   glow: 'hover:shadow-[0_20px_60px_-12px_rgba(6,182,212,0.2)]' },
  immunology:   { gradient: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', glow: 'hover:shadow-[0_20px_60px_-12px_rgba(16,185,129,0.2)]' },
  pharmacology: { gradient: 'from-amber-500 to-orange-500', badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20', glow: 'hover:shadow-[0_20px_60px_-12px_rgba(245,158,11,0.2)]' },
  genetics:     { gradient: 'from-lime-500 to-green-500',   badge: 'bg-lime-500/15 text-lime-400 border-lime-500/20',   glow: 'hover:shadow-[0_20px_60px_-12px_rgba(132,204,22,0.2)]' },
  surgery:      { gradient: 'from-red-500 to-orange-500',   badge: 'bg-red-500/15 text-red-400 border-red-500/20',     glow: 'hover:shadow-[0_20px_60px_-12px_rgba(239,68,68,0.2)]' },
  pediatrics:   { gradient: 'from-pink-500 to-fuchsia-500', badge: 'bg-pink-500/15 text-pink-400 border-pink-500/20',   glow: 'hover:shadow-[0_20px_60px_-12px_rgba(236,72,153,0.2)]' },
};

const DEFAULT_COLORS = { gradient: 'from-cyan-500 to-teal-500', badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20', glow: 'hover:shadow-[0_20px_60px_-12px_rgba(6,182,212,0.2)]' };

function getCategoryColors(category: string) {
  const key = category.toLowerCase().replace(/\s+/g, '');
  return CATEGORY_COLORS[key] || DEFAULT_COLORS;
}

function estimateReadTime(summary?: string): string {
  if (!summary) return '2 min read';
  const words = summary.split(' ').length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

export default function NewsCard({ article, index = 0 }: NewsCardProps) {
  const colors = getCategoryColors(article.category);

  return (
    <motion.a
      href={article.article_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group block glass-card overflow-hidden news-card relative',
        colors.glow,
        'transition-all duration-300'
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* Category color accent bar */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${colors.gradient}`} />

      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-slate-800">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${colors.gradient} opacity-15 flex items-center justify-center`}>
            <span className="text-5xl font-bold text-white/40">
              {article.source?.charAt(0) ?? 'M'}
            </span>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm',
            colors.badge
          )}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-white/5 text-slate-400 border border-white/8">
            {article.source}
          </span>
          {article.published_at && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={11} />
              {formatDate(article.published_at)}
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-xs text-slate-500">
            <Clock size={11} />
            {estimateReadTime(article.summary)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-200 leading-snug">
          {article.title}
        </h3>

        {/* Summary */}
        {article.summary && (
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {article.summary}
          </p>
        )}

        {/* Author */}
        {article.author && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0`}>
              <User size={10} className="text-white" />
            </div>
            <span className="text-xs text-slate-500 truncate">{article.author}</span>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-sm font-medium text-cyan-500 dark:text-cyan-400 group-hover:gap-2.5 transition-all duration-200">
          Read Article
          <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>
    </motion.a>
  );
}
