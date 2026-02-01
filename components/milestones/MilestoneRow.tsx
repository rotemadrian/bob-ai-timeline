'use client';

import { useMemo } from 'react';
import type { TimelineEvent } from '@/lib/types';
import { TIMELINE_YEARS } from '@/lib/constants';
import { OpenAILogo, AgenticStar } from '@/components/shared';
import { MilestoneMarker } from './MilestoneMarker';
import { cn } from '@/lib/utils';

interface MilestoneRowProps {
  events: TimelineEvent[];
  type: 'platform' | 'industry';
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

export function MilestoneRow({ events, type }: MilestoneRowProps) {
  const eventsByYear = useMemo(() => {
    const grouped: Record<number, TimelineEvent[]> = {};
    TIMELINE_YEARS.forEach(year => {
      grouped[year] = events.filter(e =>
        new Date(e.date).getFullYear() === year
      );
    });
    return grouped;
  }, [events]);

  const isPlatform = type === 'platform';

  return (
    <div className={cn(
      "milestone-row border-t border-white/10",
      isPlatform ? "bg-bob-purple-950/50" : "bg-bob-purple-950/30"
    )}>
      <div className="sidebar-col flex items-center justify-center border-r border-white/10">
        {isPlatform ? (
          <AgenticStar size={16} useGradient={false} className="text-violet-500" />
        ) : (
          <OpenAILogo className="w-4 h-4 text-[#10a37f]" />
        )}
      </div>

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
              {yearEvents.map((event) => {
                const position = getPositionInYear(event.date);
                return (
                  <MilestoneMarker
                    key={event.id}
                    event={event}
                    type={type}
                    style={{
                      left: `${position}%`,
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
