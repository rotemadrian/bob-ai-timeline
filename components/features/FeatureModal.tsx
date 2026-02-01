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
function ScreenshotImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  if (status === 'error') {
    return (
      <div className={cn("flex flex-col items-center justify-center text-white/30 bg-white/5 rounded-lg p-8", className)}>
        <ImageOff className="w-10 h-10 mb-2" />
        <span className="text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-lg overflow-hidden border border-white/10 bg-white/5", className)}>
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
          "w-full h-auto object-contain",
          status === 'loading' && "opacity-0"
        )}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}

export function FeatureModal({ event, onClose }: FeatureModalProps) {
  const date = new Date(event.date);
  const hasFeatureImage = !!event.featureScreenshotUrl;
  const hasReactionImage = !!event.reactionScreenshotUrl;
  const hasBothImages = hasFeatureImage && hasReactionImage;

  // Magazine layout: two columns side by side - LEFT: title+reaction, RIGHT: feature
  if (hasFeatureImage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-bob-purple-800 border border-white/10 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>

          {/* Two columns side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* LEFT COLUMN: Title + Reaction */}
            <div className="p-6 overflow-y-auto max-h-[90vh] border-r border-white/10">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                  event.isAgentic ? "icon-container-agentic" : "icon-container-pre-agentic"
                )}>
                  {event.isAgentic ? (
                    <AgenticStar size={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-violet-400/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className={cn(
                    "text-xl font-bold leading-tight font-serif",
                    event.isAgentic ? "text-gradient-agentic" : "text-white"
                  )}>
                    {event.title}
                  </h2>
                  <p className="text-white/50 text-sm mt-1">
                    {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60">
                  {event.dimension}
                </span>
                {event.module && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60">
                    {event.module}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {event.description}
              </p>

              {/* Reaction Screenshot - on left with title */}
              {hasReactionImage && (
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Team Reaction</p>
                  <ScreenshotImage
                    src={event.reactionScreenshotUrl!}
                    alt={`${event.title} - Team Reaction`}
                  />
                </div>
              )}

              {/* Reaction Text (if no image) */}
              {event.internalReactionText && !hasReactionImage && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Team Reaction</p>
                  <p className="text-white/70 text-sm italic">"{event.internalReactionText}"</p>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Feature Image */}
            <div className="bg-bob-purple-900/50 p-6 overflow-y-auto max-h-[90vh]">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Feature</p>
              <ScreenshotImage
                src={event.featureScreenshotUrl!}
                alt={event.title}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Simple layout for no feature image (or only reaction image)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={cn(
          "bg-bob-purple-800 border border-white/10 rounded-2xl p-6 shadow-2xl",
          hasReactionImage ? "max-w-2xl w-full" : "max-w-md w-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
              event.isAgentic ? "icon-container-agentic" : "icon-container-pre-agentic"
            )}>
              {event.isAgentic ? (
                <AgenticStar size={24} />
              ) : (
                <div className="w-6 h-6 rounded-full bg-violet-400/30" />
              )}
            </div>
            <div>
              <h2 className={cn(
                "text-xl font-bold leading-tight font-serif",
                event.isAgentic ? "text-gradient-agentic" : "text-white"
              )}>
                {event.title}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60">
            {event.dimension}
          </span>
          {event.module && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60">
              {event.module}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-white/70 leading-relaxed mb-4">{event.description}</p>

        {/* Customer Quote */}
        {event.customerQuote && (
          <div className="mb-4 pl-4 border-l-2 border-pink-500/50">
            <p className="text-white/60 text-sm italic">"{event.customerQuote}"</p>
          </div>
        )}

        {/* Reaction Text */}
        {event.internalReactionText && (
          <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Team Reaction</p>
            <p className="text-white/70 text-sm italic">"{event.internalReactionText}"</p>
          </div>
        )}

        {/* Reaction Screenshot */}
        {hasReactionImage && (
          <div className="mt-4">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Team Reaction</p>
            <ScreenshotImage
              src={event.reactionScreenshotUrl!}
              alt={`${event.title} - Team Reaction`}
              className="max-h-[50vh]"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
