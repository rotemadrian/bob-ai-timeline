'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { TimelineEvent } from '@/lib/types';
import { sortedEvents } from '@/data/events';
import { TimelineHeader } from './TimelineHeader';
// YearCardsView kept for potential future use
// import { YearCardsView } from './YearCardsView';
import { YearOverview } from './YearOverview';
import { YearDetailView } from './YearDetailView';
import { FeatureModal, FeatureHoverCard } from '@/components/features';
import {
  playYearSound,
  playFeatureSound,
  playMilestoneSound,
  playIndustrySound,
  playNavigationSound,
} from '@/lib/sounds';

type ViewMode = 'timeline' | 'year';

export function TimelineContainer() {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
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

  const handleYearClick = (year: number) => {
    playYearSound();
    setSelectedYear(year);
    setViewMode('year');
  };

  const handleEventClick = (event: TimelineEvent) => {
    // Play different sounds based on event dimension
    if (event.dimension === 'Bob AI Feature') {
      playFeatureSound();
    } else if (event.dimension === 'AI Platform') {
      playMilestoneSound();
    } else if (event.dimension === 'Industry Radar') {
      playIndustrySound();
    } else {
      playFeatureSound(); // Default
    }
    setSelectedEvent(event);
  };

  const handleBackFromYear = () => {
    playNavigationSound();
    setSelectedYear(null);
    setViewMode('timeline');
  };

  const handleYearChange = (year: number) => {
    playYearSound();
    setSelectedYear(year);
  };

  return (
    <div className="timeline-container">
      {/* Header */}
      <TimelineHeader
        viewMode={viewMode}
        onLogoClick={handleBackFromYear}
      />

      {/* Main content */}
      <div className="timeline-main">
        <AnimatePresence mode="wait">
          {viewMode === 'timeline' && (
            <YearOverview
              key="overview"
              events={sortedEvents}
              onYearClick={handleYearClick}
              onEventClick={handleEventClick}
              onEventHover={handleEventHover}
            />
          )}
          {viewMode === 'year' && selectedYear && (
            <YearDetailView
              key={`year-${selectedYear}`}
              year={selectedYear}
              events={sortedEvents}
              onBack={handleBackFromYear}
              onYearChange={handleYearChange}
              onEventClick={handleEventClick}
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
