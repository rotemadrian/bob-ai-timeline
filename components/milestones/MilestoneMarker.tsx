'use client';

import type { TimelineEvent } from '@/lib/types';
import { OpenAILogo, AgenticStar } from '@/components/shared';

interface MilestoneMarkerProps {
  event: TimelineEvent;
  type: 'platform' | 'industry';
  style?: React.CSSProperties;
  onClick?: (event: TimelineEvent) => void;
  onMouseEnter?: (e: React.MouseEvent, event: TimelineEvent) => void;
  onMouseLeave?: () => void;
}

export function MilestoneMarker({ event, type, style, onClick, onMouseEnter, onMouseLeave }: MilestoneMarkerProps) {
  const handleClick = () => {
    onClick?.(event);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    onMouseEnter?.(e, event);
  };

  if (type === 'industry') {
    // OpenAI / Industry Radar markers
    return (
      <div
        className="absolute top-1/2"
        style={style}
      >
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={onMouseLeave}
          className="w-6 h-6 rounded-full bg-[#10a37f]/40 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        >
          <OpenAILogo className="w-4 h-4 text-[#0d5c47]" />
        </button>
      </div>
    );
  }

  // AI Platform markers
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={style}
    >
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex items-center justify-center transition-all cursor-pointer hover:scale-110"
      >
        {event.iconUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={event.iconUrl} alt={event.title} style={{ width: '28px', height: '28px', minWidth: '28px', minHeight: '28px' }} />
        ) : (
          <AgenticStar size={28} useGradient={false} className="text-violet-300" />
        )}
      </button>
    </div>
  );
}
