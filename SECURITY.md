# Security policy

## Supported state

This repository currently represents a review prototype. It must not process
protected health information, patient records, payment data, or production form
submissions.

## Reporting

Report suspected vulnerabilities privately to the repository owner. Do not open
a public issue containing credentials, personal data, or exploit details.

## Dependency review

Dependencies are locked with `package-lock.json`. Before deployment:

```bash
npm audit
npm run lint
npm run build
npm test
```

The current framework ecosystem reports upstream advisories in transitive
Next.js image-processing and CSS dependencies without a non-breaking automated
resolution. The project does not use Server Actions, dynamic rewrites, user
uploads, or authenticated data in its present prototype state. These advisories
must be reassessed before production hosting; do not apply a forced downgrade.

## Secrets

Environment files are ignored by Git. Never commit credentials, access tokens,
patient information, private client records, or production exports.
