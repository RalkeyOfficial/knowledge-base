import React, {useState, type ReactNode} from 'react';
import styles from './styles.module.css';

/**
 * Hand-holding build picker for Eden. The reader clicks their operating system
 * and then their kind of device; we tell them — in plain language — exactly
 * which release asset to download, so they never have to read the CPU tables.
 *
 * macOS has a single build, so picking macOS jumps straight to the result.
 */

type OS = 'linux' | 'windows' | 'macos';

type Recommendation = {
  /** The asset name as it appears on the releases page. */
  build: string;
  /** Which flavor to grab, or null when the build has only one. */
  flavor: 'PGO' | 'Standard' | null;
  /** Plain-language reason / caveat shown under the result. */
  note?: ReactNode;
};

type Device = {
  id: string;
  label: string;
  hint?: string;
  rec: Recommendation;
};

const PGO_NOTE =
  'PGO is the faster, optimized version — grab it first. If Eden acts up, ' +
  'come back and download the "Standard" version of the same build instead.';

const DEVICES: Record<Exclude<OS, 'macos'>, Device[]> = {
  linux: [
    {
      id: 'pc',
      label: 'A normal desktop or laptop',
      hint: 'Pick this if you’re not sure — it’s right for almost everyone',
      rec: {build: 'amd64', flavor: 'PGO', note: PGO_NOTE},
    },
    {
      id: 'steamdeck',
      label: 'Steam Deck',
      rec: {build: 'Steam Deck', flavor: 'PGO', note: PGO_NOTE},
    },
    {
      id: 'handheld',
      label: 'ROG Ally X / Legion Go S',
      hint: 'AMD Z1 / Z2 handhelds',
      rec: {build: 'Zen 4', flavor: 'PGO', note: PGO_NOTE},
    },
    {
      id: 'old',
      label: 'An old PC (made before ~2013)',
      hint: 'Pre-Ryzen / pre-Haswell',
      rec: {
        build: 'Legacy amd64',
        flavor: 'PGO',
        note: 'This is the build for older processors — expect some bugs. If your PC is newer than about 2013, go back and pick “A normal desktop or laptop” instead.',
      },
    },
    {
      id: 'arm',
      label: 'An ARM device',
      hint: 'aarch64 — most people are not on one of these',
      rec: {build: 'ARM (aarch64)', flavor: 'PGO', note: PGO_NOTE},
    },
  ],
  windows: [
    {
      id: 'pc',
      label: 'A normal desktop or laptop (2013 or newer)',
      hint: 'Pick this if you’re not sure',
      rec: {build: 'amd64/x86_64 v3', flavor: 'PGO', note: PGO_NOTE},
    },
    {
      id: 'glitch',
      label: 'I’m seeing graphics glitches in a game',
      hint: 'e.g. Pokémon Scarlet & Violet on another build',
      rec: {
        build: 'amd64/x86_64 (MSVC)',
        flavor: null,
        note: 'This build exists specifically to fix graphical issues other builds have. It only comes in one version (there’s no PGO version), so just grab the MSVC zip.',
      },
    },
    {
      id: 'handheld',
      label: 'ROG Ally X / Legion Go S',
      hint: 'AMD Zen 4 — AMD only, not Intel',
      rec: {build: 'Zen 4', flavor: 'PGO', note: PGO_NOTE},
    },
    {
      id: 'arm',
      label: 'A Snapdragon / ARM laptop',
      rec: {build: 'aarch64/arm64', flavor: 'PGO', note: PGO_NOTE},
    },
  ],
};

const MACOS_REC: Recommendation = {
  build: 'macOS DMG',
  flavor: null,
  note: 'There’s only one Mac build. Heads up: Mac support is experimental — expect graphical glitches and crashes. If you can, Linux or Windows will run much better.',
};

const OS_LABELS: Record<OS, string> = {
  windows: 'Windows',
  macos: 'Mac',
  linux: 'Linux',
};

const RELEASES_URL = 'https://git.eden-emu.dev/eden-emu/eden/releases';

export default function BuildPicker(): ReactNode {
  const [os, setOs] = useState<OS | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const chooseOs = (next: OS) => {
    setOs(next);
    setDeviceId(null);
  };

  const devices = os && os !== 'macos' ? DEVICES[os] : null;
  const device = devices?.find((d) => d.id === deviceId) ?? null;
  const rec: Recommendation | null =
    os === 'macos' ? MACOS_REC : device?.rec ?? null;

  return (
    <div className={styles.picker}>
      <div className={styles.step}>
        <p className={styles.question}>
          <span className={styles.stepNum}>1</span> What are you installing Eden
          on?
        </p>
        <div className={styles.options}>
          {(Object.keys(OS_LABELS) as OS[]).map((value) => (
            <button
              key={value}
              type="button"
              className={`${styles.option} ${
                os === value ? styles.optionActive : ''
              }`}
              aria-pressed={os === value}
              onClick={() => chooseOs(value)}>
              {OS_LABELS[value]}
            </button>
          ))}
        </div>
      </div>

      {devices && (
        <div className={styles.step}>
          <p className={styles.question}>
            <span className={styles.stepNum}>2</span> Which best describes your
            device?
          </p>
          <div className={styles.optionsColumn}>
            {devices.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`${styles.deviceOption} ${
                  deviceId === d.id ? styles.optionActive : ''
                }`}
                aria-pressed={deviceId === d.id}
                onClick={() => setDeviceId(d.id)}>
                <span className={styles.deviceLabel}>{d.label}</span>
                {d.hint && <span className={styles.deviceHint}>{d.hint}</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {rec && (
        <div className={styles.result}>
          <p className={styles.resultLead}>Download this one:</p>
          <p className={styles.resultBuild}>
            {rec.build}
            {rec.flavor && (
              <span className={styles.resultFlavor}>{rec.flavor} version</span>
            )}
          </p>
          {rec.note && <p className={styles.resultNote}>{rec.note}</p>}
          <a
            className={styles.resultBtn}
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer">
            Open the Eden downloads page →
          </a>
          <p className={styles.resultHint}>
            On that page, open the newest release and look for the file labelled{' '}
            <strong>{rec.build}</strong>
            {rec.flavor ? <> ({rec.flavor})</> : null}.
          </p>
        </div>
      )}
    </div>
  );
}
