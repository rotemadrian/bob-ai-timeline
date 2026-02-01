'use client';

import { motion } from 'framer-motion';
import { YEAR_DATA } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface YearCardsViewProps {
  onYearClick: (year: number) => void;
  onViewTimeline: () => void;
}

export function YearCardsView({ onYearClick, onViewTimeline }: YearCardsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full overflow-hidden"
    >
      {/* Navigation hint */}
      <div className="flex justify-end px-8 py-4">
        <button
          onClick={onViewTimeline}
          className="text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-2"
        >
          <span>View Timeline</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Cards grid */}
      <div className="flex-1 flex items-center justify-center px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl w-full">
          {YEAR_DATA.map((yearData, index) => (
            <motion.button
              key={yearData.year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => onYearClick(yearData.year)}
              className={cn(
                "group relative flex flex-col rounded-2xl border border-white/10 overflow-hidden",
                "bg-gradient-to-b from-white/5 to-transparent",
                "hover:border-white/20 hover:from-white/10 transition-all duration-300",
                "aspect-[3/4] p-6"
              )}
            >
              {/* Year number - large */}
              <div className="flex-1 flex items-center justify-center">
                <span className={cn(
                  "text-6xl lg:text-7xl font-serif font-bold transition-transform duration-300 group-hover:scale-110",
                  yearData.year >= 2026 ? "text-gradient-agentic" : "text-white/90"
                )}>
                  {yearData.year}
                </span>
              </div>

              {/* Philosophy and subtitle */}
              <div className="space-y-2 text-center">
                <h3 className={cn(
                  "text-lg font-serif font-semibold",
                  yearData.year >= 2026 ? "text-gradient-agentic" : "text-white"
                )}>
                  {yearData.philosophy}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {yearData.subtitle}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                yearData.year >= 2026
                  ? "bg-gradient-to-t from-pink-500/10 via-transparent to-transparent"
                  : "bg-gradient-to-t from-violet-500/10 via-transparent to-transparent"
              )} />

              {/* Animated border glow on hover */}
              <div className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                yearData.year >= 2026
                  ? "shadow-[inset_0_0_20px_rgba(236,72,153,0.15)]"
                  : "shadow-[inset_0_0_20px_rgba(196,181,253,0.15)]"
              )} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="text-center pb-8">
        <p className="text-white/30 text-sm">
          Click a year to explore the journey
        </p>
      </div>
    </motion.div>
  );
}
