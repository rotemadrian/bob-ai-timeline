#!/usr/bin/env python3
"""Extract all pages from PDF as PNG images using macOS Quartz."""

import os
import sys

# Try to use Quartz (macOS native)
try:
    import Quartz
    from Quartz import CGPDFDocumentCreateWithURL, CGPDFDocumentGetNumberOfPages
    from Quartz import CGPDFDocumentGetPage, CGPDFPageGetBoxRect, kCGPDFMediaBox
    from CoreFoundation import CFURLCreateFromFileSystemRepresentation
    HAS_QUARTZ = True
except ImportError:
    HAS_QUARTZ = False
    print("Quartz not available, trying alternative...")

PDF_DIR = "/Users/rotemadrian/Documents/Bob AI timeline cursor/bob timeline"
OUTPUT_DIR = "/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/public/feature-shots"

def extract_with_quartz(pdf_path, output_prefix):
    """Extract PDF pages using Quartz."""
    from Quartz import (
        CGPDFDocumentCreateWithURL,
        CGPDFDocumentGetNumberOfPages,
        CGPDFDocumentGetPage,
        CGPDFPageGetBoxRect,
        kCGPDFMediaBox,
        CGBitmapContextCreate,
        CGColorSpaceCreateDeviceRGB,
        kCGImageAlphaPremultipliedLast,
        CGContextDrawPDFPage,
        CGBitmapContextCreateImage,
        CGContextScaleCTM,
        CGContextTranslateCTM,
        CGRectMake,
    )
    from CoreFoundation import CFURLCreateFromFileSystemRepresentation
    import CoreGraphics

    # Create URL from path
    pdf_url = CFURLCreateFromFileSystemRepresentation(None, pdf_path.encode('utf-8'), len(pdf_path.encode('utf-8')), False)
    pdf_doc = CGPDFDocumentCreateWithURL(pdf_url)

    if not pdf_doc:
        print(f"  Could not open PDF: {pdf_path}")
        return []

    num_pages = CGPDFDocumentGetNumberOfPages(pdf_doc)
    print(f"  Pages: {num_pages}")

    extracted = []
    scale = 2.0  # Render at 2x for better quality

    for page_num in range(1, num_pages + 1):
        page = CGPDFDocumentGetPage(pdf_doc, page_num)
        if not page:
            continue

        # Get page dimensions
        page_rect = CGPDFPageGetBoxRect(page, kCGPDFMediaBox)
        width = int(page_rect.size.width * scale)
        height = int(page_rect.size.height * scale)

        # Create bitmap context
        color_space = CGColorSpaceCreateDeviceRGB()
        context = CGBitmapContextCreate(
            None, width, height, 8, 0,
            color_space, kCGImageAlphaPremultipliedLast
        )

        if not context:
            print(f"  Could not create context for page {page_num}")
            continue

        # Fill with white background
        CoreGraphics.CGContextSetRGBFillColor(context, 1.0, 1.0, 1.0, 1.0)
        CoreGraphics.CGContextFillRect(context, CGRectMake(0, 0, width, height))

        # Scale and draw
        CGContextScaleCTM(context, scale, scale)
        CGContextDrawPDFPage(context, page)

        # Create image and save
        image = CGBitmapContextCreateImage(context)

        output_filename = f"{output_prefix}-page-{page_num:03d}.png"
        output_path = os.path.join(OUTPUT_DIR, output_filename)

        # Save using CoreGraphics
        from Quartz import CGImageDestinationCreateWithURL, CGImageDestinationAddImage, CGImageDestinationFinalize
        from CoreFoundation import kCFAllocatorDefault
        import UniformTypeIdentifiers

        dest_url = CFURLCreateFromFileSystemRepresentation(None, output_path.encode('utf-8'), len(output_path.encode('utf-8')), False)
        dest = CGImageDestinationCreateWithURL(dest_url, "public.png", 1, None)
        if dest:
            CGImageDestinationAddImage(dest, image, None)
            CGImageDestinationFinalize(dest)
            extracted.append(output_filename)
            print(f"  Extracted: {output_filename}")
        else:
            print(f"  Failed to save: {output_filename}")

    return extracted


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    pdf_files = [f for f in os.listdir(PDF_DIR) if f.endswith('.pdf')]
    print(f"Found {len(pdf_files)} PDF files\n")

    all_extracted = []

    for pdf_file in pdf_files:
        pdf_path = os.path.join(PDF_DIR, pdf_file)
        prefix = pdf_file.replace('.pdf', '').replace(' ', '-').lower()[:30]
        print(f"Processing: {pdf_file}")

        try:
            if HAS_QUARTZ:
                extracted = extract_with_quartz(pdf_path, prefix)
                all_extracted.extend(extracted)
            else:
                print("  Skipped - no PDF library available")
        except Exception as e:
            print(f"  Error: {e}")

        print()

    print(f"\nTotal extracted: {len(all_extracted)} images")

    # Write manifest
    import json
    manifest_path = os.path.join(OUTPUT_DIR, 'manifest.json')
    with open(manifest_path, 'w') as f:
        json.dump(all_extracted, f, indent=2)


if __name__ == '__main__':
    main()
