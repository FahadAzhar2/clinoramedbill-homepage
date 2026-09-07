# Backend configuration

## Request flow

1. Website forms call `/api/enquiry` through `app/lib/enquiry.ts`.
2. On GoDaddy, `deploy/godaddy/.htaccess` rewrites the request to `api/enquiry.php`.
3. The PHP bridge forwards JSON to `https://clinora-homepage.vercel.app/api/enquiry/`.
4. The Vercel function in `api/enquiry.ts` validates the request and sends an email using Resend.

There is no application database, login system or stored-submission dashboard in this source. Sanity is a separate hosted content service.

## Email environment variables

Set these in the Vercel project serving the function:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Secret API key authorized to send email |
| `ENQUIRY_FROM_EMAIL` | Sender address on a domain verified in Resend |
| `ENQUIRY_TO_EMAIL` | Recipient address; defaults to `info@clinoramedbill.com` |

Use `.env.example` as the variable-name template. Real values are excluded from Git. Restart or redeploy the function after changing its environment according to the hosting service's workflow.

## Hosting files

For GoDaddy, build the site with `npm ci` and `npm run build`, then deploy the contents of `out/` to the intended web root along with `deploy/godaddy/.htaccess` and `deploy/godaddy/api/enquiry.php`, preserving the `api/` directory. The PHP host requires cURL and outbound HTTPS. Preserve existing hosting configuration and backups when integrating these files.

Deploy `api/enquiry.ts` with `vercel.json` through the Vercel project. A new backend domain requires updating `$upstream` in the PHP bridge. A new frontend domain requires updating the bridge's allowed origins. Local frontend development does not run this PHP bridge or Vercel function automatically.

## API contract

The endpoint accepts POST JSON with `type`, `page`, and `fields`. Supported types:

| Type | Required fields |
| --- | --- |
| `hero-audit` | `name`, `email` |
| `billing-audit` | `name`, `practice`, `email`, `specialty` |
| `ehr-consultation` | `name`, `email` |
| `contact` | `name`, `practice`, `email`, `message` |

The `website` field is a spam honeypot and must be empty. Responses include success `{ "ok": true }`, invalid input `400`, invalid origin `403`, unsupported method `405`, oversized request `413`, rate limit `429`, delivery failure `502`, or missing email configuration `503`. Rate limiting is in-memory per function instance, not a shared persistent quota.

## Verification after a hosting transfer

Check page routes, assets and each form on the destination. Run a clearly labelled test enquiry only with the owner's authorization, and confirm receipt in the intended mailbox. A successful static build alone does not verify email delivery or CMS account access.
