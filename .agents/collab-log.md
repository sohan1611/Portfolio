# Collab log — Claude (architect) × Codex (engineer)

Shared brief for the repo owner. One entry per delegation round, chronological, newest at the
bottom. Gists only — no transcripts, never any secrets.

## 2026-08-06 — Work order 1 (Claude → Codex): OpenGraph share image

- Task: add `src/app/opengraph-image.tsx` via the Next `ImageResponse` file convention, plus a
  `twitter: { card: "summary_large_image" }` block in `layout.tsx`. Copy sourced from
  `portfolioData`, dark palette per AGENTS.md §4, no new dependencies, no network font fetch.
- Codex: wrote the image component; skipped the `layout.tsx` edit, reporting its sandbox
  blocked it. Sandbox cannot launch processes, so it ran neither lint nor build.
- Review: corrections sent — (1) the skip reason was wrong, reading files is not blocked, do
  the edit; (2) focus line was interests-only, add the degree since the card is aimed at
  recruiters; (3) drop the full-bleed outer border, social platforms crop and round the card.
- Round 2: all three landed. Verified by Claude — `npm run lint` silent, `npm run build` green
  with `/opengraph-image` in the route list, image rendered against `npx next start` and
  inspected, `og:*` and `twitter:*` tags confirmed in the production HTML with absolute
  `https://sohan16.com` URLs. Committed as `907f3e2`.

## 2026-08-06 — Work order 2 (Claude → Codex): honour prefers-reduced-motion

- Task: gate all three unconditional animations — `Reveal.tsx`, `scroll-behavior: smooth` on
  `<html>`, and the CommandPalette panel scale. Scope widened beyond the original queue item,
  which named only `Reveal.tsx`; honouring the setting in one of three places is not honouring
  it. Explicitly ruled out a blanket `!important` motion reset.
- Codex: all four files edited as specced. Sandbox still cannot launch processes, so it ran
  neither lint nor build.
- Review: `npm run lint` failed — `react-hooks/set-state-in-effect` on the `useState` +
  `useEffect` mirror of the media query. Correction sent: a media query is an external store,
  so use `useSyncExternalStore` with module-scope subscribe/snapshot functions and a
  `false` server snapshot.
- Round 2: landed. Verified by Claude — lint silent, build green, page loads with no console
  or hydration errors, production CSS bundle contains both `scroll-behavior:smooth` and the
  `prefers-reduced-motion:reduce` override.
- Caveat: the Reveal fade itself could not be exercised in-session. The browser pane was not
  compositing, so IntersectionObserver delivered zero callbacks (confirmed directly) and no
  Reveal ever transitioned. That path is code-reviewed, not runtime-verified — worth a manual
  look with the OS setting toggled.

## 2026-08-06 — Deploy

Both work orders pushed to `main` as `907f3e2` and `b277adb`. Vercel production deploy
`dpl_DVwyJNG` READY. Verified on https://sohan16.com — `og:image` and `twitter:image` resolve
to a 200 `image/png`, `twitter:card` is `summary_large_image`, and the shipped CSS contains the
`prefers-reduced-motion:reduce` override.

## 2026-08-06 — Work order 3 (Claude → Codex): certificate image through next/image

- Task: replace the raw `<img>` in the certificate modal with `next/image` and drop the
  `@next/next/no-img-element` disable, with intrinsic dimensions added to `portfolio.ts`.
  The spec explicitly ruled out compressing the source JPEG: the Download Certificate link
  serves the same path, so the original must stay full resolution.
- Codex: round 1 applied **nothing** — it assumed the interface contained
  `certificateFile?: string`, tried to anchor a patch on that line, and failed. The real
  declaration is `certificateFile: string | null`, and the work order had never quoted it.
- Review: correction sent quoting all four regions verbatim, with the instruction to read the
  file rather than guess at its contents.
- Round 2: landed exactly as specced. Verified by Claude — lint silent, build green, modal
  opens and renders through `/_next/image` with `loading="lazy"` and the full srcset ladder
  (640w–3840w) capped by `sizes` at 1024px. Measured off a production build: 487,381 B JPEG →
  46,554 B AVIF at 1080w, 33,695 B at 750w, 60,874 B WebP fallback. Download link still
  returns the original 487,381 B JPEG.
- Deployed as `365ed9d`, Vercel `dpl_AXabMRP` READY. Confirmed on https://sohan16.com:
  487,381 B JPEG → 42,758 B AVIF at 1080w, 25,792 B at 750w, 60,874 B WebP fallback.
- Note for future verification: polling the live domain in a tight `curl` loop tripped Vercel's
  bot mitigation (`X-Vercel-Mitigated: challenge`, HTTP 403 to that client). Real browsers were
  unaffected and no project setting was changed. Measure production through the browser, or
  poll the Vercel deployments API instead of hammering the domain.

## 2026-08-06 — Work order 4 (Claude → Codex): clipboard failure path

- Task: stop `Contact.tsx` claiming "Copied!" when the write never happened. Async handler,
  optional-chaining guard for the non-secure-context case, three-state button, and — because
  the point of the button is that someone walks away with the address — show the email as
  selectable text in an `aria-live` region when it fails. Every region quoted verbatim in the
  spec after last round's anchoring failure.
- Codex: landed in one round, matching the spec.
- Review: one cosmetic fix applied directly by Claude rather than spending a round trip — the
  failure paragraph had no bottom margin, leaving the social links cramped against it
  (`mb-6` added). Verified — lint silent, build green, and all three paths exercised in a
  production build: resolved write shows "Copied!" and writes the right address with no
  fallback; a rejected promise and a wholly undefined `navigator.clipboard` both show
  "Copy failed" plus the selectable address, with zero uncaught errors.
