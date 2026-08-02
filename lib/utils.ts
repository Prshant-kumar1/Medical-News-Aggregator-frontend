import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function categoryToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function resolveCategoryFromSlug(slug: string, categories: string[]): string | null {
  const normalized = slug.toLowerCase();
  return categories.find((category) => categoryToSlug(category) === normalized) ?? null;
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "Unknown date";
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
