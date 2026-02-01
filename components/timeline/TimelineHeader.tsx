'use client';

import Image from 'next/image';
import { LayoutGrid, GanttChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineHeaderProps {
  title?: string;
  subtitle?: string;
  viewMode?: 'cards' | 'timeline' | 'year';
  onNavigateToCards?: () => void;
  onNavigateToTimeline?: () => void;
}

export function TimelineHeader({
  title = 'Bob AI Timeline',
  subtitle = 'AI-powered HR transformation journey',
  viewMode = 'cards',
  onNavigateToCards,
  onNavigateToTimeline,
}: TimelineHeaderProps) {
  return (
    <header className="timeline-header flex items-center justify-between px-8 py-4 border-b border-white/10">
      <div className="flex items-baseline gap-4">
        <h1 className="text-2xl font-serif">
          <span className="text-white font-bold">Bob</span>
          <span className="text-gradient-agentic font-bold">AI</span>
          <span className="text-white font-light"> Timeline</span>
        </h1>
        <p className="text-white/40 font-sans text-sm">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* Navigation buttons */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <button
            onClick={onNavigateToCards}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'cards'
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/70"
            )}
            title="Year Cards"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={onNavigateToTimeline}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'timeline' || viewMode === 'year'
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/70"
            )}
            title="Timeline View"
          >
            <GanttChart className="w-4 h-4" />
          </button>
        </div>

        <Image
          src="/hibob-logo.svg"
          alt="HiBob"
          width={80}
          height={32}
          className="opacity-90"
        />
      </div>
    </header>
  );
}
