# ClinoraMedBill Website Image Audit

Date: 2026-08-08  
Preview audited: `http://localhost:4174/`  
Manifest: `content/image-manifest.json`

## Outcome

- Runtime broken images: **0** across every rendered public route checked at 1440 × 900.
- Horizontal overflow attributable to media: **0** across the 11 major routes checked at 1440 × 900 and 390 × 844.
- Raster files in `public/media`: **89**.
- Direct `/media/...` source paths referenced by application code: **31** across **46** direct references.
- Source paths repeated by application code: **16**.
- Raster assets below the requested 1600 × 900 supporting-image floor: **59**.
- Exact byte-identical photographic pairs: **1**.
- Required replacement slots specified for Magnific: **125** in **19** generation sets.
- Magnific availability: **not callable in this environment**. No generated asset is represented as complete. Exact prompts, sizes, focal points, alt text, and destination paths are recorded in `content/image-manifest.json`.

The site is operationally clean—there are no 404 or zero-dimension images—but it does not yet meet the master brief's zero-repetition and all-high-resolution art-direction requirement. The manifest is the required production handoff for that remaining image-generation pass.

## Route Inventory

The counts below include rendered `<img>`/Next Image output. Shared brand logo instances are included in the image count; `duplicate slots` only indicates repeated rendered `currentSrc` values within that route.

| Route | Image count | Unique rendered sources | Duplicate slots | CSS image refs | Broken | Replacement plan |
|---|---:|---:|---:|---:|---:|---|
| `/` | 22 | 20 | 2 | 1 | 0 | Unique audience, human-accountability, and insight set |
| `/about-us/` | 8 | 8 | 0 | 0 | Five unique brand-story photographs |
| `/blogs/` | 7 | 7 | 0 | 0 | Unique hero plus three article images |
| `/compliance/` | 3 | 3 | 0 | 1 | Unique 4K compliance hero |
| `/contact-us/` | 4 | 4 | 0 | 0 | Unique 3200 × 2400 contact hero |
| `/ehr-software/` | 5 | 5 | 0 | 0 | Unique 4K hero and 4K CTA image |
| `/faqs/` | 4 | 4 | 0 | 0 | Unique 4K FAQ hero |
| `/mobile-preview/` | 2 | 2 | 0 | 0 | Mockup/brand assets retained |
| `/nationwide-solutions/` | 24 | 22 | 2 | 0 | Unique hero plus 50-state generation batch |
| `/privacy-policy/` | 3 | 3 | 0 | 1 | Unique standard-route hero in manifest |
| `/specialties/` | 4 | 4 | 0 | 0 | Unique 4K specialties hero |
| `/who-we-serve/` | 5 | 4 | 1 | 0 | Unique hero and seven audience images |
| `/services/revenue-cycle-management/` | 9 | 6 | 3 | 0 | Six unique RCM photographs |
| `/services/medical-billing/` | 9 | 6 | 3 | 0 | Six unique billing photographs |
| `/services/medical-coding/` | 9 | 6 | 3 | 0 | Six unique coding photographs |
| `/services/ar-management/` | 9 | 6 | 3 | 0 | Six unique A/R photographs |
| `/services/medical-billing-audits/` | 9 | 6 | 3 | 0 | Six unique audit photographs |
| `/services/provider-credentialing-enrollment/` | 9 | 6 | 3 | 0 | Six unique credentialing photographs |
| `/services/virtual-front-desk-services/` | 9 | 6 | 3 | 0 | Six unique virtual-front-desk photographs |

## Exact Duplicate

The following files are byte-identical and must not both survive the final generation pass:

- `/media/about-hero-magnific-4k.jpg`
- `/media/services/05-medical-billing-audits-4k.jpg`

The About and Medical Billing Audits replacement sets in the manifest assign different scenes, filenames, focal points, and alt text.

## Repeated Source Hotspots

The largest direct-use repetitions found in application source are:

| Current source | Direct app references | Final action |
|---|---:|---|
| `/media/human-team.jpg` | 6 | Keep no shared use; replace by route-specific generated assets |
| `/media/medical-billing-workflow-4k.jpg` | 5 | Preserve only until route-specific generated assets are approved |
| `/media/insight-reporting-cover.jpg` | 5 | Replace low-resolution and repeated uses |
| `/media/specialties-hero-magnific-4k.jpg` | 3 | Replace repeated secondary uses; create dedicated specialties hero |
| `/media/insight-denials-cover.jpg` | 3 | Replace 540 × 405 source everywhere |
| `/media/doctor-lifestyle-v1.png` | 3 | Replace 1254 × 1254 source everywhere |
| `/media/about-hero-magnific-4k.jpg` | 3 | Replace per-route and remove exact duplicate pair |
| `/media/insight-visibility.jpg` | Shared across service detail pages | Replace with unique route capabilities |
| `/media/insight-reporting.jpg` | Shared across service detail pages | Replace with unique route capabilities |
| `/media/insight-specialty.jpg` | Shared across service detail pages | Replace with unique route capabilities |

## Low-Resolution Findings

The 59 assets below 1600 × 900 include these high-impact current sources:

| Source | Native size | Issue | Manifest action |
|---|---:|---|---|
| `/media/insight-reporting-cover.jpg` | 840 × 630 | Below support/card target | Replace in RCM and Audit sets |
| `/media/insight-specialty-cover.jpg` | 540 × 405 | Below support/card target | Replace in Medical Coding set |
| `/media/insight-compliance-cover.jpg` | 544 × 408 | Below support/card target | Replace in A/R set |
| `/media/insight-ar-cover.jpg` | 540 × 405 | Below support/card target | Replace in Credentialing set |
| `/media/insight-denials-cover.jpg` | 540 × 405 | Below support/card target | Replace in Credentialing and audience sets |
| `/media/doctor-single-v1.png` | 1254 × 1254 | Below hero target | Replace Contact and Coding uses |
| `/media/doctor-lifestyle-v1.png` | 1254 × 1254 | Below hero/support target | Replace About, A/R, and VFD uses |
| `/media/metrics-data-field.png` | 1536 × 768 | Below requested support floor | Replace Audit support use |
| `/media/hero-poster.jpg` | 1920 × 1080 | Works for current one-image CTA, below requested 4K target | Replace with `/media/generated/ehr-workflow-cta.avif` |
| `/media/states/*.jpg` | Mostly 1000–1280 px wide | Below requested editorial long edge | Generate 2200 × 1400 state set |

## High-Resolution Assets Currently Available

These native files are sharp enough for their present slots but still need de-duplication where reused:

- `/media/medical-billing-workflow-4k.jpg` — 6728 × 4486
- `/media/about-hero-magnific-4k.jpg` — 5113 × 3409
- `/media/blog-denials-magnific-4k.jpg` — 8688 × 5792
- `/media/blog-eligibility-magnific-4k.jpg` — 5888 × 3296
- `/media/blogs-hero-magnific-4k.jpg` — 3555 × 5326
- `/media/specialties-hero-magnific-4k.jpg` — 3812 × 2010
- `/media/about-hero-4k.jpg` — 3840 × 2160

## Implemented Correction

The EHR closing CTA no longer uses the previous collage composition. It now renders one uninterrupted `/media/hero-poster.jpg` image with `object-fit: cover`, an intentional focal point, responsive sizes, quality 90, and reduced-motion-safe page behavior. The manifest still schedules a unique 3840 × 2160 Magnific replacement for production-quality compliance.

## Production Replacement Order

1. Generate and approve the seven service-page sets because they contain the most repeated and low-resolution sources.
2. Generate homepage, About, Who We Serve, Blogs, Contact, Specialties, Compliance, and EHR sets.
3. Generate the Nationwide hero and 50-state batch.
4. Optimize approved masters to responsive AVIF/WebP outputs.
5. Replace references route by route, never assigning one source to multiple slots.
6. Re-run file hash, native-dimension, browser 404, responsive crop, and route-matrix checks.

## Acceptance State

- Broken-image remediation: **passed** (0 broken images).
- Stretch/crop runtime check on edited pages: **passed**.
- Zero-repeat requirement: **pending generated assets**.
- All-image high-resolution requirement: **pending generated assets**.
- Exact production prompts and paths: **complete**.

