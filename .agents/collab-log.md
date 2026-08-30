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

## 2026-08-06 — Accessibility and security pass (Claude audit → work orders 5 and 6)

- Audit by Claude against a production build, not by reading alone. Headline finding: at 375px
  the header exposed one usable control and no navigation at all — 7 links `display:none`,
  zero buttons, and "Press /" as the only hint. Also no skip link (WCAG 2.4.1, Level A), the
  command palette missing dialog semantics, 20×20 footer targets, and no focus styling in the
  Navbar. Security: no headers at all, and JSON-LD injected via `dangerouslySetInnerHTML`
  without escaping `<`.
- Owner chose a hamburger drawer over reusing the command palette for mobile nav.
- **WO5 (Claude → Codex):** drawer + skip link + focus styles + 44px footer targets +
  light-mode class removal. Codex landed it in one round. Review found one real defect: the
  focus trap collected focusables from the drawer only, so the visible "Close menu" button sat
  outside the cycle and was unreachable by keyboard (Escape still worked). Correction sent;
  round 2 fixed it.
- **WO6 (Claude → Codex):** security headers + JSON-LD escaping. One round, exactly as specced.
- Verified by Claude: lint silent, build green, `/` still statically prerendered with the 1h
  revalidate. At 375px — toggle 44×44, `role="dialog"` + `aria-modal` + accessible name, 7
  links ≥44px, focus into the drawer on open, Escape and backdrop both close and restore focus,
  scroll locks and unlocks, and after the fix Tab from the last link wraps to the toggle. At
  1280px the inline nav is back and the toggle is gone. Skip link is the first focusable and
  its target resolves. All five headers served; the same-origin resume PDF iframe still loads
  under `frame-ancestors 'self'`.
- Two verification notes worth keeping. First, checking the live JSON-LD only proved the
  current data is clean — it contains no `<` at all — so the escape was proven separately
  against a hostile `</script><img onerror=...>` payload: `</script>` gone, no raw `<`, value
  round-trips identically. Second, that test initially reported a false failure because shell
  quoting mangled the replacement string; running it from a file gave the true result. Prefer
  a file over `node -e` for anything containing backslashes.
- Deferred by decision, recorded in AGENTS.md: full CSP (needs a nonce → middleware → dynamic
  route) and the three npm advisories (owner does dependency bumps by hand).
- Deployed as `c396132`, Vercel `dpl_Afwkvcx` READY. Re-verified on https://sohan16.com at
  375px: toggle 44×44, drawer has dialog semantics and all 7 links, focus enters on open, Tab
  from the last link wraps to the toggle, Escape closes and restores focus, scroll unlocks.
  All five security headers served, `x-powered-by` absent.
- Optional hardening noted, not a defect: with the drawer open the background is still present
  in the accessibility tree. `aria-modal="true"` is set and the focus trap holds, which is the
  standard approach; adding `inert` to the background would be belt-and-braces for AT that
  ignores `aria-modal`.
- Also checked and cleared: the Hero's GitHub/LinkedIn links look unnamed in some tooling
  output but carry `<span class="sr-only">` labels. Not a finding.

## 2026-08-06 — Work order 7 (Claude → Codex): repo card descriptions

- Measured before speccing, which inverted the queue item's framing. It assumed longer
  descriptions get cut; in reality desktop truncated *nothing* (all four fit two lines in
  518px cards) while mobile truncated *everything* (40px shown of 60–80px). A mobile-only
  problem, and the `title` fix the item proposed is inert on a device with no hover.
- Task: make the clamp and fixed height `md:`-only so mobile shows full text and the desktop
  two-line grid alignment is preserved; add `title` for the desktop case; lift the
  `repo.description || "No description provided."` fallback into one const so the title and
  the body cannot drift.
- Codex: first run under GPT-5.6-Sol at `ultra`. Landed in one round, exactly as specced.
- Review: lint silent, build green, `/` still static. At 375px all four descriptions render
  in full (clientHeight === scrollHeight) and every `title` matches its rendered text exactly.
  At 1280px descriptions are still 40px two-line boxes, cards all 166px, and footers align in
  both grid rows.

## 2026-08-06 — next 16.2.7 → 16.3.0 (Claude, direct)

Not delegated: this is entirely install-and-verify, and Codex cannot spawn processes on this
machine. Done by hand per §1 — no bot, no automation.

- `next` and `eslint-config-next` bumped together to 16.3.0. package.json changed those two
  pins only; lockfile churn was 251/228 lines with no major version moves.
- Cleared the 3 original advisories (postcss ×3 → 8.5.23 deduped, sharp → 0.35.3). Two
  dev-only ones then surfaced that the earlier `--production` audit had hidden
  (`brace-expansion`, `js-yaml`); a plain `npm audit fix` cleared those, 3 dev packages
  changed. Both `npm audit` and `npm audit --omit=dev` now report 0.
- Regression pass against a production build: lint silent, build green, `/` static at 1h;
  §5 Suspense trap has NOT resurfaced (no `$RC(`, no `id="S:0"`, GitHubActivity server-side);
  headers intact; optimizer and OG image byte-identical to pre-upgrade (46,554 B / 38,263 B);
  drawer, skip link, clipboard failure path and repo descriptions all still behave; zero
  uncaught errors.

## 2026-08-06 — Work orders 8 & 9 (Claude → Codex): second audit

Codex switched to GPT-5.6-Terra at `ultra` for both.

- Audit first, by Claude, over the components the first pass never read — driving a production
  build rather than reading alone. Four confirmed defects: neither modal restored focus on
  close (activeElement became BODY), a Label-in-Name violation on `ViewResumeButton`, seven
  Projects links exposing only "Source Code"/"Live Demo", and 20×20 Hero social targets with a
  16px gap.
- One hypothesis was **wrong and dropped**: anchor jumps do put section tops behind the 65px
  fixed header, but section padding means headings still clear it (~46px desktop, 13px
  mobile). Recorded as polish, not the content-loss bug it looked like. Worth noting that
  reading alone would have shipped it as a defect.
- WO8 (modal focus + Label in Name) and WO9 (link names, targets, `scroll-mt-20`, 404 title):
  both landed in one round each.
- **Claude's error, two rounds to unwind.** WO9's 404 metadata produced two robots meta tags,
  so a correction was sent to drop the explicit `robots` key. That was wrong: without it the
  route inherits `index: true` from the root layout, and the served 404 then carried
  `noindex` and `index, follow` together — worse than the duplicate. Measured, reverted, and
  written into AGENTS.md as a trap so it is not "tidied" again.
- Verified after: lint silent, build green, `/` static; focus restored on all three close
  paths for both modals including from the second certificate trigger; 7 unique project link
  names all containing their visible text; Hero socials 44×44; `scroll-margin-top` 80px;
  404 returns HTTP 404 with consistent noindex and the homepage still `index, follow`; drawer,
  skip link, clipboard and repo descriptions all unregressed; zero unnamed controls; zero
  uncaught errors.

## 2026-08-09 — Work orders 10 & 11 (Claude → Codex): Technical Arsenal

- WO10, content: added Neon / Render / Cloudflare, removed Antigravity from `tools` and
  `aiDev`, added "Claude Code" and "OpenAI Codex" (full product names — bare "Claude" and
  "Codex" are ambiguous on a recruiter-facing page), and moved "Resend" out of the "AI & APIs"
  card into "Authentication & Integrations", where an email API belongs. Upstash and Resend
  were already present — checked before adding rather than duplicating.
- WO11, presentation: brand marks beside each chip via `react-icons/si`, already a dependency.
  No new package, no downloaded assets, no external URL — the CSP requires self-contained.
  Monochrome inheriting `currentColor` rather than brand colours, which §4 rules out. Map
  lives in `Skills.tsx` (presentation), keyed off the strings in `portfolio.ts` (content).
  31 of 49 chips get a mark; the other 18 are concepts and degrade to text-only by design.
- **Claude's error: a dependency bump that broke the build.** `SiNeon` does not exist in
  `react-icons@5.6.0`, so I bumped to 5.7.0 to get it. The build then failed with
  `Export SiOpenai doesn't exist` — 5.7.0 *removes* the OpenAI mark. The two are mutually
  exclusive from this source. Reverted to 5.6.0 and pinned it exactly; Neon stays text-only.
  Recorded in AGENTS.md so the bump is not retried.
- **Also caught: a bad verification command of mine.** I checked the build with
  `grep -E "Compiled successfully|Error" && echo BUILD OK`, which printed "BUILD OK" on a
  *failing* build because grep matched the word "Error". Check the exit code, not grep output.
- New Codex constraint: `codex exec resume` fails on sessions run at `ultra`
  (`direct app-server input is not allowed for multi-agent v2 sub-agents`) because ultra's
  automatic task delegation makes them multi-agent. Corrections must be self-contained fresh
  `codex exec` runs, not resumes.
- Follow-up (WO12): Neon got its mark after all, without the dependency bump. Its Simple Icons
  artwork is a single 85-character path, so it is inlined in `Skills.tsx` as `SiNeonLocal`
  typed `IconType`. Claude reached for a version bump first and only considered embedding the
  path when challenged — worth remembering as the cheaper move for any brand react-icons lacks.
- Verified: lint silent, build exit 0, `/` static. 49 chips, 32 with marks, icons 14×14
  inheriting the chip colour and `aria-hidden` so nothing is announced twice; both OpenAI
  chips have marks; Neon and pgvector text-only; `grep Antigravity src/` returns nothing.

## 2026-08-09 — Work order 13 (Claude → Codex): brand colour on hover

- Owner asked why the marks were monochrome. The answer had a hard component, not just taste:
  measured against `#0B0F14`, ten brand colours fall below 1.6:1 contrast — Vercel, Next.js,
  Render, Resend (#000000), Railway (#0B0D0E), GitHub (#181717), Java, Express, Prisma, and
  OpenAI. Straight brand colours would have made a third of the marks invisible.
- Owner chose: monochrome at rest, brand colour on hover. The ten dark brands map to
  `var(--foreground)`, which is what those companies themselves ship as their dark-background
  variant.
- Implemented as a `--brand` custom property per chip plus `group-hover:text-[var(--brand)]`.
  The spec explicitly forbade interpolating the hex into the class name — Tailwind scans
  statically and would have generated nothing, failing silently with no error anywhere.
- Verified on a production build: Tailwind emitted
  `.group-hover\:text-\[var\(--brand\)\]:is(:where(.group):hover *) { color: var(--brand) }`
  inside `@media (hover: hover)`, so touch devices get no stuck colour. All 32 marks share one
  colour at rest (the muted tone); `--brand` resolves to `#F38020` on Cloudflare, `#34D59A` on
  Neon, `#D97757` on Claude Code, `#dae2fd` on Vercel/GitHub/OpenAI Codex; SQL and pgvector
  carry no `--brand` at all. Lint silent, build exit 0.

## 2026-08-30 — Work order 28 (Claude → Codex): Aspirova technical overview PDF

- Owner supplied a 17-page field guide for Aspirova and asked for a view/download option on the
  project. Read the whole PDF before committing it — no credentials, no connection strings, no
  third-party personal data. Public hostnames only.
- Spec deliberately forbade a second modal. The resume viewer already had a focus trap, focus
  restore, backdrop close and a scroll lock, all fixed and verified in the accessibility audit;
  a copy would have been a third implementation to keep in sync. Codex extracted it into
  `PdfViewerButton` and reduced `ViewResumeButton` to a wrapper, preserving its two call sites
  and its audited accessible names byte for byte.
- Claude's spec error: it typed the `icon` prop as `React.ComponentType`. That builds on the
  home page and fails at prerender on the project detail page, which is a server component.
  Fixed by passing the element instead. Recorded in AGENTS.md so it is not reintroduced.
- Codex output also carried a stray `export default` (this codebase is named exports) and a
  props-spread to conditionally set `aria-label`, where React already drops `undefined`
  attributes. Both simplified.
- Verified against a production build, not dev: lint silent, build exit 0, all four project
  pages still SSG and `/` still 1h. PDF served `application/pdf`, 46,054 bytes, byte count
  matching source. Exactly one control on the home page and one on `/projects/aspirova`; the
  other three projects unchanged. Dialog has `role="dialog"`, `aria-modal`, a `useId` heading
  id, scroll lock, and Escape restores focus to the trigger. At 375px the row wraps with 24px
  gaps in both axes, so the 20px targets keep the same 2.5.8 spacing exception as their
  siblings.

