import React, {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

// Categories shown as cards on the landing page. Hrefs match the `slug`
// set in each docs/<group>/_category_.json.
const CATEGORIES: {emoji: string; title: string; desc: string; href: string}[] = [
  {emoji: '📥', title: 'Media & Downloading', desc: 'yt-dlp, gallery-dl, ffmpeg recipes', href: '/docs/media-downloading'},
  {emoji: '🎮', title: 'Emulation & Gaming', desc: 'Emulators, ROM & save management', href: '/docs/emulation-gaming'},
  {emoji: '⌨️', title: 'System & CLI', desc: 'File ops, permissions, terminal tools', href: '/docs/system-cli'},
  {emoji: '🌐', title: 'Networking', desc: 'Tunnels, DNS, VPN, port forwarding', href: '/docs/networking'},
  {emoji: '🪟', title: 'Windows', desc: 'PowerShell, registry, winget, WSL', href: '/docs/windows'},
  {emoji: '🖥️', title: 'Self-hosting', desc: 'Docker, reverse proxies, cron', href: '/docs/self-hosting'},
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Knowledge Base"
      description="Tutorials and guides for software and handy tech things.">
      <main className={styles.hero}>
        <div className={styles.glow} aria-hidden="true" />

        <img
          src={useBaseUrl('/img/logo.svg')}
          alt="Knowledge Base logo"
          className={styles.logo}
          width={140}
          height={140}
        />

        <h1 className={styles.title}>
          Knowledge <span className={styles.accent}>Base</span>
        </h1>

        <p className={styles.slogan}>
          From <em>“how do I do X again?”</em> to <strong>X is done.</strong>
        </p>

        <p className={styles.subtitle}>
          A searchable stash of battle-tested tutorials and copy-pasteable
          commands — every one actually run, no fill-in-the-blank guesswork.
        </p>

        <div className={styles.buttons}>
          <Link className={styles.primaryBtn} to="/docs">
            Browse the guides →
          </Link>
          <Link className={styles.secondaryBtn} to="/docs/how-to-add-a-guide">
            Add a guide
          </Link>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((c) => (
            <Link key={c.href} to={c.href} className={styles.card}>
              <span className={styles.cardEmoji} aria-hidden="true">
                {c.emoji}
              </span>
              <span className={styles.cardTitle}>{c.title}</span>
              <span className={styles.cardDesc}>{c.desc}</span>
            </Link>
          ))}
        </div>

        <section className={styles.contribute}>
          <h2 className={styles.contributeTitle}>Got a guide of your own? 🙌</h2>
          <p className={styles.contributeText}>
            Contributions are welcome — and you don&apos;t need to be an expert
            or even know Git. Open a pull request with your guide, or just submit
            your tutorial as an issue and we&apos;ll shape it into a page (and
            credit you).
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.primaryBtn}
              to="/docs/how-to-add-a-guide">
              How to contribute
            </Link>
            <Link
              className={styles.secondaryBtn}
              to="https://github.com/RalkeyOfficial/knowledge-base/issues/new?template=tutorial-submission.yml">
              Submit a tutorial →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
