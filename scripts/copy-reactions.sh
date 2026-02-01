#!/bin/bash

# Reaction screenshots mapping script
# Maps raw_assets screenshots to semantic reaction screenshot names

RAW="/Users/rotemadrian/Documents/Bob AI timeline cursor/raw_assets"
REACTIONS="/Users/rotemadrian/Documents/Bob AI timeline cursor/bob-ai-timeline/public/assets/reaction-screenshots"

# Create directory if it doesn't exist
mkdir -p "$REACTIONS"

echo "Copying reaction screenshots..."

# Mapped based on visual inspection of Slack messages and dates:

# AI insights reaction (Keshet - product-updates about AI insights)
cp "$RAW/Screenshot_2026-01-14_at_11.10.39.png" "$REACTIONS/ask_data_slack.png" 2>/dev/null

# Course creation (Tsach - May 8th, 2025 "Absolutely amazing feature!")
cp "$RAW/Screenshot_2026-01-14_at_11.13.38.png" "$REACTIONS/course_creation_slack.png" 2>/dev/null

# Eval summary v2 (Uri - May 21st, 2025 "AMAZING! Great work everyone!")
cp "$RAW/Screenshot_2026-01-14_at_11.16.14.png" "$REACTIONS/eval_summary_v2_slack.png" 2>/dev/null

# Approvals data (Chen - Jun 8th, 2025 "smooth and easy integration")
cp "$RAW/Screenshot_2026-01-14_at_11.20.58.png" "$REACTIONS/approvals_data_slack.png" 2>/dev/null

# Report gen (Dor - Sep 3rd, 2025 "really powerful")
cp "$RAW/Screenshot_2026-01-14_at_11.24.29.png" "$REACTIONS/report_gen_slack.png" 2>/dev/null

# Payroll AI (Roy - Sep 4th, 2025 "Amazing work")
cp "$RAW/Screenshot_2026-01-15_at_11.08.35.png" "$REACTIONS/payroll_ai_slack.png" 2>/dev/null

# Timeoff policy (Aviv - Sep 3rd, 2025 "AI is finally taking over Time Off")
cp "$RAW/Screenshot_2026-01-15_at_11.09.30.png" "$REACTIONS/timeoff_policy_slack.png" 2>/dev/null

# Feedback insights (Keshet - Sep 10th, 2025 "continuous feedback" top customer request)
cp "$RAW/Screenshot_2026-01-15_at_11.10.34.png" "$REACTIONS/feedback_insights_slack.png" 2>/dev/null

# Writing assist / Performance (Shira & April - Oct 9th, 2025 "Performance reviews")
cp "$RAW/Screenshot_2026-01-15_at_11.11.54.png" "$REACTIONS/writing_assist_slack.png" 2>/dev/null

# AI toggles (Carina - Nov 4th, 2025 "CONGRATS team!!!")
cp "$RAW/Screenshot_2026-01-15_at_11.14.56.png" "$REACTIONS/ai_toggles_slack.png" 2>/dev/null

# Skills AI / Survey gen related (Carina - Nov 4th "STUNNING!")
cp "$RAW/Screenshot_2026-01-15_at_11.15.25.png" "$REACTIONS/skills_ai_slack.png" 2>/dev/null

# Survey analysis (Leah - Nov 5th, 2025 "Looks amazing!")
cp "$RAW/Screenshot_2026-01-15_at_11.16.24.png" "$REACTIONS/survey_analysis_slack.png" 2>/dev/null

# Survey gen (Uri - Dec 3rd, 2025 "OMG that was the dream!")
cp "$RAW/Screenshot_2026-01-15_at_11.18.21.png" "$REACTIONS/survey_gen_slack.png" 2>/dev/null

# Survey summary (Uri - Dec 3rd, 2025 "gamechanger")
cp "$RAW/Screenshot_2026-01-15_at_11.19.00.png" "$REACTIONS/survey_summary_slack.png" 2>/dev/null

# Companion beta (Uri - Dec 21st, 2025 "Amazing achievement... evolution")
cp "$RAW/Screenshot_2026-01-15_at_11.21.48.png" "$REACTIONS/companion_beta_slack.png" 2>/dev/null

# Perf summary (Adir & Tomer - Jan 7th about "AI-led architecture")
cp "$RAW/Screenshot_2026-01-15_at_11.22.44.png" "$REACTIONS/perf_summary_slack.png" 2>/dev/null

# Chatbot launch (Einat - "Such WINS!")
cp "$RAW/Screenshot_2026-01-15_at_11.23.56.png" "$REACTIONS/chatbot_slack.png" 2>/dev/null

# Key results (Nils - "Huge one! Kudos team")
cp "$RAW/Screenshot_2026-01-15_at_11.25.38.png" "$REACTIONS/key_results_slack.png" 2>/dev/null

# Job desc (Michal - "Great milestone for Bob's data management")
cp "$RAW/Screenshot_2026-01-15_at_11.26.59.png" "$REACTIONS/job_desc_slack.png" 2>/dev/null

# Course content / general (Sivan & Adina - "incredible milestone")
cp "$RAW/Screenshot_2026-01-15_at_11.27.42.png" "$REACTIONS/course_content_slack.png" 2>/dev/null

# Eval summary (can reuse v2 or use another)
cp "$RAW/Screenshot_2026-01-14_at_11.16.14.png" "$REACTIONS/eval_summary_slack.png" 2>/dev/null

# Scorecard (generic positive reaction)
cp "$RAW/Screenshot_2026-01-14_at_11.10.39.png" "$REACTIONS/scorecard_slack.png" 2>/dev/null

echo "Done! Copied reaction screenshots to $REACTIONS"
ls -la "$REACTIONS" | head -30
