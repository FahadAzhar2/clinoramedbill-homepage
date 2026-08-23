# 005 — Modernize homepage CTA and card motion

- **Status**: DONE
- **Commit**: 0b3ecdc
- **Severity**: MEDIUM
- **Category**: Easing, duration, physicality, accessibility
- **Estimated scope**: 1 CSS file, small targeted override

## Problem

Three homepage areas need more deliberate motion without making a healthcare-services site feel playful or distracting.

`app/august-client-revisions.css:34-56` currently uses a long 560ms diagonal sheen on the header CTA and only translates its arrow:

```css
.header-cta::before {
  transform: skewX(-20deg) translateX(-180%);
  transition: transform 560ms cubic-bezier(.22, 1, .36, 1);
}

.header-cta:hover::before,
.header-cta:focus-visible::before {
  transform: skewX(-20deg) translateX(620%);
}
```

The EHR platform cards in `app/page.tsx:939-950` expose `.home-ehr-platform-card`, but the current homepage override provides no hover/focus motion for the card, logo, or label.

The consultation panel at `app/august-client-revisions.css:338-350` is visually static even though it is a rare conversion moment where a restrained highlight is appropriate.

## Target

Implement CSS-only, interruptible motion using transform, opacity, background, border-color, and box-shadow. Do not add a dependency.

1. Header CTA: replace the diagonal sweep with a modern radial highlight and a subtle 2px lift. Use `240ms cubic-bezier(0.23, 1, 0.32, 1)`. Keep arrow translation at 3px. Add `:active { transform: scale(.97); }` with `140ms cubic-bezier(0.23, 1, 0.32, 1)`.
2. EHR cards: on hover/focus-within, translate card `-4px`, raise the shadow, change border color, and translate the logo `-3px` while scaling it to `1.05`. Use `250ms cubic-bezier(0.23, 1, 0.32, 1)`. Do not create an infinite animation.
3. Consultation shell: add a soft brand-color glow pseudo-element whose opacity and scale transition on hover/focus-within. The shell itself may lift at most 3px. Use `280ms cubic-bezier(0.23, 1, 0.32, 1)`.
4. Gate hover transforms behind `@media (hover: hover) and (pointer: fine)`.
5. Under `@media (prefers-reduced-motion: reduce)`, remove CTA/card/panel movement while retaining color, border, and opacity feedback.

## Repo conventions to follow

- Place this targeted revision in `app/august-client-revisions.css`, which is already imported last from `app/layout.tsx`.
- Reuse the repo's strong ease-out exemplar from `app/current-polish.css:287`: `cubic-bezier(0.23, 1, 0.32, 1)`.
- Keep all new selectors scoped to `.header-cta`, `.home-refinement .home-ehr-platform-card`, and `.consultation-cta-shell`.

## Steps

1. Replace the current `.header-cta::before` sweep with a radial brand highlight and add explicit transform/background/box-shadow transitions to `.header-cta`.
2. Add hover-capable-device hover/focus-visible and active states for the CTA.
3. Add EHR card and nested logo wrapper transitions plus hover/focus-within states.
4. Add an isolated pseudo-element glow and lift state to `.consultation-cta-shell` without obscuring its content.
5. Extend the existing reduced-motion media query so all new movement is disabled and no infinite animation remains.

## Boundaries

- Do NOT change component markup or text.
- Do NOT change typography, spacing, section height, brand colors, or card alignment.
- Do NOT add JavaScript, GSAP, Framer Motion, timers, or dependencies.
- Do NOT touch files other than `app/august-client-revisions.css` and this plan/status index.
- If selectors no longer match the cited code, STOP and report instead of improvising.

## Verification

- **Mechanical**: run `npm run lint && npm test`; expect zero errors and all tests passing. The known Next `<img>` lint warning in `app/ehr-software/page.tsx` is outside scope.
- **Feel check**: at desktop width, hover and rapidly unhover the header CTA, EHR cards, and consultation shell. Confirm transitions reverse from their current state with no restart or snap. Confirm the CTA press feedback is subtle and the panel never shifts more than 3px.
- **Reduced motion**: emulate `prefers-reduced-motion: reduce`; confirm translations/scales are removed while color/border/opacity feedback remains.
- **Done when**: all three areas have coherent brand-safe motion, no layout property animates, touch layouts do not receive sticky hover movement, and reduced-motion users receive no position movement.
