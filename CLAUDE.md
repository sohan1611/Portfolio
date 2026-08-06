# Portfolio — Project Rules

Personal portfolio for Sohan Mandal. Next.js App Router, deployed to Vercel from `main`.
Live at **https://sohan16.com** (`personal.siteUrl` in `src/data/portfolio.ts` is the single
source of truth — metadata, JSON-LD, sitemap and robots all derive from it).

> **See also `AGENTS.md`** — the shared working agreement with Codex, which carries the
> current work queue and a record of the streaming-Suspense trap. Claude plans and reviews;
> Codex implements. Keep the rules in the two files consistent.

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

## New machine setup

Everything the site needs is committed — content, resume PDF, certificates, config. `git clone`
plus `npm install` gives a working build. Two things do **not** travel with the repo:

### 1. Git identity — do this before the first commit

`user.name` and `user.email` live in global git config, not in the repo. On a fresh machine git
falls back to a generated default, which would put a second name in the contributors list and
break the rule above.

```bash
git config --global user.name "sohan1611"
git config --global user.email "sohanmandal1611@gmail.com"
```

Then verify — this must print exactly one line:

```bash
git log --all --format="%an|%ae|%cn|%ce" | sort -u
```

Expected: `sohan1611|sohanmandal1611@gmail.com|sohan1611|sohanmandal1611@gmail.com`

### 2. Vercel link — only for CLI deploys

`.vercel/` is ignored. Pushing to `main` deploys through the GitHub integration and needs
nothing local. Run `vercel link` and pick `sohan-portfolio` only if you want the `vercel` CLI.

### First run

```bash
npm install
npm run dev
```

Vercel builds on Node 24.x. `.claude/`, `.next/`, `node_modules/` and `next-env.d.ts` are
ignored and regenerate on their own — do not copy them across.
