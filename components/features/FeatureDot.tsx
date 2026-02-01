'use client';

import { motion } from 'framer-motion';
import type { TimelineEvent, EventModule } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  UserCheck,
  Target,
  Settings,
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
  Circle,
  LucideIcon,
} from 'lucide-react';

// Module to icon mapping
const moduleIconMap: Record<EventModule, LucideIcon> = {
  'Hiring': UserCheck,
  'Goals': Target,
  'Bob Core': Settings,
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

interface FeatureDotProps {
  event: TimelineEvent;
  onClick: () => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  style?: React.CSSProperties;
  index?: number;
}

// Get breathing animation class based on impact score
function getBreathingClass(impactScore: 1 | 3 | 5): string {
  switch (impactScore) {
    case 5:
      return 'animate-pulse-philosophy';
    case 3:
      return 'animate-pulse-major';
    default:
      return 'animate-pulse-standard';
  }
}



export function FeatureDot({
  event,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  index = 0,
}: FeatureDotProps) {
  const isHighlight = event.impactScore === 5;
  const breathingClass = getBreathingClass(event.impactScore);

  // Get the icon component for this module
  const IconComponent = event.module ? moduleIconMap[event.module] : Circle;
  const iconSize = isHighlight ? 20 : 14;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.02 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      className={cn(
        "feature-dot rounded-full flex items-center justify-center",
        isHighlight ? "feature-dot-lg" : "feature-dot-sm",
        "feature-dot-pre-agentic",
        isHighlight && "highlight",
        breathingClass
      )}
      title={event.title}
    >
      <IconComponent
        size={iconSize}
        strokeWidth={2.5}
        className="text-[#1e0a2e]"
      />
    </motion.button>
  );
}
