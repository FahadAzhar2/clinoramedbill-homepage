# ClinoraMedBill Homepage

Production website for ClinoraMedBill, a US-focused medical billing and revenue
cycle management company. The experience is designed to communicate specialty
expertise, operational clarity, security, and an accessible path to request a
free billing audit.

**Live website:** [https://clinoramedbill.com](https://clinoramedbill.com)

## Project status

- Production design is live on the primary domain
- Responsive pages, lead forms, service routes, blogs, FAQs, and supplied media are included
- The static frontend is hosted on the existing GoDaddy cPanel account
- Enquiry delivery runs through the production Vercel endpoint using the GoDaddy bridge in `deploy/godaddy/`
- Major design revisions are preserved in Git history

## Technology stack

| Area | Technology |
| --- | --- |
| Application | React 19 with Next.js 16 App Router |
| Language | TypeScript, TSX, modern JavaScript |
| Styling | CSS3 with custom properties, responsive layouts, gradients and keyframe motion |
| Icons | Lucide React |
| Development | Vite 8 through vinext |
| Runtime targets | Static Next.js export for GoDaddy and Vercel Functions for enquiry delivery |
| Quality | ESLint, TypeScript compilation and Node test runner |
| Source control | Git with named design-snapshot commits |
| Continuous integration | GitHub Actions on pushes and pull requests |

The website does not require a database or authentication. Production enquiry
delivery requires the server-side email environment variables documented in
`.env.example`; secrets are intentionally excluded from Git.

## Production deployment

- `npm run build` generates the static site in `out/` for GoDaddy hosting.
- `api/enquiry.ts` is deployed as a Vercel Function for validated email delivery.
- `deploy/godaddy/.htaccess` and `deploy/godaddy/api/enquiry.php` provide the
  same-domain bridge from the GoDaddy-hosted forms to the Vercel endpoint.
- Build output, local environment files, deployment archives, and credentials
  are excluded from this repository.

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
  components/        Shared navigation, conversion forms, and footer
  content/           Service, FAQ, and editorial content
api/
  enquiry.ts         Validated production enquiry endpoint
deploy/godaddy/      GoDaddy rewrite and form-delivery bridge
public/
  brand/             Approved logo assets
  media/             Website imagery, icons, and hero video
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
