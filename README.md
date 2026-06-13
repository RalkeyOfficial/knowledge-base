# Knowledge Base

A personal, self-hosted knowledge base of tutorials and guides, built on
[Docusaurus](https://docusaurus.io/). See [PROJECT.md](PROJECT.md) for the
project charter and definition of done.

## Develop

```bash
npm install      # once
npm start        # dev server with hot reload at http://localhost:3000
```

## Build

```bash
npm run build    # static build into build/ — must finish with zero broken-link warnings
npm run serve    # serve the production build locally to spot-check
npm run typecheck
```

## Adding a guide

Copy `docs/_template.mdx` into the matching category folder under `docs/` and
fill it in. The full walkthrough is at `/how-to-add-a-guide` on the running
site (`docs/how-to-add-a-guide.mdx`).
