import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Article } from '@/types';

export function useArticles(params?: {
  page?: number;
  limit?: number;
  category?: string;
  source?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => api.getArticles(params),
  });
}

export function useLatestArticles(limit: number = 10) {
  return useQuery({
    queryKey: ['articles', 'latest', limit],
    queryFn: () => api.getLatestArticles(limit),
  });
}

export function useTrendingArticles(limit: number = 10) {
  return useQuery({
    queryKey: ['articles', 'trending', limit],
    queryFn: () => api.getTrendingArticles(limit),
  });
}

export function useTodayArticles(limit: number = 20) {
  return useQuery({
    queryKey: ['articles', 'today', limit],
    queryFn: () => api.getTodayArticles(limit),
  });
}

export function useWeekArticles(limit: number = 50) {
  return useQuery({
    queryKey: ['articles', 'week', limit],
    queryFn: () => api.getWeekArticles(limit),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  });
}

export function useCategoryArticles(categoryName: string, page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ['category', categoryName, page, limit],
    queryFn: () => api.getCategoryArticles(categoryName, page, limit),
    enabled: !!categoryName,
  });
}

export function useSources() {
  return useQuery({
    queryKey: ['sources'],
    queryFn: () => api.getSources(),
  });
}
