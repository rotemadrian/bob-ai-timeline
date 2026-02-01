'use client';

import { motion } from 'framer-motion';
import type { TimelineEvent, EventModule } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  UserCheck,
  Target,
  Bot,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Calendar,
  Award,
  TrendingUp,
  DollarSign,
  Wallet,
  FileText,
  Brain,
  Briefcase,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

// Module to icon mapping
const moduleIconMap: Record<EventModule, LucideIcon> = {
  'Hiring': UserCheck,
  'Goals': Target,
  'Bob Core': Bot,
  'Learning': GraduationCap,
  'Surveys': ClipboardList,
  'Analytics': BarChart3,
  'Timeoff': Calendar,
  'Performance': Award,
  'Workforce planning': TrendingUp,
  'Compensation': DollarSign,
  'Payroll': Wallet,
  'Docs': FileText,
  'Skills': Brain,
  'Job catalog': Briefcase,
};

interface FeatureHoverCardProps {
  event: TimelineEvent;
  position: { x: number; y: number };
}

export function FeatureHoverCard({ event, position }: FeatureHoverCardProps) {
  const IconComponent = event.module ? moduleIconMap[event.module] : Sparkles;
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "fixed z-50 max-w-xs p-3 rounded-lg shadow-xl border pointer-events-none",
        "bg-bob-purple-800/95 border-white/10 backdrop-blur-sm"
      )}
      style={{
        left: Math.min(position.x + 10, window.innerWidth - 280),
        top: position.y + 10,
      }}
    >
      {/* Header with icon and title */}
      <div className="flex items-start gap-2 mb-2">
        <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-violet-500/20">
          <IconComponent
            size={16}
            className="text-violet-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white leading-tight">
            {event.title}
          </h4>
          <p className="text-xs text-white/50 mt-0.5">
            {event.module && <span className="text-white/60">{event.module}</span>}
            {event.module && ' · '}
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <p className="text-xs text-white/70 line-clamp-2 mb-2">
          {event.description}
        </p>
      )}

      {/* Tags */}
      {event.isAskAboutMyData && (
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
            Ask About My Data
          </span>
        </div>
      )}
    </motion.div>
  );
}
