#!/bin/bash

# Asset mapping script - copies raw_assets to proper locations with correct names
RAW="/Users/rotemadrian/Documents/Bob AI timeline cursor/raw_assets"
FEATURES="/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/public/assets/feature-screenshots"

# Create directories if they don't exist
mkdir -p "$FEATURES"

echo "Copying assets..."

# Hiring features
cp "$RAW/Screenshot_2024-12-03_at_14.35.05.png" "$FEATURES/hiring_email_ui.png" 2>/dev/null
cp "$RAW/image 1.png" "$FEATURES/cv_parsing_ui.png" 2>/dev/null
cp "$RAW/image 2.png" "$FEATURES/eval_summary_ui.png" 2>/dev/null
cp "$RAW/image 3.png" "$FEATURES/mobile_eval_ui.png" 2>/dev/null
cp "$RAW/image 5.png" "$FEATURES/cv_summary_ui.png" 2>/dev/null
cp "$RAW/image 6.png" "$FEATURES/eval_summary_v2_ui.png" 2>/dev/null
cp "$RAW/image 8.png" "$FEATURES/job_openings_ui.png" 2>/dev/null
cp "$RAW/image 9.png" "$FEATURES/agency_cv_ui.png" 2>/dev/null

# Performance features
cp "$RAW/image 4.png" "$FEATURES/perf_summary_ui.png" 2>/dev/null
cp "$RAW/image 12.png" "$FEATURES/feedback_insights_ui.png" 2>/dev/null
cp "$RAW/image 13.png" "$FEATURES/writing_assist_ui.png" 2>/dev/null
cp "$RAW/image 23.png" "$FEATURES/cycle_info_insights.png" 2>/dev/null

# Analytics/Ask About My Data
cp "$RAW/image 7.png" "$FEATURES/position_data_ui.png" 2>/dev/null
cp "$RAW/image 10.png" "$FEATURES/payroll_ai_ui.png" 2>/dev/null

# Time Off
cp "$RAW/image 11.png" "$FEATURES/timeoff_policy_ui.png" 2>/dev/null

# Docs
cp "$RAW/image 14.png" "$FEATURES/docs_summary_ui.png" 2>/dev/null

# Platform/Settings
cp "$RAW/image 15.png" "$FEATURES/ai_toggles_ui.png" 2>/dev/null
cp "$RAW/image 24.png" "$FEATURES/custom_field_validations.png" 2>/dev/null

# Skills
cp "$RAW/image 16.png" "$FEATURES/skills_perf_ui.png" 2>/dev/null
cp "$RAW/image 20.png" "$FEATURES/skills_level_suggestions.png" 2>/dev/null

# Surveys
cp "$RAW/image 17.png" "$FEATURES/survey_summary_ui.png" 2>/dev/null
cp "$RAW/image 19.png" "$FEATURES/survey_gen_ui.png" 2>/dev/null
cp "$RAW/image 25.png" "$FEATURES/survey_form_editing.png" 2>/dev/null

# Bob Companion
cp "$RAW/image 18.png" "$FEATURES/companion_beta_ui.png" 2>/dev/null

# Job Catalog
cp "$RAW/image 21.png" "$FEATURES/job_catalog_generator.png" 2>/dev/null

# AI Text Box
cp "$RAW/image 22.png" "$FEATURES/ai_text_box.png" 2>/dev/null

# Learning / Course
cp "$RAW/image.png" "$FEATURES/course_content_ui.png" 2>/dev/null

# Chatbot
cp "$RAW/image_(14).png" "$FEATURES/chatbot_ui.png" 2>/dev/null

# Resume screening (use CV summary as base)
cp "$RAW/image 5.png" "$FEATURES/resume_screening.png" 2>/dev/null

echo "Done! Copied assets to $FEATURES"
ls -la "$FEATURES" | head -30
