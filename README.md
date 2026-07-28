# ClinoraMedBill Homepage

Prototype homepage for ClinoraMedBill, a US-focused medical billing and revenue
cycle management company. The experience is designed to communicate specialty
expertise, operational clarity, security, and an accessible path to request a
free billing audit.

## Project status

- Homepage prototype for client review
- Local preview and production build are working
- Hosting is intentionally deferred until approval
- Major design revisions are preserved in Git history

## Technology stack

| Area | Technology |
| --- | --- |
| Application | React 19 with Next.js 16 App Router |
| Language | TypeScript, TSX, modern JavaScript |
| Styling | CSS3 with custom properties, responsive layouts, gradients and keyframe motion |
| Icons | Lucide React |
| Development | Vite 8 through vinext |
| Runtime target | Cloudflare Workers-compatible output |
| Quality | ESLint, TypeScript compilation and Node test runner |
| Source control | Git with named design-snapshot commits |
| Continuous integration | GitHub Actions on pushes and pull requests |

The current homepage does not require a database, authentication, or external
API credentials.

## Local development

### Requirements

- Node.js 22.13 or newer
- npm

### Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Validation

```bash
npm run lint
npm run build
npm test
```

## Project structure

```text
app/
  globals.css        Global design system, responsive styles and motion
  layout.tsx         Metadata, fonts and root layout
  page.tsx           Homepage content and interactions
public/
  brand/             Approved logo assets
  media/             Homepage imagery and hero video
  og.png             Social sharing image
tests/
  rendered-html.test.mjs
docs/
  DESIGN-HISTORY.md
worker/
  index.ts           Cloudflare-compatible worker entry
```

## Accessibility and motion

The prototype includes semantic headings, visible focus styles, labelled forms,
keyboard-operable navigation and accordions, descriptive image text, practical
touch targets, and reduced-motion fallbacks. Motion effects are implemented in
CSS and only enhance content that remains available without animation.

## Revision workflow

1. Create a focused branch for significant work.
2. Preserve approved or reviewable visual states with a named design snapshot.
3. Run lint, build, and tests before sharing.
4. Commit source, documentation, and intentional assets together.
5. Push the reviewed revision to GitHub.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the working agreement and
[docs/DESIGN-HISTORY.md](docs/DESIGN-HISTORY.md) for preserved visual versions.
Release notes are recorded in [CHANGELOG.md](CHANGELOG.md), and deployment
security expectations are documented in [SECURITY.md](SECURITY.md).

## Content and assets

Brand assets and supplied content remain the property of ClinoraMedBill and
their respective owners. This repository is intended for authorized project
collaboration and client review.
