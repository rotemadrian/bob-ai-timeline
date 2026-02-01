import { Milestone } from '@/lib/types';

// OpenAI Milestones
export const openaiMilestones: Milestone[] = [
  // 2023
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    date: '2023-02-01',
    type: 'openai',
    kind: 'product',
    description: 'Paid subscription tier for ChatGPT',
    icon: 'openai',
  },
  {
    id: 'chatgpt-api',
    name: 'ChatGPT API + Whisper',
    date: '2023-03-01',
    type: 'openai',
    kind: 'feature',
    description: 'gpt-3.5-turbo for developers; speech-to-text via Whisper',
    icon: 'openai',
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    date: '2023-03-14',
    type: 'openai',
    kind: 'model',
    description: 'GPT-4 model launch',
    icon: 'openai',
  },
  {
    id: 'chatgpt-plugins',
    name: 'ChatGPT Plugins',
    date: '2023-03-23',
    type: 'openai',
    kind: 'feature',
    description: 'Early plugin ecosystem announcement',
    icon: 'openai',
  },
  {
    id: 'chatgpt-ios',
    name: 'ChatGPT iOS App',
    date: '2023-05-18',
    type: 'openai',
    kind: 'product',
    icon: 'openai',
  },
  {
    id: 'chatgpt-enterprise',
    name: 'ChatGPT Enterprise',
    date: '2023-08-28',
    type: 'openai',
    kind: 'product',
    icon: 'openai',
  },
  {
    id: 'devday-2023',
    name: 'DevDay: GPT-4 Turbo, Assistants API',
    date: '2023-11-06',
    type: 'openai',
    kind: 'feature',
    description: 'GPT-4 Turbo, Assistants API, DALL-E 3 API, GPTs',
    icon: 'openai',
  },

  // 2024
  {
    id: 'gpt-store',
    name: 'GPT Store',
    date: '2024-01-10',
    type: 'openai',
    kind: 'product',
    description: 'Marketplace for GPTs',
    icon: 'openai',
  },
  {
    id: 'chatgpt-team',
    name: 'ChatGPT Team',
    date: '2024-01-10',
    type: 'openai',
    kind: 'product',
    description: 'Team/workspace plan',
    icon: 'openai',
  },
  {
    id: 'sora',
    name: 'Sora',
    date: '2024-02-15',
    type: 'openai',
    kind: 'model',
    description: 'Text-to-video model announcement',
    icon: 'openai',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    date: '2024-05-13',
    type: 'openai',
    kind: 'model',
    description: 'New flagship model; expanded free-tier capabilities',
    icon: 'openai',
  },
  {
    id: 'openai-apple',
    name: 'OpenAI x Apple Partnership',
    date: '2024-06-10',
    type: 'openai',
    kind: 'feature',
    description: 'ChatGPT integration into Apple experiences',
    icon: 'openai',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    date: '2024-07-18',
    type: 'openai',
    kind: 'model',
    description: 'Smaller, cost-efficient model',
    icon: 'openai',
  },
  {
    id: 'canvas',
    name: 'Canvas',
    date: '2024-10-03',
    type: 'openai',
    kind: 'feature',
    description: 'New project interface for writing/coding alongside chat',
    icon: 'openai',
  },
  {
    id: 'chatgpt-search',
    name: 'ChatGPT Search',
    date: '2024-10-31',
    type: 'openai',
    kind: 'feature',
    icon: 'openai',
  },
  {
    id: 'chatgpt-pro',
    name: 'ChatGPT Pro',
    date: '2024-12-05',
    type: 'openai',
    kind: 'product',
    description: 'Higher-tier plan',
    icon: 'openai',
  },

  // 2025
  {
    id: 'operator',
    name: 'Operator',
    date: '2025-01-23',
    type: 'openai',
    kind: 'feature',
    description: 'Agent that can use its own browser for tasks',
    icon: 'openai',
  },
  {
    id: 'deep-research',
    name: 'Deep Research',
    date: '2025-02-02',
    type: 'openai',
    kind: 'feature',
    description: 'Research/synthesis capability in ChatGPT',
    icon: 'openai',
  },
  {
    id: 'gpt-4o-image-gen',
    name: 'GPT-4o Image Generation',
    date: '2025-03-25',
    type: 'openai',
    kind: 'feature',
    description: 'Native image gen capability tied to GPT-4o',
    icon: 'openai',
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1 Family',
    date: '2025-04-14',
    type: 'openai',
    kind: 'model',
    description: 'GPT-4.1, 4.1 mini, 4.1 nano',
    icon: 'openai',
  },
  {
    id: 'o3-o4-mini',
    name: 'OpenAI o3 and o4-mini',
    date: '2025-04-16',
    type: 'openai',
    kind: 'model',
    description: 'Reasoning-oriented model releases',
    icon: 'openai',
  },
  {
    id: 'chatgpt-agent',
    name: 'ChatGPT Agent',
    date: '2025-07-17',
    type: 'openai',
    kind: 'feature',
    description: 'Unified agentic system integrating browser action + deep research',
    icon: 'openai',
  },
  {
    id: 'gpt-5',
    name: 'GPT-5',
    date: '2025-08-07',
    type: 'openai',
    kind: 'model',
    description: 'Next generation foundation model',
    icon: 'openai',
  },
  {
    id: 'chatgpt-pulse',
    name: 'ChatGPT Pulse',
    date: '2025-09-25',
    type: 'openai',
    kind: 'feature',
    description: 'Proactive daily updates experience',
    icon: 'openai',
  },
  {
    id: 'apps-sdk',
    name: 'Apps in ChatGPT + Apps SDK',
    date: '2025-10-06',
    type: 'openai',
    kind: 'feature',
    description: 'Chat-native apps + developer SDK',
    icon: 'openai',
  },
  {
    id: 'chatgpt-atlas',
    name: 'ChatGPT Atlas',
    date: '2025-10-21',
    type: 'openai',
    kind: 'product',
    description: 'ChatGPT-centric web browser',
    icon: 'openai',
  },
  {
    id: 'gpt-5.1',
    name: 'GPT-5.1',
    date: '2025-11-12',
    type: 'openai',
    kind: 'model',
    icon: 'openai',
  },
  {
    id: 'group-chats',
    name: 'Group Chats in ChatGPT',
    date: '2025-11-13',
    type: 'openai',
    kind: 'feature',
    icon: 'openai',
  },
  {
    id: 'gpt-5.2',
    name: 'GPT-5.2',
    date: '2025-12-11',
    type: 'openai',
    kind: 'model',
    icon: 'openai',
  },
  {
    id: 'app-submission',
    name: 'App Submission to ChatGPT',
    date: '2025-12-17',
    type: 'openai',
    kind: 'feature',
    description: 'Developers can submit apps to ChatGPT',
    icon: 'openai',
  },
  {
    id: 'gpt-5.2-codex',
    name: 'GPT-5.2-Codex',
    date: '2025-12-18',
    type: 'openai',
    kind: 'model',
    description: 'Agentic coding-optimized model for Codex surfaces',
    icon: 'openai',
  },

  // 2026
  {
    id: 'chatgpt-health',
    name: 'ChatGPT Health',
    date: '2026-01-07',
    type: 'openai',
    kind: 'product',
    icon: 'openai',
  },
  {
    id: 'openai-healthcare',
    name: 'OpenAI for Healthcare',
    date: '2026-01-08',
    type: 'openai',
    kind: 'product',
    icon: 'openai',
  },
];

// HiBob AI Platform Milestones
export const platformMilestones: Milestone[] = [
  {
    id: 'ai-platform-born',
    name: 'AI Platform is Born',
    date: '2024-03-01',
    type: 'platform',
    description: 'HiBob AI Platform foundation created',
    icon: 'diamond',
  },
  {
    id: 'first-feature',
    name: 'First Feature',
    date: '2024-06-05',
    type: 'platform',
    description: 'Job Description Generator - First AI feature to use the platform',
    icon: 'diamond',
  },
  {
    id: 'second-service',
    name: 'Second Service',
    date: '2024-07-02',
    type: 'platform',
    description: 'Key Results - First feature fully implemented by the team',
    icon: 'diamond',
  },
  {
    id: 'ai-bot',
    name: 'AI Bot Service',
    date: '2024-07-08',
    type: 'platform',
    description: 'First service the team worked on together',
    icon: 'diamond',
  },
  {
    id: 'survey-analysis',
    name: 'Survey Analysis Service',
    date: '2025-01-08',
    type: 'platform',
    description: 'Second service created, first collaboration with Performance team',
    icon: 'diamond',
  },
  {
    id: 'ask-about-my-data',
    name: 'Ask About My Data',
    date: '2025-02-24',
    type: 'platform',
    description: 'Data analysis feature launched',
    icon: 'diamond',
  },
  {
    id: 'tools-registry',
    name: 'Tools Registry',
    date: '2025-05-01',
    type: 'platform',
    description: 'Important step that preceded the agent',
    icon: 'diamond',
  },
  {
    id: 'agentic-poc',
    name: 'Agent POC',
    date: '2025-04-28',
    type: 'platform',
    description: 'First sparks of agentic engine - Formula builder POC',
    icon: 'diamond',
  },
  {
    id: 'async-workflows',
    name: 'Async Workflow Support',
    date: '2025-05-15',
    type: 'platform',
    description: 'Performance Review was the first consumer, later joined by Docs and Learning',
    icon: 'diamond',
  },
  {
    id: 'tools-workshop',
    name: 'Tools Workshop',
    date: '2024-09-29',
    type: 'platform',
    description: 'First workshop on the tools',
    icon: 'diamond',
  },
  {
    id: 'bob-companion',
    name: 'Bob Companion',
    date: '2025-12-03',
    type: 'platform',
    description: 'Unified AI assistant launched in beta',
    icon: 'star',
  },
  {
    id: 'job-catalog-generator',
    name: 'Job Catalog Generator',
    date: '2025-12-07',
    type: 'platform',
    description: 'AI-led job architecture generation',
    icon: 'diamond',
  },
  {
    id: 'ai-studio',
    name: 'Extensibility AI Studio',
    date: '2027-03-01',
    type: 'platform',
    description: 'Custom AI tools for customers',
    icon: 'star',
  },
  {
    id: 'bob-3.0',
    name: 'Bob 3.0',
    date: '2027-06-01',
    type: 'platform',
    description: 'Next generation Bob platform',
    icon: 'star',
  },
];

// All milestones combined
export const allMilestones = [...openaiMilestones, ...platformMilestones].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

// Helper to get milestone by ID
export function getMilestoneById(id: string): Milestone | undefined {
  return allMilestones.find(m => m.id === id);
}

// Get milestones by year
export function getMilestonesByYear(year: number): Milestone[] {
  return allMilestones.filter(m => new Date(m.date).getFullYear() === year);
}

// Get OpenAI milestones only
export function getOpenAIMilestonesByYear(year: number): Milestone[] {
  return openaiMilestones.filter(m => new Date(m.date).getFullYear() === year);
}

// Get platform milestones only
export function getPlatformMilestonesByYear(year: number): Milestone[] {
  return platformMilestones.filter(m => new Date(m.date).getFullYear() === year);
}
