# Animation improvement plans

| Number | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Turn the EHR workflow review into an editorial discovery stage | MEDIUM | TODO |
| 002 | Choreograph the trusted-partner introduction | MEDIUM | DONE |
| 003 | Clarify the homepage flow with purposeful motion | MEDIUM | DONE |
| 004 | Deepen motion across the annotated workflow sections | MEDIUM | DONE |
| 005 | Modernize homepage CTA and card motion | MEDIUM | DONE |
| 006 | Replace the header CTA hover with a directional brand fill | MEDIUM | DONE |

## Recommended execution order

1. Execute `001-redesign-ehr-workflow-review.md`.
2. Execute `002-partner-intro-motion.md`.
3. Execute `003-homepage-flow-motion.md`.
4. `004-deepen-section-motion.md` — DONE.
5. `005-modern-homepage-cta-and-card-motion.md` — DONE.
6. `006-replace-header-cta-hover.md` — DONE; it supersedes only the header CTA treatment from Plan 005.

## Dependencies

- Plan 001 has no package dependency and must reuse the existing `MotionReveal` observer and Next.js `Image` component.
- The plan is stamped against commit `d7a6923`; verify repository drift before execution.
- Plan 002 reuses the homepage `[data-reveal]` observer and must not add a motion dependency.
- Plan 005 is a CSS-only homepage polish pass and must preserve reduced-motion behavior.
- Plan 006 is a CSS-only replacement for the rejected Plan 005 header CTA hover; it must not alter any other motion from Plan 005.
