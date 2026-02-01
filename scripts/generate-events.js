const fs = require('fs');
const path = require('path');

// Read CSV file
const csvPath = path.join(__dirname, '../data/Timeline Events 28fcda4a1534486a9d7ed554d0b2fda0_all.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(',').map(h => h.trim().replace(/^\uFEFF/, '')); // Remove BOM

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
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

function parseDate(dateStr) {
  // Parse dates like "February 24, 2025" or "June 5, 2024"
  // Use manual parsing to avoid timezone issues
  const months = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };

  const match = dateStr.match(/(\w+)\s+(\d+),\s+(\d{4})/);
  if (!match) {
    console.error('Invalid date format:', dateStr);
    return null;
  }

  const [, month, day, year] = match;
  const monthNum = months[month];
  if (!monthNum) {
    console.error('Invalid month:', month);
    return null;
  }

  // Format as YYYY-MM-DD
  return `${year}-${monthNum}-${day.padStart(2, '0')}`;
}

function generateId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get available screenshot files from assets folder only (not feature-shots which has PDF exports)
const assetsFeatureDir = path.join(__dirname, '../public/assets/feature-screenshots');
const assetsReactionDir = path.join(__dirname, '../public/assets/reaction-screenshots');

const assetsFeatureFiles = fs.existsSync(assetsFeatureDir) ? fs.readdirSync(assetsFeatureDir) : [];
const assetsReactionFiles = fs.existsSync(assetsReactionDir) ? fs.readdirSync(assetsReactionDir) : [];

// Manual mapping from event titles to reaction filenames (for ones not in CSV)
const reactionMapping = {
  'Bob Companion Beta': 'companion_beta_slack.png',
  'Bob Skills AI Creation': 'skills_ai_slack.png',
};

function findFeatureScreenshot(csvRef, title) {
  // Only use assets/feature-screenshots folder (has proper individual images)
  if (csvRef && assetsFeatureFiles.includes(csvRef)) {
    return `/assets/feature-screenshots/${csvRef}`;
  }

  // If file doesn't exist, return null (will show placeholder)
  return null;
}

function findReactionScreenshot(csvRef, title) {
  // First check CSV reference
  if (csvRef && assetsReactionFiles.includes(csvRef)) {
    return `/assets/reaction-screenshots/${csvRef}`;
  }

  // Check manual mapping
  if (reactionMapping[title] && assetsReactionFiles.includes(reactionMapping[title])) {
    return `/assets/reaction-screenshots/${reactionMapping[title]}`;
  }

  return null;
}

const events = [];

for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  if (values.length < headers.length) continue;

  const row = {};
  headers.forEach((header, idx) => {
    row[header] = values[idx] || '';
  });

  const title = row['Title'];
  const date = parseDate(row['Date']);
  if (!title || !date) continue;

  const event = {
    id: generateId(title),
    title: title,
    date: date,
    description: row['Description'] || '',
    dimension: row['Dimension'] || 'Bob AI Feature',
    module: row['Module'] || null,
    isAgentic: row['Is_Agentic_Icon'] === 'Yes',
    isAskAboutMyData: row['Is_Ask_about_my_data'] === 'Yes',
    impactScore: row['Dimension'] === 'AI Platform' || row['Dimension'] === 'Industry Radar' ? 5 :
                 row['Is_Ask_about_my_data'] === 'Yes' ? 3 : 1,
  };

  // Add optional fields
  if (row['Customer_Quote'] && !row['Customer_Quote'].includes('[Placeholder]')) {
    event.customerQuote = row['Customer_Quote'];
  }

  // Find screenshot - check both folders
  const featureScreenshot = findFeatureScreenshot(row['Feature_Screenshot_Ref'], title);
  if (featureScreenshot) {
    event.featureScreenshotUrl = featureScreenshot;
  }

  // Find reaction screenshot
  const reactionScreenshot = findReactionScreenshot(row['Internal_Reaction_Screenshot_Ref'], title);
  if (reactionScreenshot) {
    event.reactionScreenshotUrl = reactionScreenshot;
  }

  // Clean up null module
  if (!event.module) {
    event.module = null;
  }

  events.push(event);
}

// Sort by date
events.sort((a, b) => new Date(a.date) - new Date(b.date));

const output = {
  generatedAt: new Date().toISOString(),
  totalEvents: events.length,
  events: events
};

const outputPath = path.join(__dirname, '../data/events.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`Generated ${events.length} events`);
console.log('Events by dimension:');
const byDimension = events.reduce((acc, e) => {
  acc[e.dimension] = (acc[e.dimension] || 0) + 1;
  return acc;
}, {});
console.log(byDimension);
