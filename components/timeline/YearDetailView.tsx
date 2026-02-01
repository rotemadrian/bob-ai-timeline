'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import type { TimelineEvent, EventModule } from '@/lib/types';
import { YEAR_DATA, MODULES } from '@/lib/constants';
import { FeatureDot } from '@/components/features';
import { OpenAILogo, AgenticStar } from '@/components/shared';
import { cn } from '@/lib/utils';

interface YearDetailViewProps {
  year: number;
  events: TimelineEvent[];
  onBack: () => void;
  onEventClick: (event: TimelineEvent) => void;
  onEventHover: (event: TimelineEvent | null, position?: { x: number; y: number }) => void;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function YearDetailView({
  year,
  events,
  onBack,
  onEventClick,
  onEventHover,
}: YearDetailViewProps) {
  const yearData = YEAR_DATA.find(y => y.year === year);
  const yearEvents = useMemo(() =>
    events.filter(e => new Date(e.date).getFullYear() === year),
    [events, year]
  );

  // Split by dimension
  const bobFeatures = useMemo(() =>
    yearEvents.filter(e => e.dimension === 'Bob AI Feature'),
    [yearEvents]
  );
  const platformEvents = useMemo(() =>
    yearEvents.filter(e => e.dimension === 'AI Platform'),
    [yearEvents]
  );
  const industryEvents = useMemo(() =>
    yearEvents.filter(e => e.dimension === 'Industry Radar'),
    [yearEvents]
  );

  const hasAgenticEvents = yearEvents.some(e => e.isAgentic);

  // Get active modules for this year (Bob AI Features only)
  const activeModules = useMemo(() => {
    const moduleSet = new Set<EventModule>();
    bobFeatures.forEach(e => {
      if (e.module) moduleSet.add(e.module);
    });
    return MODULES.filter(m => moduleSet.has(m.id));
  }, [bobFeatures]);

  // Stats
  const agenticCount = bobFeatures.filter(e => e.isAgentic).length;
  const askAboutMyDataCount = bobFeatures.filter(e => e.isAskAboutMyData).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-white/10 flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-baseline gap-3">
            <h2 className={cn(
              "text-3xl year-number",
              hasAgenticEvents ? "year-number-agentic" : "text-white"
            )}>
              {year}
            </h2>
            <p className={cn(
              "text-sm font-medium",
              hasAgenticEvents ? "text-pink-300/70" : "text-violet-300/70"
            )}>
              {yearData?.philosophy}
            </p>
          </div>
          <p className="text-white/40 text-xs mt-1 max-w-xl">
            {yearData?.description}
          </p>
        </div>

        {/* Stats - Features only */}
        <div className="flex items-center gap-6 text-xs">
          <div className="text-center">
            <p className="text-white/40">Features</p>
            <p className="text-lg font-semibold text-white">{bobFeatures.length}</p>
          </div>
          <div className="text-center">
            <p className="text-white/40">Modules</p>
            <p className="text-lg font-semibold text-white">{activeModules.length}</p>
          </div>
          {agenticCount > 0 && (
            <div className="text-center">
              <p className="text-white/40">Agentic</p>
              <p className="text-lg font-semibold text-gradient-agentic">{agenticCount}</p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="year-detail-content flex-1 overflow-y-auto">
        {/* Month headers */}
        <div className="sticky top-0 bg-bob-purple-900/95 backdrop-blur-sm z-10 px-4 py-2 border-b border-white/5">
          <div className="flex">
            <div className="w-20 flex-shrink-0" />
            <div className="grid grid-cols-12 flex-1 gap-1">
              {monthNames.map((month) => (
                <div key={month} className="text-center">
                  <span className="text-[10px] text-white/30">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bob AI Features Section */}
        {bobFeatures.length > 0 && (
          <div className="px-4 py-2">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Bob AI Features</p>
            {activeModules.map(moduleInfo => {
              const moduleEvents = bobFeatures.filter(e => e.module === moduleInfo.id);
              if (moduleEvents.length === 0) return null;

              return (
                <div key={moduleInfo.id} className="flex items-center py-1.5 border-b border-white/5">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-[10px] text-white/40">{moduleInfo.name}</span>
                  </div>
                  <div className="grid grid-cols-12 flex-1 gap-1">
                    {monthNames.map((_, monthIdx) => {
                      const monthEvents = moduleEvents.filter(
                        e => new Date(e.date).getMonth() === monthIdx
                      );
                      return (
                        <div key={monthIdx} className="flex items-center justify-center gap-0.5 flex-wrap min-h-[20px]">
                          {monthEvents.map((event, idx) => (
                            <FeatureDot
                              key={event.id}
                              event={event}
                              index={idx}
                              onClick={() => onEventClick(event)}
                              onMouseEnter={(e) => onEventHover(event, { x: e.clientX, y: e.clientY })}
                              onMouseLeave={() => onEventHover(null)}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* AI Platform Section */}
        {platformEvents.length > 0 && (
          <div className="px-4 py-2 border-t border-white/10">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">AI Platform</p>
            <div className="flex items-center py-1.5">
              <div className="w-20 flex-shrink-0" />
              <div className="grid grid-cols-12 flex-1 gap-1">
                {monthNames.map((_, monthIdx) => {
                  const monthEvents = platformEvents.filter(
                    e => new Date(e.date).getMonth() === monthIdx
                  );
                  return (
                    <div key={monthIdx} className="flex items-center justify-center gap-1 flex-wrap min-h-[20px]">
                      {monthEvents.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => onEventClick(event)}
                          onMouseEnter={(e) => onEventHover(event, { x: e.clientX, y: e.clientY })}
                          onMouseLeave={() => onEventHover(null)}
                          className="flex items-center justify-center hover:scale-125 transition-transform"
                        >
                          {event.isAgentic ? (
                            <AgenticStar size={22} useGradient={true} />
                          ) : (
                            <AgenticStar size={22} useGradient={false} className="text-violet-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Industry Radar Section */}
        {industryEvents.length > 0 && (
          <div className="px-4 py-2 border-t border-white/10">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Industry Radar</p>
            <div className="flex items-center py-1.5">
              <div className="w-20 flex-shrink-0" />
              <div className="grid grid-cols-12 flex-1 gap-1">
                {monthNames.map((_, monthIdx) => {
                  const monthEvents = industryEvents.filter(
                    e => new Date(e.date).getMonth() === monthIdx
                  );
                  return (
                    <div key={monthIdx} className="flex items-center justify-center gap-1 flex-wrap min-h-[20px]">
                      {monthEvents.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => onEventClick(event)}
                          onMouseEnter={(e) => onEventHover(event, { x: e.clientX, y: e.clientY })}
                          onMouseLeave={() => onEventHover(null)}
                          className="w-6 h-6 rounded-full bg-[#10a37f]/40 flex items-center justify-center hover:scale-125 transition-transform"
                        >
                          <OpenAILogo className="w-4 h-4 text-[#0d5c47]" />
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
