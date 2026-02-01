'use client';

import type { TimelineEvent } from '@/lib/types';
import { OpenAILogo, AgenticStar } from '@/components/shared';
import { cn } from '@/lib/utils';

interface MilestoneMarkerProps {
  event: TimelineEvent;
  type: 'platform' | 'industry';
  style?: React.CSSProperties;
}

// Shared tooltip component for milestones
function MilestoneTooltip({ event, type }: { event: TimelineEvent; type: 'platform' | 'industry' }) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className={cn(
      "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-lg",
      "opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20",
      "bg-bob-purple-800/95 border border-white/10 backdrop-blur-sm shadow-xl",
      "min-w-[160px] max-w-[220px]"
    )}>
      {/* Header with icon */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center flex-shrink-0">
          {type === 'industry' ? (
            <OpenAILogo className="w-4 h-4 text-[#10a37f]" />
          ) : event.isAgentic ? (
            <AgenticStar size={14} useGradient={true} />
          ) : (
            <AgenticStar size={14} useGradient={false} className="text-violet-500" />
          )}
        </div>
        <span className="text-[10px] text-white/50">{formattedDate}</span>
      </div>

      {/* Title */}
      <h4 className="text-xs font-medium text-white leading-tight mb-1">
        {event.title}
      </h4>

      {/* Description */}
      {event.description && (
        <p className="text-[10px] text-white/60 line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Tags */}
      {(event.isAgentic || type === 'industry') && (
        <div className="flex gap-1 mt-1.5">
          {type === 'industry' && (
            <span className="text-[9px] px-1 py-0.5 rounded bg-[#10a37f]/20 text-[#10a37f]">
              OpenAI
            </span>
          )}
          {event.isAgentic && type === 'platform' && (
            <span className="text-[9px] px-1 py-0.5 rounded bg-pink-500/20 text-pink-300">
              Agentic
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function MilestoneMarker({ event, type, style }: MilestoneMarkerProps) {
  if (type === 'industry') {
    // OpenAI / Industry Radar markers
    return (
      <div
        className="group absolute top-1/2"
        style={style}
      >
        <div className="w-6 h-6 rounded-full bg-[#10a37f]/40 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
          <OpenAILogo className="w-4 h-4 text-[#0d5c47]" />
        </div>
        <MilestoneTooltip event={event} type={type} />
      </div>
    );
  }

  // AI Platform markers
  const isAgentic = event.isAgentic;

  return (
    <div
      className="group absolute top-1/2 -translate-y-1/2"
      style={style}
    >
      <div className="flex items-center justify-center transition-all cursor-pointer hover:scale-110">
        {isAgentic ? (
          <AgenticStar size={22} useGradient={true} />
        ) : (
          <AgenticStar size={22} useGradient={false} className="text-violet-500" />
        )}
      </div>
      <MilestoneTooltip event={event} type={type} />
    </div>
  );
}
