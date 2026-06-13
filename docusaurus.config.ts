import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Knowledge Base',
  tagline: 'Tutorials and guides for software and handy tech things',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Hosted on GitHub Pages as a project site:
  // https://ralkeyofficial.github.io/knowledge-base/
  url: 'https://ralkeyofficial.github.io',
  baseUrl: '/knowledge-base/',

  // GitHub Pages deployment config (org/user + repo name).
  organizationName: 'RalkeyOfficial',
  projectName: 'knowledge-base',
  // CI publishes the built site to this branch (see .github/workflows/deploy.yml).
  deploymentBranch: 'deploy',

  // Broken links are a build failure for this project (see PROJECT.md DoD).
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Guides live under /docs; the site root is the landing page
          // (src/pages/index.tsx).
          routeBasePath: '/docs',
          // No "edit this page" link until the repo/hosting is decided.
          editUrl: undefined,
        },
        // No blog — this is a guide/tutorial knowledge base (see PROJECT.md non-goals).
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      // Self-hosted full-text search (no Algolia account needed).
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    // Social card used for link embeds (Open Graph / Twitter) — e.g. Discord,
    // Slack, X. Docusaurus turns this into an absolute og:image URL. Source SVG
    // lives alongside it (social-card.svg); re-rasterize with:
    //   rsvg-convert -w 1200 -h 630 static/img/social-card.svg -o static/img/social-card.png
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Knowledge Base',
      logo: {
        alt: 'Knowledge Base Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      // Languages used across the guides that aren't bundled by default.
      additionalLanguages: ['bash', 'powershell', 'docker', 'nginx', 'ini', 'batch'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
