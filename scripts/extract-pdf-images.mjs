import { promises as fs } from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

const PDF_DIR = '/Users/rotemadrian/Documents/Bob AI timeline cursor/bob timeline';
const OUTPUT_DIR = '/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/public/feature-shots';

async function extractImagesFromPdf(pdfPath, outputPrefix) {
  console.log(`Processing: ${path.basename(pdfPath)}`);

  const pdfBytes = await fs.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

  const pages = pdfDoc.getPages();
  console.log(`  Pages: ${pages.length}`);

  // Access the raw PDF structure to find images
  const context = pdfDoc.context;
  const extractedFiles = [];
  let imageCount = 0;

  // Iterate through all indirect objects to find images
  context.enumerateIndirectObjects().forEach(([ref, obj]) => {
    try {
      if (obj && obj.dict) {
        const subtype = obj.dict.get(context.obj('/Subtype'));
        if (subtype && subtype.toString() === '/Image') {
          imageCount++;
          const width = obj.dict.get(context.obj('/Width'))?.toString();
          const height = obj.dict.get(context.obj('/Height'))?.toString();
          const colorSpace = obj.dict.get(context.obj('/ColorSpace'))?.toString();
          const bitsPerComponent = obj.dict.get(context.obj('/BitsPerComponent'))?.toString();
          const filter = obj.dict.get(context.obj('/Filter'))?.toString();

          console.log(`  Found image #${imageCount}: ${width}x${height}, filter: ${filter}`);

          // Extract the stream data
          if (obj.contents && filter === '/DCTDecode') {
            // JPEG image - can be saved directly
            const outputFilename = `${outputPrefix}-img-${String(imageCount).padStart(3, '0')}.jpg`;
            const outputPath = path.join(OUTPUT_DIR, outputFilename);
            fs.writeFile(outputPath, obj.contents).then(() => {
              console.log(`    Saved: ${outputFilename}`);
            });
            extractedFiles.push(outputFilename);
          } else if (obj.contents && filter === '/FlateDecode') {
            // PNG/raw image data - needs conversion
            const outputFilename = `${outputPrefix}-img-${String(imageCount).padStart(3, '0')}.raw`;
            console.log(`    Skipping raw image (needs conversion): ${outputFilename}`);
          }
        }
      }
    } catch (e) {
      // Skip objects that can't be parsed
    }
  });

  console.log(`  Total images found: ${imageCount}`);
  return extractedFiles;
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const pdfFiles = await fs.readdir(PDF_DIR);
  const pdfs = pdfFiles.filter(f => f.endsWith('.pdf'));

  console.log(`Found ${pdfs.length} PDF files\n`);

  const allExtracted = [];

  for (const pdfFile of pdfs) {
    const pdfPath = path.join(PDF_DIR, pdfFile);
    const prefix = pdfFile.replace('.pdf', '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().slice(0, 30);

    try {
      const extracted = await extractImagesFromPdf(pdfPath, prefix);
      allExtracted.push(...extracted);
    } catch (error) {
      console.error(`Error processing ${pdfFile}:`, error.message);
    }
    console.log('');
  }

  // Wait for all async writes
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log(`\nTotal extracted: ${allExtracted.length} images`);

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(allExtracted, null, 2)
  );
}

main().catch(console.error);
