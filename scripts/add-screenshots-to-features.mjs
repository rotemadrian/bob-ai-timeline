import { promises as fs } from 'fs';

const FEATURES_PATH = '/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/data/features.ts';
const SCREENSHOTS_PATH = '/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/public/feature-shots/feature-screenshots.json';

async function main() {
  // Read screenshot mappings
  const screenshots = JSON.parse(await fs.readFile(SCREENSHOTS_PATH, 'utf-8'));

  // Read features file
  let featuresContent = await fs.readFile(FEATURES_PATH, 'utf-8');

  // For each feature with screenshots, add the URLs
  for (const [featureId, urls] of Object.entries(screenshots)) {
    const { screenshotUrl, feedbackScreenshotUrl } = urls;

    // Find the feature block and add screenshot URLs before the closing brace
    // We'll add it after the last property (before the },)
    const featurePattern = new RegExp(
      `(id: '${featureId}',[^}]+?)(highlight: (?:true|false),?)?(\\s*},)`,
      's'
    );

    const match = featuresContent.match(featurePattern);
    if (match) {
      let replacement = match[1];
      if (match[2]) {
        replacement += match[2];
      }

      // Add screenshot URLs
      if (screenshotUrl) {
        replacement += `\n    screenshotUrl: '${screenshotUrl}',`;
      }
      if (feedbackScreenshotUrl) {
        replacement += `\n    feedbackScreenshotUrl: '${feedbackScreenshotUrl}',`;
      }

      replacement += match[3];

      featuresContent = featuresContent.replace(featurePattern, replacement);
      console.log(`Added screenshots to: ${featureId}`);
    } else {
      // Try alternative pattern without highlight
      const altPattern = new RegExp(
        `(id: '${featureId}',[^}]+?icon: '[^']+',)(\\s*},)`,
        's'
      );
      const altMatch = featuresContent.match(altPattern);
      if (altMatch) {
        let replacement = altMatch[1];
        if (screenshotUrl) {
          replacement += `\n    screenshotUrl: '${screenshotUrl}',`;
        }
        if (feedbackScreenshotUrl) {
          replacement += `\n    feedbackScreenshotUrl: '${feedbackScreenshotUrl}',`;
        }
        replacement += altMatch[2];

        featuresContent = featuresContent.replace(altPattern, replacement);
        console.log(`Added screenshots to: ${featureId}`);
      } else {
        console.log(`Could not find feature: ${featureId}`);
      }
    }
  }

  // Write updated features file
  await fs.writeFile(FEATURES_PATH, featuresContent);
  console.log('\nFeatures file updated with screenshot URLs');
}

main().catch(console.error);
