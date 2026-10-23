# Green Auto India — Documentation Site

Final documentation site for the Techfest 2026–27 Challenge 2 (Green Auto India)
Round 1 submission: an India-specific automotive LCA database and impact
calculation engine. Built with [Astro](https://astro.build) +
[Starlight](https://starlight.astro.build) (docs theme), with KaTeX math rendering.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the production build locally
```

## Content

Docs live in `src/content/docs/` (one page per R1 section, sidebar order set in
`astro.config.mjs`). Edit a page, commit, push — the host redeploys automatically.

## Version management

- `main` is the always-deployable branch.
- Content changes go in small commits (`docs: ...`, `fix: ...`, `feat: ...`).
- Releases are Git tags: `git tag v0.1.0 && git push --tags` (current: `v0.1.0`).
- `package.json` version tracks the docs release, not the app (the app plan lives
  in `../PLAN.md`).

## Hosting

Static output (`dist/`) — host anywhere static:

- **Cloudflare Pages (recommended, matches the existing Workers setup):** create a
  Pages project from this repo, build command `npm run build`, output directory
  `dist`. Every push to `main` redeploys.
- **Vercel:** import the repo, framework preset `Astro`, same build/output
  settings. Every push redeploys.

## Source of truth

Page content mirrors the R1 submission skeleton. If the skeleton changes,
re-split it into `src/content/docs/` and commit the diff — never edit built
output in `dist/`.
