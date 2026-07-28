# Design history

Major visual states are recorded as named Git commits so earlier client-approved
directions can be restored without recreating them.

## Preserved revisions

| Git revision | Design state |
| --- | --- |
| `9fd30c3` | Human story with left negative-space composition |
| `2f4b301` | Human story with full-center composition |
| `191f771` | Human story with center-to-left scroll reveal |
| `22f639c` | Animated operational proof rail |

## Current visual direction

- Centered video-led hero with a free billing audit CTA
- Large dropdown navigation and glass treatments
- Specialty streams with continuous motion and hover gradients
- Human accountability story with a cinematic scroll transition
- Dark operational proof rail with connected metric motion
- Large trust-oriented footer

## Restoring an earlier state

Prefer restoring only the affected section instead of reverting unrelated newer
work. Inspect the target revision, recover the relevant source lines, validate
the complete homepage, and create a new commit explaining the restoration.

Do not rewrite shared history after a revision has been pushed to GitHub.
