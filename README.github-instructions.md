Quick notes for maintainers

1) Install new deps for README highlighting

npm install rehype-highlight highlight.js

2) Provide a GitHub token to increase rate limits:

Create `.env.local` with:

GITHUB_TOKEN=your_token_here

3) CI

We added a basic GitHub Actions workflow at `.github/workflows/ci.yml` that runs `npm ci` and `npm run build` on pushes to `main`. Adjust node-version if required.

4) Cache

The app now writes small cache files to `.cache/` when fetching README and repo tree. These are ignored by git if `.gitignore` follows common patterns; consider checking them into CI if you want deterministic builds.

5) Accessibility quick-check

Install `pa11y` and run the quick accessibility check against a locally-running dev server:

```bash
npm install --save-dev pa11y
npm run dev
npm run a11y
```

`pa11y` prints a short report of common accessibility issues; use it as a first pass before more thorough audits.
