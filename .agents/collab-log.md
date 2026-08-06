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
