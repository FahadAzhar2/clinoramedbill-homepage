# Revenue Problem Content Replacement — Design QA

## Scope

- Page: `http://localhost:4174/#revenue-problem`
- Replaced the previous revenue-problem heading, CTA, and three process cards.
- Added the supplied heading and both supplied body paragraphs.
- Added one contextual 4K healthcare image in a responsive heading/body/image composition.

## Reference and implementation

- Reference: `/Users/fahadazhar/Desktop/Screenshot 2026-08-12 at 7.59.24 PM.png` (1326 × 1334)
- Desktop QA: `/Users/fahadazhar/Downloads/ClinoraMedBill Branding/Clinora Logo 400x400 SVG/clinora-homepage/qa-partner-intro-desktop.png` (1525 × 1044)
- Mobile QA: `/Users/fahadazhar/Downloads/ClinoraMedBill Branding/Clinora Logo 400x400 SVG/clinora-homepage/qa-partner-intro-mobile.png` (390 × 844)
- Image asset: `public/media/services/01-revenue-cycle-management-4k.jpg` (4096 × 2160)

## Responsive review

- Desktop: two-column layout; copy is left aligned and the image is the right-side visual anchor.
- Tablet: balanced two-column layout with reduced gap and fluid heading scale.
- Mobile: copy and image stack in reading order; no horizontal overflow or text clipping.
- Image uses `object-fit: cover`, responsive `sizes`, and an intentional focal position.
- Reduced-motion preferences are respected.

## Verification

- `npm run build`: passed.
- Local page response on port 4174: HTTP 200.
- Desktop visual QA: passed.
- Mobile visual QA: passed.
- Text content matches the supplied screenshot verbatim.

Final Design QA Result: Passed

## Footer Social Links and EHR Logo Visibility

- Added linked Facebook and Instagram icons to the shared site footer.
- Retained a clearly identified LinkedIn icon as a non-clickable placeholder until its URL is supplied.
- Standardized the EHR logo stages and switched the 20 directory logos to eager native image loading so every supplied brand mark renders reliably.
- Browser audit confirmed all 20 EHR logos completed with valid intrinsic dimensions and visible rendered bounds.
- Desktop and mobile visual checks confirmed readable logos, responsive cards, and visible footer social icons.
- `npm run build`: passed; 24 static pages generated.
- `/ehr-software/`: HTTP 200 on localhost.

final result: passed

## EHR Software Directory — Logo and Content Pass

- Replaced the generic software icons with branded logos for exactly 20 requested EHR platforms.
- Preserved the supplied order, platform names, descriptions, and official destination links.
- Standardized every logo inside a consistent 98px contain-fit stage and every card to a 342px minimum height.
- Added accessible logo alt text, full-card external links, visible focus states, and responsive single-column behavior.
- Verified all 20 local logo assets return HTTP 200.

Verification:

- `npm run build`: passed; 24 static pages generated.
- `/ehr-software/`: HTTP 200 on localhost.
- Desktop and mobile card sizing/content QA: passed.

final result: passed

Final Design QA Result: Passed

## Nine-revision homepage completion pass

- Removed the duplicated credibility strip and the separate flow-bridge block.
- Restyled the remaining credibility strip without an outer section fill and added restrained brand motion.
- Replaced the revenue-problem module with the supplied trusted-partner heading, two paragraphs, and a contextual image.
- Made the final service card span the complete tablet row while preserving the single-column mobile layout.
- Replaced the process dashboard with a simpler six-stage responsive timeline.
- Added the supplied Benefits of Outsourcing Medical Billing copy and four disclosure rows.
- Reorganized the EHR logo constellation around the central workflow hub.
- Removed scroll-reveal animation from the homepage insights section.
- Preserved responsive layouts with no horizontal overflow at desktop, tablet, or mobile widths.

Verification:

- `npm test`: 9/9 passed.
- `npm run build`: passed; 24 static pages generated.
- Desktop (1525px), tablet (1024px), and mobile (390px) browser QA: passed.
- Benefits disclosure interaction and service-card responsive layout: passed.

Final Design QA Result: Passed

final result: passed
