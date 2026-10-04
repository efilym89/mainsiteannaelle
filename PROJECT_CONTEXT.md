# Website development context

## Purpose and architecture
Website source with a separate static review implementation. The Next/React/Vinext application is in app/, components/, data/ and lib/; db/ and drizzle/ describe the local application database schema. Static review source is preview-site/ and the exporter generates docs/.

## Commands and stopping point
Node >=22.13. Static review does not need package installation: npm run preview:github, then node scripts/serve-static-preview.mjs. Use localhost GET checks only; never submit booking forms or send Telegram drafts. Full application development: npm ci, npm run lint, npm test and npm run dev. Inspect package scripts before a full build; build helpers expect Linux/Bash.

The original preview publication source is agent/github-preview:/docs. Do not push development changes there during environment setup. The migration branch starts from the current preview source. Previous sanitized-copy export passed 10 routes/20 redirects, but full application installation failed locally with npm "Exit handler never called"; original-source/fresh Linux validation must be recorded independently.

## Continuity and boundaries
2026-10-04: a separate development migration branch adds public-safe instructions only. Existing code, assets, Git history and publication branches are preserved. No feature fixes or production changes were made. A GitHub branch is not proof of a published Cloud environment; verify the exact commit and dependency/test results in a fresh task.

Keep private context, credentials, runtime state and personal materials outside public commits. A development checkout of existing raster/history content requires separate privacy review before transfer to a new service. Do not remove original assets automatically. No source-conversation URLs are recorded through supported tools; do not invent links or read internal session stores.
