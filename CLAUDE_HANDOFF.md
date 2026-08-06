# Handover Document for Claude

Hello Claude! This document provides all the context and rules you need to continue working on this portfolio project.

## Tech Stack & Architecture
- **Framework:** Next.js (App Router, Turbopack)
- **Styling:** Tailwind CSS (Vanilla CSS in `globals.css`)
- **Language:** TypeScript
- **Deployment:** Vercel (Production branch: `main`)
- **Icons:** `lucide-react` and `react-icons`

## Core Philosophy & Design Rules
The user wants a highly premium, mature, and engineering-focused aesthetic. 
- **Aesthetic References:** Linear, Vercel, Stripe, Apple Developer, Notion.
- **Theme:** **DARK MODE ONLY.** (The theme toggle was removed. Light mode should never be introduced or referenced.)
- **Colors:** Deep dark backgrounds (`#0B0F14` / `#111827`), muted text (`gray-blue` tones), and subtle borders. Avoid neon glows, pure blacks/whites, or saturated highlight colors.
- **Typography:** Display fonts for headings, clean sans-serif for body.
- **Vibe:** "Quiet confidence. Serious engineering. Depth beneath simplicity."

## Animations
The site uses a custom, lightweight `<Reveal>` component (`src/components/ui/Reveal.tsx`) powered by `IntersectionObserver`.
- **Rules:** DO NOT use Framer Motion unless explicitly requested. Avoid bounce, zoom, rotations, or heavy scaling. Animations must be invisible/natural ("Fade Up" with `12px-14px` translation over `250ms-350ms`).
- **Behavior:** Animations re-trigger when elements leave and re-enter the viewport (except the Hero section, which is set to `once={true}`).
- **Hover States:** Most interactive elements (buttons, project links, skill cards) use a subtle `hover:-translate-y-0.5` lift.

## Data Structure
All content (personal info, projects, skills, education) is centralized in `src/data/portfolio.ts`. **When updating content, edit this file rather than the UI components.**

## Recent Work Completed
1. Centralized portfolio data to `src/data/portfolio.ts`.
2. Removed light mode and simplified the theme to dark mode only.
3. Built the `<Reveal>` component to add premium, subtle fade-up scroll animations that re-trigger on scroll.
4. Added the live demo link for Apex Intel.
5. Refined the personal profile description to emphasize AI, Data Architecture, and Cybersecurity.

## Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

When editing, always prioritize clean, minimal code. Ensure mobile responsiveness is maintained. Good luck!
