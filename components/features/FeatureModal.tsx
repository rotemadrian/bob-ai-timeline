'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ImageOff } from 'lucide-react';
import type { TimelineEvent } from '@/lib/types';
import { AgenticStar } from '@/components/shared';
import { cn } from '@/lib/utils';

interface FeatureModalProps {
  event: TimelineEvent;
  onClose: () => void;
}

// Image component with loading state and error handling
function ScreenshotImage({ src, alt, className, expandable = false }: { src: string; alt: string; className?: string; expandable?: boolean }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isExpanded, setIsExpanded] = useState(false);

  if (status === 'error') {
    return (
      <div className={cn("flex flex-col items-center justify-center text-white/30 bg-white/5 rounded-lg p-8", className)}>
        <ImageOff className="w-10 h-10 mb-2" />
        <span className="text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "relative rounded-lg overflow-hidden border border-white/10 bg-white/5",
          expandable && "cursor-zoom-in hover:border-white/30 hover:shadow-lg transition-all",
          className
        )}
        onClick={() => expandable && setIsExpanded(true)}
      >
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "max-w-full max-h-full w-auto h-auto object-contain",
            status === 'loading' && "opacity-0"
          )}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
        {expandable && status === 'loaded' && (
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-[10px] text-white/70 pointer-events-none flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Click to expand
          </div>
        )}
      </div>

      {/* Expanded overlay on click */}
      {expandable && isExpanded && status === 'loaded' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setIsExpanded(false)}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] animate-in zoom-in-95 duration-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

export function FeatureModal({ event, onClose }: FeatureModalProps) {
  const date = new Date(event.date);
  const hasFeatureImage = !!event.featureScreenshotUrl;
  const hasReactionImage = !!event.reactionScreenshotUrl;
  const hasBothImages = hasFeatureImage && hasReactionImage;

  // Magazine layout: feature image takes majority of space, info panel on side
  if (hasFeatureImage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-bob-purple-800 border border-white/10 rounded-2xl shadow-2xl w-[95vw] max-w-[1600px] h-[92vh] overflow-hidden relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 hover:bg-white/10 rounded-full transition-colors bg-black/20 backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white/80" />
          </button>

          {/* Mobile: stacked layout, Desktop: side by side with image dominant */}
          <div className="flex flex-col lg:flex-row flex-1 min-h-0">
            {/* INFO PANEL - compact on desktop */}
            <div className="lg:w-[320px] xl:w-[360px] flex-shrink-0 p-4 lg:p-5 overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10 bg-bob-purple-800">
              {/* Header - more compact */}
              <div className="flex items-start gap-2.5 mb-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  event.isAgentic ? "icon-container-agentic" : "icon-container-pre-agentic"
                )}>
                  {event.isAgentic ? (
                    <AgenticStar size={20} />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-violet-400/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className={cn(
                    "text-lg font-bold leading-tight font-serif",
                    event.isAgentic ? "text-gradient-agentic" : "text-white"
                  )}>
                    {event.title}
                  </h2>
                  <p className="text-white/50 text-xs mt-0.5">
                    {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Tags - inline */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/60">
                  {event.dimension}
                </span>
                {event.module && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/60">
                    {event.module}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                {event.description}
              </p>

              {/* Reaction Screenshot - compact with hover expand */}
              {hasReactionImage && (
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1.5">Team Reaction</p>
                  <ScreenshotImage
                    src={event.reactionScreenshotUrl!}
                    alt={`${event.title} - Team Reaction`}
                    className="max-h-[200px]"
                    expandable
                  />
                </div>
              )}

              {/* Reaction Text (if no image) */}
              {event.internalReactionText && !hasReactionImage && (
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Team Reaction</p>
                  <p className="text-white/70 text-sm italic">"{event.internalReactionText}"</p>
                </div>
              )}
            </div>

            {/* FEATURE IMAGE - takes most of the space */}
            <div className="flex-1 min-w-0 bg-bob-purple-900/30 p-3 lg:p-4 flex flex-col overflow-auto">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2 flex-shrink-0">Feature Screenshot</p>
              <div className="flex-1 flex items-center justify-center">
                <ScreenshotImage
                  src={event.featureScreenshotUrl!}
                  alt={event.title}
                  className="max-w-full max-h-[calc(92vh-100px)] object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Simple layout for no feature image - maximizes reaction image if available
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={cn(
          "bg-bob-purple-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden",
          hasReactionImage
            ? "w-[90vw] max-w-4xl h-auto max-h-[90vh] flex flex-col"
            : "max-w-md w-full p-5"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {hasReactionImage ? (
          <>
            {/* Compact header for reaction image layout */}
            <div className="flex-shrink-0 p-4 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    event.isAgentic ? "icon-container-agentic" : "icon-container-pre-agentic"
                  )}>
                    {event.isAgentic ? (
                      <AgenticStar size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-violet-400/30" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className={cn(
                      "text-lg font-bold leading-tight font-serif",
                      event.isAgentic ? "text-gradient-agentic" : "text-white"
                    )}>
                      {event.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white/50 text-xs">
                        {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/50">
                        {event.dimension}
                      </span>
                      {event.module && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/50">
                          {event.module}
                        </span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mt-2">{event.description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>

            {/* Large reaction image area - still expandable for full view */}
            <div className="flex-1 min-h-0 p-4 overflow-auto bg-bob-purple-900/30">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Team Reaction</p>
              <ScreenshotImage
                src={event.reactionScreenshotUrl!}
                alt={`${event.title} - Team Reaction`}
                className="w-full max-h-[60vh]"
                expandable
              />
            </div>
          </>
        ) : (
          <>
            {/* Header for text-only layout */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-2.5">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  event.isAgentic ? "icon-container-agentic" : "icon-container-pre-agentic"
                )}>
                  {event.isAgentic ? (
                    <AgenticStar size={20} />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-violet-400/30" />
                  )}
                </div>
                <div>
                  <h2 className={cn(
                    "text-lg font-bold leading-tight font-serif",
                    event.isAgentic ? "text-gradient-agentic" : "text-white"
                  )}>
                    {event.title}
                  </h2>
                  <p className="text-white/50 text-xs mt-0.5">
                    {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/60">
                {event.dimension}
              </span>
              {event.module && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/60">
                  {event.module}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed mb-3">{event.description}</p>

            {/* Customer Quote */}
            {event.customerQuote && (
              <div className="mb-3 pl-3 border-l-2 border-pink-500/50">
                <p className="text-white/60 text-sm italic">"{event.customerQuote}"</p>
              </div>
            )}

            {/* Reaction Text */}
            {event.internalReactionText && (
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Team Reaction</p>
                <p className="text-white/70 text-sm italic">"{event.internalReactionText}"</p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
