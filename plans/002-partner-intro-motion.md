# 002 — Choreograph the trusted-partner introduction

- **Status**: DONE
- **Commit**: d7a6923
- **Severity**: MEDIUM
- **Category**: Purpose, cohesion, and accessibility
- **Estimated scope**: 2 files, approximately 90–130 lines changed

## Problem

The trusted-partner section currently uses the global reveal as two unrelated blocks. The copy and image enter with the same generic movement, while the photograph remains a plain rounded rectangle.

```tsx
/* app/page.tsx:645-664 — current */
<div className="container partner-intro-layout">
  <div className="partner-intro-copy" data-reveal>...</div>
  <figure className="partner-intro-visual" data-reveal>
    <Image src="/media/services/01-revenue-cycle-management-4k.jpg" ... />
  </figure>
</div>
```

The winning section CSS only scales the image on hover:

```css
/* app/current-polish.css:985-992 — current */
.home-refinement .partner-intro-visual img {
  object-fit: cover;
  object-position: 57% center;
  transition: transform .7s cubic-bezier(.2, .8, .2, 1);
}
.home-refinement .partner-intro-visual:hover img { transform: scale(1.025); }
```

## Target

Create a low-cost editorial reveal that explains hierarchy without delaying interaction:

- Copy enters with `opacity` and `translateY(18px)`.
- The image stage enters from `translateX(24px) scale(.97)`.
- Decorative frame and two information badges use a 60ms stagger.
- Use `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- Marketing reveal durations may be 500–650ms; hover feedback stays under 300ms.
- Animate only `transform` and `opacity`.
- Gate hover transforms behind `@media (hover: hover) and (pointer: fine)`.
- Under `prefers-reduced-motion: reduce`, keep a 200ms opacity transition and remove position/scale changes and delays.

## Repo conventions to follow

- Reuse the existing one-shot `[data-reveal]` IntersectionObserver in `app/page.tsx`; do not add another observer or dependency.
- Keep the existing Next.js `<Image fill>` implementation and supplied image.
- Extend selectors in `app/current-polish.css`, which currently wins this section's cascade.

## Steps

1. In `app/page.tsx`, add semantic decorative layers and short factual badges inside `.partner-intro-visual`; keep the approved image and alt text.
2. In `app/current-polish.css`, turn the figure into an asymmetric editorial image stage using a rear frame, foreground crop, and two overlay badges.
3. Add section-specific initial/visible states tied to the existing `.motion-enabled` and `.is-visible` classes.
4. Add tablet/mobile reflow so badges stay within the image boundary and no horizontal overflow occurs.
5. Add reduced-motion and pointer-capability media queries.

## Boundaries

- Do NOT change the approved partner heading or body copy.
- Do NOT change any section outside `#revenue-problem`.
- Do NOT add packages, observers, timers, autoplay, or continuous animation.
- Do NOT animate layout, filter, blur, shadow, width, height, top, or left.

## Verification

- **Mechanical**: run `npm run lint`, `npm run build`, and `npm test`; expect no errors and all rendered-HTML tests to pass.
- **Feel check**: at desktop width, scroll the section into view and confirm copy leads, image follows, and badges settle last without blocking reading.
- At 10% playback, confirm there is no bounce, overshoot, layout shift, or simultaneous wall of motion.
- At 390px, confirm the image stage and badges remain inside the viewport.
- With reduced motion enabled, confirm movement and stagger disappear while content remains visible.
- **Done when**: desktop/mobile show the layered composition, the page has no horizontal overflow, and browser console/error overlay checks are clean.
