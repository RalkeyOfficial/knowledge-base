# Knowledge Base — Project Charter & Definition of Done

> A personal, self-hosted knowledge base of tutorials and guides for software and handy tech things, built on Docusaurus. This document is the single source of truth for what the project is, when a guide counts as "done," and what "done enough to ship" means for the site overall.

**Status:** Draft v0.1
**Owner:** (you)
**Stack:** Docusaurus (React + MDX), deployed as a static site
**Last updated:** 2026-06-13

---

## 1. Purpose

Capture, in one searchable place, the tutorials and setup guides I keep re-figuring-out — so future-me (and anyone I share a link with) can get from "I need to do X" to "X is done" without re-researching from scratch.

The differentiator over a pile of Markdown files or browser bookmarks: structured navigation, full-text search, and interactive **command generators** that assemble the exact command for a given situation instead of making the reader hand-edit flags.

## 2. Goals

- Every guide is findable in under ~10 seconds via category navigation or search.
- Every guide is copy-pasteable: commands work as written, no "fill in the blank" guesswork.
- Content is grouped by **type/domain** (see taxonomy below), not by date or by OS.
- Guides cover Linux and Windows where relevant, clearly labelled per platform.
- At least one interactive command-generator component (e.g. `chmod`, `yt-dlp`) proves out the pattern.

## 3. Non-goals (explicitly out of scope, for now)

- User accounts, comments, or any backend/database — it's a static site.
- Multi-author workflows, editorial review pipelines, or CMS.
- Auto-generated API docs or anything pulled from source code.
- Monetization, analytics-heavy tracking, or SEO optimization.
- Mobile app — the responsive web build is sufficient.

Anything here can graduate into scope later, but the MVP deliberately ignores it.

## 4. Content taxonomy (information architecture)

Top-level groups are by **what the thing is for**. Each group holds individual guides. This is a starting structure — extend it as content grows, but resist creating a category until you have ~2–3 guides that need it.

| Group | What goes here | Example entries |
|-------|----------------|-----------------|
| Media & Downloading | Grabbing, converting, ripping media | yt-dlp, gallery-dl, ffmpeg recipes |
| Emulation & Gaming | Emulators, game setup, ROM/save management | Eden (Switch), RetroArch, Dolphin |
| System & CLI Utilities | Day-to-day terminal tools, file ops, permissions | chmod/chown, tar, rsync, ssh |
| Networking | Connectivity, tunnels, DNS, VPN | WireGuard, Tailscale, port forwarding |
| Windows-specific | PowerShell, registry, Windows-only tooling | winget, PowerShell cmdlets, WSL |
| Self-hosting & Servers | Running services on your own box | Docker, reverse proxies, cron |
| Misc / Snippets | One-off handy things that don't fit yet | regex cheatsheets, keyboard shortcuts |

Each guide should carry:
- A **platform tag**: Linux / Windows / Cross-platform.
- A **difficulty or scope tag** (optional): quick-tip vs. full-setup.
- Tags for cross-cutting search (e.g. `video`, `cli`, `troubleshooting`).

In Docusaurus terms, groups map to sidebar categories (folders under `docs/`), and tags use the built-in tagging system.

## 5. Guide content template

For consistency, every guide follows the same skeleton so readers know where to look:

1. **Title** — what you'll accomplish, phrased as the outcome.
2. **One-line summary** — the TL;DR.
3. **Platform & prerequisites** — OS, required tools, versions.
4. **Steps** — numbered, with copy-pasteable commands.
5. **Verify it worked** — how to confirm success.
6. **Common errors / troubleshooting** — the gotchas you hit so you don't hit them twice.
7. **(Optional) Interactive generator** — embedded component for commands with many options.
8. **References** — links to upstream docs.

A `_template.mdx` in the repo enforces this.

## 6. Definition of Done — per guide

A single guide is **done** when all of these are true:

- [ ] Lives in the correct category and has a clear, outcome-oriented title.
- [ ] Has the one-line summary and platform tag filled in.
- [ ] Every command has been **actually run and verified** on the stated platform.
- [ ] Commands are copy-pasteable with no placeholders left unexplained.
- [ ] Has a troubleshooting / common-errors section (even if short).
- [ ] Renders correctly in both light and dark mode, desktop and mobile widths.
- [ ] No broken links (internal or external).
- [ ] Tagged for search.

## 7. Definition of Done — MVP (the site as a whole)

The project's first shippable version is **done** when:

- [ ] Docusaurus site builds cleanly (`npm run build`) with zero broken-link warnings.
- [ ] Site deploys to its host (e.g. GitHub Pages / Netlify / Vercel) and loads publicly or privately as intended.
- [ ] Sidebar navigation reflects the taxonomy in section 4.
- [ ] Full-text search works across all published guides.
- [ ] Light/dark mode toggle works.
- [ ] At least **one guide per active category** is published and meets the per-guide DoD.
- [ ] At least **one interactive command-generator component** is live and working inside a guide.
- [ ] A `_template.mdx` and a short "how to add a guide" note exist so adding content is frictionless.

## 8. Acceptance criteria

Concrete, testable checks. The MVP is accepted when each passes:

- **AC-1 — Findability:** Given the deployed site, when I search a keyword from any published guide (e.g. "yt-dlp"), then the matching guide appears in results and opens correctly.
- **AC-2 — Navigation:** Given the homepage, when I open the sidebar, then I see the taxonomy groups and can drill into a guide in ≤2 clicks.
- **AC-3 — Copy-paste integrity:** Given any published guide, when I copy a command block, then it runs as-is on the stated platform without manual edits (beyond clearly-marked user values).
- **AC-4 — Interactivity:** Given the command-generator guide, when I change the inputs, then the output command updates live and the copy button copies the current command.
- **AC-5 — Theming:** Given any guide, when I toggle dark mode, then all content (including embedded components) remains legible.
- **AC-6 — Build health:** Given the repo, when I run `npm run build`, then it completes with no errors and no broken-link warnings.

## 9. Suggested milestones

Lightweight phases, not deadlines:

1. **Foundation** — scaffold Docusaurus, set up the taxonomy folders, add `_template.mdx`, configure search, deploy an empty-but-live skeleton.
2. **First content pass** — write one solid guide per active category to validate the structure (and prove the template feels right to write in).
3. **Interactivity** — build the first command-generator component and embed it.
4. **Polish & ship** — fix broken links, check theming/mobile, run through the acceptance criteria, announce v1.
5. **Ongoing** — add guides as you learn things; revisit the taxonomy when a category gets crowded.

## 10. Open questions / decisions to lock in

- Hosting target: GitHub Pages, Netlify, Vercel, or self-hosted? (Affects deploy config.)
- Public or private/unlisted?
- Versioning: do you want Docusaurus's docs-versioning feature, or is a single living version fine? (Recommend single version to start.)
- Repo: one repo for site + content, or content in a separate repo? (Recommend one repo for simplicity.)
