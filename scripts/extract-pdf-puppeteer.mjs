import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';

const PDF_DIR = '/Users/rotemadrian/Documents/Bob AI timeline cursor/bob timeline';
const OUTPUT_DIR = '/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/public/feature-shots';

// Create an HTML page that uses PDF.js to render PDF pages
const createPdfViewerHtml = (pdfPath) => `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style>
    body { margin: 0; padding: 0; background: white; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="pdfCanvas"></canvas>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    window.renderPage = async function(pageNum) {
      const pdfData = window.pdfData;
      if (!pdfData) return null;

      const page = await pdfData.getPage(pageNum);
      const scale = 2.0;
      const viewport = page.getViewport({ scale });

      const canvas = document.getElementById('pdfCanvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);

      await page.render({ canvasContext: context, viewport }).promise;
      return { width: canvas.width, height: canvas.height };
    };

    window.loadPdf = async function(base64Data) {
      const data = atob(base64Data);
      const bytes = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++) {
        bytes[i] = data.charCodeAt(i);
      }
      window.pdfData = await pdfjsLib.getDocument({ data: bytes }).promise;
      return window.pdfData.numPages;
    };
  </script>
</body>
</html>
`;

async function extractPdfPages(browser, pdfPath, outputPrefix) {
  console.log(`Processing: ${path.basename(pdfPath)}`);

  const pdfBytes = await fs.readFile(pdfPath);
  const base64Pdf = pdfBytes.toString('base64');

  const page = await browser.newPage();
  await page.setViewport({ width: 2000, height: 3000 });

  // Set content with PDF.js viewer
  await page.setContent(createPdfViewerHtml(pdfPath));

  // Wait for PDF.js to load
  await page.waitForFunction(() => typeof pdfjsLib !== 'undefined', { timeout: 10000 });

  // Load the PDF
  const numPages = await page.evaluate(async (b64) => {
    return await window.loadPdf(b64);
  }, base64Pdf);

  console.log(`  Pages: ${numPages}`);

  const extracted = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    // Render the page
    const dimensions = await page.evaluate(async (num) => {
      return await window.renderPage(num);
    }, pageNum);

    if (!dimensions) {
      console.log(`  Error rendering page ${pageNum}`);
      continue;
    }

    // Resize viewport to match canvas
    await page.setViewport({ width: dimensions.width, height: dimensions.height });

    // Screenshot just the canvas
    const canvas = await page.$('#pdfCanvas');
    const outputFilename = `${outputPrefix}-page-${String(pageNum).padStart(3, '0')}.png`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    await canvas.screenshot({ path: outputPath });
    extracted.push(outputFilename);
    console.log(`  Extracted: ${outputFilename}`);
  }

  await page.close();
  return extracted;
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  console.log('Launching browser...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  const pdfFiles = await fs.readdir(PDF_DIR);
  const pdfs = pdfFiles.filter(f => f.endsWith('.pdf'));

  console.log(`Found ${pdfs.length} PDF files\n`);

  const allExtracted = [];

  for (const pdfFile of pdfs) {
    const pdfPath = path.join(PDF_DIR, pdfFile);
    const prefix = pdfFile.replace('.pdf', '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().slice(0, 30);

    try {
      const extracted = await extractPdfPages(browser, pdfPath, prefix);
      allExtracted.push(...extracted);
    } catch (error) {
      console.error(`  Error: ${error.message}`);
    }
    console.log('');
  }

  await browser.close();

  console.log(`\nTotal extracted: ${allExtracted.length} images`);

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(allExtracted, null, 2)
  );
}

main().catch(console.error);
