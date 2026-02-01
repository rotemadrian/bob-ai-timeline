'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Layers, Globe, GanttChart } from 'lucide-react';
import type { TimelineEvent, EventModule } from '@/lib/types';
import { YEAR_DATA, MODULES, TIMELINE_YEARS } from '@/lib/constants';
import { FeatureDot } from '@/components/features';
import { OpenAILogo, AgenticStar } from '@/components/shared';
import { cn } from '@/lib/utils';

interface YearDetailViewProps {
  year: number;
  events: TimelineEvent[];
  onBack: () => void;
  onYearChange: (year: number) => void;
  onEventClick: (event: TimelineEvent) => void;
  onEventHover: (event: TimelineEvent | null, position?: { x: number; y: number }) => void;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function YearDetailView({
  year,
  events,
  onBack,
  onYearChange,
  onEventClick,
  onEventHover,
}: YearDetailViewProps) {
  const yearData = YEAR_DATA.find(y => y.year === year);
  const yearIndex = TIMELINE_YEARS.indexOf(year as typeof TIMELINE_YEARS[number]);
  const prevYear = yearIndex > 0 ? TIMELINE_YEARS[yearIndex - 1] : null;
  const nextYear = yearIndex < TIMELINE_YEARS.length - 1 ? TIMELINE_YEARS[yearIndex + 1] : null;
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

  // Get active modules for this year (Bob AI Features only)
  const activeModules = useMemo(() => {
    const moduleSet = new Set<EventModule>();
    bobFeatures.forEach(e => {
      if (e.module) moduleSet.add(e.module);
    });
    return MODULES.filter(m => moduleSet.has(m.id));
  }, [bobFeatures]);

  const isAgenticYear = year >= 2026;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col h-full bg-gradient-to-b from-bob-purple-900/50 to-transparent"
    >
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Previous year */}
            {prevYear ? (
              <button
                onClick={() => onYearChange(prevYear)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4 text-white/40 group-hover:text-white" />
                <span className="text-sm text-white/40 group-hover:text-white">{prevYear}</span>
              </button>
            ) : (
              <div className="w-16" />
            )}

            {/* Year title */}
            <div className="text-center px-4">
              <div className="flex items-baseline justify-center gap-3">
                <h1 className={cn(
                  "text-4xl font-bold font-serif tracking-tight",
                  isAgenticYear ? "text-gradient-agentic" : "text-white"
                )}>
                  {year}
                </h1>
                <span className={cn(
                  "text-base font-medium",
                  isAgenticYear ? "text-pink-300/80" : "text-violet-300/80"
                )}>
                  {yearData?.philosophy}
                </span>
              </div>
            </div>

            {/* Next year */}
            {nextYear ? (
              <button
                onClick={() => onYearChange(nextYear)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group flex items-center gap-1"
              >
                <span className="text-sm text-white/40 group-hover:text-white">{nextYear}</span>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white" />
              </button>
            ) : (
              <div className="w-16" />
            )}
          </div>

          {/* Right side: stats and timeline button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-xs text-white/40">Features </span>
                <span className="text-sm font-bold text-white">{bobFeatures.length}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-xs text-white/40">Modules </span>
                <span className="text-sm font-bold text-white">{activeModules.length}</span>
              </div>
            </div>
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <GanttChart className="w-4 h-4 text-white/60" />
              <span className="text-sm text-white/60">Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Month timeline header */}
        <div className="flex-shrink-0 px-6 py-2 border-b border-white/5 bg-bob-purple-900/50">
          <div className="flex items-center">
            <div className="w-28 flex-shrink-0" />
            <div className="flex-1 grid grid-cols-12 gap-2">
              {monthNames.map((month, idx) => (
                <div key={month} className="text-center">
                  <span className={cn(
                    "text-[11px] font-medium uppercase tracking-wider",
                    idx < new Date().getMonth() && year <= 2026 ? "text-white/50" : "text-white/30"
                  )}>
                    {month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sections container - fills remaining height */}
        <div className="flex-1 flex flex-col min-h-0 p-4 gap-3 overflow-y-auto">
          {/* Bob AI Features Section */}
          {bobFeatures.length > 0 && (
            <div className="flex-1 min-h-0 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <h2 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Bob AI Features</h2>
                <span className="ml-auto text-[10px] text-white/40">{bobFeatures.length}</span>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto p-3">
                {activeModules.map((moduleInfo, moduleIdx) => {
                  const moduleEvents = bobFeatures.filter(e => e.module === moduleInfo.id);
                  if (moduleEvents.length === 0) return null;

                  return (
                    <div
                      key={moduleInfo.id}
                      className={cn(
                        "flex items-center py-2",
                        moduleIdx !== activeModules.length - 1 && "border-b border-white/5"
                      )}
                    >
                      <div className="w-24 flex-shrink-0 pr-3">
                        <span className="text-[10px] font-medium text-white/40">{moduleInfo.name}</span>
                      </div>
                      <div className="flex-1 grid grid-cols-12 gap-1">
                        {monthNames.map((_, monthIdx) => {
                          const monthEvents = moduleEvents.filter(
                            e => new Date(e.date).getMonth() === monthIdx
                          );
                          return (
                            <div key={monthIdx} className="flex items-center justify-center gap-0.5 flex-wrap min-h-[24px]">
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
            </div>
          )}

          {/* AI Platform Section */}
          {platformEvents.length > 0 && (
            <div className="flex-shrink-0 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
              <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-violet-400" />
                <h2 className="text-xs font-semibold text-white/70 uppercase tracking-wider">AI Platform</h2>
                <span className="ml-auto text-[10px] text-white/40">{platformEvents.length}</span>
              </div>
              <div className="p-3">
                <div className="flex items-center">
                  <div className="w-24 flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-12 gap-1">
                    {monthNames.map((_, monthIdx) => {
                      const monthEvents = platformEvents.filter(
                        e => new Date(e.date).getMonth() === monthIdx
                      );
                      return (
                        <div key={monthIdx} className="flex items-center justify-center gap-1 flex-wrap min-h-[32px]">
                          {monthEvents.map((event) => (
                            <button
                              key={event.id}
                              onClick={() => onEventClick(event)}
                              onMouseEnter={(e) => onEventHover(event, { x: e.clientX, y: e.clientY })}
                              onMouseLeave={() => onEventHover(null)}
                              className="flex items-center justify-center hover:scale-110 transition-transform rounded-lg p-0.5 hover:bg-white/10"
                            >
                              {event.iconUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={event.iconUrl} alt={event.title} className="w-6 h-6" />
                              ) : (
                                <AgenticStar size={24} useGradient={false} className="text-violet-300" />
                              )}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Industry Radar Section */}
          {industryEvents.length > 0 && (
            <div className="flex-shrink-0 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden">
              <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#10a37f]" />
                <h2 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Industry Radar</h2>
                <span className="ml-auto text-[10px] text-white/40">{industryEvents.length}</span>
              </div>
              <div className="p-3">
                <div className="flex items-center">
                  <div className="w-24 flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-12 gap-1">
                    {monthNames.map((_, monthIdx) => {
                      const monthEvents = industryEvents.filter(
                        e => new Date(e.date).getMonth() === monthIdx
                      );
                      return (
                        <div key={monthIdx} className="flex items-center justify-center gap-1 flex-wrap min-h-[32px]">
                          {monthEvents.map((event) => (
                            <button
                              key={event.id}
                              onClick={() => onEventClick(event)}
                              onMouseEnter={(e) => onEventHover(event, { x: e.clientX, y: e.clientY })}
                              onMouseLeave={() => onEventHover(null)}
                              className="w-6 h-6 rounded-full bg-[#10a37f]/20 border border-[#10a37f]/30 flex items-center justify-center hover:scale-110 hover:bg-[#10a37f]/30 transition-all"
                            >
                              <OpenAILogo className="w-3.5 h-3.5 text-[#10a37f]" />
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {yearEvents.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-white/40">
              <Sparkles className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">No events yet</p>
              <p className="text-xs">Events for {year} will appear here</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
