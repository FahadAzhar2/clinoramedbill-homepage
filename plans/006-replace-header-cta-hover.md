# 006 — Replace the header CTA hover with a directional brand fill

- **Status**: DONE
- **Commit**: 0b3ecdc
- **Severity**: MEDIUM
- **Category**: Easing and duration
- **Estimated scope**: 1 CSS file, about 35 lines

## Problem

The homepage header CTA currently uses a radial white glow that expands from the center. The client explicitly rejected this hover treatment and requested a new effect. The current implementation is in `app/august-client-revisions.css:28` and `app/august-client-revisions.css:35`:

```css
.header-cta {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  transition: transform 240ms cubic-bezier(0.23, 1, 0.32, 1), background-color 240ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 240ms cubic-bezier(0.23, 1, 0.32, 1);
}

.header-cta::before {
  position: absolute;
  z-index: 0;
  inset: -70%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0) 58%);
  content: "";
  opacity: 0;
  pointer-events: none;
  transform: scale(0.46);
  transition: opacity 240ms cubic-bezier(0.23, 1, 0.32, 1), transform 240ms cubic-bezier(0.23, 1, 0.32, 1);
}
```

The pointer hover at `app/august-client-revisions.css:531` currently expands that radial layer:

```css
.header-cta:hover::before {
  opacity: 1;
  transform: scale(1);
}
```

## Target

Replace the rejected radial glow with a directional full-surface brand fill that travels from right to left. It must feel crisp and professional, use only transform/opacity for the moving layer, remain under 300ms, preserve keyboard feedback, and keep touch interactions independent of hover.

```css
.header-cta {
  transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 220ms cubic-bezier(0.23, 1, 0.32, 1);
}

.header-cta::before {
  position: absolute;
  z-index: 0;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, #153c53, #247f82);
  content: "";
  opacity: 0;
  pointer-events: none;
  transform: translateX(104%);
  transition: opacity 220ms cubic-bezier(0.23, 1, 0.32, 1), transform 220ms cubic-bezier(0.23, 1, 0.32, 1);
}
```

On `:hover` inside the existing fine-pointer media query, and on `:focus-visible`, set `opacity: 1` and `transform: translateX(0)`. Keep the existing arrow translation, change the CTA lift to `translateY(-1px)`, and keep the existing `scale(0.97)` active feedback at 140ms.

## Repo conventions to follow

- Scoped homepage revision motion lives in `app/august-client-revisions.css`.
- The file already uses `cubic-bezier(0.23, 1, 0.32, 1)` for crisp UI ease-out motion.
- Fine-pointer hover rules belong in the existing `@media (hover: hover) and (pointer: fine)` block.
- The existing `@media (prefers-reduced-motion: reduce)` block must keep positional movement disabled while allowing opacity/color feedback.

## Steps

1. In `app/august-client-revisions.css`, replace the radial `.header-cta::before` geometry/background with the full-surface brand gradient and right-to-left transform specified above.
2. Change `.header-cta` and its child SVG transition durations from 240ms to 220ms.
3. Change `:focus-visible::before` and fine-pointer `:hover::before` to `opacity: 1; transform: translateX(0);`.
4. Change the hover/focus lift from `translateY(-2px)` to `translateY(-1px)`, preserving the arrow’s `translateX(3px)` and active `scale(0.97)` feedback.
5. In the reduced-motion block, keep `transition-property: opacity` on the pseudo-element and keep all movement transforms forced to none.

## Boundaries

- Do NOT modify markup, CTA copy, links, dimensions, or global button styles.
- Do NOT change EHR card hover motion, consultation CTA motion, or any other animation.
- Do NOT add dependencies.
- If the cited selectors no longer exist, STOP and report drift instead of improvising.

## Verification

- **Mechanical**: run `npm test` and expect all tests to pass; run `npm run build` and expect a successful production build.
- **Feel check**: load `http://localhost:3001/` at desktop width, hover “Talk to an expert,” and confirm:
  - a navy-to-teal surface travels from the right edge and fully covers the original teal face;
  - the CTA lifts only 1px and the arrow shifts 3px right;
  - moving the pointer in and out rapidly retargets smoothly without restarting a keyframe;
  - keyboard focus exposes the same branded fill and a visible focus outline remains;
  - with reduced motion enabled, the directional movement is removed while the color/opacity feedback remains.
- **Done when**: the previous radial white glow is absent, the new directional brand fill is observable on desktop hover and keyboard focus, and test/build verification pass.
