'use client';

interface TimelineHeaderProps {
  title?: string;
  subtitle?: string;
}

export function TimelineHeader({
  title = 'Bob AI Timeline',
  subtitle = 'AI-powered HR transformation journey',
}: TimelineHeaderProps) {
  return (
    <header className="timeline-header flex items-center px-4 border-b border-white/10">
      <div>
        <h1 className="text-2xl font-serif">
          <span className="text-white font-bold">Bob</span>
          <span className="text-gradient-agentic font-bold">AI</span>
          <span className="text-white font-light"> Timeline</span>
        </h1>
        <p className="text-white/50 font-sans text-xs">
          {subtitle}
        </p>
      </div>
      {/* Legend in header */}
      <div className="ml-auto legend-container">
        <div className="legend-item">
          <div className="w-3 h-3 rounded-full feature-dot-pre-agentic" />
          <span className="text-white/50">Pre-Agentic</span>
        </div>
        <div className="legend-item">
          <div className="w-3 h-3 rounded-full feature-dot-agentic" />
          <span className="text-white/50">Agentic Era</span>
        </div>
      </div>
    </header>
  );
}
