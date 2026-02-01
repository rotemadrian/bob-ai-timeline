import { CategoryInfo, DimensionInfo, YearData, ModuleInfo, EventModule } from './types';

// Timeline years
export const TIMELINE_YEARS = [2023, 2024, 2025, 2026, 2027] as const;
export const START_YEAR = 2023;
export const END_YEAR = 2027;

// Colors
export const COLORS = {
  background: '#2d1b3d',
  backgroundLight: '#3d2a4d',
  backgroundDark: '#1a0f24',

  // Feature status colors
  released: '#22c55e',
  beta: '#f97316',
  earlyAdopters: '#eab308',
  demo: '#8b5cf6',
  planned: '#6b7280',

  // Category accent colors
  hiring: '#f472b6',
  goals: '#fb923c',
  core: '#a78bfa',
  skills: '#34d399',
  analytics: '#60a5fa',
  performance: '#f87171',
  learning: '#fbbf24',
  surveys: '#2dd4bf',
  compensation: '#facc15',

  // Year colors
  year2022: '#ffffff',
  year2023: '#ffffff',
  year2024: '#ffffff',
  year2025: '#ffffff',
  year2026: '#f472b6',
  year2027: '#fb923c',

  // OpenAI
  openai: '#10a37f',
} as const;

// Year data with philosophies
export const YEAR_DATA: YearData[] = [
  {
    year: 2023,
    philosophy: 'AI awakens - creation focused.',
    subtitle: 'The AI revolution begins',
    description: 'The year that changed everything. ChatGPT Plus, GPT-4, and ChatGPT Enterprise launch, setting the stage for AI-powered HR transformation.',
    color: 'text-white',
  },
  {
    year: 2024,
    philosophy: 'The AI bob platform is born',
    subtitle: 'First AI features ship',
    description: 'Laying the foundation with early AI experiments. Testing generative AI in Hiring, Goals, and core Bob workflows to learn what resonates with customers.',
    color: 'text-white',
  },
  {
    year: 2025,
    philosophy: 'Agentic transformation & Bob Companion',
    subtitle: 'AI across all modules',
    description: 'Scaling AI across the entire platform. Every module gets intelligent features, with "Ask About My Data" bringing natural language queries to HR analytics.',
    color: 'text-white',
  },
  {
    year: 2026,
    philosophy: 'Expansion and transformation',
    subtitle: 'Bob Companion & beyond',
    description: 'From features to true AI partnership. Bob Companion becomes your intelligent HR co-pilot, understanding context and proactively helping across all workflows.',
    color: 'text-bob-pink-400',
  },
  {
    year: 2027,
    philosophy: 'Bob 3.0',
    subtitle: 'Bob 3.0 & AI Studio',
    description: 'The agentic future arrives. Bob 3.0 introduces autonomous AI agents and AI Studio enables customers to build their own intelligent HR workflows.',
    color: 'text-bob-orange-400',
  },
];

// Module definitions (sorted by first feature appearance date)
export const MODULES: ModuleInfo[] = [
  { id: 'Hiring', name: 'Hiring', icon: 'UserCheck', description: 'Recruiting & talent acquisition' },           // 2024-06-05
  { id: 'Goals', name: 'Goals', icon: 'Target', description: 'Objectives and key results' },                     // 2024-07-02
  { id: 'Bob Core', name: 'Bob Core', icon: 'Bot', description: 'Core Bob platform & assistant' },               // 2024-07-08
  { id: 'Learning', name: 'Learning', icon: 'GraduationCap', description: 'Courses & training' },                // 2024-09-03
  { id: 'Surveys', name: 'Surveys', icon: 'ClipboardList', description: 'Employee surveys' },                    // 2025-01-08
  { id: 'Analytics', name: 'Analytics', icon: 'BarChart3', description: 'Reports & dashboards' },                // 2025-02-24
  { id: 'Timeoff', name: 'Time Off', icon: 'Calendar', description: 'Leave management' },                        // 2025-04-02
  { id: 'Performance', name: 'Performance', icon: 'Award', description: 'Reviews & feedback' },                  // 2025-04-14
  { id: 'Workforce planning', name: 'Workforce Planning', icon: 'TrendingUp', description: 'Position management' }, // 2025-06-01
  { id: 'Compensation', name: 'Compensation', icon: 'DollarSign', description: 'Salary & benefits' },            // 2025-07-01
  { id: 'Payroll', name: 'Payroll', icon: 'Wallet', description: 'Payroll processing' },                         // 2025-09-01
  { id: 'Docs', name: 'Documents', icon: 'FileText', description: 'Document management' },                       // 2025-10-01
  { id: 'Skills', name: 'Skills', icon: 'Brain', description: 'Skills management & AI' },                        // 2025-11-01
  { id: 'Job catalog', name: 'Job Catalog', icon: 'Briefcase', description: 'Job profiles & families' },         // 2025-12-01
];

// Category definitions (legacy - for backward compatibility)
export const CATEGORIES: CategoryInfo[] = [
  { id: 'hiring', name: 'Hiring', icon: 'UserCheck', description: 'Recruiting & talent acquisition' },
  { id: 'goals', name: 'Goals/OKRs', icon: 'Target', description: 'Objectives and key results' },
  { id: 'core', name: 'Bob Core', icon: 'Bot', description: 'Core Bob platform & assistant' },
  { id: 'skills', name: 'Skills', icon: 'Brain', description: 'Skills management & AI' },
  { id: 'tasks', name: 'Tasks', icon: 'CheckSquare', description: 'Task management & workflows' },
  { id: 'analytics', name: 'Analytics', icon: 'BarChart3', description: 'Reports & dashboards' },
  { id: 'org', name: 'Org Chart', icon: 'Network', description: 'Organizational structure' },
  { id: 'people', name: 'People', icon: 'Users', description: 'Workforce management' },
  { id: 'workforce', name: 'Workforce Planning', icon: 'TrendingUp', description: 'Position management' },
  { id: 'payroll', name: 'Payroll', icon: 'Wallet', description: 'Payroll processing' },
  { id: 'compensation', name: 'Compensation', icon: 'DollarSign', description: 'Salary & benefits' },
  { id: 'recognition', name: 'Recognition', icon: 'Trophy', description: 'Awards & kudos' },
  { id: 'documents', name: 'Documents', icon: 'FileText', description: 'Document management' },
  { id: 'jobs', name: 'Job Catalog', icon: 'Briefcase', description: 'Job profiles & families' },
  { id: 'learning', name: 'Learning', icon: 'GraduationCap', description: 'Courses & training' },
  { id: 'surveys', name: 'Surveys', icon: 'ClipboardList', description: 'Employee surveys' },
  { id: 'time-off', name: 'Time Off', icon: 'Calendar', description: 'Leave management' },
  { id: 'performance', name: 'Performance', icon: 'Award', description: 'Reviews & feedback' },
  { id: 'platform', name: 'Platform', icon: 'Settings', description: 'Platform-wide features' },
];

// Dimension rows
export const DIMENSIONS: DimensionInfo[] = [
  { id: 'philosophy', label: 'Product Philosophy', description: 'Strategic direction for each year' },
  { id: 'industry', label: 'Industry Radar', description: 'Market trends and context' },
  { id: 'ai-tech', label: 'AI Tech Milestones', description: 'OpenAI and industry advances' },
  { id: 'bob-features', label: 'Bob AI Features', description: 'HiBob AI feature releases' },
];

// Layout constants
export const LAYOUT = {
  sidebarWidth: 200,
  yearColumnMinWidth: 180,
  yearColumnMaxWidth: 280,
  headerHeight: 80,
  rowHeight: 48,
  dotSize: 12,
  dotSizeLarge: 16,
  monthColumns: 12,
  padding: 16,
  gap: 8,
} as const;

// Animation durations
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  zoom: 400,
} as const;
