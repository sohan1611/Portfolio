# Portfolio — Project Rules

Personal portfolio for Sohan Mandal. Next.js App Router, deployed to Vercel from `main`.

## Attribution (non-negotiable)

The GitHub contributors list must show **only** `sohan1611 <sohanmandal1611@gmail.com>`.

- **No agent/AI attribution.** Never append `Co-Authored-By: Claude ...` (or any other agent trailer) to a commit here. Plain commit messages only. This overrides the default Claude Code commit-trailer behaviour.
- **No bots.** Do not add `.github/dependabot.yml`, Renovate config, or any workflow that pushes commits back to the repo. Dependency bumps are done by hand.
- Commits are authored and committed by the repo owner's git identity only.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + vanilla CSS in `src/app/globals.css`
- **Icons:** `lucide-react`, `react-icons`

## Design Philosophy

Premium, mature, engineering-focused. References: Linear, Vercel, Stripe, Apple Developer, Notion.
Vibe: *"Quiet confidence. Serious engineering. Depth beneath simplicity."*

- **DARK MODE ONLY.** The theme toggle was removed. Never reintroduce or reference light mode.
- **Colors:** deep dark backgrounds (`#0B0F14` / `#111827`), muted gray-blue text, subtle borders. No neon glows, no pure black/white, no saturated accents.
- **Typography:** display font for headings, clean sans-serif for body.
- Mobile responsiveness must be maintained on every change.

## Animations

Use the custom `<Reveal>` component (`src/components/ui/Reveal.tsx`) — an `IntersectionObserver` fade-up.

- Fade up only: ~14px translate over ~300ms `ease-out`. No bounce, zoom, rotation, or heavy scaling.
- Re-triggers on re-entering the viewport. Pass `once={true}` for the Hero.
- Hover: subtle `hover:-translate-y-0.5` lift on interactive elements.
- **Do not add Framer Motion to new work** unless explicitly asked. It is currently used in exactly one place, `src/components/CommandPalette.tsx`.

## Content

All content — personal info, projects, skills, education, achievements — lives in `src/data/portfolio.ts`. **Edit that file, not the section components**, when changing copy.

## Commands

```bash
npm run dev
npm run build
npm run lint
```
