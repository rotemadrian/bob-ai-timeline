'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { TimelineEvent } from '@/lib/types';
import { sortedEvents } from '@/data/events';
import { TimelineHeader } from './TimelineHeader';
import { YearCardsView } from './YearCardsView';
import { YearOverview } from './YearOverview';
import { YearDetailView } from './YearDetailView';
import { FeatureModal, FeatureHoverCard } from '@/components/features';

type ViewMode = 'cards' | 'timeline' | 'year';

export function TimelineContainer() {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
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

  const handleYearClickFromCards = (year: number) => {
    setSelectedYear(year);
    setViewMode('year');
  };

  const handleYearClickFromTimeline = (year: number) => {
    setSelectedYear(year);
    setViewMode('year');
  };

  const handleBackFromYear = () => {
    setSelectedYear(null);
    setViewMode('timeline');
  };

  return (
    <div className="timeline-container">
      {/* Header */}
      <TimelineHeader
        viewMode={viewMode}
        onNavigateToCards={() => setViewMode('cards')}
        onNavigateToTimeline={() => setViewMode('timeline')}
      />

      {/* Main content */}
      <div className="timeline-main">
        <AnimatePresence mode="wait">
          {viewMode === 'cards' && (
            <YearCardsView
              key="cards"
              onYearClick={handleYearClickFromCards}
              onViewTimeline={() => setViewMode('timeline')}
            />
          )}
          {viewMode === 'timeline' && (
            <YearOverview
              key="overview"
              events={sortedEvents}
              onYearClick={handleYearClickFromTimeline}
              onEventClick={setSelectedEvent}
              onEventHover={handleEventHover}
            />
          )}
          {viewMode === 'year' && selectedYear && (
            <YearDetailView
              key={`year-${selectedYear}`}
              year={selectedYear}
              events={sortedEvents}
              onBack={handleBackFromYear}
              onYearChange={setSelectedYear}
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
