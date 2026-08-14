# 004 — Deepen motion across the annotated workflow sections

- **Status**: DONE
- **Commit**: d7a6923
- **Severity**: MEDIUM
- **Category**: Purpose, cohesion, and accessibility
- **Estimated scope**: 1 file, approximately 120–180 lines changed

## Problem

The process rail, outsourcing panel, and EHR cards have correct final layouts but their existing entrance offsets are too subtle to read as intentional choreography. The EHR feature card also relies on `justify-content: flex-end` plus `margin-bottom: auto`, which makes its vertical rhythm dependent on card height.

```css
/* app/current-polish.css:1751-1762 — current */
.process-journey-node {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1), transform 450ms cubic-bezier(0.23, 1, 0.32, 1);
}
```

```css
/* app/current-polish.css:1903-1912 — current */
.home-ehr-feature-card {
  display: flex;
  min-height: 430px;
  flex-direction: column;
  justify-content: flex-end;
}
```

## Target

- Process rail: one-shot line reveal over 650ms; nodes enter with opacity plus `translateY(20px) scale(.94)` and 60ms stagger. Cards retain 50ms stagger. Hover-capable pointers receive a 180–220ms icon/node scale response; no continuous animation.
- Human benefits: use 18–20px content gaps and 11px accordion gaps. Eyebrow, heading, paragraph, and list keep the existing 60ms hierarchy. Open/hover states use short transform transitions only; focus remains visible and unchanged.
- EHR heading: eyebrow, heading, and paragraph enter separately with 60ms stagger.
- EHR feature card: explicit top-to-bottom spacing; mark, eyebrow, heading, paragraph, and tags enter with 60ms stagger using opacity plus `translateY(16px)`.
- EHR platform cards: odd cards enter from `translateX(-18px)`, even cards from `translateX(18px)`, with 40ms stagger; logo scales to 1.06 on pointer hover over 180ms.
- All entry motion uses `cubic-bezier(0.23, 1, 0.32, 1)`. UI hover feedback remains below 300ms.
- Under `prefers-reduced-motion: reduce`, remove transforms and delays; retain 200ms opacity transitions and static hover feedback.

## Repo conventions to follow

- Reuse `.motion-enabled`, `[data-reveal]`, and `.is-visible`; do not add JavaScript, observers, dependencies, or timers.
- Use precomputed delay custom properties already emitted by `app/page.tsx`.
- Animate only `transform` and `opacity`; border-color changes may use a short non-layout transition.

## Steps

1. Extend `app/current-polish.css` with a final scoped cascade block for process rail/card motion.
2. Increase human-benefit spacing and add hover/open transform feedback gated by pointer capability.
3. Override the EHR shell's generic block reveal so heading, feature-card children, and individual platform cards own the sequence.
4. Replace height-dependent EHR feature alignment with explicit spacing and consistent left alignment.
5. Add mobile spacing reductions and a reduced-motion final-state override.

## Boundaries

- Do NOT change copy, markup, section order, images, platform names, or accordion behavior.
- Do NOT introduce infinite decorative animation.
- Do NOT animate layout properties or use `transition: all`.
- Do NOT touch sections outside `#process`, `#human-accountability`, and `.home-ehr-section`.

## Verification

- **Mechanical**: run `npm run lint`, `npm test`, and `npm run build`; expect zero errors and all nine rendered-HTML tests to pass.
- **Feel check**: at 1525px, reload before each section and confirm the rail, benefits hierarchy, and EHR elements enter in reading order.
- Hover process cards, accordion summaries, and EHR cards; feedback must be subtle, immediate, and must not shift neighboring layout.
- At 390px and 375px, confirm spacing reflows without clipping or horizontal overflow.
- Toggle `prefers-reduced-motion`; all translation, scale, and stagger must disappear while content remains visible.
- **Done when**: each annotated section visibly communicates sequence or hierarchy without looping decorative motion.
