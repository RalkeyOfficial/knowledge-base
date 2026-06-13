<div align="center">

<img src="static/img/logo.svg" alt="Knowledge Base logo" width="120" height="120" />

# Knowledge Base

**From _“how do I do X again?”_ to _X is done._**

A personal, self-hosted stash of battle-tested tutorials and copy-pasteable
commands — every one actually run, no fill-in-the-blank guesswork.

### 📖 Read it online → **[ralkeyofficial.github.io/knowledge-base](https://ralkeyofficial.github.io/knowledge-base/)**

_That's the primary home — full-text search, dark mode, and interactive command
generators all live there. This repo is just the source._

[![Deploy](https://github.com/RalkeyOfficial/knowledge-base/actions/workflows/deploy.yml/badge.svg)](https://github.com/RalkeyOfficial/knowledge-base/actions/workflows/deploy.yml)
&nbsp;[![Built with Docusaurus](https://img.shields.io/badge/built%20with-Docusaurus-3ECC5F?logo=docusaurus&logoColor=white)](https://docusaurus.io/)

</div>

---

## What's inside

Guides grouped by purpose — Media & Downloading, Emulation & Gaming, System &
CLI, Networking, Windows, and Self-hosting. Built on
[Docusaurus](https://docusaurus.io/) and deployed as a static site to GitHub
Pages. See **[PROJECT.md](PROJECT.md)** for the project charter and definition
of done.

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

## Contributing — your tutorials are welcome 🙌

Got a trick worth sharing? You don't need to be an expert, and you **don't even
need to know Git**. There are two ways in:

### 1. Open a pull request (if you're comfortable with Git)

Copy `docs/_template.mdx` into the matching category folder under `docs/`, fill
it in, run `npm run build` to check it's clean, and open a PR. The full
walkthrough is at
**[/docs/how-to-add-a-guide](https://ralkeyofficial.github.io/knowledge-base/docs/how-to-add-a-guide)**
(source: `docs/how-to-add-a-guide.mdx`).

[**→ Open a pull request**](https://github.com/RalkeyOfficial/knowledge-base/compare)

### 2. Submit it as an issue (no Git required)

Don't want to deal with the tooling? Just
**[open a tutorial-submission issue](https://github.com/RalkeyOfficial/knowledge-base/issues/new?template=tutorial-submission.yml)**,
write your steps in plain text, and we'll shape it into a proper guide — and
credit you. Found a mistake instead?
[Open a regular issue](https://github.com/RalkeyOfficial/knowledge-base/issues/new/choose).

Either way: be kind, keep it copy-pasteable, and make sure you've actually run
the commands.

## Deployment

Every push to `main` triggers [the deploy
workflow](.github/workflows/deploy.yml): it builds the site and publishes
`build/` to the `deploy` branch, which GitHub Pages serves at the URL above.
