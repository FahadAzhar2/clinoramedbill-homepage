# 003 — Clarify the homepage flow with purposeful motion

- **Status**: DONE
- **Commit**: d7a6923
- **Severity**: MEDIUM
- **Category**: Purpose, cohesion, and accessibility
- **Estimated scope**: 2 files, approximately 180–260 lines changed

## Problem

The partner title already participates in a generic child reveal, but it has no distinctive completion cue:

```css
/* app/current-polish.css:150-166 — current */
.home-refinement .partner-intro-copy > * {
  opacity: 0;
  transform: translateY(18px);
  transition-duration: 500ms;
}
.home-refinement .partner-intro-copy > :nth-child(2) { transition-delay: 60ms; }
```

The six revenue-cycle cards are visually independent, so their ordered relationship is not obvious:

```tsx
/* app/page.tsx:720-732 — current */
<ol className="container process-simple-timeline" aria-label="Revenue cycle stages">
  {process.map((step, index) => (
    <li key={step.title} data-reveal>...</li>
  ))}
</ol>
```

The outsourcing-benefits content appears as one block when scroll progress crosses its threshold. Its eyebrow, title, description, and accordion lack a readable entrance hierarchy.

## Target

- Partner title: retain the existing `translateY(18px)` and opacity entrance, then reveal a short accent rule using `scaleX`; duration 500ms, `cubic-bezier(0.23, 1, 0.32, 1)`, delayed 140ms.
- Process: add a six-node visual track whose line grows with `scaleX` over 650ms; nodes enter with 50ms stagger. Cards retain semantic `<ol>/<li>` order and enter with 50ms stagger.
- Human benefits: toggle one CSS state class from the existing scroll-progress function. Eyebrow, heading, description, and list enter with opacity plus `translateY(16px)` over 450ms with 60ms stagger. Accordion rows use 40ms stagger.
- EHR platform cards: opacity plus `translateY(14px)` over 450ms with 40ms stagger.
- Animate only `transform` and `opacity`; hover feedback stays under 300ms and only runs inside `@media (hover: hover) and (pointer: fine)`.
- Under `prefers-reduced-motion: reduce`, remove translation, scale, and stagger; retain a 200ms opacity transition.

## Repo conventions to follow

- Reuse the homepage `[data-reveal]` IntersectionObserver and its `.is-visible` state in `app/page.tsx`; do not add a new observer or dependency.
- Use the existing strong ease-out curve already established in `app/current-polish.css`: `cubic-bezier(0.23, 1, 0.32, 1)`.
- Keep the process as an ordered list so screen-reader order matches visual order.

## Steps

1. In `app/page.tsx`, add an aria-hidden six-node process track before the ordered cards.
2. In the existing `applyHumanProgress` function, toggle `is-revealed` on `.human-benefits-story` at the same threshold used to enable pointer interaction.
3. Add precomputed `--process-delay`, `--benefit-delay`, and `--ehr-delay` time custom properties only for fixed transition delays; do not drive continuous transforms through parent CSS variables.
4. In `app/current-polish.css`, add the partner title rule, process-track growth, card stagger, benefits hierarchy, and EHR card stagger.
5. Gate hover transforms behind pointer-capability queries and add a reduced-motion final-state override.

## Boundaries

- Do NOT add GSAP, Framer Motion, another observer, timers, autoplay, or continuous decorative animation.
- Do NOT animate width, height, margin, padding, top, left, filter, or box-shadow.
- Do NOT change approved copy.
- Do NOT change sections beyond the annotated partner, process, human-benefits, EHR, and service-card areas.

## Verification

- **Mechanical**: run `npm run lint`, `npm test`, and `npm run build`; expect zero errors and all rendered-HTML tests to pass.
- **Feel check**: at 1525px, scroll each annotated section into view and confirm the partner title leads, process line explains sequence, and benefits/EHR content settles in reading order without blocking interaction.
- At 10% playback, confirm no bounce, overshoot, layout shift, or simultaneous wall of motion.
- At 390px and 375px, confirm the process track reflows vertically and no content exceeds the viewport.
- Toggle `prefers-reduced-motion`; movement and stagger must disappear while all content remains readable.
- **Done when**: motion communicates hierarchy and sequence, remains interruptible, and does not introduce horizontal overflow.
