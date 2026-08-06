# AGENTS.md — Working Agreement

Shared contract for every agent touching this repo. Codex reads this file; Claude reads
`CLAUDE.md`. The two are kept consistent — if you change a rule in one, change it in both.

**Division of labour:** Claude (Opus) does planning, architecture and review. Codex does the
implementation. The work queue at the bottom of this file is the handoff channel — Claude
writes specs into it, Codex implements them and ticks them off.

---

## 1. Attribution — non-negotiable

The GitHub contributors list must show **only** `sohan1611 <sohanmandal1611@gmail.com>`.

- **Never** append `Co-Authored-By:`, `Signed-off-by:`, `Generated with ...`, or any other
  agent/AI trailer to a commit. Plain commit messages, nothing after the description.
- **Never** add `.github/dependabot.yml`, Renovate config, or a workflow that pushes commits.
- Do not change `user.name` / `user.email`. Every commit is authored *and* committed by the
  repo owner's identity.

This has held for 47 commits. Verify with `git log --all --format='%an|%ae|%cn|%ce' | sort -u`
— it must return exactly one line.

## 2. Definition of done

A change is not done until **both** of these pass:

```bash
npm run lint
npm run build
```

`npm run lint` must be **silent**. The repo has zero warnings; keep it that way. Do not add
`eslint-disable` to silence a rule — fix the cause. (One pre-existing disable for
`@next/next/no-img-element` in `Achievements.tsx` is on the list to remove properly.)

For anything user-visible, also verify it renders. `npm run dev` is not sufficient for
Suspense/streaming behaviour — build and `npx next start` instead, because dev and production
differ in exactly the area that already caused one shipped bug (see §5).

## 3. Architecture

- **Next.js 16** App Router, Turbopack, **React 19**, **TypeScript**, **Tailwind v4**.
- Deployed to Vercel from `main`. Live at **https://sohan16.com**.
- The page is a single statically prerendered route with `revalidate: 3600`.
- **All content lives in `src/data/portfolio.ts`.** Edit that file, never hardcode copy into
  section components. `personal.siteUrl` is the single source of truth for the domain —
  metadata, JSON-LD, sitemap and robots all derive from it.

## 4. Design rules

Premium, mature, engineering-focused. References: Linear, Vercel, Stripe, Notion.
*"Quiet confidence. Serious engineering. Depth beneath simplicity."*

- **DARK MODE ONLY.** No theme toggle, no light mode, ever.
- Deep dark backgrounds (`#0B0F14` / `#111827`), muted gray-blue text, subtle borders.
  No neon glows, no pure black/white, no saturated accents.
- **Animations:** use the custom `<Reveal>` component (`src/components/ui/Reveal.tsx`), an
  IntersectionObserver fade-up — ~14px translate, ~300ms ease-out. No bounce, zoom or rotation.
  Hover lift is `hover:-translate-y-0.5`.
- **Do not add Framer Motion** to new work. It exists in exactly one file, `CommandPalette.tsx`.
- Mobile responsiveness is mandatory on every change.

## 5. Known trap — streaming Suspense

A `<Suspense>` boundary around the async `GitHubActivity` server component shipped a
**permanent loading skeleton to production**: the prerender emitted `$RC("B:0","S:0")` for a
boundary marked `$~` with no matching `B:0`, so the reveal silently no-opped and the real
content stayed in a hidden div. It looked fine in dev.

The component now renders directly, without Suspense. **Do not reintroduce a Suspense boundary
here.** If you add one anywhere else, verify against a production build that the HTML contains
no `id="S:0"` and no `$RC(` calls.

## 6. Machine setup and migration

This repo is worked on from more than one machine, by both agents. Everything the site needs
is committed — content, resume PDF, certificates, config. `git clone` + `npm install` builds.

Full setup detail is in `CLAUDE.md` § *New machine setup*. The one step repeated here because
getting it wrong silently breaks §1 above:

### Git identity — before the first commit on any machine

`user.name` / `user.email` live in **global** git config, not in the repo, so they do not
travel with a clone. Git falls back to a generated default like `user@hostname`, which puts a
second name in the contributors list.

```bash
git config --global user.name "sohan1611"
git config --global user.email "sohanmandal1611@gmail.com"
```

Verify — must print exactly one line, `sohan1611|sohanmandal1611@gmail.com|sohan1611|sohanmandal1611@gmail.com`:

```bash
git log --all --format="%an|%ae|%cn|%ce" | sort -u
```

### Leaving a machine

- [ ] `git status -sb` clean, and `git log origin/main -1` matches local `HEAD` — unpushed
      commits do not travel
- [ ] Vercel deploy for that commit is green
- [ ] Nothing to salvage from `.next/`, `.vercel/`, `node_modules/`, `.claude/` — all ignored
      and all regenerate
- [ ] Agent memory is machine-local and does **not** follow the repo. Claude's lives under
      `~/.claude/projects/<project-slug>/memory/`. Copy it only if you want continuity; the
      durable rules are already in `CLAUDE.md` and this file.

### Arriving on a machine

- [ ] Set git identity (above) and run the verify command
- [ ] `git clone` → `npm install` → `npm run lint` → `npm run build`, all clean
- [ ] `vercel link` → `sohan-portfolio`, only if you want CLI deploys. Pushing to `main`
      deploys through the GitHub integration without it.
- [ ] Re-authenticate each agent's CLI — that auth is machine-local and is not in the repo
- [ ] Confirm both entry docs are picked up: Codex reads `AGENTS.md`, Claude reads `CLAUDE.md`

---

## 7. Work queue

Claude maintains this. Items are **candidates found by reading the code** — each cites
file:line so they can be confirmed before work starts. Confirm, then implement, then tick.

### High value

- [x] **No OpenGraph image.** Done 2026-08-06 — `src/app/opengraph-image.tsx` renders a
      1200×630 card at build time via `next/og`, and `layout.tsx` gained a
      `twitter: { card: "summary_large_image" }` block. Verified against a production build.

- [x] **`prefers-reduced-motion` is not honoured.** Done 2026-08-06. Three places animated
      unconditionally, all now gated: `Reveal.tsx` subscribes to the media query with
      `useSyncExternalStore` and renders content visible with `transition: none` (no
      observer at all in that mode); `scroll-behavior: smooth` moved from Tailwind's
      `scroll-smooth` class on `<html>` into `globals.css` with a reduced-motion override;
      `CommandPalette.tsx` drops its panel scale via Framer's `useReducedMotion`, keeping
      the opacity crossfade. No blanket `!important` motion reset — it would have killed the
      intentional hover lift and could not fix Reveal's `opacity: 0` initial state anyway.

- [ ] **Certificate image is 476KB, unoptimised.** `public/certificates/eict-iitr-ml-agentic-ai-certificate.jpg`
      is served through a raw `<img>` in `Achievements.tsx:81` with an `eslint-disable` for
      `no-img-element`. Convert to `next/image` (removing the disable) or compress the asset.

### Correctness / robustness

- [ ] **Clipboard write has no failure path.** `src/components/sections/Contact.tsx:14` calls
      `navigator.clipboard.writeText(...)` then unconditionally shows "Copied!". On a
      non-secure context or when permission is denied it lies to the user. Await it, catch,
      and show a failure state.

- [ ] **Repo card descriptions can be clipped.** `GitHubActivity.tsx` uses `line-clamp-2`
      together with a fixed `h-10` on the description paragraph. Longer GitHub descriptions
      are cut without any affordance. Either drop the fixed height or accept the truncation
      deliberately with a `title` attribute.

### Housekeeping

- [ ] **Stray lockfile breaks workspace-root inference.** A `package-lock.json` sits at
      `C:\Users\KIIT\` (outside the project), so every build prints a warning and Next infers
      the wrong root. Delete that stray file, or set `turbopack.root` in `next.config.ts`.

### Not yet triaged

A six-lens audit (correctness, a11y, SEO, perf, responsive, security) was started and
**cancelled before producing results**. The items above come from direct code reading, not
from that audit — accessibility and security in particular have had no systematic pass yet.
Treat those two areas as unexamined.
