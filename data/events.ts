import type { TimelineEvent, EventDimension, EventModule } from '@/lib/types';
import eventsData from './events.json';

// Type assertion for the imported JSON
const typedEvents = eventsData.events as TimelineEvent[];

// All events sorted chronologically
export const sortedEvents: TimelineEvent[] = typedEvents;

// Filter by dimension
export const bobFeatures: TimelineEvent[] = typedEvents.filter(
  e => e.dimension === 'Bob AI Feature'
);

export const platformEvents: TimelineEvent[] = typedEvents.filter(
  e => e.dimension === 'AI Platform'
);

export const industryRadar: TimelineEvent[] = typedEvents.filter(
  e => e.dimension === 'Industry Radar'
);

// Get events by module
export function getEventsByModule(module: EventModule): TimelineEvent[] {
  return typedEvents.filter(e => e.module === module);
}

// Get events by year
export function getEventsByYear(year: number): TimelineEvent[] {
  return typedEvents.filter(e => new Date(e.date).getFullYear() === year);
}

// Get events by dimension
export function getEventsByDimension(dimension: EventDimension): TimelineEvent[] {
  return typedEvents.filter(e => e.dimension === dimension);
}

// Get agentic events only
export const agenticEvents: TimelineEvent[] = typedEvents.filter(e => e.isAgentic);

// Get Ask About My Data features
export const askAboutMyDataEvents: TimelineEvent[] = typedEvents.filter(e => e.isAskAboutMyData);

// Get unique modules from events
export const activeModules: EventModule[] = Array.from(
  new Set(
    typedEvents
      .filter(e => e.module !== null)
      .map(e => e.module as EventModule)
  )
);

// Event counts by year
export const eventCountsByYear: Record<number, number> = typedEvents.reduce(
  (acc, event) => {
    const year = new Date(event.date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  },
  {} as Record<number, number>
);

// Event count by dimension
export const eventCountsByDimension: Record<EventDimension, number> = {
  'Bob AI Feature': bobFeatures.length,
  'AI Platform': platformEvents.length,
  'Industry Radar': industryRadar.length,
};

// Metadata from generation
export const eventsMetadata = {
  generatedAt: eventsData.generatedAt,
  totalEvents: eventsData.totalEvents,
};
