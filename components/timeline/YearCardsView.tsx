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
      {/* Hero heading */}
      <div className="text-center pt-4 pb-4 px-8">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-sm uppercase tracking-[0.3em] mb-3"
        >
          The Journey of
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2"
        >
          <span className="text-white">AI-Powered </span>
          <span className="text-gradient-agentic">HR</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/50 text-base max-w-2xl mx-auto"
        >
          Five years of innovation, from foundation to intelligence
        </motion.p>
      </div>

      {/* Cards grid */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8">
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

    </motion.div>
  );
}
