// Event Dimension (3 main categories from CSV)
export type EventDimension = 'Bob AI Feature' | 'AI Platform' | 'Industry Radar';

// Event Module (from CSV Module column) - sorted by first appearance date
export type EventModule =
  | 'Hiring'              // 2024-06-05
  | 'Goals'               // 2024-07-02
  | 'Bob Core'            // 2024-07-08
  | 'Learning'            // 2024-09-03
  | 'Surveys'             // 2025-01-08
  | 'Analytics'           // 2025-02-24
  | 'Timeoff'             // 2025-04-02
  | 'Performance'         // 2025-04-14
  | 'Workforce planning'  // 2025-06-01
  | 'Compensation'        // 2025-07-01
  | 'Payroll'             // 2025-09-01
  | 'Docs'                // 2025-10-01
  | 'Skills'              // 2025-11-01
  | 'Job catalog';        // 2025-12-01

// Main timeline event interface (from CSV structure)
export interface TimelineEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  description: string;
  dimension: EventDimension;
  module: EventModule | null;
  customerQuote?: string;
  internalReactionText?: string;
  featureScreenshotUrl?: string;
  reactionScreenshotUrl?: string;
  isAgentic: boolean;           // Is_Agentic_Icon === 'Yes'
  isAskAboutMyData: boolean;    // Is_Ask_about_my_data === 'Yes'
  impactScore: 1 | 3 | 5;       // For breathing animation intensity
}

// Legacy types for backward compatibility during transition
export type FeatureCategory =
  | 'hiring'
  | 'goals'
  | 'core'
  | 'skills'
  | 'tasks'
  | 'analytics'
  | 'org'
  | 'people'
  | 'workforce'
  | 'payroll'
  | 'compensation'
  | 'recognition'
  | 'documents'
  | 'jobs'
  | 'learning'
  | 'surveys'
  | 'time-off'
  | 'performance'
  | 'platform';

export type FeatureStatus = 'released' | 'beta' | 'early-adopters' | 'demo' | 'planned';

export interface Feature {
  id: string;
  name: string;
  date: string; // ISO date string YYYY-MM-DD
  category: FeatureCategory;
  description: string;
  milestone?: string;
  relatedOpenAI?: string;
  status: FeatureStatus;
  icon?: string;
  highlight?: boolean;
  screenshotUrl?: string;
  feedbackScreenshotUrl?: string;
}

export type MilestoneType = 'platform' | 'openai';
export type OpenAIMilestoneKind = 'model' | 'feature' | 'product';

export interface Milestone {
  id: string;
  name: string;
  date: string;
  type: MilestoneType;
  kind?: OpenAIMilestoneKind;
  description?: string;
  icon?: 'diamond' | 'openai' | 'star';
}

export interface YearData {
  year: number;
  philosophy: string;
  subtitle: string;
  description: string;
  color: string;
}

export interface CategoryInfo {
  id: FeatureCategory;
  name: string;
  icon: string;
  description: string;
}

// Module info for new timeline structure
export interface ModuleInfo {
  id: EventModule;
  name: string;
  icon: string;
  description: string;
}

// Timeline state
export type TimelineView = 'overview' | 'year';
export type TransitionState = 'idle' | 'zooming-in' | 'zooming-out';

export interface TimelineState {
  view: TimelineView;
  selectedYear: number | null;
  transition: TransitionState;
  selectedFeature: string | null;
  hoveredFeature: string | null;
  activeCategories: FeatureCategory[];
}

// Dimension rows for the timeline
export type DimensionRow =
  | 'philosophy'
  | 'industry'
  | 'ai-tech'
  | 'bob-features';

export interface DimensionInfo {
  id: DimensionRow;
  label: string;
  description: string;
}
