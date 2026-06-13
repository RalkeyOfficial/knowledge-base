import React, {useState, type ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import {usePort, effectivePort} from './store';
import PortDisplay from './PortDisplay';
import DownloadIcon from './DownloadIcon';
import styles from './styles.module.css';

function downloadText(filename: string, content: string): void {
  // application/octet-stream (not text/plain) so the browser doesn't append a
  // ".txt" extension — yt-dlp needs the file named exactly `config`.
  const blob = new Blob([content], {type: 'application/octet-stream'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** A config code block with a filename header and a download icon on the right. */
function ConfigPreview({
  filename,
  content,
}: {
  filename: string;
  content: string;
}): ReactNode {
  return (
    <div className={styles.preview}>
      <div className={styles.previewHeader}>
        <span className={styles.previewName}>{filename}</span>
        <button
          type="button"
          className={styles.previewDownload}
          title={`Download ${filename}`}
          aria-label={`Download ${filename}`}
          onClick={() => downloadText(filename, content)}>
          <DownloadIcon />
        </button>
      </div>
      <CodeBlock language="ini">{content}</CodeBlock>
    </div>
  );
}

// yt-dlp's --cookies-from-browser supports these names directly, no path
// needed. "thorium" is a Chromium fork without a built-in name, so it uses the
// chromium backend pointed at a custom profile path.
const BROWSERS: {value: string; label: string}[] = [
  {value: '', label: "Don't use cookies"},
  {value: 'firefox', label: 'Firefox'},
  {value: 'chrome', label: 'Chrome'},
  {value: 'chromium', label: 'Chromium'},
  {value: 'brave', label: 'Brave'},
  {value: 'edge', label: 'Edge'},
  {value: 'opera', label: 'Opera'},
  {value: 'vivaldi', label: 'Vivaldi'},
  {value: 'safari', label: 'Safari'},
  {value: 'thorium', label: 'Thorium (custom path)'},
];

function cookieArg(browser: string): string | null {
  if (!browser) return null;
  if (browser === 'thorium') {
    return '--cookies-from-browser "chromium:~/.config/thorium/Default"';
  }
  return `--cookies-from-browser ${browser}`;
}

function sourceAuth(port: number, cookie: string | null): string[] {
  return [
    `--extractor-args "youtubepot-bgutilhttp:base_url=http://127.0.0.1:${port}"`,
    '--extractor-arg "youtube:player_client=default,tv"',
    '--js-runtimes deno',
    ...(cookie ? [cookie] : []),
  ];
}

const NETWORK = [
  '--abort-on-unavailable-fragment',
  '--abort-on-error',
  '--no-simulate',
  '--sleep-interval 4',
  '--max-sleep-interval 8',
  '--concurrent-fragments 8',
  '--throttled-rate 1M',
  '--retries 4',
];

function buildDefault(port: number, cookie: string | null): string {
  return [
    '# === Source / Auth ===',
    ...sourceAuth(port, cookie),
    '',
    '# === Video extraction ===',
    '-f "bestvideo[height<=1440][format_note!~=upscaled]+bestaudio/bestvideo[height<=1440]+bestaudio/best"',
    '# Priority: resolution > variable bitrate > Total average bitrate > fps',
    '-S "res,vbr,tbr,fps"',
    '--remux-video "mkv/mp4"',
    '',
    '# === Output ===',
    '-o "%(title)s.%(ext)s"',
    '',
    '# === Metadata ===',
    '--embed-metadata',
    '--embed-thumbnail',
    '--embed-chapters',
    '--embed-subs',
    '--sub-langs "all,-live_chat"',
    '',
    '# === Network / reliability ===',
    ...NETWORK,
  ].join('\n');
}

function buildMusic(port: number, cookie: string | null): string {
  return [
    '# Prevent default config from being loaded on top of this one',
    '--ignore-config',
    '',
    '# === Source / Auth (same as default) ===',
    ...sourceAuth(port, cookie),
    '',
    '# === Audio extraction ===',
    '-f "bestaudio"',
    '-x',
    '--audio-format best',
    '--audio-quality 0',
    '',
    '# === Output ===',
    '-o "%(title)s.%(ext)s"',
    '',
    '# === Metadata ===',
    '--embed-metadata',
    '--embed-thumbnail',
    "# embed subtitle's since some audio can be hard to understand",
    '--embed-subs',
    '--sub-langs "all,-live_chat"',
    '',
    '# === Network / reliability (same as default) ===',
    ...NETWORK,
  ].join('\n');
}

/**
 * Renders the two yt-dlp config files (`config` and `config.music`), with the
 * POT-provider port and the optional cookies-from-browser line filled in from
 * the form.
 */
export default function ConfigFiles(): ReactNode {
  const port = effectivePort(usePort());
  const [browser, setBrowser] = useState('');
  const cookie = cookieArg(browser);

  const defaultConfig = buildDefault(port, cookie);
  const musicConfig = buildMusic(port, cookie);

  return (
    <div className={styles.generator}>
      <div className={styles.controls}>
        <PortDisplay />
        <label className={styles.field}>
          <span className={styles.label}>Cookies from browser</span>
          <select
            className={styles.select}
            value={browser}
            onChange={(e) => setBrowser(e.target.value)}>
            {BROWSERS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ConfigPreview filename="config" content={defaultConfig} />
      <ConfigPreview filename="config.music" content={musicConfig} />
    </div>
  );
}
