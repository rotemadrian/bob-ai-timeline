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
function ScreenshotImage({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  if (status === 'error') {
    return (
      <div className="space-y-2">
        <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
        <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5 p-8 flex flex-col items-center justify-center text-white/30">
          <ImageOff className="w-8 h-8 mb-2" />
          <span className="text-xs">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
      <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5 relative">
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-auto object-contain max-h-[60vh]",
            status === 'loading' && "opacity-0"
          )}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      </div>
    </div>
  );
}

export function FeatureModal({ event, onClose }: FeatureModalProps) {
  const date = new Date(event.date);
  const hasScreenshots = event.featureScreenshotUrl || event.reactionScreenshotUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={cn(
          "bg-bob-purple-800 border border-white/10 rounded-xl p-6 shadow-2xl my-4",
          hasScreenshots ? "max-w-4xl w-full" : "max-w-md w-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center icon-container",
              event.isAgentic ? "icon-container-agentic" : "icon-container-pre-agentic"
            )}>
              {event.isAgentic ? (
                <AgenticStar size={24} />
              ) : (
                <div className="w-6 h-6 rounded-full bg-violet-400/30" />
              )}
            </div>
            <div>
              <h3 className={cn(
                "font-semibold text-lg",
                event.isAgentic && "text-gradient-agentic"
              )}>
                {event.title}
              </h3>
              <p className="text-white/60 text-sm">
                {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Description */}
        <p className="text-white/80 mb-4">{event.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70">
            {event.dimension}
          </span>
          {event.module && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70">
              {event.module}
            </span>
          )}
          {event.isAgentic && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-bob-pink-400/20 to-bob-orange-400/20 text-gradient-agentic">
              Agentic
            </span>
          )}
          {event.isAskAboutMyData && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
              Ask About My Data
            </span>
          )}
          {event.impactScore === 5 && (
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              event.isAgentic
                ? "bg-gradient-to-r from-bob-pink-400/20 to-bob-orange-400/20 text-bob-pink-400"
                : "bg-violet-500/20 text-violet-400"
            )}>
              Major
            </span>
          )}
        </div>

        {/* Customer Quote */}
        {event.customerQuote && (
          <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
              Customer Quote
            </p>
            <p className="text-sm text-white/80 italic">
              "{event.customerQuote}"
            </p>
          </div>
        )}

        {/* Internal Reaction */}
        {event.internalReactionText && (
          <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
              Team Reaction
            </p>
            <p className="text-sm text-white/80 italic">
              "{event.internalReactionText}"
            </p>
          </div>
        )}

        {/* Screenshots section */}
        {hasScreenshots && (
          <div className={cn(
            "grid gap-4 mt-4",
            event.featureScreenshotUrl && event.reactionScreenshotUrl ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          )}>
            {event.featureScreenshotUrl && (
              <ScreenshotImage
                src={event.featureScreenshotUrl}
                alt={`${event.title} UI`}
                label="UI Screenshot"
              />
            )}
            {event.reactionScreenshotUrl && (
              <ScreenshotImage
                src={event.reactionScreenshotUrl}
                alt={`${event.title} Feedback`}
                label="Team Feedback"
              />
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
