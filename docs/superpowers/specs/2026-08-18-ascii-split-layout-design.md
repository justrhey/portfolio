# ASCII Split-Screen Layout — Design

**Date:** 2026-08-18
**Goal:** Rebuild the portfolio landing into a split-screen jumbotron inspired by
contentarchitecture.dev — a scrolling content column on the left, a fixed
full-height ASCII animation on the right. The ASCII is the existing `bg.mp4`
rendered live as monochrome ASCII characters, scrubbed by scroll.

## Decisions (locked)

- **Layout:** two halves. Left ~55% = scrolling content. Right ~45% = fixed ASCII.
- **ASCII source:** existing `public/bg.mp4`, rendered to characters (no new assets).
- **Motion:** scrubs through video frames as the left column scrolls (reuses the
  current scroll→`currentTime` lerp). Not an independent loop.
- **Nav:** the 244px left sidebar is removed and replaced by a compact floating
  nav pill at the top of the content column. Nav items carry over from `data.js`.
- **Palette:** grayscale, `--ink` (#e2e2e2) on near-black — matches existing tokens.
- **Mobile (<900px):** no split. ASCII becomes a dim, fixed, full-screen backdrop;
  content stacks and scrolls on top of it.
- **Reduced motion:** render a single static ASCII frame, no rAF loop.

## Components

### `AsciiBackdrop.jsx` (rewrite of `BackgroundVideo.jsx`)
Renders the video as ASCII. Responsibilities:
- Hidden `<video>` (offscreen) = pixel source. Muted, playsInline, preload=auto.
  Never visible, never auto-plays; frame set via `currentTime`.
- Hidden small `<canvas>` (~160×90) = downscaled sampler; reads luminance per cell
  with `getImageData`.
- Visible `<canvas>` (or `<pre>`) = ASCII output. Each cell's luminance maps to a
  char from the ramp `" .:-=+*#%@"` (dark→light), drawn in `--ink` monospace.
- Scroll→time mapping: keep the existing `progress()` + rAF lerp (factor 0.045).
  Only repaint ASCII when the rendered frame actually changes (guard on `currentTime`).
- Placement is controlled by CSS, not the component: on desktop it's the fixed
  right half; on mobile it's a dim fixed full backdrop. Same component either way.

**Decision — canvas vs `<pre>`:** use a `<canvas>` for the ASCII output (drawText
per cell). Reason: ~14k DOM text nodes in a `<pre>` re-rendered on scroll is a perf
risk on mobile; canvas repaint is cheap and we already gate on frame change.

### `NavPill.jsx` (new)
Floating nav bar replacing `Sidebar.jsx` on desktop. Contains the nav links from
`navItems` (and profile link). Fixed/sticky at the top of the content column.
Sidebar's mobile drawer behavior is preserved via the pill collapsing to a menu
button below 900px (reuse existing `mobile-menu-btn` + drawer, or a simple
horizontal scroll of links — see Open items).

### `Layout.jsx` (edit)
New structure:
```
<AsciiBackdrop />              // fixed right half (desktop) / full backdrop (mobile)
<div class="split">
  <div class="content-col">    // left, scrolls
    <NavPill />
    <Outlet />
  </div>
</div>
```
The `.ascii-right` fixed panel sits under the content via `z-index`; on desktop the
content column is constrained to the left ~55% so the fixed ASCII on the right is
never covered.

### `Home.jsx` / pages (minor)
No structural change to page content — it just now lives inside the narrower left
column. Verify Projects grid, timeline, GithubContrib, Contact reflow at ~55% width.

## CSS changes (`index.css`)
- Replace `.bg-video` rules with `.ascii-right` (fixed, right 0, width ~45vw,
  100vh) and `.ascii-backdrop--mobile` (fixed inset 0, dimmed) via media query.
- Add `.split` / `.content-col` (max-width ~55vw on desktop, full on mobile).
- Remove/retire `.sidebar` layout rules made dead by dropping the sidebar (only
  those our change orphans; leave unrelated dead CSS alone).
- Add `.nav-pill` styles.

## Data flow
`scroll position → progress(0..1) → video.currentTime → sampler canvas →
luminance grid → ASCII canvas`. One-directional, no state store. The lerp makes
motion drift smoothly instead of snapping.

## Error handling / fallbacks
- Video fails to load → ASCII canvas stays blank (near-black); content unaffected.
- `prefers-reduced-motion` → seek once to progress, render one frame, skip rAF.
- Very small viewport → mobile backdrop path.

## Success criteria
1. Desktop: left column scrolls, right ASCII panel is visually fixed and legibly
   renders bg.mp4 as characters that change as you scroll.
2. Nav pill navigates between pages; sidebar is gone.
3. Mobile: content stacks over a dim ASCII backdrop; no horizontal overflow.
4. Reduced-motion: static frame, no continuous rAF.
5. No jank on scroll (repaint gated on frame change).

## Open items (resolve during implementation)
- Mobile nav: collapse pill to existing drawer vs. horizontal-scroll link row.
  Default: reuse the existing menu-button drawer to minimize new code.
- Exact split ratio (55/45) tuned visually.
- ASCII grid resolution tuned for legibility vs. perf (start 160×90).
