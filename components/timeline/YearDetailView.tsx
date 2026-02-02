'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Layers, Globe, GanttChart, BookOpen } from 'lucide-react';
import type { TimelineEvent, EventModule } from '@/lib/types';
import { YEAR_DATA, MODULES, TIMELINE_YEARS } from '@/lib/constants';
import { FeatureDot } from '@/components/features';
import { OpenAILogo, AgenticStar } from '@/components/shared';
import { cn } from '@/lib/utils';

// Year story summaries
const YEAR_STORIES: Record<number, { title: string; summary: string }> = {
  2023: {
    title: "Early Beginnings",
    summary: "Bob had one ML-based product—survey comment categorization—when GPT-4 launched in March 2023. The industry viewed AI primarily as sophisticated text generation, a \"sophisticated typewriter\" for content creation. This marked the starting point before any deliberate AI platform investment."
  },
  2024: {
    title: "Platform Launch and Initial Features",
    summary: "Bob officially launched its AI platform in March 2024, with the AI Job Description Generator becoming the first focused AI feature. The first half saw additional launches in Goals and Bob Helper Assistant (first chatbot), with the first feature fully implemented using the AI platform released in July alongside the first synchronous API. The second half marked an industry shift toward reasoning models and task performance, moving AI beyond text generation to performing actual tasks."
  },
  2025: {
    title: "Expansion and Agent Development",
    summary: "The industry shifted toward autonomous AI and agents. Bob launched numerous features across survey analysis, data analysis, performance reviews, hiring, goals, and reporting. Infrastructure development included an agentic engine POC, tools registry, and asynchronous API. The crown jewel was Bob Companion—the gateway platform for user-AI interaction throughout the system."
  },
  2026: {
    title: "Feature Expansion and Customization",
    summary: "March brings Bob Companion's official launch, followed by Contextual Mode (specialized agents for specific scenarios), Canvas Mode (visual co-creation), and AI Configuration (organizational customization). Workspaces enable ad hoc solutions with AI-generated widgets. Story Layer transforms information across formats. AI Studio arrives end-of-year, enabling customers to develop their own AI-powered applications inside Bob—\"customization with workspaces on steroids.\""
  },
  2027: {
    title: "Bob 3.0 Vision",
    summary: "A fundamental transformation places AI at the product core—a proactive system that knows users and anticipates unarticulated needs. Potential capabilities include AI-created interfaces, conversation memory, and autonomous agent-to-agent communication. The team envisions \"the perfect work buddy\" with completely customized experiences, acknowledging uncertainty about exact implementation but emphasizing this represents a fundamentally different product from today's version."
  }
};

// Generate a stable animation delay based on event ID for organic feel
function getAnimationDelay(eventId: string): number {
  let hash = 0;
  for (let i = 0; i < eventId.length; i++) {
    hash = ((hash << 5) - hash) + eventId.charCodeAt(i);
    hash |= 0;
  }
  // Return delay between 0 and 3 seconds for variety
  return Math.abs(hash % 3000) / 1000;
}

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
      {/* Header - compact */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Previous year */}
            {prevYear ? (
              <button
                onClick={() => onYearChange(prevYear)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group flex items-center gap-0.5"
              >
                <ChevronLeft className="w-4 h-4 text-white/40 group-hover:text-white" />
                <span className="text-xs text-white/40 group-hover:text-white">{prevYear}</span>
              </button>
            ) : (
              <div className="w-12" />
            )}

            {/* Year title */}
            <div className="text-center px-2">
              <h1 className={cn(
                "text-2xl lg:text-3xl font-bold font-serif tracking-tight",
                isAgenticYear ? "text-gradient-agentic" : "text-white"
              )}>
                {year}
              </h1>
            </div>

            {/* Next year */}
            {nextYear ? (
              <button
                onClick={() => onYearChange(nextYear)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group flex items-center gap-0.5"
              >
                <span className="text-xs text-white/40 group-hover:text-white">{nextYear}</span>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white" />
              </button>
            ) : (
              <div className="w-12" />
            )}
          </div>

          {/* Right side: stats and timeline button */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/40">Features </span>
                <span className="text-xs font-bold text-white">{bobFeatures.length}</span>
              </div>
              <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/40">Modules </span>
                <span className="text-xs font-bold text-white">{activeModules.length}</span>
              </div>
            </div>
            <button
              onClick={onBack}
              className="px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <GanttChart className="w-3.5 h-3.5 text-white/60" />
              <span className="text-xs text-white/60">Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Month timeline header - tighter spacing */}
        <div className="flex-shrink-0 pl-4 pr-4 py-1.5 border-b border-white/5 bg-bob-purple-900/50">
          <div className="flex items-center">
            <div className="w-[100px] lg:w-[116px] flex-shrink-0" />
            <div className="flex-1 grid grid-cols-12 gap-0.5">
              {monthNames.map((month, idx) => (
                <div key={month} className="text-center">
                  <span className={cn(
                    "text-[10px] font-medium uppercase tracking-wide",
                    idx < new Date().getMonth() && year <= 2026 ? "text-white/50" : "text-white/30"
                  )}>
                    {month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sections container - minimal padding, fills space */}
        <div className="flex-1 flex flex-col min-h-0 p-2 gap-2 overflow-y-auto">
          {/* Year Story Summary */}
          {YEAR_STORIES[year] && (
            <div className="flex-shrink-0 rounded-lg bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/5 overflow-hidden">
              <div className="px-4 py-3">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                    isAgenticYear ? "bg-pink-500/10 border border-pink-500/20" : "bg-violet-500/10 border border-violet-500/20"
                  )}>
                    <BookOpen className={cn(
                      "w-4 h-4",
                      isAgenticYear ? "text-pink-400" : "text-violet-400"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "text-sm font-semibold font-serif mb-1",
                      isAgenticYear ? "text-pink-300" : "text-violet-300"
                    )}>
                      {year}: {YEAR_STORIES[year].title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {YEAR_STORIES[year].summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bob AI Features Section - takes available space */}
          {bobFeatures.length > 0 && (
            <div className="flex-1 min-h-[200px] rounded-lg bg-white/[0.02] border border-white/5 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 px-3 py-1.5 border-b border-white/5 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-violet-400" />
                <h2 className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Bob AI Features</h2>
                <span className="ml-auto text-[10px] text-white/40">{bobFeatures.length}</span>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-2 py-1 flex flex-col justify-evenly">
                {activeModules.map((moduleInfo, moduleIdx) => {
                  const moduleEvents = bobFeatures.filter(e => e.module === moduleInfo.id);
                  if (moduleEvents.length === 0) return null;

                  return (
                    <div
                      key={moduleInfo.id}
                      className={cn(
                        "flex items-center py-1.5",
                        moduleIdx !== activeModules.length - 1 && "border-b border-white/5"
                      )}
                    >
                      <div className="w-[100px] lg:w-[116px] flex-shrink-0 pr-2">
                        <span className="text-[10px] font-medium text-white/40 truncate block">{moduleInfo.name}</span>
                      </div>
                      <div className="flex-1 grid grid-cols-12 gap-0.5">
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

          {/* AI Platform Section - compact */}
          {platformEvents.length > 0 && (
            <div className="flex-shrink-0 rounded-lg bg-white/[0.02] border border-white/5 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-white/5 flex items-center gap-2">
                <Layers className="w-3 h-3 text-violet-400" />
                <h2 className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">AI Platform</h2>
                <span className="ml-auto text-[10px] text-white/40">{platformEvents.length}</span>
              </div>
              <div className="px-2 py-1.5">
                <div className="flex items-center">
                  <div className="w-[100px] lg:w-[116px] flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-12 gap-0.5">
                    {monthNames.map((_, monthIdx) => {
                      const monthEvents = platformEvents.filter(
                        e => new Date(e.date).getMonth() === monthIdx
                      );
                      return (
                        <div key={monthIdx} className="flex items-center justify-center gap-1 flex-wrap min-h-[28px]">
                          {monthEvents.map((event) => {
                            const animationDelay = getAnimationDelay(event.id);
                            return (
                              <button
                                key={event.id}
                                onClick={() => onEventClick(event)}
                                onMouseEnter={(e) => onEventHover(event, { x: e.clientX, y: e.clientY })}
                                onMouseLeave={() => onEventHover(null)}
                                className="flex items-center justify-center hover:scale-110 transition-transform rounded-lg p-0.5 hover:bg-white/10 animate-breathe-glow"
                                style={{ animationDelay: `${animationDelay}s` }}
                              >
                                {event.iconUrl ? (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img
                                    src={event.iconUrl}
                                    alt={event.title}
                                    className="w-5 h-5 animate-breathe-glow"
                                    style={{ animationDelay: `${animationDelay}s` }}
                                  />
                                ) : (
                                  <AgenticStar
                                    size={20}
                                    useGradient={false}
                                    className="text-violet-300 animate-breathe-glow"
                                    style={{ animationDelay: `${animationDelay}s` }}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Industry Radar Section - compact */}
          {industryEvents.length > 0 && (
            <div className="flex-shrink-0 rounded-lg bg-white/[0.02] border border-white/5 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-white/5 flex items-center gap-2">
                <Globe className="w-3 h-3 text-[#10a37f]" />
                <h2 className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Industry Radar</h2>
                <span className="ml-auto text-[10px] text-white/40">{industryEvents.length}</span>
              </div>
              <div className="px-2 py-1.5">
                <div className="flex items-center">
                  <div className="w-[100px] lg:w-[116px] flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-12 gap-0.5">
                    {monthNames.map((_, monthIdx) => {
                      const monthEvents = industryEvents.filter(
                        e => new Date(e.date).getMonth() === monthIdx
                      );
                      return (
                        <div key={monthIdx} className="flex items-center justify-center gap-1 flex-wrap min-h-[28px]">
                          {monthEvents.map((event) => {
                            const animationDelay = getAnimationDelay(event.id);
                            return (
                              <button
                                key={event.id}
                                onClick={() => onEventClick(event)}
                                onMouseEnter={(e) => onEventHover(event, { x: e.clientX, y: e.clientY })}
                                onMouseLeave={() => onEventHover(null)}
                                className="w-5 h-5 rounded-full bg-[#10a37f]/20 border border-[#10a37f]/30 flex items-center justify-center hover:scale-110 hover:bg-[#10a37f]/30 transition-all animate-breathe-glow-industry"
                                style={{ animationDelay: `${animationDelay}s` }}
                              >
                                <OpenAILogo className="w-3 h-3 text-[#10a37f]" />
                              </button>
                            );
                          })}
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
              <Sparkles className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-sm font-medium">No events yet</p>
              <p className="text-xs">Events for {year} will appear here</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
