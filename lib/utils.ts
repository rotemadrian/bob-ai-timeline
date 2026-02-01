import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Feature, FeatureCategory } from './types';
import { COLORS } from './constants';

// Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

export function getYear(dateString: string): number {
  return parseDate(dateString).getFullYear();
}

export function getMonth(dateString: string): number {
  return parseDate(dateString).getMonth();
}

export function formatDate(dateString: string): string {
  const date = parseDate(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatMonthYear(dateString: string): string {
  const date = parseDate(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Feature filtering
export function filterFeaturesByYear(features: Feature[], year: number): Feature[] {
  return features.filter(f => getYear(f.date) === year);
}

export function filterFeaturesByCategory(features: Feature[], category: FeatureCategory): Feature[] {
  return features.filter(f => f.category === category);
}

export function filterFeaturesByYearAndCategory(
  features: Feature[],
  year: number,
  category: FeatureCategory
): Feature[] {
  return features.filter(f => getYear(f.date) === year && f.category === category);
}

export function filterFeaturesByMonth(features: Feature[], year: number, month: number): Feature[] {
  return features.filter(f => getYear(f.date) === year && getMonth(f.date) === month);
}

// Group features by month for a given year
export function groupFeaturesByMonth(features: Feature[], year: number): Map<number, Feature[]> {
  const yearFeatures = filterFeaturesByYear(features, year);
  const grouped = new Map<number, Feature[]>();

  for (let month = 0; month < 12; month++) {
    grouped.set(month, []);
  }

  yearFeatures.forEach(feature => {
    const month = getMonth(feature.date);
    const existing = grouped.get(month) || [];
    grouped.set(month, [...existing, feature]);
  });

  return grouped;
}

// Get category color
export function getCategoryColor(category: FeatureCategory): string {
  const colorMap: Record<string, string> = {
    hiring: COLORS.hiring,
    goals: COLORS.goals,
    core: COLORS.core,
    skills: COLORS.skills,
    analytics: COLORS.analytics,
    performance: COLORS.performance,
    learning: COLORS.learning,
    surveys: COLORS.surveys,
    compensation: COLORS.compensation,
  };
  return colorMap[category] || '#a78bfa';
}

// Get status color
export function getStatusColor(status: Feature['status']): string {
  const colorMap: Record<Feature['status'], string> = {
    released: COLORS.released,
    beta: COLORS.beta,
    'early-adopters': COLORS.earlyAdopters,
    demo: COLORS.demo,
    planned: COLORS.planned,
  };
  return colorMap[status];
}

// Count features per year
export function countFeaturesByYear(features: Feature[]): Map<number, number> {
  const counts = new Map<number, number>();
  features.forEach(f => {
    const year = getYear(f.date);
    counts.set(year, (counts.get(year) || 0) + 1);
  });
  return counts;
}

// Sort features by date
export function sortFeaturesByDate(features: Feature[]): Feature[] {
  return [...features].sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
}
