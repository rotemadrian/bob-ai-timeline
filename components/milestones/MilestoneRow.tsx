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
  onEventClick?: (event: TimelineEvent) => void;
  onEventHover?: (event: TimelineEvent | null, position?: { x: number; y: number }) => void;
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

// Calculate positions with collision avoidance
function getPositionsWithSpacing(events: TimelineEvent[], minSpacing: number = 8): Map<string, number> {
  const positions = new Map<string, number>();

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  sortedEvents.forEach((event, index) => {
    let position = getPositionInYear(event.date);

    // Check for collisions with previously placed events
    for (let i = 0; i < index; i++) {
      const prevPosition = positions.get(sortedEvents[i].id) || 0;
      if (Math.abs(position - prevPosition) < minSpacing) {
        // Push this event to the right of the previous one
        position = prevPosition + minSpacing;
      }
    }

    // Ensure we don't go past 100%
    position = Math.min(position, 95);
    positions.set(event.id, position);
  });

  return positions;
}

export function MilestoneRow({ events, type, onEventClick, onEventHover }: MilestoneRowProps) {
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
          const positionsMap = getPositionsWithSpacing(yearEvents);

          return (
            <div
              key={year}
              className="year-col relative border-r border-white/5 year-column-pre-agentic"
            >
              {yearEvents.map((event) => {
                const position = positionsMap.get(event.id) || getPositionInYear(event.date);
                return (
                  <MilestoneMarker
                    key={event.id}
                    event={event}
                    type={type}
                    style={{
                      left: `${position}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={onEventClick}
                    onMouseEnter={(e, evt) => onEventHover?.(evt, { x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => onEventHover?.(null)}
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
