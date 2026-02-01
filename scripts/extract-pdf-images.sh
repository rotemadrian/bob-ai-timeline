#!/bin/bash

PDF_DIR="/Users/rotemadrian/Documents/Bob AI timeline cursor/bob timeline"
OUTPUT_DIR="/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/public/feature-shots"

mkdir -p "$OUTPUT_DIR"

# Main PDF with screenshots
MAIN_PDF="$PDF_DIR/c3dd8d87-9dbc-4ffa-a58e-ebad24cb58b1_People__Org_HackathonzChat_GPT__Hibob_AI_evolution.pdf"

if [ -f "$MAIN_PDF" ]; then
    echo "Extracting previews from main PDF..."
    # Use qlmanage to generate preview images
    qlmanage -t -s 1600 -o "$OUTPUT_DIR" "$MAIN_PDF" 2>/dev/null

    # Rename the output
    if [ -f "$OUTPUT_DIR/c3dd8d87-9dbc-4ffa-a58e-ebad24cb58b1_People__Org_HackathonzChat_GPT__Hibob_AI_evolution.pdf.png" ]; then
        mv "$OUTPUT_DIR/c3dd8d87-9dbc-4ffa-a58e-ebad24cb58b1_People__Org_HackathonzChat_GPT__Hibob_AI_evolution.pdf.png" "$OUTPUT_DIR/hibob-ai-evolution-preview.png"
        echo "Created: hibob-ai-evolution-preview.png"
    fi
fi

# Section 2 PDF
SECTION_PDF="$PDF_DIR/Section 2.pdf"
if [ -f "$SECTION_PDF" ]; then
    echo "Extracting preview from Section 2..."
    qlmanage -t -s 1600 -o "$OUTPUT_DIR" "$SECTION_PDF" 2>/dev/null

    if [ -f "$OUTPUT_DIR/Section 2.pdf.png" ]; then
        mv "$OUTPUT_DIR/Section 2.pdf.png" "$OUTPUT_DIR/section-2-preview.png"
        echo "Created: section-2-preview.png"
    fi
fi

# Timeline PDF
TIMELINE_PDF="$PDF_DIR/timeline.pdf"
if [ -f "$TIMELINE_PDF" ]; then
    echo "Extracting preview from timeline..."
    qlmanage -t -s 1600 -o "$OUTPUT_DIR" "$TIMELINE_PDF" 2>/dev/null

    if [ -f "$OUTPUT_DIR/timeline.pdf.png" ]; then
        mv "$OUTPUT_DIR/timeline.pdf.png" "$OUTPUT_DIR/timeline-preview.png"
        echo "Created: timeline-preview.png"
    fi
fi

echo ""
echo "Extracted files:"
ls -la "$OUTPUT_DIR"/*.png 2>/dev/null || echo "No PNG files found"
