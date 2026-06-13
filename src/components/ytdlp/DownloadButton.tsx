import React, {type ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DownloadIcon from './DownloadIcon';
import styles from './styles.module.css';

/**
 * Download button for a static file (e.g. the `ydl` wrapper script). Links to a
 * file under static/ and downloads it under `filename` — keeping the script out
 * of the guide body so it doesn't intimidate readers.
 */
export default function DownloadButton({
  file,
  filename,
  children,
}: {
  /** Path under static/, e.g. "yt-dlp/ydl". */
  file: string;
  /** Name the browser saves it as. */
  filename: string;
  children: ReactNode;
}): ReactNode {
  return (
    <a className={styles.scriptBtn} href={useBaseUrl(file)} download={filename}>
      <DownloadIcon />
      {children}
    </a>
  );
}
