'use client';

import { useMemo } from 'react';
import type { TimelineEvent, EventModule } from '@/lib/types';
import { TIMELINE_YEARS, MODULES } from '@/lib/constants';
import { FeatureDot } from './FeatureDot';
import { cn } from '@/lib/utils';

interface FeatureRowProps {
  module: EventModule;
  events: TimelineEvent[];
  onEventClick: (event: TimelineEvent) => void;
  onEventHover: (event: TimelineEvent | null, position?: { x: number; y: number }) => void;
}

// Calculate position within year as percentage (0-100)
function getPositionInYear(dateString: string): number {
  const date = new Date(dateString);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const endOfYear = new Date(date.getFullYear(), 11, 31);
  const totalDays = (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  const dayOfYear = (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  return (dayOfYear / totalDays) * 100;
}

export function FeatureRow({
  module,
  events,
  onEventClick,
  onEventHover,
}: FeatureRowProps) {
  const moduleInfo = MODULES.find(m => m.id === module);

  // Group events by year
  const eventsByYear = useMemo(() => {
    const grouped: Record<number, TimelineEvent[]> = {};
    TIMELINE_YEARS.forEach(year => {
      grouped[year] = events.filter(e =>
        new Date(e.date).getFullYear() === year &&
        e.module === module
      );
    });
    return grouped;
  }, [events, module]);

  const hasAnyEvents = Object.values(eventsByYear).some(arr => arr.length > 0);
  if (!hasAnyEvents) return null;

  return (
    <div className="category-row">
      {/* Module label */}
      <div className="sidebar-col flex items-center justify-end border-r border-white/10 pr-3">
        <span className="text-[11px] text-white/50 truncate text-right" title={moduleInfo?.name || module}>
          {moduleInfo?.name || module}
        </span>
      </div>

      {/* Year columns */}
      <div className="year-columns">
        {TIMELINE_YEARS.map(year => {
          const yearEvents = eventsByYear[year];
          const hasAgenticEvent = yearEvents.some(e => e.isAgentic);

          return (
            <div
              key={year}
              className={cn(
                "year-col relative border-r border-white/5",
                hasAgenticEvent ? "year-column-agentic" : "year-column-pre-agentic"
              )}
            >
              {yearEvents.map((event, idx) => {
                const position = getPositionInYear(event.date);

                return (
                  <FeatureDot
                    key={event.id}
                    event={event}
                    index={idx}
                    onClick={() => onEventClick(event)}
                    onMouseEnter={(e) => onEventHover(event, { x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => onEventHover(null)}
                    style={{
                      position: 'absolute',
                      left: `${position}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
