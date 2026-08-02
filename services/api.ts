import { Article, ArticlesResponse, Category, Source, CategoryArticlesResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}/api${endpoint}`;
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
}

export const api = {
  // Articles
  getArticles: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    source?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.source) searchParams.append('source', params.source);
    if (params?.search) searchParams.append('search', params.search);
    
    return fetchAPI(`/articles?${searchParams.toString()}`) as Promise<ArticlesResponse>;
  },

  getLatestArticles: (limit: number = 10) => {
    return fetchAPI(`/articles/latest?limit=${limit}`) as Promise<{ articles: Article[] }>;
  },

  getTrendingArticles: (limit: number = 10) => {
    return fetchAPI(`/articles/trending?limit=${limit}`) as Promise<{ articles: Article[] }>;
  },

  getTodayArticles: (limit: number = 20) => {
    return fetchAPI(`/articles/today?limit=${limit}`) as Promise<{ articles: Article[] }>;
  },

  getWeekArticles: (limit: number = 50) => {
    return fetchAPI(`/articles/week?limit=${limit}`) as Promise<{ articles: Article[] }>;
  },

  // Categories
  getCategories: () => {
    return fetchAPI('/categories') as Promise<{ categories: Category[] }>;
  },

  getCategoryArticles: (categoryName: string, page: number = 1, limit: number = 20) => {
    return fetchAPI(`/categories/${categoryName}/articles?page=${page}&limit=${limit}`) as Promise<CategoryArticlesResponse>;
  },

  // Sources
  getSources: () => {
    return fetchAPI('/articles/sources') as Promise<{ sources: Source[] }>;
  },
};
