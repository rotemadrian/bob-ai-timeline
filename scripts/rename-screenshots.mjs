import { promises as fs } from 'fs';
import path from 'path';

const SHOTS_DIR = '/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/public/feature-shots';

// Mapping of PDF pages to feature IDs (based on PDF content analysis)
// Format: { pageNum: { featureId, type: 'ui' | 'feedback' | 'both' } }
const pageMapping = {
  // 2024 Features
  4: { featureId: 'job-description-generator', type: 'ui' },
  5: { featureId: 'generate-key-results', type: 'ui' },
  6: { featureId: 'bob-assistance-chatbot-demo', type: 'ui' },
  7: { featureId: 'generate-course-details', type: 'ui' },
  8: { featureId: 'ai-shoutouts', type: 'ui' },
  9: { featureId: 'chatbot-streaming', type: 'ui' },
  10: { featureId: 'hiring-email-generator', type: 'ui' },
  11: { featureId: 'chatbot-open-for-all', type: 'ui' },

  // 2025 Features
  12: { featureId: 'survey-text-analysis', type: 'ui' },
  13: { featureId: 'ask-about-my-data', type: 'ui' },
  14: { featureId: 'ai-scorecard-writeup', type: 'ui' },
  15: { featureId: 'ask-ai-time-off', type: 'ui' },
  16: { featureId: 'cv-parsing', type: 'ui' },
  17: { featureId: 'ai-evaluation-summaries', type: 'ui' },
  18: { featureId: 'mobile-interview-ai', type: 'ui' },
  19: { featureId: 'performance-ai-summary', type: 'ui' },
  20: { featureId: 'performance-ai-summary', type: 'feedback' },
  21: { featureId: 'goal-creation-enhancements', type: 'ui' },
  22: { featureId: 'ai-course-creation', type: 'ui' },
  23: { featureId: 'cv-summary', type: 'ui' },
  24: { featureId: 'ai-evaluation-summary-v2', type: 'ui' },
  25: { featureId: 'ask-ai-position-management', type: 'ui' },
  26: { featureId: 'ask-ai-compensation-rollup', type: 'ui' },
  27: { featureId: 'tell-me-job-openings', type: 'ui' },
  28: { featureId: 'ai-report-generation', type: 'ui' },
  29: { featureId: 'continuous-feedback-ai', type: 'ui' },
  30: { featureId: 'ai-writing-assistant-performance', type: 'ui' },
  31: { featureId: 'docs-ai-summary', type: 'ui' },
  32: { featureId: 'bob-skills-ai-creation', type: 'ui' },
  33: { featureId: 'skills-mapped-to-learning', type: 'ui' },
  34: { featureId: 'ai-features-toggles', type: 'ui' },
  35: { featureId: 'skills-performance-ai-insights', type: 'ui' },
  36: { featureId: 'ai-survey-summaries', type: 'ui' },
  37: { featureId: 'bob-companion-beta', type: 'ui' },
  38: { featureId: 'ai-generated-survey', type: 'ui' },
  39: { featureId: 'skill-level-suggestions', type: 'ui' },
  40: { featureId: 'job-catalog-ai-generator', type: 'ui' },
  41: { featureId: 'ai-text-box-beta', type: 'ui' },

  // 2026 Features
  42: { featureId: 'resume-screening-ai', type: 'ui' },
};

async function main() {
  const files = await fs.readdir(SHOTS_DIR);
  const pngFiles = files.filter(f => f.endsWith('.png') && f.includes('-page-'));

  console.log(`Found ${pngFiles.length} page images\n`);

  const renamedFiles = [];
  const featureScreenshots = {};

  for (const file of pngFiles) {
    // Extract page number from filename
    const match = file.match(/-page-(\d+)\.png$/);
    if (!match) continue;

    const pageNum = parseInt(match[1], 10);
    const mapping = pageMapping[pageNum];

    if (!mapping) {
      console.log(`Page ${pageNum}: No mapping (skipped)`);
      continue;
    }

    const { featureId, type } = mapping;
    const suffix = type === 'feedback' ? '-feedback.png' : '-ui.png';
    const newFilename = `${featureId}${suffix}`;
    const oldPath = path.join(SHOTS_DIR, file);
    const newPath = path.join(SHOTS_DIR, newFilename);

    try {
      await fs.rename(oldPath, newPath);
      console.log(`Page ${pageNum}: ${file} -> ${newFilename}`);
      renamedFiles.push({ oldName: file, newName: newFilename, featureId, type });

      // Track screenshots per feature
      if (!featureScreenshots[featureId]) {
        featureScreenshots[featureId] = {};
      }
      if (type === 'ui') {
        featureScreenshots[featureId].screenshotUrl = `/feature-shots/${newFilename}`;
      } else if (type === 'feedback') {
        featureScreenshots[featureId].feedbackScreenshotUrl = `/feature-shots/${newFilename}`;
      }
    } catch (error) {
      console.error(`Error renaming ${file}: ${error.message}`);
    }
  }

  console.log(`\nRenamed ${renamedFiles.length} files`);

  // Write feature screenshots mapping for use in features.ts
  await fs.writeFile(
    path.join(SHOTS_DIR, 'feature-screenshots.json'),
    JSON.stringify(featureScreenshots, null, 2)
  );

  console.log('\nFeature screenshots mapping saved to feature-screenshots.json');
}

main().catch(console.error);
