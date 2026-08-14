# 001 — Turn the EHR workflow review into an editorial discovery stage

- **Status**: TODO
- **Commit**: d7a6923
- **Severity**: MEDIUM
- **Category**: Scroll choreography and interaction choreography
- **Estimated scope**: 3 files, approximately 120–170 lines changed

## Problem

The final EHR call-to-action is a static, equal-weight two-column card. The photograph and copy compete instead of forming one visual story, the current layout does not explain what will be reviewed, and there is no purposeful reveal sequence to guide the eye from context to action. This makes the section feel like a generic banner after a highly structured software directory.

`app/ehr-software/page.tsx:83` currently compresses the whole section into a single line and exposes only copy, one link, and one image:

```tsx
/* app/ehr-software/page.tsx:83 — current */
<section id="workflow-review" className="section ehr-cta-section"><div className="container ehr-cta-shell"><div><span className="eyebrow eyebrow-light">Already using another platform?</span><h2>Let’s review your current workflow.</h2><p>This directory is representative, not exhaustive. We’ll confirm how your EHR, practice-management system, clearinghouse, and billing workflow can connect during discovery.</p><a className="button button-light" href="mailto:info@clinoramedbill.com">Discuss your software <ArrowRight aria-hidden="true" size={18} /></a></div><figure><Image src="/media/medical-billing-workflow-4k.jpg" alt="Healthcare operations team reviewing a connected billing workflow together" fill sizes="(max-width: 760px) 100vw, 42vw" quality={92} /></figure></div></section>
```

The base CSS gives the two halves nearly identical weight and contains no section-specific motion:

```css
/* app/annotation-pass.css:239-254 — current */
.ehr-cta-section { padding-block: 88px; background: #f2f8f8; }
.ehr-cta-section .ehr-cta-shell {
  display: grid;
  min-height: 430px;
  padding: 24px;
  gap: 24px;
  border-radius: 28px;
  background: #092d40;
  box-shadow: 0 28px 70px rgba(7,37,51,.18);
  grid-template-columns: 1.05fr .95fr;
}
.ehr-cta-shell > div { align-self: center; padding: 36px; }
.ehr-cta-shell h2 { max-width: 600px; }
.ehr-cta-shell p { max-width: 620px; margin-bottom: 26px; }
.ehr-cta-shell figure { position: relative; min-height: 380px; overflow: hidden; margin: 0; border-radius: 22px; }
.ehr-cta-shell figure img { object-fit: cover; }
```

The image crop is also overridden in two later stylesheets, which makes future tuning easy to miss:

```css
/* app/redesign-pass.css:81-88 — current */
.ehr-page .ehr-cta-shell figure {
  min-height: 420px;
  background: #071f31;
}
.ehr-page .ehr-cta-shell figure img {
  object-fit: cover;
  object-position: 50% 54%;
}

/* app/current-polish.css:173-175 — current and winning */
.ehr-page .ehr-cta-shell figure img {
  object-position: center 46%;
}
```

## Target

Create one integrated editorial “workflow discovery” stage, using the existing ClinoraMedBill colors, font, image, copy, mail link, radii, and shadow language.

### Layout

- Keep `section#workflow-review` and its existing anchor behavior.
- Keep `/media/medical-billing-workflow-4k.jpg`; do not generate or source a new image.
- Make the shell a single 12-column composition at desktop rather than two boxed halves.
- Place the photograph as an absolute visual layer covering the right 58% of the shell. Use `object-fit: cover` and `object-position: 58% 46%` so the healthcare team remains visible.
- Place a deep-navy content surface across columns 1–7. It must blend into the photograph with this horizontal shade: `linear-gradient(90deg, #092d40 0%, rgba(9,45,64,.98) 58%, rgba(9,45,64,.72) 78%, rgba(9,45,64,0) 100%)`.
- Shell desktop values: `min-height: 520px`, `padding: 52px`, `border-radius: 28px`, `overflow: hidden`, `isolation: isolate`.
- Content maximum width: `600px`.
- Keep the eyebrow, heading, paragraph, and existing button copy.
- Add a semantic three-item review rail under the paragraph and before the CTA:
  1. `EHR system`
  2. `Clearinghouse`
  3. `Billing workflow`
- Render the rail as a `ul` with three `li` elements. Each item uses a `CheckCircle2` icon, not numbered marketing claims. Connect them visually with one decorative line on desktop only; the line is `aria-hidden="true"`.
- On tablet (`max-width: 1199px`), keep the integrated image but increase the shade to cover 68% and cap text at 56% of the shell.
- On mobile (`max-width: 767px`), switch to a stacked card: image first with `aspect-ratio: 16 / 10`, copy second on solid `#092d40`, no overlay text on the image, shell padding `0`, and content padding `28px 22px 30px`. Stack the review rail vertically with no connector line.

Suggested markup target:

```tsx
<section id="workflow-review" className="section ehr-cta-section">
  <div className="container ehr-cta-shell" data-motion>
    <figure className="ehr-cta-visual" data-ehr-cta-motion="image">
      <Image
        src="/media/medical-billing-workflow-4k.jpg"
        alt="Healthcare operations team reviewing a connected billing workflow together"
        fill
        sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1199px) 62vw, 58vw"
        quality={92}
      />
    </figure>
    <div className="ehr-cta-shade" aria-hidden="true" />
    <div className="ehr-cta-content" data-ehr-cta-motion="content">
      <span className="eyebrow eyebrow-light">Already using another platform?</span>
      <h2>Let’s review your current workflow.</h2>
      <p>This directory is representative, not exhaustive. We’ll confirm how your EHR, practice-management system, clearinghouse, and billing workflow can connect during discovery.</p>
      <ul className="ehr-cta-review-list" aria-label="Workflow areas reviewed">
        {["EHR system", "Clearinghouse", "Billing workflow"].map((item, index) => (
          <li key={item} style={{ "--ehr-cta-order": index } as React.CSSProperties}>
            <CheckCircle2 aria-hidden="true" size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a className="button button-light ehr-cta-action" href="mailto:info@clinoramedbill.com">
        Discuss your software <ArrowRight aria-hidden="true" size={18} />
      </a>
    </div>
  </div>
</section>
```

### Motion

Reuse the existing one-shot `data-motion` observer. Do not add another observer or animation dependency.

Use these tokens in `app/globals.css` if they do not already exist:

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}
```

Initial and visible states:

```css
.ehr-cta-shell[data-motion] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 500ms var(--ease-out), transform 500ms var(--ease-out);
}

.ehr-cta-shell[data-motion].motion-visible {
  opacity: 1;
  transform: translateY(0);
}

.ehr-cta-visual {
  opacity: 0;
  transform: scale(1.025);
  transition: opacity 520ms var(--ease-out), transform 650ms var(--ease-out);
}

.motion-visible .ehr-cta-visual {
  opacity: 1;
  transform: scale(1);
}

.ehr-cta-content {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 500ms var(--ease-out) 60ms, transform 500ms var(--ease-out) 60ms;
}

.motion-visible .ehr-cta-content {
  opacity: 1;
  transform: translateY(0);
}

.ehr-cta-review-list li {
  opacity: 0;
  transform: translateX(-10px);
  transition:
    opacity 360ms var(--ease-out) calc(130ms + var(--ehr-cta-order) * 55ms),
    transform 360ms var(--ease-out) calc(130ms + var(--ehr-cta-order) * 55ms);
}

.motion-visible .ehr-cta-review-list li {
  opacity: 1;
  transform: translateX(0);
}
```

Button interaction must match the site’s existing link language:

```css
.ehr-cta-action svg {
  transition: transform 280ms var(--ease-ui);
}

@media (hover: hover) and (pointer: fine) {
  .ehr-cta-action:hover svg { transform: translateX(4px); }
}

.ehr-cta-action:active {
  transform: scale(.97);
  transition-duration: 160ms;
  transition-timing-function: var(--ease-out);
}
```

Reduced motion keeps opacity feedback but removes all movement and staggering:

```css
@media (prefers-reduced-motion: reduce) {
  .ehr-cta-shell[data-motion],
  .ehr-cta-visual,
  .ehr-cta-content,
  .ehr-cta-review-list li {
    transform: none;
    transition: opacity 200ms ease;
    transition-delay: 0ms;
  }

  .ehr-cta-action:active { transform: none; }
}
```

Only `transform` and `opacity` may animate. Do not animate width, height, grid tracks, filter, blur, box-shadow, or the gradient.

## Repo conventions to follow

- Global motion already uses `--duration-ui: 280ms` and `--ease-ui: cubic-bezier(.2, .7, .2, 1)` in `app/globals.css:103-104`; retain those for hover interactions.
- One-shot viewport reveals already use `[data-motion]` and `.motion-visible`. `app/components/MotionReveal.tsx:7-20` observes at `threshold: 0.14` with `rootMargin: "0px 0px -8%"`, adds `.motion-visible`, and immediately unobserves. Reuse it exactly.
- `SiteConversionFooter` already mounts `MotionReveal` on this page through `app/ehr-software/page.tsx:85`; do not mount a second instance.
- The winning stylesheet order is declared in `app/layout.tsx:3-11`. Put the final component rules in `app/current-polish.css`, the last imported pass, so older EHR CTA rules cannot override the new composition.
- Keep the existing `button button-light` classes and mailto destination; add only the section-specific `ehr-cta-action` class.
- Use existing Next.js `Image`; do not replace it with a CSS background.

## Steps

1. In `app/ehr-software/page.tsx:1`, add `CheckCircle2` to the existing Lucide import and add the `CSSProperties` type import only if needed for the stagger custom property.
2. Replace only `app/ehr-software/page.tsx:83` with the formatted target structure above. Preserve the section id, all approved copy, image source, image alt text, button label, and `mailto:info@clinoramedbill.com` destination.
3. In `app/globals.css:103-104`, add `--ease-out` and `--ease-in-out` only if an exact search confirms they are absent. Do not rename or replace `--ease-ui`.
4. Append a clearly labeled `/* EHR workflow review editorial stage */` block to `app/current-polish.css`. Implement the desktop layout, integrated shade, review rail, connector line, and exact motion values from the Target section.
5. In that same block, add `@media (max-width: 1199px)` and `@media (max-width: 767px)` overrides. The mobile layout must place image first and copy second, remove overlay positioning, and hide the decorative connector line.
6. In that same block, add the pointer-qualified hover rule and the `prefers-reduced-motion` override exactly as specified.
7. Remove or neutralize only the conflicting EHR CTA selectors in `app/annotation-pass.css:240-254`, `app/redesign-pass.css:81-88`, and `app/current-polish.css:173-175` if the final cascade still produces duplicate or contradictory values. Do not touch EHR directory-card animation selectors.

## Boundaries

- Do NOT redesign the EHR directory, header, footer, hero, or any other page section.
- Do NOT change the approved image, copy, link destination, brand palette, font family, header, or footer.
- Do NOT introduce invented metrics, claims, or platform compatibility guarantees.
- Do NOT add Framer Motion, GSAP, or any other dependency.
- Do NOT add another `IntersectionObserver` or another `MotionReveal` mount.
- Do NOT use `transition: all`.
- Do NOT create perpetual, parallax, cursor-following, glow, bounce, or 3D motion.
- Do NOT make information depend on hover; all three review items remain visible after reveal.
- If the source structure or stylesheet import order has drifted from commit `d7a6923`, STOP and report the mismatch instead of improvising.

## Verification

- **Mechanical**: from the repository root run `npm run lint` and `npm run build`; both must exit with code 0. Then run `npm run dev -- --port 4174` and verify the page at `http://localhost:4174/ehr-software/#workflow-review`.
- **Feel check**: enter the section by normal downward scrolling and confirm:
  - The shell begins revealing only when it reaches the observer’s existing viewport threshold; it does not animate on a timer.
  - The shell settles first, the image resolves from `scale(1.025)`, the copy follows at 60ms, and the three review items arrive 55ms apart.
  - No layout shift occurs before, during, or after the reveal.
  - The content reads as one integrated stage, not two adjacent cards.
  - On a fine pointer, the arrow moves exactly 4px while the button remains stable; on touch there is no hover animation.
  - Rapidly clicking the mail link shows the 160ms `.97` press response without restarting the section reveal.
  - In DevTools Animations at 10% playback, every moving element decelerates into rest and no property other than `transform` or `opacity` is animated.
  - At 1199px the copy and subject remain readable; at 767px and below the image sits above a solid navy copy panel with no text overlaying the photograph.
  - Toggle `prefers-reduced-motion: reduce` in DevTools Rendering: all translations, scale changes, and stagger delays disappear while a maximum 200ms opacity reveal remains.
- **Done when**: the CTA communicates the three workflow areas at a glance, the mail link still targets `info@clinoramedbill.com`, the desktop/tablet/mobile layouts remain readable, and the motion passes all reduced-motion and pointer-input checks above.
