'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { TimelineEvent } from '@/lib/types';
import { sortedEvents } from '@/data/events';
import { TimelineHeader } from './TimelineHeader';
import { YearOverview } from './YearOverview';
import { YearDetailView } from './YearDetailView';
import { FeatureModal, FeatureHoverCard } from '@/components/features';

export function TimelineContainer() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleEventHover = (event: TimelineEvent | null, position?: { x: number; y: number }) => {
    setHoveredEvent(event);
    if (position) {
      setHoverPosition(position);
    }
  };

  return (
    <div className="timeline-container">
      {/* Header */}
      <TimelineHeader />

      {/* Main content */}
      <div className="timeline-main">
        <AnimatePresence mode="wait">
          {selectedYear ? (
            <YearDetailView
              key={`year-${selectedYear}`}
              year={selectedYear}
              events={sortedEvents}
              onBack={() => setSelectedYear(null)}
              onEventClick={setSelectedEvent}
              onEventHover={handleEventHover}
            />
          ) : (
            <YearOverview
              key="overview"
              events={sortedEvents}
              onYearClick={setSelectedYear}
              onEventClick={setSelectedEvent}
              onEventHover={handleEventHover}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Feature modal */}
      <AnimatePresence>
        {selectedEvent && (
          <FeatureModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>

      {/* Hover card */}
      <AnimatePresence>
        {hoveredEvent && !selectedEvent && (
          <FeatureHoverCard
            event={hoveredEvent}
            position={hoverPosition}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
