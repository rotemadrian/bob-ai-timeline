'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { TimelineEvent, EventModule } from '@/lib/types';
import { TIMELINE_YEARS, YEAR_DATA, MODULES } from '@/lib/constants';
import { FeatureRow } from '@/components/features';
import { MilestoneRow } from '@/components/milestones';
import { cn } from '@/lib/utils';

interface YearOverviewProps {
  events: TimelineEvent[];
  onYearClick: (year: number) => void;
  onEventClick: (event: TimelineEvent) => void;
  onEventHover: (event: TimelineEvent | null, position?: { x: number; y: number }) => void;
}

export function YearOverview({
  events,
  onYearClick,
  onEventClick,
  onEventHover,
}: YearOverviewProps) {
  // Get active modules (modules that have at least one event)
  const activeModules = useMemo(() => {
    const moduleSet = new Set<EventModule>();
    events.forEach(e => {
      if (e.module) moduleSet.add(e.module);
    });
    return MODULES.filter(m => moduleSet.has(m.id));
  }, [events]);

  // Filter events by dimension
  const bobFeatures = useMemo(() =>
    events.filter(e => e.dimension === 'Bob AI Feature'),
    [events]
  );

  const platformEvents = useMemo(() =>
    events.filter(e => e.dimension === 'AI Platform'),
    [events]
  );

  const industryEvents = useMemo(() =>
    events.filter(e => e.dimension === 'Industry Radar'),
    [events]
  );

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full overflow-hidden"
    >
      {/* Year headers */}
      <div className="year-header-row flex border-b border-white/10 year-header">
        <div className="sidebar-col border-r border-white/10" />
        {TIMELINE_YEARS.map(year => {
          const yearData = YEAR_DATA.find(y => y.year === year);
          const yearEvents = events.filter(e => new Date(e.date).getFullYear() === year);
          const hasAgenticEvents = yearEvents.some(e => e.isAgentic);

          return (
            <button
              key={year}
              onClick={() => onYearClick(year)}
              className={cn(
                "year-col flex flex-col items-center justify-center py-3 px-3 border-r border-white/5 hover:bg-white/5 transition-colors group",
                hasAgenticEvents ? "year-column-agentic" : "year-column-pre-agentic"
              )}
            >
              <p className={cn(
                "year-number transition-colors",
                hasAgenticEvents
                  ? "year-number-agentic"
                  : "text-white group-hover:text-violet-400"
              )}>
                {year}
              </p>
              <p className={cn(
                "text-[11px] font-medium mt-1 font-sans text-center",
                hasAgenticEvents ? "text-pink-300/80" : "text-violet-300/80"
              )}>
                {yearData?.philosophy}
              </p>
            </button>
          );
        })}
      </div>

      {/* Features section - fills available space */}
      <div className="features-section">
        {/* Section label */}
        <div className="flex items-center">
          <div className="sidebar-col" />
          <span className="section-label">Bob AI Features</span>
        </div>

        {/* Features grid by module */}
        <div className="features-grid">
          {activeModules.map(moduleInfo => (
            <FeatureRow
              key={moduleInfo.id}
              module={moduleInfo.id}
              events={bobFeatures}
              onEventClick={onEventClick}
              onEventHover={onEventHover}
            />
          ))}
        </div>
      </div>

      {/* Milestones section */}
      <div className="milestones-section">
        {/* Timeline gradient line */}
        <div className="flex items-center">
          <div className="sidebar-col" />
          <div className="flex-1 h-px timeline-line mx-2" />
        </div>

        {/* Platform milestones */}
        <div className="flex items-center">
          <div className="sidebar-col" />
          <span className="section-label">AI Platform</span>
        </div>
        <MilestoneRow events={platformEvents} type="platform" />

        {/* Industry Radar / OpenAI milestones */}
        <div className="flex items-center">
          <div className="sidebar-col" />
          <span className="section-label">Industry Radar</span>
        </div>
        <MilestoneRow events={industryEvents} type="industry" />
      </div>
    </motion.div>
  );
}
