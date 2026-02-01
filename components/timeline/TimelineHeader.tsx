'use client';

import Image from 'next/image';

interface TimelineHeaderProps {
  title?: string;
  subtitle?: string;
}

export function TimelineHeader({
  title = 'Bob AI Timeline',
  subtitle = 'AI-powered HR transformation journey',
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
      <Image
        src="/hibob-logo.svg"
        alt="HiBob"
        width={80}
        height={32}
        className="opacity-90"
      />
    </header>
  );
}
