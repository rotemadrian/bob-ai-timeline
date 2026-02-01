#!/usr/bin/env node

/**
 * CSV Processing Script for Bob AI Timeline
 *
 * Parses the timeline events CSV at build time and generates:
 * - /data/events.json with processed TimelineEvent objects
 *
 * Run with: node scripts/process-csv.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path configuration
const CSV_PATH = join(__dirname, '../data/timeline-events.csv');
const OUTPUT_PATH = join(__dirname, '../data/events.json');
const FEATURE_SCREENSHOTS_PATH = join(__dirname, '../public/assets/feature-screenshots');
const REACTION_SCREENSHOTS_PATH = join(__dirname, '../public/assets/reaction-screenshots');

/**
 * Check if an image file exists
 */
function imageExists(filename, type = 'feature') {
  if (!filename) return false;
  const basePath = type === 'feature' ? FEATURE_SCREENSHOTS_PATH : REACTION_SCREENSHOTS_PATH;
  return existsSync(join(basePath, filename));
}

/**
 * Parse CSV string into array of objects
 */
function parseCSV(csvString) {
  const lines = csvString.split('\n');
  if (lines.length === 0) return [];

  // Parse header row (handle BOM if present)
  const headerLine = lines[0].replace(/^\uFEFF/, '');
  const headers = parseCSVLine(headerLine);

  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const record = {};

    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });

    records.push(record);
  }

  return records;
}

/**
 * Parse a single CSV line, handling quoted fields with commas
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Convert date from "Month DD, YYYY" to "YYYY-MM-DD"
 */
function convertDate(dateString) {
  if (!dateString) return '';

  // Remove quotes if present
  const cleaned = dateString.replace(/"/g, '').trim();

  try {
    const date = new Date(cleaned);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date: ${dateString}`);
      return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (e) {
    console.warn(`Error parsing date: ${dateString}`, e);
    return '';
  }
}

/**
 * Generate slugified ID from title
 */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Calculate impact score based on dimension and features
 * Philosophy/Platform = 5, ABAMD features = 3, Others = 1
 */
function calculateImpactScore(record) {
  const dimension = record.Dimension || '';
  const isAskAboutMyData = record.Is_Ask_about_my_data === 'Yes';

  // AI Platform and Industry Radar events get highest score
  if (dimension === 'AI Platform' || dimension === 'Industry Radar') {
    return 5;
  }

  // Ask About My Data features get medium score
  if (isAskAboutMyData) {
    return 3;
  }

  // Standard Bob AI Features
  return 1;
}

/**
 * Normalize module names from CSV to match our types
 */
function normalizeModule(module) {
  if (!module) return null;

  const moduleMap = {
    'Analytics': 'Analytics',
    'Surveys': 'Surveys',
    'Hiring': 'Hiring',
    'Learning': 'Learning',
    'Bob Core': 'Bob Core',
    'Goals': 'Goals',
    'Timeoff': 'Timeoff',
    'Performance': 'Performance',
    'Workforce planning': 'Workforce planning',
    'Compensation': 'Compensation',
    'Payroll': 'Payroll',
    'Docs': 'Docs',
    'Skills': 'Skills',
    'Job catalog': 'Job catalog',
  };

  return moduleMap[module] || null;
}

/**
 * Convert CSV record to TimelineEvent
 */
function convertToTimelineEvent(record) {
  const title = record.Title || '';
  const id = slugify(title);
  const date = convertDate(record.Date);

  if (!title || !date) {
    console.warn(`Skipping record with missing title or date:`, record);
    return null;
  }

  return {
    id,
    title,
    date,
    description: record.Description || '',
    dimension: record.Dimension || 'Bob AI Feature',
    module: normalizeModule(record.Module),
    customerQuote: record.Customer_Quote && record.Customer_Quote !== '[Placeholder] This feature has been incredibly valuable for our team - Customer Name'
      ? record.Customer_Quote
      : undefined,
    internalReactionText: record.Internal_Reaction_Text || undefined,
    featureScreenshotUrl: record.Feature_Screenshot_Ref && imageExists(record.Feature_Screenshot_Ref, 'feature')
      ? `/assets/feature-screenshots/${record.Feature_Screenshot_Ref}`
      : undefined,
    reactionScreenshotUrl: record.Internal_Reaction_Screenshot_Ref && imageExists(record.Internal_Reaction_Screenshot_Ref, 'reaction')
      ? `/assets/reaction-screenshots/${record.Internal_Reaction_Screenshot_Ref}`
      : undefined,
    isAgentic: record.Is_Agentic_Icon === 'Yes',
    isAskAboutMyData: record.Is_Ask_about_my_data === 'Yes',
    impactScore: calculateImpactScore(record),
  };
}

/**
 * Main processing function
 */
function processCSV() {
  console.log('Reading CSV from:', CSV_PATH);

  const csvContent = readFileSync(CSV_PATH, 'utf-8');
  const records = parseCSV(csvContent);

  console.log(`Parsed ${records.length} records from CSV`);

  const events = records
    .map(convertToTimelineEvent)
    .filter(Boolean)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  console.log(`Converted ${events.length} valid events`);

  // Group by dimension for stats
  const dimensions = {};
  events.forEach(e => {
    dimensions[e.dimension] = (dimensions[e.dimension] || 0) + 1;
  });
  console.log('Events by dimension:', dimensions);

  // Group by module for stats
  const modules = {};
  events.forEach(e => {
    if (e.module) {
      modules[e.module] = (modules[e.module] || 0) + 1;
    }
  });
  console.log('Events by module:', modules);

  // Count agentic events
  const agenticCount = events.filter(e => e.isAgentic).length;
  console.log(`Agentic events: ${agenticCount}`);

  // Write output
  const output = {
    generatedAt: new Date().toISOString(),
    totalEvents: events.length,
    events,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Written to: ${OUTPUT_PATH}`);

  return events;
}

// Run the script
processCSV();
