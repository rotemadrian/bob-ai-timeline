'use client';

import { useMemo } from 'react';
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

export function MilestoneMarker({ event, type, style, onClick, onMouseEnter, onMouseLeave }: MilestoneMarkerProps) {
  const handleClick = () => {
    onClick?.(event);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    onMouseEnter?.(e, event);
  };

  // Get unique animation delay for this marker
  const animationDelay = useMemo(() => getAnimationDelay(event.id), [event.id]);

  if (type === 'industry') {
    // Check if this is an AI Culture event
    const isAICulture = event.id.startsWith('ai-culture-');

    if (isAICulture) {
      // AI Culture markers - golden/amber gradient, larger and more prominent
      return (
        <div
          className="absolute top-1/2"
          style={style}
        >
          <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onMouseLeave}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-all cursor-pointer animate-pulse-culture"
            style={{
              animationDelay: `${animationDelay}s`,
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
              boxShadow: '0 0 8px rgba(52, 211, 153, 0.4), 0 0 16px rgba(16, 185, 129, 0.2)'
            }}
          >
            <span className="text-white text-sm font-bold">✦</span>
          </button>
        </div>
      );
    }

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
          className="w-6 h-6 rounded-full bg-[#10a37f]/40 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer animate-breathe-glow-industry"
          style={{ animationDelay: `${animationDelay}s` }}
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
        className="flex items-center justify-center transition-all cursor-pointer hover:scale-110 animate-breathe-glow"
        style={{ animationDelay: `${animationDelay}s` }}
      >
        {event.iconUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={event.iconUrl}
            alt={event.title}
            className="animate-breathe-glow"
            style={{
              width: '28px',
              height: '28px',
              minWidth: '28px',
              minHeight: '28px',
              animationDelay: `${animationDelay}s`
            }}
          />
        ) : (
          <AgenticStar
            size={28}
            useGradient={false}
            className="text-violet-300 animate-breathe-glow"
            style={{ animationDelay: `${animationDelay}s` }}
          />
        )}
      </button>
    </div>
  );
}
