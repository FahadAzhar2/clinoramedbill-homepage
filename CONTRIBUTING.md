# Contributing

This project uses a review-first workflow so visual experimentation remains
recoverable and client-ready.

## Branches

- `main` contains the latest reviewed prototype.
- Use `feature/<short-name>` for new sections or functionality.
- Use `design/<section-name>` for significant visual explorations.
- Use `fix/<short-name>` for corrections that do not change the design concept.

## Commits

Keep commits focused and descriptive. Recommended prefixes:

- `design:` visual layout or motion work
- `feat:` new user-facing capability
- `fix:` correction to existing behavior
- `docs:` documentation only
- `test:` automated test changes
- `chore:` maintenance without user-facing changes

For a design that may need to be restored, use:

```text
design snapshot: <section> <short description>
```

## Before pushing

```bash
npm run lint
npm run build
npm test
```

Check desktop and mobile behavior, keyboard navigation, visible focus, form
labels, contrast, and reduced-motion behavior.

## Pull requests

Each pull request should describe:

- What changed
- Why it changed
- Sections affected
- Accessibility considerations
- Validation performed
- Screenshots or a preview link when relevant

Do not commit secrets, `.env` files, generated build output, dependency folders,
or unlicensed third-party assets.
