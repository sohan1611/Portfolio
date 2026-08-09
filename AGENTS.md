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

- [x] **Certificate image is 476KB, unoptimised.** Done 2026-08-06. Now served through
      `next/image`; the `eslint-disable` is gone. Intrinsic dimensions (3509×2712) live in
      `portfolio.ts` alongside the file, per §3.

      Two corrections to how this item was originally framed. The `<img>` only ever mounted
      inside the certificate modal, so the weight was never on the initial page load — this
      was a bandwidth-on-open problem, not an LCP one. And **compressing the asset would have
      been the wrong fix**: the Download Certificate link serves the same path, and a
      downloadable certificate should stay full resolution. `next/image` gives an optimized
      derivative for viewing while the original is preserved for download. Measured against a
      production build: 487KB JPEG → 46KB AVIF at 1080w, 34KB at 750w.

### Correctness / robustness

- [x] **Clipboard write has no failure path.** Done 2026-08-06. The handler is now `async`,
      guards `navigator.clipboard?.writeText` (undefined on a non-secure context, where the
      old code threw a TypeError), awaits the write, and drives a three-state
      `idle | copied | failed` button. On failure the address is rendered as selectable text
      in an `aria-live` region, so the user still gets what they came for. The reset timer is
      held in a ref, cleared between clicks and on unmount — the old one leaked.

- [ ] **Repo card descriptions can be clipped.** `GitHubActivity.tsx` uses `line-clamp-2`
      together with a fixed `h-10` on the description paragraph. Longer GitHub descriptions
      are cut without any affordance. Either drop the fixed height or accept the truncation
      deliberately with a `title` attribute.

### Accessibility and security — pass completed 2026-08-06

Both areas had never been examined. They have now been, against a production build.

- [x] **No mobile navigation existed at all.** At 375px the header rendered one usable control
      (the name link); all 7 nav links were `display:none`, there were zero buttons, and the
      only affordance was the text "Press /" — a keyboard hint on a device with no keyboard.
      Replaced with a hamburger drawer: `role="dialog"`, `aria-modal`, accessible name,
      44px targets, focus trap covering the toggle *and* the links, focus restored to the
      toggle on close, Escape / backdrop / link-tap all close, body scroll locked. No Framer
      Motion and no animation — a plain conditional render sidesteps reduced motion entirely.

- [x] **No skip link** — WCAG 2.4.1 Bypass Blocks, Level A. Added as the first element in
      `<body>`, targeting `#main-content` on the `<main>` in `page.tsx`.

- [x] **Footer social links were 20×20** — now 44×44 (WCAG 2.5.8).

- [x] **Navbar had no focus styling whatsoever.** Now uses the same
      `focus-visible:ring-1 focus-visible:ring-ring` idiom as the rest of the codebase.

- [x] **Dead light-mode classes in the Navbar** (`text-slate-900/85 dark:...`) removed, per
      the dark-only rule in §4.

- [x] **No security headers.** `next.config.ts` now sends `X-Content-Type-Options`,
      `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy: frame-ancestors
      'self'` and `Strict-Transport-Security`. Verified served, and `/` stays statically
      prerendered.

- [x] **JSON-LD was injected unescaped.** `layout.tsx` now escapes `<` to `\u003c`, so no
      value reachable from `portfolio.ts` can terminate the `<script>` tag. Not exploitable
      before (all content is owner-authored) — this is hardening.

**Verified clean, so don't re-audit these:** all 27 distinct text styles pass AA contrast
(worst 7.02:1), one `h1` with no skipped levels across 52 headings, every interactive control
has an accessible name, no horizontal overflow at 375px, all 15 `target="_blank"` links carry
`rel="noopener noreferrer"`, no secrets, no `eval`, no user input anywhere. Desktop nav links
are 20px tall but **pass** 2.5.8 via the spacing exception (`gap-6` = 24px between targets) —
do not "fix" them.

### Second audit — completed 2026-08-06

A deeper pass over the components the first audit did not read. All findings were confirmed by
driving a production build, not by reading alone.

- [x] **Neither modal restored focus on close.** Confirmed by measurement: focus a trigger,
      open `ViewResumeButton` or the `Achievements` certificate modal, press Escape, and
      `document.activeElement` became `BODY` — a keyboard user lost their place entirely
      (WCAG 2.4.3). Both now restore focus to the exact element that opened them, on all
      three close paths. `Achievements` captures the trigger via `event.currentTarget`, so
      opening the *second* certificate returns focus to the second button, not the first —
      verified.

- [x] **Label in Name violation** (WCAG 2.5.3, Level A). `ViewResumeButton` hardcoded
      `aria-label="View resume"` while rendering `{label}`. In Contact the visible text is
      "View Full PDF Resume" but the accessible name was "View resume", so voice-control users
      saying what they could see could not activate it. The hardcoded label is gone; the
      visible text now names the button.

- [x] **Both modals now close on backdrop click**, matching the Navbar drawer. Clicking inside
      the panel does not close — verified.

- [x] **Repeated link names gave no way to choose.** The Projects section exposed
      "Source Code" ×4 and "Live Demo" ×3 (WCAG 2.4.4). Now 7 unique names of the form
      "Source Code for Aspirova", each still containing its visible text so 2.5.3 holds.

- [x] **Hero social links were 20×20 with a 16px gap** — under 2.5.8's 24px minimum, and the
      spacing exception did not rescue them. Now 44×44 with focus rings, matching the Footer.

- [x] **Anchor jumps landed section tops behind the fixed header.** `scroll-margin-top` was
      `0px` everywhere against a 65px fixed header. `Section` now carries `scroll-mt-20`;
      sections land 15px clear of the header instead of 65px behind it. Note the headings
      were never actually hidden — section padding absorbed it — so this is polish, not a
      content-loss bug.

- [x] **The 404 inherited the portfolio's title.** Now "Page Not Found | Sohan Mandal" with
      its own description, still returning HTTP 404.

### Settled decisions — do not re-raise

- **Full Content-Security-Policy: deliberately not implemented.** Decided by the owner
  2026-08-06. Only `frame-ancestors 'self'` is set, and that is the intended end state.

  A real `script-src` needs a nonce for Next's inline bootstrap and for the JSON-LD block.
  Supplying a nonce requires middleware, and middleware makes the route dynamic — `/` is
  currently statically prerendered with `revalidate: 3600` (§3). That is a concrete cost for
  no concrete gain here: the site has no user input, no auth, no forms and no third-party
  scripts, so the injection surface a `script-src` defends is empty. `frame-ancestors`
  already covers the clickjacking case that does apply.

  Revisit only if the site gains a backend, accepts user input, or loads third-party scripts.
  Until one of those is true, do not propose this again.

- **`react-icons` is pinned to exactly `5.6.0`. Do not bump it without checking `SiOpenai`.**
  The Technical Arsenal chips take their brand marks from `react-icons/si` (Simple Icons).
  **`5.7.0` removes `SiOpenai`** — Simple Icons drops marks on trademark request — and the
  build fails outright with `Export SiOpenai doesn't exist in target module`. That same release
  adds `SiNeon`, so the two are mutually exclusive: 5.6.0 gives OpenAI (used by the "OpenAI
  API" and "OpenAI Codex" chips) and no Neon; 5.7.0 gives Neon and no OpenAI. Two chips beat
  one, so we stay on 5.6.0 and "Neon" renders text-only. Tried the bump 2026-08-09, broke the
  build, reverted. The version is pinned without a caret precisely so `npm install` cannot
  pull 5.7.0 silently.

- **The 404 serves two `robots` meta tags on purpose. Do not "tidy" it.** Next emits its own
  `<meta name="robots" content="noindex"/>` for the not-found route, and `not-found.tsx` also
  sets `robots: { index: false, follow: true }`, so the HTML carries two tags that both say
  noindex. Removing the explicit key looks like a cleanup and is actively harmful: the route
  then **inherits** `robots: { index: true, follow: true }` from the root layout, and the 404
  ends up serving `noindex` and `index, follow` together. Tried it 2026-08-06, measured the
  contradiction, reverted. Two agreeing tags beat two contradicting ones.

- [x] **Three high-severity npm advisories.** Done 2026-08-06. `next` and `eslint-config-next`
      moved 16.2.7 → 16.3.0 together (they version in lockstep); `package.json` changed those
      two pins and nothing else. postcss is now 8.5.23 deduped and sharp 0.35.3.

      Two further advisories then appeared that the original report had hidden: it was run as
      `npm audit --production`, so dev-only findings never showed. `brace-expansion` (under
      typescript-eslint's minimatch) and `js-yaml` (under eslintrc) are DoS issues in lint
      tooling with no runtime exposure — cleared with a plain `npm audit fix`, which touched
      3 dev packages. **`npm audit` now reports 0, and `npm audit --omit=dev` reports 0.**

      Verified against a production build after the bump: lint silent, build green, `/` still
      statically prerendered at 1h; no `$RC(` or `id="S:0"` in the HTML and GitHubActivity
      still renders server-side (§5 trap has not resurfaced); security headers still served;
      image optimizer byte-identical at 46,554 B AVIF; OG image byte-identical at 38,263 B;
      mobile drawer, skip link, clipboard failure path and repo descriptions all still
      behave, with zero uncaught errors.

      Note for next time: audit with `npm audit` (everything) and `npm audit --omit=dev`
      (what actually ships). The `--production` flag alone understates the picture.

### Correctness / robustness (cont.)

- [x] **Repo card descriptions can be clipped.** Done 2026-08-06 — and measuring first
      inverted the item's framing. It read as "longer descriptions get cut". In fact, at
      1280px (518px cards) **nothing** was truncated: all four descriptions occupied exactly
      two lines. At 375px **all four** were, showing 40px of 60–80px, so a third to a half of
      every description was hidden on the viewport most visitors use.

      So it was a mobile-only problem, and the `title` option the item suggested does nothing
      there — phones have no hover. The clamp and fixed height are now `md:`-only
      (`line-clamp-none h-auto md:line-clamp-2 md:h-10`), which costs nothing on mobile since
      that grid is single-column. `title` still added for the desktop case a longer future
      description would hit. Verified: 375px shows every description in full; 1280px keeps
      40px boxes, 166px cards and aligned footers in both rows.

### Housekeeping

- [x] **Stray lockfile breaks workspace-root inference.** Stale — this described a
      `package-lock.json` at `C:\Users\KIIT\` on a previous machine. Verified 2026-08-06 on
      the current machine: nothing above the project root, and the build emits no
      root-inference warning. Re-check if the warning ever reappears elsewhere.
