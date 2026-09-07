# ClinoraMedBill source handoff

## Download and run

Authorized collaborators can download **Code → Download ZIP** from the GitHub repository or clone it:

```bash
git clone https://github.com/FahadAzhar2/clinoramedbill-homepage.git
cd clinoramedbill-homepage
npm ci
npm run dev
```

Use Node.js 22.13 or newer. Open http://localhost:3000. The local frontend server does not provide the separately hosted Vercel enquiry function; previewing pages alone does not configure email delivery.

## Source map

| Location | Contents |
| --- | --- |
| `app/` | Website pages, responsive styles, shared components and local fallback content |
| `public/` | Website logos, images, icons and video |
| `api/enquiry.ts` | Backend form validation and Resend email delivery |
| `app/lib/enquiry.ts` | Browser form submission helper |
| `deploy/godaddy/` | Apache rewrite and PHP bridge for hosted forms |
| `.env.example` | Backend environment variable template, with no credentials |
| `sanity/` | CMS notes and schema declaration reference |
| `app/lib/sanity.ts`, `app/lib/useCmsBundle.ts` | Runtime CMS integration and fallback handling |
| `tests/` | Rendered-page regression checks |
| `.github/workflows/ci.yml` | Automated lint, build and test workflow |
| `worker/`, `wrangler.jsonc`, `vite.config.ts` | Alternate Cloudflare/vinext runtime configuration |
| `docs/`, `plans/`, `qa/` | Handoff documentation, historical plans and visual QA references |

Backend entry points retain their deployment-required paths. See [backend setup](BACKEND.md) for configuration and hosting details.

## Build and validate

```bash
npm run lint
npm run build
npm test
```

`npm run build` creates the GoDaddy static export in `out/`. `npm test` builds the alternate Cloudflare/vinext target and runs rendered HTML tests. Generated output and `node_modules` are not source files and are excluded from Git; the lockfile is included for reproducible installation.

## Accounts and handover boundaries

The source repository includes website assets, backend source and CMS integration. GitHub access does not grant access to GoDaddy/cPanel, Vercel, Resend or the Sanity project. Account invitations and secret values must be handed over through their respective services or a secure channel.

Sanity project `doowpoj0`, dataset `production`, is referenced by the website. The repository contains a schema declaration reference, not a standalone Studio application or an exported production dataset. Published CMS content and uploaded CMS assets remain in Sanity; local fallback content and website assets are included here. A separate CMS export is required for an independent account migration.

This repository is private. The client must be invited as a collaborator before the source or ZIP download links will work. Source delivery does not change ownership of supplied brand assets.
