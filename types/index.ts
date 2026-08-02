export interface Article {
  id: number;
  title: string;
  summary: string;
  image_url: string | null;
  source: string;
  source_url: string | null;
  article_url: string;
  author: string | null;
  category: string;
  published_at: string | null;
  created_at: string;
  tags: string[] | null;
}

export interface Category {
  name: string;
  count: number;
}

export interface Source {
  name: string;
  count: number;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface CategoryArticlesResponse {
  articles: Article[];
  category: string;
  total: number;
  page: number;
  limit: number;
  pages: number;
}
