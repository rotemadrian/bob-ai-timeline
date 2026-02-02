'use client';

import Image from 'next/image';

interface TimelineHeaderProps {
  title?: string;
  subtitle?: string;
  viewMode?: 'timeline' | 'year';
  onLogoClick?: () => void;
}

export function TimelineHeader({
  title = 'Bob AI Timeline',
  subtitle = 'AI-powered HR transformation journey',
  viewMode = 'timeline',
  onLogoClick,
}: TimelineHeaderProps) {
  const isClickable = viewMode === 'year' && onLogoClick;

  return (
    <header className="timeline-header flex items-center justify-between px-8 py-4 border-b border-white/10">
      <button
        onClick={isClickable ? onLogoClick : undefined}
        className={`flex items-baseline gap-4 ${isClickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : 'cursor-default'}`}
        disabled={!isClickable}
      >
        <h1 className="text-2xl font-serif">
          <span className="text-white font-bold">Bob</span>
          <span className="text-gradient-agentic font-bold">AI</span>
          <span className="text-white font-light"> Timeline</span>
        </h1>
        <p className="text-white/40 font-sans text-sm">
          {subtitle}
        </p>
      </button>

      <button
        onClick={isClickable ? onLogoClick : undefined}
        className={isClickable ? 'cursor-pointer hover:opacity-70 transition-opacity' : 'cursor-default'}
        disabled={!isClickable}
      >
        <Image
          src="/hibob-logo.svg"
          alt="HiBob"
          width={80}
          height={32}
          className="opacity-90"
        />
      </button>
    </header>
  );
}
