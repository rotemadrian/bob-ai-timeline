'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { TimelineEvent, EventModule } from '@/lib/types';
import { TIMELINE_YEARS, YEAR_DATA, MODULES, START_YEAR } from '@/lib/constants';
import { FeatureRow } from '@/components/features';
import { MilestoneRow } from '@/components/milestones';
import { cn } from '@/lib/utils';

// Today's date marker - February 2026
const TODAY = new Date('2026-02-01');

function getTodayPosition(): number {
  const year = TODAY.getFullYear();
  const month = TODAY.getMonth(); // 0-indexed
  const day = TODAY.getDate();

  // Calculate position within the timeline
  const yearIndex = TIMELINE_YEARS.indexOf(year as typeof TIMELINE_YEARS[number]);
  if (yearIndex === -1) return -1; // Not visible in timeline

  // Position within year (0-1)
  const dayOfYear = Math.floor((TODAY.getTime() - new Date(year, 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const daysInYear = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
  const positionInYear = dayOfYear / daysInYear;

  // Total position as percentage (each year is 1/numYears of the total width)
  const numYears = TIMELINE_YEARS.length;
  const yearWidth = 100 / numYears;

  return (yearIndex * yearWidth) + (positionInYear * yearWidth);
}

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

  const todayPosition = getTodayPosition();

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full overflow-hidden relative"
    >
      {/* Today marker line - positioned after sidebar */}
      {todayPosition >= 0 && (
        <div className="absolute top-0 bottom-0 z-20 pointer-events-none flex" style={{ left: 'clamp(60px, 5vw, 80px)', right: 0 }}>
          <div
            className="absolute top-0 bottom-0"
            style={{ left: `${todayPosition}%` }}
          >
            {/* The line */}
            <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-pink-400/40 via-orange-300/30 to-pink-400/40" />
            {/* Today label */}
            <div className="absolute top-2 -translate-x-1/2 left-0 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[9px] font-medium text-white/60 whitespace-nowrap">
              Today
            </div>
          </div>
        </div>
      )}

      {/* Year headers */}
      <div className="year-header-row flex border-b border-white/10 year-header">
        <div className="sidebar-col border-r border-white/10" />
        {TIMELINE_YEARS.map(year => {
          const yearData = YEAR_DATA.find(y => y.year === year);

          return (
            <button
              key={year}
              onClick={() => onYearClick(year)}
              className={cn(
                "year-col flex flex-col items-center justify-center py-3 px-3 border-r border-white/5 hover:bg-white/5 transition-colors group",
                "year-column-pre-agentic"
              )}
            >
              <p className={cn(
                "year-number transition-colors",
                year >= 2026 ? "text-gradient-agentic" : "text-white group-hover:text-violet-300"
              )}>
                {year}
              </p>
              <p className={cn(
                "text-[11px] font-medium mt-1 font-sans text-center",
                year >= 2026 ? "text-pink-300/80" : "text-violet-300/80"
              )}>
                {yearData?.philosophy}
              </p>
            </button>
          );
        })}
      </div>

      {/* Features section - fills available space */}
      <div className="features-section">

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
        <MilestoneRow events={platformEvents} type="platform" onEventClick={onEventClick} onEventHover={onEventHover} />

        {/* Industry Radar / OpenAI milestones */}
        <MilestoneRow events={industryEvents} type="industry" onEventClick={onEventClick} onEventHover={onEventHover} />
      </div>
    </motion.div>
  );
}
